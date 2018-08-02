import { android } from 'tns-core-modules/application'
import { isPlainObject } from 'shared/util'
import { AbstractHistory } from 'vue-router'

export { default as Router } from 'vue-router'

export class History extends AbstractHistory {
  constructor(router, base) {
    super(router, base)
    this.router = router
    this.isGoingBack = false

    if (android) {
      android.on('activityBackPressed', (args) => {
        if (this.index > 0) {
          args.cancel = true

          router.back()
        }
      })
    }
  }

  _buildEntry(args) {
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

  push(...args) {
    ;({ args, entry: this.currentEntry } = this._buildEntry(args))

    this.isGoingBack = false
    super.push(...args)
  }

  replace(...args) {
    ;({ args, entry: this.currentEntry } = this._buildEntry(args))

    this.isGoingBack = false
    super.replace(...args)
  }

  go(n, entry) {
    this.isGoingBack = n < 0

    this.currentEntry = entry

    super.go(n)
  }

  updateRoute(route) {
    const prev = this.current
    this.current = route
    this.cb && this.cb(route)
    this.router.afterHooks.forEach(hook => {
      hook && hook(route, prev)
    })
  }
}
