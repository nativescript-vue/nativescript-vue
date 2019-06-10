const { join, relative, resolve, sep } = require("path");

const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NsVueTemplateCompiler = require("nativescript-vue-template-compiler");

const nsWebpack = require("nativescript-dev-webpack");
const nativescriptTarget = require("nativescript-dev-webpack/nativescript-target");
const { NativeScriptWorkerPlugin } = require("nativescript-worker-loader/NativeScriptWorkerPlugin");
const hashSalt = Date.now().toString();

module.exports = env => {
    // Add your custom Activities, Services and other android app components here.
    const appComponents = [
        "tns-core-modules/ui/frame",
        "tns-core-modules/ui/frame/activity",
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
    const appResourcesPlatformDir = platform === "android" ? "Android" : "iOS";

    const {
        // The 'appPath' and 'appResourcesPath' values are fetched from
        // the nsconfig.json configuration file
        // when bundling with `tns run android|ios --bundle`.
        appPath = "app",
        appResourcesPath = "app/App_Resources",

        // You can provide the following flags when running 'tns run android|ios'
        snapshot, // --env.snapshot
        production, // --env.production
        report, // --env.report
        hmr, // --env.hmr
        sourceMap, // --env.sourceMap
        hiddenSourceMap, // --env.hiddenSourceMap
        unitTesting, // --env.unitTesting
    } = env;

    const isAnySourceMapEnabled = !!sourceMap || !!hiddenSourceMap;
    const externals = nsWebpack.getConvertedExternals(env.externals);

    const mode = production ? "production" : "development"

    const appFullPath = resolve(projectRoot, appPath);
    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

    const entryModule = nsWebpack.getEntryModule(appFullPath, platform);
    const entryPath = `.${sep}${entryModule}`;
    const entries = { bundle: entryPath };
    if (platform === "ios") {
        entries["tns_modules/tns-core-modules/inspector_modules"] = "inspector_modules.js";
    };
    console.log(`Bundling application for entryPath ${entryPath}...`);

    let sourceMapFilename = nsWebpack.getSourceMapFilename(hiddenSourceMap, __dirname, dist);

    const config = {
        mode: mode,
        context: appFullPath,
        externals,
        watchOptions: {
            ignored: [
                appResourcesFullPath,
                // Don't watch hidden files
                "**/.*",
            ],
        },
        target: nativescriptTarget,
        // target: nativeScriptVueTarget,
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
            extensions: [".vue", ".ts", ".js", ".scss", ".css"],
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
            symlinks: true,
        },
        resolveLoader: {
            // don't resolve symlinks to symlinked loaders
            symlinks: false,
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
                        test: (module) => {
                            const moduleName = module.nameForCondition ? module.nameForCondition() : '';
                            return /[\\/]node_modules[\\/]/.test(moduleName) ||
                              appComponents.some(comp => comp === moduleName);

                        },
                        enforce: true,
                    },
                },
            },
            minimize: Boolean(production),
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
                        },
                        keep_fnames: true,
                    },
                }),
            ],
        },
        module: {
            rules: [{
                test: nsWebpack.getEntryPathRegExp(appFullPath, entryPath + ".(js|ts)"),
                use: [
                    // Require all Android app components
                    platform === "android" && {
                        loader: "nativescript-dev-webpack/android-app-components-loader",
                        options: { modules: appComponents },
                    },

                    {
                        loader: "nativescript-dev-webpack/bundle-config-loader",
                        options: {
                            registerPages: true, // applicable only for non-angular apps
                            loadCss: !snapshot, // load the application css if in debug mode
                            unitTesting,
                            appFullPath,
                            projectRoot,
                        },
                    },
                ].filter(loader => Boolean(loader)),
            },
                {
                    test: /\.css$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        'nativescript-dev-webpack/apply-css-loader.js',
                        { loader: "css-loader", options: { url: false } },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        'nativescript-dev-webpack/apply-css-loader.js',
                        { loader: "css-loader", options: { url: false } },
                        "sass-loader",
                    ],
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
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
                "TNS_ENV": JSON.stringify(mode)
            }),
            // Remove all files from the out dir.
            new CleanWebpackPlugin([`${dist}/**/*`]),
            // Copy assets to out dir. Add your own globs as needed.
            new CopyWebpackPlugin([
                { from: { glob: "fonts/**" } },
                { from: { glob: "**/*.+(jpg|png)" } },
                { from: { glob: "assets/**/*" } },
            ], { ignore: [`${relative(appPath, appResourcesFullPath)}/**`] }),
            // Generate a bundle starter script and activate it in package.json
            new nsWebpack.GenerateBundleStarterPlugin(
              // Don't include `runtime.js` when creating a snapshot. The plugin
              // configures the WebPack runtime to be generated inside the snapshot
              // module and no `runtime.js` module exist.
              (snapshot ? [] : ["./runtime"])
                .concat([
                    "./vendor",
                    "./bundle",
                ])
            ),
            // For instructions on how to set up workers with webpack
            // check out https://github.com/nativescript/worker-loader
            new NativeScriptWorkerPlugin(),
            new nsWebpack.PlatformFSPlugin({
                platform,
                platforms,
            }),
            // Does IPC communication with the {N} CLI to notify events when running in watch mode.
            new nsWebpack.WatchStateLoggerPlugin(),
        ],
    };

    if (unitTesting) {
        config.module.rules.push(
          {
              test: /-page\.js$/,
              use: "nativescript-dev-webpack/script-hot-loader"
          },
          {
              test: /\.(html|xml)$/,
              use: "nativescript-dev-webpack/markup-hot-loader"
          },

          { test: /\.(html|xml)$/, use: "nativescript-dev-webpack/xml-namespace-loader" }
        );
    }

    // Copy the native app resources to the out dir
    // only if doing a full build (tns run/build) and not previewing (tns preview)
    if (!externals || externals.length === 0) {
        config.plugins.push(new CopyWebpackPlugin([
            {
                from: `${appResourcesFullPath}/${appResourcesPlatformDir}`,
                to: `${dist}/App_Resources/${appResourcesPlatformDir}`,
                context: projectRoot
            },
        ]));
    }

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
