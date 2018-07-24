const Vue = require('./nativescript-vue')

const SCENARIO = 'login'

Vue.config.silent = false
Vue.config.debug = true

const FrameRouter = function install(Vue, options) {
  const navigatorLog = args => {
    if (options.debug) {
      console.log(args)
    }
  }

  const navigator = new Vue({
    data: {
      routes: options.routes,
      path: '/', // current path
      stack: ['/'],
      data: null,

      pending: false
    },

    methods: {
      _confirmPathChange() {
        navigatorLog(` *** NAVIGATOR::_confirmPathChange() ***`)

        if (!this.pending) return

        this.path = this.pending.path
        this.stack = this.pending.stack
        this.data = this.pending.data

        this.pending = false
        navigatorLog(
          ` *** NAVIGATOR::_confirmPathChange::canGoBack = ${this.frameVM.nativeView.canGoBack()} ***`
        )
      },
      _setPending(path, clear = false, data, replaceStack) {
        navigatorLog(
          ` *** NAVIGATOR::_setPending(path = ${path}, clear = ${clear}, data = ${data}, replaceStack = ${
            replaceStack ? replaceStack.join() : undefined
          }) ***`
        )

        let stack = this.stack.slice()
        if (clear) {
          stack = [path]
        } else {
          stack.push(path)
        }

        this.pending = {
          path,
          stack: replaceStack ? replaceStack : stack,
          data
        }
      },
      _getMatched(path = this.path) {
        navigatorLog(` *** NAVIGATOR::_getMatched(path = ${path}) ***`)

        return this.routes.find(route => route.path === path)
      },

      push(path, data) {
        navigatorLog(` *** NAVIGATOR::push(path = ${path}, data = ${data}) ***`)

        this._setPending(path, false, data)
        const route = this._getMatched(path)
        this.$navigateTo(route.component, {
          frame: '__navigator_frame__',
          path
        })
      },
      replace(path, data) {
        navigatorLog(
          ` *** NAVIGATOR::replace(path = ${path}, data = ${data}) ***`
        )

        this._setPending(path, true, data)
        const route = this._getMatched(path)
        this.$navigateTo(route.component, {
          frame: '__navigator_frame__',
          clearHistory: true,
          path
        })
      },
      back(notify = false) {
        navigatorLog(` *** NAVIGATOR::back(notify = ${notify}) ***`)

        if (notify) {
          if (!this.pending) {
            this.stack.pop()
            this.path = this.stack[this.stack.length - 1]

            if (!this.path) {
              this.path = '/'
              this.stack = ['/']
            }
          } else {
            this._confirmPathChange()
          }
        } else {
          const replaceStack = this.stack.slice()
          replaceStack.pop()

          this._setPending(
            this.stack[this.stack.length - 1] || '/',
            false,
            null,
            replaceStack
          )
          this.$navigateBack({
            frame: '__navigator_frame__'
          })
        }
      },
      /**
       * Tries to find the most recent entry matching the provided path in the backstack
       * and navigates back to it, if the path is not found a navigation will occur with
       * clearing the backStack
       * @param path
       */
      backTo(path) {
        navigatorLog(` *** NAVIGATOR::backTo(path = ${path}) ***`)

        const entry = navigator.frameVM.nativeView.backStack.find(entry => {
          return entry.entry.path === path
        })
        entry &&
          navigatorLog(` *** NAVIGATOR::backTo::FOUND_BACKSTACK_ENTRY ***`)

        if (entry) {
          const index = this.stack
            .slice()
            .reverse()
            .findIndex(p => p === path)
          const actualIndex = this.stack.length - index
          const replaceStack = this.stack.slice()
          replaceStack.splice(actualIndex)
          this._setPending(path, false, null, replaceStack)
          this.$navigateBack({
            frame: '__navigator_frame__',
            entry: entry.entry
          })
        } else {
          this.replace(path)
        }
      }
    }
  })

  Vue.mixin({
    beforeCreate() {
      this._navigator = navigator
    }
  })

  Object.defineProperty(Vue.prototype, '$navigator', {
    get() {
      return this._navigator
    }
  })

  Vue.component('FrameRouter', {
    created() {
      this.rendered = false
      navigator.frameVM = this
    },
    render(h) {
      if (!this.rendered) {
        this.rendered = h(navigator._getMatched().component)
      }

      return h(
        'Frame',
        {
          attrs: Object.assign(
            {
              id: '__navigator_frame__'
            },
            this.$attrs,
            this.$props
          ),
          on: Object.assign(
            {
              back() {
                navigator.back(true)
              },
              navigated() {
                navigator._confirmPathChange()
              }
            },
            this.$listeners
          )
        },
        [this.rendered]
      )
    }
  })
}

const HomePage = {
  template: `
    <Page>
      <ActionBar title="Navigator Demo"/>
      <GridLayout>
        <!--<Button @tap="$navigator.push('/details')" text="Go to details" />-->
        <ListView for="item in ['one', 'two', 'three']" @itemTap="$navigator.push('/details', { selected: $event.index })">
            <v-template>
                <Label :text="item" padding="20"/>
            </v-template>
        </ListView>
      </GridLayout>
    </Page>
  `
}

const DetailsPage = {
  template: `
    <Page>
      <ActionBar title="Details Page"/>
      <StackLayout>
        <Label text="DetailsPage" />
        <Label :text="JSON.stringify($navigator.data, null, 2)" textWrap="true" />
        <Button @tap="$navigator.push('/details')" text="Go to details" />
        <Button @tap="$navigator.replace('/details')" text="Replace to details" />

        <Button @tap="$navigator.back()" text="Go back" />
        <Button @tap="$navigator.backTo('/')" text="Go back to Home" />
      </StackLayout>
    </Page>
  `
}

// LOGIN SCENARIO

if (SCENARIO === 'login') {
  const applicationSettings = require('tns-core-modules/application-settings')
  const LoginSCN__LoadingPage = {
    data() {
      return {
        isLoggedIn: applicationSettings.getBoolean('isLoggedIn', false)
      }
    },
    template: `
    <Page @loaded="$navigator.replace(isLoggedIn ? '/home' : '/login')" actionBarHidden="true" />
  `
  }
  const LoginSCN__HomePage = {
    template: `
    <Page>
        <StackLayout>
            <Button text="Do something (nav to home again...)" @tap="$navigator.push('/home')"/>
            <Button text="Log out" @tap="logout"/>
        </StackLayout>
    </Page>
  `,
    methods: {
      logout() {
        applicationSettings.setBoolean('isLoggedIn', false)
        this.$navigator.replace('/login')
      }
    }
  }
  const LoginSCN__LoginPage = {
    template: `
    <Page>
        <StackLayout>
            <Button text="Login" @tap="login"/>
        </StackLayout>
    </Page>
  `,
    methods: {
      login() {
        applicationSettings.setBoolean('isLoggedIn', true)
        this.$navigator.replace('/home')
      }
    }
  }

  Vue.use(FrameRouter, {
    routes: [
      { path: '/', component: LoginSCN__LoadingPage },
      { path: '/home', component: LoginSCN__HomePage },
      { path: '/login', component: LoginSCN__LoginPage }
    ],
    debug: false
  })

  new Vue({
    template: `<FrameRouter :transition="$navigator.path === '/' ? { name: 'fade', duration: 1 } : 'slide'"/>`
  }).$start()
} else {
  Vue.use(FrameRouter, {
    routes: [
      { path: '/', component: HomePage },
      { path: '/details', component: DetailsPage }
    ],
    debug: false
  })

  new Vue({
    template: `
    <GridLayout rows="*, auto, auto">
        <FrameRouter row="0"/>
        <label :text="$navigator.$data.path" row="1" />
        <label :text="JSON.stringify($navigator.$data.stack, null, 2)" textWrap="true" row="2" />
    </GridLayout>
  `
  }).$start()
}
