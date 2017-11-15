function show(el, show) {
  el.setAttribute('visibility', show ? 'visible' : 'collapsed')
}

export default {
  inserted(el, { value }) {
    show(el, value)
  },
  update(el, { value }) {
    show(el, value)
  }
}
