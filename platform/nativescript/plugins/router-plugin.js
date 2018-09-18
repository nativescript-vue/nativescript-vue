import Vue from 'core/index'

import { android } from 'tns-core-modules/application'
import { isPlainObject } from 'shared/util'

const operations = ['push', 'replace', 'go']

function extractEntry(args) {
  let entry

  for (let i = 1; i < args.length; i++) {
    if (isPlainObject(args[i])) {
      entry = args[i]
      delete args[i]
    }
  }

  args = args.filter(n => n)

  return { args, entry }
}

let mode

export default (mode = {
  name: 'NativeScriptHistory',

  factory(ancestor) {
    return class NativeScriptHistory extends ancestor {
      constructor(router, base) {
        super(router, base)
        this.router = router

        this.store = new Vue({
          data() {
            return {
              operation: 'push',
              isGoingBack: false,
              entry: {}
            }
          }
        })

        if (android) {
          android.on('activityBackPressed', args => {
            if (!args.cancel && this.index > 0) {
              args.cancel = true

              router.back()
            }
          })
        }

        operations.forEach(name => {
          this[name] = (...args) => {
            if (args.length > 1) {
              ;({ args, entry: this.store.entry } = extractEntry(args))
            } else if (name === 'go') {
              this.store.isGoingBack = args[0] < 0
            }

            this.store.operation = name
            super[name](...args)
          }
        })
      }
    }
  }
})
