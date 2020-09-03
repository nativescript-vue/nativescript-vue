export default {
  functional: true,
  render(h, { children }) {
    if (global.isIOS) {
      return children
    }
  }
}
