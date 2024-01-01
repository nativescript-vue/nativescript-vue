const { VueLoaderPlugin } = require('vue-loader');
const spawn = require('cross-spawn');

function findFreePort(startingPort = 8098) {
  let found = false;
  let port = startingPort;

  const isPortFree = (port) =>
    new Promise((resolve) => {
      const server = require('http')
        .createServer()
        .listen(port, '0.0.0.0', () => {
          server.close();
          resolve(true);
        })
        .on('error', () => {
          resolve(false);
        });
    });

  const findFreePort = () => {
    isPortFree(port).then((isFree) => {
      if (!isFree) {
        port++;
        return findFreePort();
      }
      found = true;
    });
  };

  findFreePort();

  while (!found) {
    process._tickCallback();
    const start = Date.now();
    while (Date.now() - start < 100) {
      // busy wait... not ideal, but we need to find a port synchronously...
    }
  }

  return port;
}

function startVueDevtools(port, isAndroid = false) {
  console.log(`[VueDevtools] Starting standalone Vue Devtools on port ${port}`);
  if (isAndroid) {
    console.log(
      `[VueDevtools] If the app doesn't automatically connect, check if http traffic is allowed. (e.g. on Android, you may need to set android:usesCleartextTraffic="true" in AndroidManifest.xml)`,
    );
  }
  spawn(require.resolve('@vue/devtools/bin.js'), [], {
    stdio: 'ignore',
    env: {
      ...process.env,
      PORT: port,
    },
  });
}

/**
 * @param {typeof import("@nativescript/webpack")} webpack
 */
module.exports = (webpack) => {
  webpack.useConfig('vue');

  webpack.chainWebpack((config, env) => {
    const additionalDefines = {
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    };

    // todo: support configuring the devtools host/port from the nativescript.config.ts...
    if (!!env.vueDevtools) {
      // find a free port for the devtools
      const vueDevtoolsPort = findFreePort(8098);
      const isAndroid = webpack.Utils.platform.getPlatformName() === 'android';

      // on android simulators, localhost is not the host machine...
      const vueDevtoolsHost = isAndroid
        ? 'http://10.0.2.2'
        : 'http://localhost';

      additionalDefines['__VUE_PROD_DEVTOOLS__'] = true;
      additionalDefines['__NS_VUE_DEVTOOLS_HOST__'] =
        JSON.stringify(vueDevtoolsHost);
      additionalDefines['__NS_VUE_DEVTOOLS_PORT__'] = vueDevtoolsPort;

      const devtoolsEntryPath = require.resolve('./devtools.js');
      const entryPath = webpack.Utils.platform.getEntryPath();
      const paths = config.entry('bundle').values();
      const entryIndex = paths.indexOf(entryPath);

      if (entryIndex === -1) {
        // if the app entry is not found, add the devtools entry at the beginning - generally should not happen, but just in case.
        paths.unshift(entryPath);
      } else {
        // insert devtools entry before the app entry, but after globals etc.
        paths.splice(entryIndex, 0, devtoolsEntryPath);
      }

      config.entry('bundle').clear().merge(paths);

      // start the devtools...
      startVueDevtools(vueDevtoolsPort, isAndroid);
    }

    // resolve any imports from "vue" to "nativescript-vue"
    config.resolve.alias.set('vue', 'nativescript-vue');

    config.plugins.get('VueLoaderPlugin').use(VueLoaderPlugin);

    // use "vue-loader" from "nativescript-vue" deps rather than the one from @nativescript/webpack
    config.module.rules
      .get('vue')
      .uses.get('vue-loader')
      .loader(require.resolve('vue-loader'))
      .tap((options) => {
        return {
          ...options,
          isServerBuild: false,
          compilerOptions: {
            // isCustomElement: (el) => el.toLowerCase() === 'label',
            // transformHoist: null
          },
        };
      });

    config.module.rules
      .get('css')
      .uses.get('vue-css-loader')
      .loader(require.resolve('vue-loader/dist/stylePostLoader.js'));

    config.module.rules
      .get('scss')
      .uses.get('vue-css-loader')
      .loader(require.resolve('vue-loader/dist/stylePostLoader.js'));

    config.plugin('DefinePlugin').tap((args) => {
      Object.assign(args[0], {
        __VUE_OPTIONS_API__: true,
        ...additionalDefines,
      });

      return args;
    });

    // disable vue fork ts checker, as it doesn't work with vue3 yet?
    config.plugin('ForkTsCheckerWebpackPlugin').tap((args) => {
      args[0] = webpack.merge(args[0], {
        typescript: {
          extensions: {
            vue: {
              enabled: false,
            },
          },
        },
      });

      return args;
    });
  });
};
