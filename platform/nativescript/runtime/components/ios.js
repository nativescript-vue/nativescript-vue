const { isIOS } = require('tns-core-modules/platform')

export default {
  name: 'ios',
  functional: true,
  render(h, { children }) {
    if (isIOS) {
      return children[0]
    }
  }
}
