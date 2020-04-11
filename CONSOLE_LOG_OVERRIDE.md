In previous versions of `nativescript-vue` the `console.log` was overriden to bring colors to your console.
It was remove to improve perfomances and reduce the size of the plugin.
You can however bring it back at an application level.
Keep in mind that this override should not be present in production. It could make your app slower.
```
npm install --save-dev util-inspect
```

Then in your main app file
```js
import Vue from 'nativescript-vue'

if (TNS_ENV !== 'production') {
    const inspect require('util-inspect');
    const newLineRegExp = /\\n/g
    console.log = (function(log, inspect, Vue) {
    return function(...args) {
        return log.call(
        this,
        ...Array.prototype.map.call(args, function(arg) {
            return inspect(arg, {
            depth: 2,
            colors: Vue.config.debug,
            showHidden: true
            }).replace(newLineRegExp, '\n')
        })
        )
    }
    })(console.log, inspect, Vue)
}
```