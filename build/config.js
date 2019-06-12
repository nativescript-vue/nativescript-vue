const alias = require('rollup-plugin-alias')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const buble = require('rollup-plugin-buble')
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

// This is required because some of the third party plugins rely on this
// and cause errors since there is no process variable in {N}.
const intro = `
global.process = global.process || {}
global.process.env = global.process.env || {}
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
    intro,
    external(id) {
      return id.startsWith('tns-core-modules') || id.startsWith('weex')
    },
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
      intro: opts.intro,
      file: opts.dest,
      format: opts.format || 'cjs',
      banner: opts.banner,
      name: opts.moduleName
    },
    // https://github.com/rollup/rollup/issues/2271#issuecomment-455129819
    onwarn(warning) {
      if (
        warning.code === 'CIRCULAR_DEPENDENCY' && [
          'vue',
          'element-registry',
          'patch' // v-template
        ].some(d => warning.importer.includes(d))
      ) {
        return
      } else if (
        warning.message.includes('weex')
      ) {
        return
      }

      console.warn(warning.message)
    },
    treeshake: {
      pureExternalModules: id => id.startsWith('weex')
    },
    plugins: [
      replace({
        __WEEX__: false,
        __VERSION__: VueVersion,
        // 'process.env.NODE_ENV': "'development'",
        'let _isServer': 'let _isServer = false',
        // Vue 2.6 new slot syntax must be enabled via env.
        'process.env.NEW_SLOT_SYNTAX': `true`,
        'process.env.VBIND_PROP_SHORTHAND': `false`,
        'process.env.VUE_VERSION': `process.env.VUE_VERSION || '${VueVersion}'`,
        'process.env.NS_VUE_VERSION': `process.env.NS_VUE_VERSION || '${NSVueVersion}'`
      }),
      flow(),
      buble(),
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
