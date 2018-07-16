//import { before } from '../util/index'
//import { Page } from 'tns-core-modules/ui/page'
import { android } from 'tns-core-modules/application'
import { isPlainObject } from 'shared/util'

const properties = ['stack', 'index', 'current']

class NativeScriptHistory {
  constructor(router, history, VueInstance) {
    this.router = router
    this.history = history
    this.isGoingBack = false
    this._Vue = VueInstance

    android.on("activityBackPressed", function (args) {
     args.cancel = true

     router.back()
    });

    properties.forEach((name) => {
      Object.defineProperty(NativeScriptHistory.prototype, name, {
        get: () => {
          return this.history[name]
        },
        set: (value) => {
          this.history[name] = value
        }
      })
    })
  }

  static _buildEntry(args) {
    let entry;

    for (let i = 1; i < args.length; i++) {
      if (isPlainObject(args[i])) {
        entry = args[i];
        delete args[i];
      }
    }

    return { args, entry };
  }

  push(...args) {
    this.isGoingBack = false;

    ({ args, entry: this.currentEntry } = NativeScriptHistory._buildEntry(args))

    this.history.push.call(this.history, ...args)
  }

  replace(...args) {
    this.isGoingBack = false;

    ({ args, entry: this.currentEntry } = NativeScriptHistory._buildEntry(args))

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

export function patchDefaultRouter(router, Vue) {
  if (router.__patched_for_routing__) {
    return
  }

  router.__patched_for_routing__ = true

  router.history = new NativeScriptHistory(router, router.history, Vue)

  router.push = function push (...args) {
    this.history.push(...args);
  };

  router.replace = function push (...args) {
    this.history.push(...args);
  };

  router.go = function go (n, entry) {
    this.history.go(n, entry);
  };

  router.back = function back (entry) {
    this.go(-1, entry);
  };

  router.forward = function forward (entry) {
    this.go(1, entry);
  };

}

//export function patchRouter(router, Vue) {
//  if (router.__patched_for_page_routing__) {
//    return
//  }
//  router.__patched_for_page_routing__ = true
//
//  // The problem: When using router.replace() to set the initial route
//  // the history index stays -1, which then causes an issue when visiting a route,
//  // going back, and then trying to visit again (the active route is not changed on nav back)
//  // This fixes it, since it allows the router.go logic to run
//  router.history.index = 0
//
//  // initial navigation states
//  router.isBackNavigation = false
//  router.shouldNavigate = true
//  router.pageStack = []
//  router.pageTransition = null
//
//  router.setPageTransition = (transition, duration, curve) => {
//    if (typeof transition === 'string') {
//      return (router.pageTransition = {
//        name: transition,
//        duration,
//        curve
//      })
//    }
//
//    router.pageTransition = transition
//  }
//
//  router._beginBackNavigation = (shouldNavigate = true) => {
//    if (router.isBackNavigation) {
//      throw new Error(
//        'router._beginBackNavigation was called while already navigating back.'
//      )
//    }
//
//    router.isBackNavigation = true
//    router.shouldNavigate = shouldNavigate
//  }
//
//  router._finishBackNavigation = () => {
//    if (!router.isBackNavigation) {
//      throw new Error(
//        'router._finishBackNavigation was called while there was no back navigation.'
//      )
//    }
//
//    router.isBackNavigation = false
//  }
//
//  router.go = before(router.go, router, n => {
//    if (n === -1 && !router.isBackNavigation) {
//      router._beginBackNavigation()
//    }
//  })
//
//  router.afterEach(() => {
//    if (router.isBackNavigation) {
//      if (router.shouldNavigate) {
//        Vue.navigateBack()
//      }
//      router.pageStack.pop()
//      const page = router.pageStack[router.pageStack.length - 1]
//
//      const callback = ({ isBackNavigation }) => {
//        if (isBackNavigation) {
//          router._finishBackNavigation()
//        }
//        page.off(Page.navigatedToEvent, callback)
//      }
//
//      page.on(Page.navigatedToEvent, callback)
//
//      return
//    }
//
//    const component = router.getMatchedComponents()[0]
//
//    router.app
//      .$navigateTo(component, {
//        context: { router },
//        transition: router.pageTransition
//        // Todo: add transitionAndroid and transitionIOS
//      })
//      .then(page => {
//        router.pageStack.push(page)
//
//        page.on(Page.navigatedFromEvent, ({ isBackNavigation }) => {
//          if (isBackNavigation && !router.isBackNavigation) {
//            router._beginBackNavigation(false)
//            router.back()
//          }
//        })
//      })
//  })
//}

export default {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        if (!this.$options.router) {
          // If there is no router, we don't care
          return
        }

        const router = this.$options.router
        //const isPageRouting = router.options.pageRouting
        //const self = this

        //if (isPageRouting) {
        //  patchRouter(router, Vue)
        //} else {
        patchDefaultRouter(router, Vue)

        //  return
        //}
        //
        //// Overwrite the default $start function
        //this.$start = () => {
        //  this.__is_root__ = true
        //  this.__started__ = true // skips the default start procedure
        //  this.$options.render = () => {} // removes warning for no render / template
        //
        //  // Mount the root component
        //  const placeholder = Vue.$document.createComment('placeholder')
        //  self.$mount(placeholder)
        //
        //  const initial = router.getMatchedComponents()[0]
        //
        //  this.$navigateTo(
        //    initial,
        //    {
        //      context: { router },
        //      clearHistory: true
        //    },
        //    page => {
        //      router.pageStack.push(page)
        //    }
        //  )
        //}
      }
    })
  }
}
