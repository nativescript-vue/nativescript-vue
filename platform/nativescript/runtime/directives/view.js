export default {
  inserted(el, { arg }) {
    const parent = el.parentNode

    if (parent) {
      parent.setAttribute(arg, el.nativeView)
    }
  }
}
