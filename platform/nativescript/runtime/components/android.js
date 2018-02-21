const { isAndroid } = require('tns-core-modules/platform')

export default {
  name: 'android',
  functional: true,
  render(h, { children }) {
    if (isAndroid) {
      return children[0]
    }
  }
}
