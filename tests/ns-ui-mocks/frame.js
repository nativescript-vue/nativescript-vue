const NSComponent = require('./base')

const topmostFrame = () => {
  this.navigatedTo = 'nowhere'
  this.backCalls = 0
  this.navigate = (makeComp) => {
    this.navigatedTo = makeComp()
  }
  this.goBack = () => {
    this.backCalls++
  }
  return this
}

class Frame extends NSComponent {
}

Frame.topmost = () => topmostFrame()

module.exports = {
  Frame
}
