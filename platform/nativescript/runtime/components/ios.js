const { isIOS } = require('tns-core-modules/platform')

export default {
  functional: true,
  render(h, { children }) {
    if (isIOS) {
      return children
    }
  }
}
