import { patch } from '../patch'
import { flushCallbacks } from 'core/util/next-tick'

export const VUE_VIEW = '__vueVNodeRef__'

let tid = 0
export default {
  props: {
    name: {
      type: String
    },
    if: {
      type: String
    }
  },

  mounted() {
    if (!this.$scopedSlots.default) {
      return
    }

    this.$templates = this.$el.parentNode.$templates = this.$parent.$templates =
      this.$parent.$templates || new TemplateBag()
    this.$templates.registerTemplate(
      this.$props.name || (this.$props.if ? `v-template-${tid++}` : 'default'),
      this.$props.if,
      this.$scopedSlots.default
    )
  },

  render(h) {}
}

export class TemplateBag {
  constructor() {
    this._templateMap = new Map()
  }

  registerTemplate(name, condition, scopedFn) {
    this._templateMap.set(name, {
      scopedFn,
      conditionFn: this.getConditionFn(condition),
      keyedTemplate: new VueKeyedTemplate(name, scopedFn)
    })
  }

  get selectorFn() {
    let self = this
    return function templateSelectorFn(item) {
      const iterator = self._templateMap.entries()
      let curr
      while ((curr = iterator.next().value)) {
        const [name, { conditionFn }] = curr
        try {
          if (conditionFn(item)) {
            return name
          }
        } catch (err) {}
      }
      return 'default'
    }
  }

  getConditionFn(condition) {
    return new Function('ctx', `with(ctx) { return !!(${condition}) }`)
  }

  getKeyedTemplate(name) {
    return this._templateMap.get(name).keyedTemplate
  }

  patchTemplate(name, context, oldVnode) {
    let vnode = this._templateMap.get(name).scopedFn(context)
    // in 2.6 scopedFn returns an array!
    if (Array.isArray(vnode)) {
      vnode = vnode[0]
    }

    const nativeView = patch(oldVnode, vnode).nativeView
    nativeView[VUE_VIEW] = vnode

    // force flush Vue callbacks so all changes are applied immediately
    // rather than on next tick
    flushCallbacks()

    return nativeView
  }

  getAvailable() {
    return Array.from(this._templateMap.keys())
  }

  getKeyedTemplates() {
    return Array.from(this._templateMap.values()).map(
      ({ keyedTemplate }) => keyedTemplate
    )
  }
}

export class VueKeyedTemplate /* implements KeyedTemplate */ {
  constructor(key, scopedFn) {
    this._key = key
    this._scopedFn = scopedFn
  }

  get key() {
    return this._key
  }

  createView() {
    // we are returning null because we don't have the data here
    // the view will be created in the `patchTemplate` method above.
    // see https://github.com/nativescript-vue/nativescript-vue/issues/229#issuecomment-390330474
    return null
  }
}
