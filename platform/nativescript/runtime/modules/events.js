import { updateListeners } from 'core/vdom/helpers/update-listeners'

let target

function add(event, handler, once, capture) {
  if (capture) {
    console.log('bubble phase not supported')
    return
  }
  if (once) {
    const oldHandler = handler
    handler = (...args) => {
      const res = oldHandler.call(null, ...args)
      if (res !== null) {
        remove(event, null, null, target)
      }
    }
  }
  target.addEventListener(event, handler)
}

function remove(event, handler, capture, _target = target) {
  _target.removeEventListener(event)
}

function updateDOMListeners(oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  const on = vnode.data.on || {}
  const oldOn = oldVnode.data.on || {}
  target = vnode.elm
  updateListeners(on, oldOn, add, remove, vnode.context)
  target = undefined
}

export default {
  create: updateDOMListeners,
  update: updateDOMListeners
}
