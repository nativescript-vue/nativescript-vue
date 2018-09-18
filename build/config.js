const alias = require('rollup-plugin-alias')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const flow = require('rollup-plugin-flow-no-whitespace')
const path = require('path')

const VueVersion = require('vue/package.json').version
const NSVueVersion = process.env.VERSION || require('../package.json').version

const banner = (name, version) => `
/*!
 * ${name} v${version || NSVueVersion}
 * (Using Vue v${VueVersion})
 * (c) 2017-${new Date().getFullYear()} rigor789
 * Released under the MIT license.
 */
`
const resolveVue = p => {
    return path.resolve(process.cwd(), 'node_modules', 'vue/src/', p) + '/'
}
const aliases = {
    vue: resolveVue('core/index'),
    compiler: resolveVue('compiler'),
    web: resolveVue('platforms/web'),
    core: resolveVue('core'),
    shared: resolveVue('shared'),
    sfc: resolveVue('sfc'),
    //he: path.resolve(__dirname, 'node_modules', 'he', 'he')
    he: path.resolve(__dirname, '..', 'platform/nativescript/util/entity-decoder')
}

const builds = {
    'nativescript-vue': {
        entry: './platform/nativescript/framework.js',
        dest: './dist/index.js',
        moduleName: 'NativeScript-Vue',
        banner: banner('NativeScript-Vue'),
        external(id) {
            return id.startsWith('tns-core-modules') || id.startsWith('weex')
        }
    },
    'nativescript-vue-template-compiler': {
        entry: './platform/nativescript/compiler.js',
        dest: './packages/nativescript-vue-template-compiler/index.js',
        moduleName: 'NativeScript-Vue-Template-Compiler',
        banner: banner('NativeScript-Vue-Template-Compiler'),
        external: Object.keys(require('../packages/nativescript-vue-template-compiler/package.json').dependencies)
    }
}


const genConfig = (name) => {
    const opts = builds[name]
    const config = {
        input: opts.entry,
        external: opts.external,
        output: {
            file: opts.dest,
            format: opts.format || 'cjs',
            banner: opts.banner,
            name: opts.moduleName
        },
        treeshake: {
            pureExternalModules: id => id.startsWith('weex')
        },
        watch: {
            chokidar: false
        },
        plugins: [
            replace({
                __WEEX__: false,
                __VERSION__: VueVersion,
                'process.env.NODE_ENV': "'development'",
                'let _isServer': 'let _isServer = false',
                'process.env.VUE_VERSION': `'${VueVersion}'`,
                'process.env.NS_VUE_VERSION': `'${NSVueVersion}'`
            }),
            flow(),
            alias(aliases),
            resolve(),
            commonjs(),
        ],
    }

    Object.defineProperty(config, '_name', {
        enumerable: false,
        value: name
    })

    return config;
}

if (process.env.TARGET) {
    module.exports = genConfig(process.env.TARGET)
} else {
    module.exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
