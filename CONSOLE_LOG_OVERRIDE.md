# Colorful `console.log` with `util-inspect`

In previous versions of NativeScript-Vue `console.log` was overriden to bring better logging and colors to your console.
It was [removed in this commit](https://github.com/nativescript-vue/nativescript-vue/commit/226e108b92273b7a2f3e133e71f9f4fe3f5935b0) to improve perfomance and reduce the size of our bundle.

If you however need this in your app, you can bring it back at an application level.

Keep in mind that this override should not be present in production.

```bash
$ npm install --save-dev util-inspect
```

In your main app file:

```js
import Vue from 'nativescript-vue'

if (TNS_ENV !== 'production') {
    const inspect = require('util-inspect');
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
    })(console.log, inspect, Vue);
}
```

With this change, everything should work the way it worked before we removed our override.
