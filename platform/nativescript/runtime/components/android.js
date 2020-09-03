export default {
  functional: true,
  render(h, { children }) {
    if (global.isAndroid) {
      return children
    }
  }
}
