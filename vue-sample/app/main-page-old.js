const Button = require('tns-core-modules/ui/button').Button

exports.pageLoaded = function(e) {
    console.log('loaded..')
    console.dump(e.object)
    var layout = e.object.getViewById("main");
    var button = new Button()
    button.text = "Hi"
    layout.addChild(button)
}