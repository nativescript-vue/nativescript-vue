import { android } from 'tns-core-modules/application'
import { isPlainObject } from 'shared/util'

const properties = ['stack', 'index', 'current']

class NativeScriptHistory {
  constructor(router, history) {
    this.router = router
    this.history = history
    this.isGoingBack = false

    if (android) {
      android.on('activityBackPressed', function(args) {
        if (history.index > 0) {
          args.cancel = true

          router.back()
        }
      })
    }

    properties.forEach(name => {
      Object.defineProperty(NativeScriptHistory.prototype, name, {
        get: () => {
          return this.history[name]
        },
        set: value => {
          this.history[name] = value
        }
      })
    })
  }

  _buildEntry(args) {
    let entry

    for (let i = 1; i < args.length; i++) {
      if (isPlainObject(args[i])) {
        entry = args[i]
        delete args[i]
      }
    }

    return { args, entry }
  }

  push(...args) {
    ;({ args, entry: this.currentEntry } = this._buildEntry(args))

    this.isGoingBack = false
    this.history.push.call(this.history, ...args)
  }

  replace(...args) {
    ;({ args, entry: this.currentEntry } = this._buildEntry(args))

    this.isGoingBack = false
    this.history.replace.call(this.history, ...args)
  }

  go(n, entry) {
    this.isGoingBack = n < 0

    this.currentEntry = entry

    this.history.go.call(this.history, n)
  }

  getCurrentLocation() {
    return this.history.getCurrentLocation.call(this.history)
  }

  onReady(...args) {
    this.history.onReady.call(this.history, ...args)
  }

  onError(...args) {
    this.history.onError.call(this.history, ...args)
  }

  listen(...args) {
    this.history.listen.call(this.history, ...args)
  }

  transitionTo(...args) {
    this.history.transitionTo.call(this.history, ...args)
  }

  confirmTransition(...args) {
    this.history.confirmTransition.call(this.history, ...args)
  }

  updateRoute(...args) {
    this.history.updateRoute.call(this.history, ...args)
  }

  setupListeners(...args) {
    this.history.setupListeners.call(this.history, ...args)
  }
}

export function patchDefaultRouter(router) {
  if (router.__patched_for_routing__) {
    return
  }

  router.__patched_for_routing__ = true

  router.history = new NativeScriptHistory(router, router.history)

  router.push = function push(...args) {
    this.history.push(...args)
  }

  router.replace = function push(...args) {
    this.history.push(...args)
  }

  router.go = function go(n, entry) {
    this.history.go(n, entry)
  }

  router.back = function back(entry) {
    this.go(-1, entry)
  }

  router.forward = function forward(entry) {
    this.go(1, entry)
  }
}

export default {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        if (!this.$options.router) {
          // If there is no router, we don't care
          return
        }

        patchDefaultRouter(this.$options.router)
      }
    })
  }
}
