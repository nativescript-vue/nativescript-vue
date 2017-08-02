const fs = require("fs");
const browserify = require('browserify');
const vueify = require('vueify');

if (fs.existsSync('./app/dist/bundle.js')) {
    fs.unlink('./app/dist/bundle.js');
}
if (fs.existsSync('./app/dist/bundle.css')) {
    fs.unlink('./app/dist/bundle.css');
}
browserify('./app/src/app.js', {
    ignoreMissing: true
})
.ignore('http')
.transform(vueify)
.plugin('vueify/plugins/extract-css', {
    out: './app/dist/bundle.css'
})
.bundle(function (err, buf) {
    if (err) {
        console.error(err);
    }


    fs.writeFileSync('./app/dist/bundle.js',
        buf.toString()
            .replace("require('vue')", "require('nativescript-vue')")
            .replace("require(\"vue\")", "require('nativescript-vue')")
    );

});
    
module.exports = require("nativescript-dev-android-snapshot/hooks/before-prepare-hook.js");
