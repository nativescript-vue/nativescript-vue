import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import flow from 'rollup-plugin-flow-no-whitespace'
import path from 'path'

const banner =
    `
/*!
 * NativeScript-Vue
 * (c) 2017 rigor789
 * Released under MIT license.
 */
`

const resolveVue = p => {
    return path.resolve(__dirname, 'node_modules', 'vue/src/', p) + '/'
}

const aliases = {
    vue: resolveVue('core/index'),
    compiler: resolveVue('compiler'),
    web: resolveVue('platforms/web'),
    core: resolveVue('core'),
    shared: resolveVue('shared'),
    sfc: resolveVue('sfc'),
    he: path.resolve(__dirname, 'platform/nativescript/util/entity-decoder')
}

export default {
    entry: './platform/nativescript/framework.js',
    format: 'cjs',
    dest: './dist/index.js',
    moduleName: 'NativeScript-Vue',
    sourceMap: true,

    plugins: [
        flow(),
        replace({
            '__WEEX__': false,
            'process.env.NODE_ENV': "'development'",
            "let _isServer": 'let _isServer = false'
        }),
        alias(aliases),
        commonjs({
            include: [path.resolve(__dirname, 'node_modules', 'vue') + '/**'],
        }),
    ],
    external(id) {
        return id.startsWith('ui/') || id.startsWith('application')
    },
    banner
};