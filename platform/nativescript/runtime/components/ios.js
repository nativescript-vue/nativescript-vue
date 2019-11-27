export default {
  functional: true,
  render(h, { children }) {
    if (require('@nativescript/core/platform').isIOS) {
      return children
    }
  }
}
