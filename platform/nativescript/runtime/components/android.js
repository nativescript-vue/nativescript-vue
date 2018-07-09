const { isAndroid } = require('tns-core-modules/platform')

export default {
  functional: true,
  render(h, { children }) {
    if (isAndroid) {
      return children
    }
  }
}
