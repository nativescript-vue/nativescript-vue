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

    const { io } = require('socket.io-client');
    const {
      devtools,
      setElectronServerContext,
      createRpcServer,
    } = require('@vue/devtools-kit');
    const { functions } = require('@vue/devtools-core');

    // must run before the app imports Vue, so the hook is in place when
    // createApp registers itself
    devtools.init();

    const platform = global.isAndroid ? 'Android' : 'iOS';
    console.log(`[VueDevtools] Connecting to ${url} (${platform})...`);

    const socket = io(url, {
      // NativeScript exposes XMLHttpRequest but no global WebSocket
      transports: ['polling'],
      reconnectionDelayMax: 5000,
    });

    socket.on('connect', () => {
      setElectronServerContext(socket);
      createRpcServer(functions, { preset: 'electron' });
      socket.emit('vue-devtools:init');
      console.log(`[VueDevtools] Connected to ${url}`);
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
