const { join, relative, resolve, sep } = require("path");

const webpack = require("webpack");
const nsWebpack = require("nativescript-dev-webpack");
const nativescriptTarget = require("nativescript-dev-webpack/nativescript-target");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { NativeScriptWorkerPlugin } = require("nativescript-worker-loader/NativeScriptWorkerPlugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const hashSalt =  Date.now().toString();

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
        uglify, // --env.uglify
        report, // --env.report
        sourceMap, // --env.sourceMap
        hmr, // --env.hmr,
        unitTesting, // --env.unitTesting
    } = env;
    const externals = nsWebpack.getConvertedExternals(env.externals);

    const appFullPath = resolve(projectRoot, appPath);
    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

    const entryModule = nsWebpack.getEntryModule(appFullPath);
    const entryPath = `.${sep}${entryModule}.js`;
    console.log("ENTRY", entryPath);
    const entries = { bundle: entryPath };
    if (platform === "ios") {
        entries["tns_modules/tns-core-modules/inspector_modules"] = "inspector_modules.js";
    };

    const config = {
        mode: uglify ? "production" : "development",
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
            libraryTarget: "commonjs2",
            filename: "[name].js",
            globalObject: "global",
            hashSalt
        },
        resolve: {
            extensions: [".js", ".scss", ".css"],
            // Resolve {N} system modules from tns-core-modules
            modules: [
                "node_modules/tns-core-modules",
                "node_modules",
            ],
            mainFields: ['main', 'module'],
            alias: {
                '~': appFullPath
            },
            // don't resolve symlinks to symlinked modules
            symlinks: false
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
        devtool: sourceMap ? "inline-source-map" : "none",
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
                new UglifyJsPlugin({
                    parallel: true,
                    cache: true,
                    uglifyOptions: {
                        output: {
                            comments: false,
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
                            options: { modules: appComponents }
                        },

                        {
                            loader: "nativescript-dev-webpack/bundle-config-loader",
                            options: {
                                loadCss: !snapshot, // load the application css if in debug mode
                                unitTesting,
                                appFullPath,
                                projectRoot,
                            }
                        },
                    ].filter(loader => !!loader)
                },

                {
                    test: /-page\.js$/,
                    use: "nativescript-dev-webpack/script-hot-loader"
                },

                {
                    test: /\.(css|scss)$/,
                    use: "nativescript-dev-webpack/style-hot-loader"
                },

                {
                    test: /\.(html|xml)$/,
                    use: "nativescript-dev-webpack/markup-hot-loader"
                },

                { test: /\.(html|xml)$/, use: "nativescript-dev-webpack/xml-namespace-loader"},

                {
                    test: /\.css$/,
                    use: { loader: "css-loader", options: { minimize: false, url: false } }
                },

                {
                    test: /\.scss$/,
                    use: [
                        { loader: "css-loader", options: { minimize: false, url: false } },
                        "sass-loader"
                    ]
                },
            ]
        },
        plugins: [
            // Define useful constants like TNS_WEBPACK
            new webpack.DefinePlugin({
                "global.TNS_WEBPACK": "true",
                "process": undefined,
            }),
            // Remove all files from the out dir.
            new CleanWebpackPlugin([ `${dist}/**/*` ]),
            // Copy assets to out dir. Add your own globs as needed.
            new CopyWebpackPlugin([
                { from: { glob: "fonts/**" } },
                { from: { glob: "**/*.jpg" } },
                { from: { glob: "**/*.png" } },
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
