export default {
  functional: true,
  render(h, { children }) {
    if (require('tns-core-modules/platform').isAndroid) {
      return children
    }
  }
}
