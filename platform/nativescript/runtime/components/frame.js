import { setFrame, getFrame, deleteFrame } from '../../util/frame'
import { isHMRChecking, resetHMRChecking } from '../../util/hmr'
import { isAndroid, isIOS } from 'tns-core-modules/platform'
import { ios as iosUtils } from 'tns-core-modules/utils/utils'

let idCounter = 1

export default {
  props: {
    id: {
      default: 'default'
    },
    transition: {
      type: [String, Object],
      required: false,
      default: null
    },
    'ios:transition': {
      type: [String, Object],
      required: false,
      default: null
    },
    'android:transition': {
      type: [String, Object],
      required: false,
      default: null
    },
    // injected by the template compiler
    hasRouterView: {
      default: false
    }
  },
  data() {
    return {
      properties: {}
    }
  },
  created() {
    let properties = {}

    if (getFrame(this.$props.id)) {
      properties.id = this.$props.id + idCounter++
    }

    this.properties = Object.assign({}, this.$attrs, this.$props, properties)

    setFrame(this.properties.id, this)
  },
  destroyed() {
    deleteFrame(this.properties.id)
  },
  render(h) {
    return h(
      'NativeFrame',
      {
        attrs: this.properties,
        on: this.$listeners
      },
      this.$slots.default
    )
  },
  methods: {
    _getFrame() {
      return this.$el.nativeView
    },

    _ensureTransitionObject(transition) {
      if (typeof transition === 'string') {
        return { name: transition }
      }
      return transition
    },

    _composeTransition(entry) {
      const platformEntryProp = `transition${isAndroid ? 'Android' : 'iOS'}`
      const entryProp = entry[platformEntryProp]
        ? platformEntryProp
        : 'transition'
      const platformProp = `${isAndroid ? 'android' : 'ios'}:transition`
      const prop = this[platformProp] ? platformProp : 'transition'

      if (entry[entryProp]) {
        entry[entryProp] = this._ensureTransitionObject(entry[entryProp])
      } else if (this[prop]) {
        entry[entryProp] = this._ensureTransitionObject(this[prop])
      }

      return entry
    },

    notifyPageMounted(pageVm) {
      let options = {
        create: () => pageVm.$el.nativeView
      }

      this.$nextTick(() => {
        if (isHMRChecking()) {
          this.replace(options)
        } else {
          this.navigate(options)
        }
      })
    },

    replace(entry) {
      const frame = this._getFrame()
      const page = entry.create()
      entry.create = () => page

      const backstackEntry = {
        entry: entry,
        resolvedPage: page,
        navDepth: undefined,
        fragmentTag: undefined
      }
      // TODO: this should be in a specific NS Frame method
      if (isIOS) {
        let viewController = backstackEntry.resolvedPage.ios
        if (!viewController) {
          throw new Error(
            'Required page does not have a viewController created.'
          )
        }
        viewController['_transition'] = { name: 'non-animated' }
        viewController['_delegate'] = null
        frame._ios.controller.delegate = null
        viewController['_entry'] = backstackEntry

        if (iosUtils.MajorVersion > 10) {
          // Reset back button title before pushing view controller to prevent
          // displaying default 'back' title (when NavigationButton custom title is set).
          let barButtonItem = UIBarButtonItem.alloc().initWithTitleStyleTargetAction(
            '',
            UIBarButtonItemStyle.Plain,
            null,
            null
          )
          viewController.navigationItem.backBarButtonItem = barButtonItem
        }

        let newControllers = NSMutableArray.alloc().initWithArray(
          frame._ios.controller.viewControllers
        )
        if (newControllers.count === 0) {
          throw new Error('Wrong controllers count.')
        }

        // the code below fixes a phantom animation that appears on the Back button in this case
        viewController.navigationItem.hidesBackButton =
          frame.backStack.length === 0

        // swap the top entry with the new one
        const skippedNavController = newControllers.lastObject
        skippedNavController.isBackstackSkipped = true
        newControllers.removeLastObject()
        newControllers.addObject(viewController)

        // replace the controllers instead of pushing directly
        frame._ios.controller.setViewControllersAnimated(newControllers, false)
      } else {
        const frameId = frame._android.frameId
        frame._isBack = false
        backstackEntry.frameId = frameId

        const manager = frame._getFragmentManager()
        const currentEntry = frame._currentEntry

        const newFragmentTag = `fragment${frameId}[-1]`
        const newFragment = frame.createFragment(backstackEntry, newFragmentTag)
        const animated = false
        const navigationTransition = null

        const transaction = manager.beginTransaction()
        _setAndroidFragmentTransitions(
          animated,
          navigationTransition,
          currentEntry,
          backstackEntry,
          transaction,
          frameId
        )
        transaction.remove(currentEntry.fragment)
        transaction.replace(frame.containerViewId, newFragment, newFragmentTag)
        transaction.commitAllowingStateLoss()
      }
      resetHMRChecking()
    },

    navigate(entry, back = false) {
      const frame = this._getFrame()

      if (back) {
        return frame.goBack(entry)
      }

      // resolve the page from the entry and attach a navigatedTo listener
      // to fire the frame events
      const page = entry.create()
      page.once('navigatedTo', () => {
        this.$emit('navigated', entry)
      })

      const handler = args => {
        if (args.isBackNavigation) {
          page.off('navigatedFrom', handler)

          this.$emit('navigatedBack', entry)
        }
      }
      page.on('navigatedFrom', handler)

      entry.create = () => page

      this._composeTransition(entry)
      frame.navigate(entry)
    },

    back(backstackEntry = null) {
      this.navigate(backstackEntry, true)
    }
  }
}
