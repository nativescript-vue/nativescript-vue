import { patch } from '../patch'

export const VUE_VIEW = '__vueVNodeRef__'

let tid = 0
export default {
  name: 'v-template',

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
        if (conditionFn(item)) {
          return name
        }
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
    const vnode = this._templateMap.get(name).scopedFn(context)
    const nativeView = patch(oldVnode, vnode).nativeView
    nativeView[VUE_VIEW] = vnode

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
    const vnode = this._scopedFn(deepProxy({}))
    const nativeView = patch(null, vnode).nativeView
    nativeView[VUE_VIEW] = vnode
    return nativeView
  }
}

function deepProxy(object, depth = 0) {
  return new Proxy(object, {
    get() {
      if (depth > 10) {
        throw new Error('deepProxy over 10 deep.')
      }
      return deepProxy({}, depth + 1)
    }
  })
}
