import { updateListeners } from 'core/vdom/helpers/update-listeners'

let target

function add(event, handler, once, capture) {
  if (capture) {
    console.log('bubble phase not supported')
    return
  }
  if (once) {
    const oldHandler = handler
    const _target = target // save current target element in closure
    handler = function(ev) {
      const res =
        arguments.length === 1
          ? oldHandler(ev)
          : oldHandler.apply(null, arguments)
      if (res !== null) {
        remove(event, null, null, _target)
      }
    }
  }
  target.addEventListener(event, handler)
}

function remove(event, handler, capture, _target) {
  ;(_target || target).removeEventListener(event)
}

function updateDOMListeners(oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  const on = vnode.data.on || {}
  const oldOn = oldVnode.data.on || {}
  target = vnode.elm
  updateListeners(on, oldOn, add, remove, vnode.context)
}

export default {
  create: updateDOMListeners,
  update: updateDOMListeners
}
