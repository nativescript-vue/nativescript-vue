export default {
  functional: true,
  render(h, { children }) {
    if (require('tns-core-modules/platform').isIOS) {
      return children
    }
  }
}
