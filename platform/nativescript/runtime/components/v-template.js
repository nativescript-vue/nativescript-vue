import { cloneVNode } from 'core/vdom/vnode'
import { patch } from '../patch'

export default {
  name: 'v-template',

  props: {
    name: {
      type: String,
      default: 'default'
    },

    if: {
      type: String
    }
  },

  created() {
    if (!this.$slots.default) {
      return
    }

    this.$parent.$templates = this.$parent.$templates || new TemplateBag()
    this.$parent.$templates.registerTemplate(
      this.$props.name,
      this.$props.if,
      this.$slots.default[0]
    )
  },

  render(h) {}
}

export class TemplateBag {
  constructor() {
    this._templateMap = new Map()
  }

  registerTemplate(name, condition, vnode) {
    this._templateMap.set(name, {
      condition,
      conditionFn: this.getConditionFn(condition),
      vnode,
      keyedTemplate: new VueKeyedTemplate(name, vnode)
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
    return new Function('item', `return !!(${condition})`)
  }

  getKeyedTemplate(name) {
    const { keyedTemplate } = this._templateMap.get(name)
    return keyedTemplate
  }
}

export class VueKeyedTemplate /* implements KeyedTemplate */ {
  constructor(key, vnode) {
    this._key = key
    this._vnode = vnode
  }

  get key() {
    return this._key
  }

  createView() {
    return patch(null, cloneVNode(this._vnode)).nativeView
  }
}
