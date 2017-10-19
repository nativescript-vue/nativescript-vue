import alias from 'rollup-plugin-alias'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import flow from 'rollup-plugin-flow-no-whitespace'
import path from 'path'

const Vue = require('vue/package.json')
const NSVue = require('./package.json')

const banner = `
/*!
 * NativeScript-Vue v${NSVue.version}
 * (Using Vue v${Vue.version})
 * (c) 2017 rigor789
 * Released under the MIT license.
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
  //he: path.resolve(__dirname, 'node_modules', 'he', 'he')
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
      __WEEX__: false,
      __VERSION__: Vue.version,
      'process.env.NODE_ENV': "'development'",
      'let _isServer': 'let _isServer = false',
      'process.env.VUE_VERSION': `'${Vue.version}'`,
      'process.env.NS_VUE_VERSION': `'${NSVue.version}'`
    }),
    buble({
      transforms: {
        arrow: false,
        classes: false,
        collections: false,
        computedProperty: false,
        conciseMethodProperty: false,
        constLoop: false,
        dangerousForOf: false,
        dangerousTaggedTemplateString: false,
        defaultParameter: false,
        destructuring: false,
        forOf: false,
        generator: false,
        letConst: true,
        modules: false,
        numericLiteral: false,
        parameterDestructuring: false,
        reservedProperties: false,
        spreadRest: false,
        stickyRegExp: false,
        templateString: false,
        unicodeRegExp: false,
      }
    }),
    alias(aliases),
    commonjs({
      include: [
        path.resolve(__dirname, 'node_modules', 'vue') + '/**',
        //path.resolve(__dirname, 'node_modules', 'he') + '/**',
      ],

      namedExports: {
        'he': ['decode']
      }
    })
  ],
  external(id) {
    return id.startsWith('ui/') || id.startsWith('application')
  },
  banner
}
