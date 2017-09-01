import { extend } from 'shared/util'

function updateAttrs(oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  let key, cur, old
  const elm = vnode.elm
  const oldAttrs = oldVnode.data.attrs || {}
  let attrs = vnode.data.attrs || {}
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs)
  }

  for (key in attrs) {
    cur = attrs[key]
    old = oldAttrs[key]
    if (old !== cur) {
      elm.setAttribute(key, cur)
    }
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      elm.setAttribute(key)
    }
  }
}

export default {
  create: updateAttrs,
  update: updateAttrs
}
