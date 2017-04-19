const Button = require('tns-core-modules/ui/label').Label

exports.pageLoaded = function(e) {
    console.log('loaded..')
    var layout = e.object.getViewById("main");
    var button = new Button()
    button.text = "Hi"
    layout.addChild(button)
}