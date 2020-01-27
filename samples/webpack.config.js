const {join, relative, resolve, sep} = require("path");

const webpack = require("webpack");
const nsWebpack = require("nativescript-dev-webpack");
const nativescriptTarget = require("nativescript-dev-webpack/nativescript-target");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const {NativeScriptWorkerPlugin} = require("nativescript-worker-loader/NativeScriptWorkerPlugin");
const TerserPlugin = require("terser-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NsVueTemplateCompiler = require("nativescript-vue-template-compiler");
const hashSalt = Date.now().toString();

module.exports = env => {
  // Add your custom Activities, Services and other android app components here.
  const appComponents = [
    "@nativescript/core/ui/frame",
    "@nativescript/core/ui/frame/activity",
  ];

  const platform = env && (env.android && "android" || env.ios && "ios");
  if (!platform) {
    throw new Error("You need to provide a target platform!");
  }

  const platforms = ["ios", "android"];
  const projectRoot = __dirname;
  const nsVueRoot = resolve(projectRoot, '../');

  // Default destination inside platforms/<platform>/...
  const dist = resolve(projectRoot, nsWebpack.getAppPath(platform, projectRoot));

  const {
    // The 'appPath' and 'appResourcesPath' values are fetched from
    // the nsconfig.json configuration file
    // when bundling with `tns run android|ios --bundle`.
    appPath = "app",
    appResourcesPath = "app/App_Resources",

    // You can provide the following flags when running 'tns run android|ios'
    snapshot, // --env.snapshot
    production, // --env.production
    uglify, // --env.uglify
    report, // --env.report
    sourceMap, // --env.sourceMap
    hiddenSourceMap, // --env.hiddenSourceMap
    hmr, // --env.hmr,
    unitTesting, // --env.unitTesting,
    verbose, // --env.verbose
  } = env;

  const isAnySourceMapEnabled = !!sourceMap || !!hiddenSourceMap;
  const externals = nsWebpack.getConvertedExternals(env.externals);

  const mode = production ? "production" : "development"

  const appFullPath = resolve(projectRoot, appPath);
  const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

  const entryModule = nsWebpack.getEntryModule(appFullPath, platform);
  const entryPath = `.${sep}${entryModule}`;
  const entries = {bundle: entryPath};
  const areCoreModulesExternal = Array.isArray(env.externals) && env.externals.some(e => e.indexOf("tns-core-modules") > -1);
  if (platform === "ios" && !areCoreModulesExternal) {
    entries["tns_modules/tns-core-modules/inspector_modules"] = "inspector_modules";
  }
  ;

  console.log(`Bundling application for entryPath ${entryPath}...`);

  let sourceMapFilename = nsWebpack.getSourceMapFilename(hiddenSourceMap, __dirname, dist);

  const itemsToClean = [`${dist}/**/*`];
  if (platform === "android") {
    itemsToClean.push(`${join(projectRoot, "platforms", "android", "app", "src", "main", "assets", "snapshots")}`);
    itemsToClean.push(`${join(projectRoot, "platforms", "android", "app", "build", "configurations", "nativescript-android-snapshot")}`);
  }


  nsWebpack.processAppComponents(appComponents, platform);
  const config = {
    mode: production ? "production" : "development",
    context: appFullPath,
    externals,
    watchOptions: {
      ignored: [
        appResourcesFullPath,
        // Don't watch hidden files
        "**/.*",
      ]
    },
    target: nativescriptTarget,
    entry: entries,
    output: {
      pathinfo: false,
      path: dist,
      sourceMapFilename,
      libraryTarget: "commonjs2",
      filename: "[name].js",
      globalObject: "global",
      hashSalt
    },
    resolve: {
      extensions: [".js", ".scss", ".css", ".ts", ".vue"],
      // Resolve {N} system modules from tns-core-modules
      modules: [
        resolve(__dirname, "node_modules/tns-core-modules"),
        resolve(__dirname, "node_modules"),
        "node_modules/tns-core-modules",
        "node_modules",
      ],
      alias: {
        '~': appFullPath,
        '@': appFullPath,
        'vue': 'nativescript-vue',
        'nativescript-vue': resolve(nsVueRoot, 'dist/index.js'),
      },
      // resolve symlinks to symlinked modules
      symlinks: true
    },
    resolveLoader: {
      // don't resolve symlinks to symlinked loaders
      symlinks: false
    },
    node: {
      // Disable node shims that conflict with NativeScript
      "http": false,
      "timers": false,
      "setImmediate": false,
      "fs": "empty",
      "__dirname": false,
    },
    devtool: hiddenSourceMap ? "hidden-source-map" : (sourceMap ? "inline-source-map" : "none"),
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: "vendor",
            chunks: "all",
            test: (module, chunks) => {
              const moduleName = module.nameForCondition ? module.nameForCondition() : '';
              return /[\\/]node_modules[\\/]/.test(moduleName) ||
                appComponents.some(comp => comp === moduleName);

            },
            enforce: true,
          },
        }
      },
      minimize: !!uglify,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          cache: true,
          sourceMap: isAnySourceMapEnabled,
          terserOptions: {
            output: {
              comments: false,
              semicolons: !isAnySourceMapEnabled
            },
            compress: {
              // The Android SBG has problems parsing the output
              // when these options are enabled
              'collapse_vars': platform !== "android",
              sequences: platform !== "android",
            }
          }
        })
      ],
    },
    module: {
      rules: [
        {
          test: nsWebpack.getEntryPathRegExp(appFullPath, entryPath),
          use: [
            // Require all Android app components
            platform === "android" && {
              loader: "nativescript-dev-webpack/android-app-components-loader",
              options: {modules: appComponents}
            },

            {
              loader: "nativescript-dev-webpack/bundle-config-loader",
              options: {
                loadCss: !snapshot, // load the application css if in debug mode
                unitTesting,
                appFullPath,
                projectRoot,
                ignoredFiles: nsWebpack.getUserDefinedEntries(entries, platform)
              }
            },
          ].filter(loader => !!loader)
        },

        {
          test: /\.(js|css|scss|html|xml)$/,
          use: "nativescript-dev-webpack/hmr/hot-loader"
        },

        {test: /\.(html|xml)$/, use: "nativescript-dev-webpack/xml-namespace-loader"},

        {
          test: /\.css$/,
          use: {loader: "css-loader", options: {url: false}}
        },

        {
          test: /\.scss$/,
          use: [
            {loader: "css-loader", options: {url: false}},
            "sass-loader"
          ]
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            allowTsInNodeModules: true,
          },
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            compiler: NsVueTemplateCompiler,
          },
        },
      ],
    },
    plugins: [
      // ... Vue Loader plugin omitted
      // make sure to include the plugin!
      new VueLoaderPlugin(),
      // Define useful constants like TNS_WEBPACK
      new webpack.DefinePlugin({
        "global.TNS_WEBPACK": "true",
        "process": "global.process",
        "TNS_ENV": JSON.stringify(mode)
      }),
      // Remove all files from the out dir.
      new CleanWebpackPlugin(itemsToClean, {verbose: !!verbose}),
      // Copy assets to out dir. Add your own globs as needed.
      new CopyWebpackPlugin([
        {from: {glob: "fonts/**"}},
        {from: {glob: "**/*.+(jpg|png)"}},
        {from: {glob: "assets/**/*"}},
      ], {ignore: [`${relative(appPath, appResourcesFullPath)}/**`]}),
      new nsWebpack.GenerateNativeScriptEntryPointsPlugin("bundle"),

      // For instructions on how to set up workers with webpack
      // check out https://github.com/nativescript/worker-loader
      new NativeScriptWorkerPlugin(),
      new nsWebpack.PlatformFSPlugin({
        platform,
        platforms,
      }),
      // Does IPC communication with the {N} CLI to notify events when running in watch mode.
      new nsWebpack.WatchStateLoggerPlugin()
    ],
  };

  if (report) {
    // Generate report files for bundles content
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      generateStatsFile: true,
      reportFilename: resolve(projectRoot, "report", `report.html`),
      statsFilename: resolve(projectRoot, "report", `stats.json`),
    }));
  }

  if (snapshot) {
    config.plugins.push(new nsWebpack.NativeScriptSnapshotPlugin({
      chunk: "vendor",
      requireModules: [
        "tns-core-modules/bundle-entry-points",
      ],
      projectRoot,
      webpackConfig: config,
    }));
  }

  if (hmr) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }


  return config;
};
