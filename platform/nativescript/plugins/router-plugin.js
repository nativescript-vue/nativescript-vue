import { android } from 'tns-core-modules/application'
import { isPlainObject } from 'shared/util'
import { AbstractHistory } from 'vue-router'

export { default as Router } from 'vue-router'

const operations = ['push', 'replace', 'go']

export class History extends AbstractHistory {
  constructor(router, base) {
    super(router, base)
    this.router = router
    this.operation = 'push'
    this.isGoingBack = false

    if (android) {
      android.on('activityBackPressed', args => {
        if (this.index > 0) {
          args.cancel = true

          router.back()
        }
      })
    }

    operations.forEach(name => {
      History.prototype[name] = (...args) => {
        if (args.length > 1) {
          ;({ args, entry: this.currentEntry } = this._extractEntry(args))
        } else if (name === 'go') {
          this.isGoingBack = args[0] < 0
        }

        this.operation = name
        super[name](...args)
      }
    })
  }

  _extractEntry(args) {
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
}
