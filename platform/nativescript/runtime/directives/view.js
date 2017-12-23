export default {
  inserted(el, { arg, modifiers }) {
    const parent = el.parentNode.nativeView

    if (parent) {
      if (modifiers.array) {
        parent[arg] = (parent[arg] || []).push(el.nativeView)
      } else {
        parent[arg] = el.nativeView
      }
    }
  }
}
