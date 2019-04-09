const { relative, resolve, sep } = require("path");

const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NsVueTemplateCompiler = require("nativescript-vue-template-compiler");

const nsWebpack = require("nativescript-dev-webpack");
const nativescriptTarget = require("nativescript-dev-webpack/nativescript-target");
const { NativeScriptWorkerPlugin } = require("nativescript-worker-loader/NativeScriptWorkerPlugin");

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
        production, // --env.production
        report, // --env.report
        hmr, // --env.hmr
    } = env;

    const externals = nsWebpack.getConvertedExternals(env.externals);

    const mode = production ? "production" : "development"

    const appFullPath = resolve(projectRoot, appPath);
    const appResourcesFullPath = resolve(projectRoot, appResourcesPath);

    const entryModule = nsWebpack.getEntryModule(appFullPath);
    const entryPath = `.${sep}${entryModule}`;
    console.log(`Bundling application for entryPath ${entryPath}...`);

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
        entry: {
            bundle: entryPath,
        },
        output: {
            pathinfo: false,
            path: dist,
            libraryTarget: "commonjs2",
            filename: "[name].js",
            globalObject: "global",
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
                'vue': 'nativescript-vue'
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
        devtool: "none",
        optimization: {
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
                        },
                        keep_fnames: true,
                    },
                }),
            ],
        },
        module: {
            rules: [{
                    test: new RegExp(entryPath + ".(js|ts)"),
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
                            },
                        },
                    ].filter(loader => Boolean(loader)),
                },
                {
                    test: /\.css$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        'nativescript-dev-webpack/apply-css-loader.js',
                        { loader: "css-loader", options: { minimize: false, url: false } },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        'nativescript-dev-webpack/style-hot-loader',
                        'nativescript-dev-webpack/apply-css-loader.js',
                        { loader: "css-loader", options: { minimize: false, url: false } },
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
            // Copy native app resources to out dir.
            new CopyWebpackPlugin([{
                from: `${appResourcesFullPath}/${appResourcesPlatformDir}`,
                to: `${dist}/App_Resources/${appResourcesPlatformDir}`,
                context: projectRoot,
            }]),
            // Copy assets to out dir. Add your own globs as needed.
            new CopyWebpackPlugin([
                { from: { glob: "fonts/**" } },
                { from: { glob: "**/*.+(jpg|png)" } },
                { from: { glob: "assets/**/*" } },
            ], { ignore: [`${relative(appPath, appResourcesFullPath)}/**`] }),
            // Generate a bundle starter script and activate it in package.json
            new nsWebpack.GenerateBundleStarterPlugin([
                "./vendor",
                "./bundle",
            ]),
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
