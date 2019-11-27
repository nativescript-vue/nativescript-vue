export default {
  functional: true,
  render(h, { children }) {
    if (require('@nativescript/core/platform').isAndroid) {
      return children
    }
  }
}
