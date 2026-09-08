// Bundled into the app ahead of its entry point by nativescript.webpack.js
// when running with --env.vueDevtools. Connects to the standalone Vue
// Devtools app over socket.io, mirroring @vue/devtools-electron's user-app
// client but without the DOM inspector code that expects a browser.
if (__DEV__) {
  try {
    const target = globalThis;
    const host = (target.__VUE_DEVTOOLS_HOST__ ??= __NS_VUE_DEVTOOLS_HOST__);
    const port = (target.__VUE_DEVTOOLS_PORT__ ??= __NS_VUE_DEVTOOLS_PORT__);
    const url = `${host}:${port}`;

    const {
      devtools,
      setElectronServerContext,
      createRpcServer,
    } = require('@vue/devtools-kit');

    // The hook must exist before anything evaluates nativescript-vue: its
    // renderer reads the hook once at import and, without a window to
    // replay into, treats a missing hook as "devtools not installed" for
    // the rest of the session. @vue/devtools-core imports 'vue', which the
    // webpack alias resolves to nativescript-vue, so it has to come after.
    devtools.init();

    const { io } = require('socket.io-client');
    const { functions } = require('@vue/devtools-core');

    const platform = global.isAndroid ? 'Android' : 'iOS';
    console.log(`[VueDevtools] Connecting to ${url} (${platform})...`);

    const socket = io(url, {
      // NativeScript exposes XMLHttpRequest but no global WebSocket
      transports: ['polling'],
      reconnectionDelayMax: 5000,
    });

    if (__NS_VUE_DEVTOOLS_DEBUG__) {
      const preview = (args) =>
        args.map((a) => String(a).slice(0, 160)).join(' ');
      socket.onAny((event, ...args) =>
        console.log(`[VueDevtools] <- ${event} ${preview(args)}`),
      );
      socket.onAnyOutgoing((event, ...args) =>
        console.log(`[VueDevtools] -> ${event} ${preview(args)}`),
      );
      socket.on('disconnect', (reason) =>
        console.log(`[VueDevtools] disconnected: ${reason}`),
      );
      socket.io.on('reconnect_attempt', (n) =>
        console.log(`[VueDevtools] reconnect attempt ${n}`),
      );
      socket.io.on('error', (err) =>
        console.log(`[VueDevtools] transport error: ${err.message}`),
      );
    }

    let serverReady = false;
    socket.on('connect', () => {
      // the Socket instance survives reconnects, so the RPC server only
      // needs wiring once; the devtools window needs init after every
      // (re)connect because it is what evicted us in the first place
      if (!serverReady) {
        setElectronServerContext(socket);
        createRpcServer(functions, { preset: 'electron' });
        serverReady = true;
      }
      socket.emit('vue-devtools:init');
      console.log(`[VueDevtools] Connected to ${url}`);

      if (__NS_VUE_DEVTOOLS_DEBUG__) {
        setTimeout(() => {
          const { devtoolsState } = require('@vue/devtools-kit');
          console.log(
            `[VueDevtools] state: apps=${devtoolsState.appRecords.length} ` +
              `connected=${devtoolsState.connected} ` +
              `clientConnected=${devtoolsState.clientConnected} ` +
              `vue=${devtoolsState.vueVersion}`,
          );
        }, 2000);
      }
    });

    // the devtools app tells every other client to leave whenever a new
    // socket connects, including when its own window opens after the app;
    // reconnecting shortly after makes the start order irrelevant
    socket.on('vue-devtools:disconnect-user-app', () => {
      socket.disconnect();
      setTimeout(() => socket.connect(), 1000);
    });

    let reportedError = false;
    socket.on('connect_error', (err) => {
      if (reportedError) return;
      reportedError = true;
      console.warn(
        `[VueDevtools] Could not reach ${url}: ${err.message}. ` +
          `Is the devtools app running?` +
          (global.isAndroid
            ? ` On Android, cleartext HTTP must be allowed (android:usesCleartextTraffic="true").`
            : ''),
      );
    });
    socket.on('connect', () => {
      reportedError = false;
    });
  } catch (e) {
    console.warn('[VueDevtools] Failed to start:', e);
  }
}
