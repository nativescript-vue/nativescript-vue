class BaseComponent {
  constructor() {
    this._eventListener = []
  }
  addChild() {
  }
  removeChild() {
  }
  _removeView() {

  }
  addEventListener(name, func, node) {
    this._eventListener[name] = func
  }
  removeEventListener(name, func, node) {
    this._eventListener[name] = null
  }
}

module.exports = BaseComponent
