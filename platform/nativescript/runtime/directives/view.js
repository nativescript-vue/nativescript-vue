export default {
  inserted(el, binding, vnode, oldNode) {
    const parent = el.parentNode.nativeView
    const arg = binding.rawName.split(":")[1];
    const modifiers = binding.modifiers;
    if (parent) {
      if (modifiers.array) {
        parent[arg] = (parent[arg] || []).push(el.nativeView)
      } else {
        parent[arg] = el.nativeView
      }
    }
  }
}
