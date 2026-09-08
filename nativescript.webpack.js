const path = require('path');
const { spawn } = require('child_process');
const { VueLoaderPlugin } = require('vue-loader');

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

  // webpack config hooks are synchronous; listen() reports through nextTick
  // and the promise through microtasks, both of which _tickCallback drains
  if (typeof process._tickCallback !== 'function') {
    return port;
  }

  while (!found) {
    process._tickCallback();
    const start = Date.now();
    while (Date.now() - start < 100) {
      // busy wait
    }
  }

  return port;
}

/**
 * Locates @vue/devtools and the client packages it brings along, resolving
 * from the app so a hoisted or nested layout both work.
 */
function resolveDevtools(projectRoot) {
  const resolveFrom = (request, from) =>
    require.resolve(request, { paths: [from] });

  let devtoolsPkg;
  try {
    devtoolsPkg = resolveFrom('@vue/devtools/package.json', projectRoot);
  } catch {
    return null;
  }

  const devtoolsDir = path.dirname(devtoolsPkg);
  const version = require(devtoolsPkg).version;
  const major = parseInt(version.split('.')[0], 10);
  if (major < 8) {
    throw new Error(
      `@vue/devtools ${version} is installed but nativescript-vue needs ^8. Run: npm i -D @vue/devtools@^8`,
    );
  }

  const electronDir = path.dirname(
    resolveFrom('@vue/devtools-electron/package.json', devtoolsDir),
  );

  return {
    version,
    cli: path.join(electronDir, 'dist/cli.mjs'),
    aliases: {
      'socket.io-client': path.dirname(
        resolveFrom('socket.io-client/package.json', electronDir),
      ),
      '@vue/devtools-kit': path.dirname(
        resolveFrom('@vue/devtools-kit/package.json', devtoolsDir),
      ),
      '@vue/devtools-core': path.dirname(
        resolveFrom('@vue/devtools-core/package.json', electronDir),
      ),
    },
  };
}

function startVueDevtools(cli, port, isAndroid) {
  console.log(`[VueDevtools] Starting Vue Devtools on port ${port}`);
  if (isAndroid) {
    console.log(
      `[VueDevtools] If the app doesn't connect, make sure cleartext HTTP is allowed: set android:usesCleartextTraffic="true" on <application> in AndroidManifest.xml`,
    );
  }
  const child = spawn(process.execPath, [cli], {
    stdio: 'ignore',
    env: {
      ...process.env,
      PORT: String(port),
    },
  });
  child.on('error', (err) => {
    console.warn(`[VueDevtools] Failed to start the devtools app: ${err}`);
  });
}

/**
 * Warns when the app resolves a `vue` package whose version differs from the
 * runtime nativescript-vue ships. vue-loader compiles templates with that
 * package's compiler when present, and a mismatch can emit helpers the
 * runtime does not have.
 */
function checkVueVersionSkew(projectRoot) {
  let vuePkg;
  try {
    vuePkg = require(
      require.resolve('vue/package.json', { paths: [projectRoot] }),
    );
  } catch {
    return;
  }
  const runtimeVersion = require('@vue/runtime-core/package.json').version;
  if (vuePkg.version !== runtimeVersion) {
    console.warn(
      `[nativescript-vue] vue@${vuePkg.version} is installed in this project but nativescript-vue uses @vue/runtime-core@${runtimeVersion}. ` +
        `Templates are compiled with the installed vue's compiler, so keep both on the same version.`,
    );
  }
}

/**
 * @param {typeof import("@nativescript/webpack")} webpack
 */
module.exports = (webpack) => {
  webpack.chainWebpack((config, env) => {
    const projectRoot = webpack.Utils.project.getProjectRootPath();
    const additionalDefines = {
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    };

    checkVueVersionSkew(projectRoot);

    if (env.vueDevtools) {
      const devtools = resolveDevtools(projectRoot);

      if (!devtools) {
        console.warn(
          `[VueDevtools] --env.vueDevtools was passed but @vue/devtools is not installed. Run: npm i -D @vue/devtools@^8`,
        );
      } else {
        const isAndroid =
          webpack.Utils.platform.getPlatformName() === 'android';
        const port = env.vueDevtoolsPort
          ? parseInt(env.vueDevtoolsPort, 10)
          : findFreePort(8098);
        // on Android emulators, localhost is not the host machine
        const host =
          env.vueDevtoolsHost ??
          (isAndroid ? 'http://10.0.2.2' : 'http://localhost');

        additionalDefines['__VUE_PROD_DEVTOOLS__'] = true;
        additionalDefines['__NS_VUE_DEVTOOLS_HOST__'] = JSON.stringify(host);
        additionalDefines['__NS_VUE_DEVTOOLS_PORT__'] = port;

        for (const [name, dir] of Object.entries(devtools.aliases)) {
          config.resolve.alias.set(name, dir);
        }

        const devtoolsEntryPath = require.resolve('./devtools.js');
        const entryPath = webpack.Utils.platform.getEntryPath();
        const paths = config.entry('bundle').values();
        const entryIndex = paths.indexOf(entryPath);

        if (entryIndex === -1) {
          paths.unshift(devtoolsEntryPath);
        } else {
          // before the app entry, after globals etc.
          paths.splice(entryIndex, 0, devtoolsEntryPath);
        }

        config.entry('bundle').clear().merge(paths);

        startVueDevtools(devtools.cli, port, isAndroid);
      }
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
          compilerOptions: {},
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
