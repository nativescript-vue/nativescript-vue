const Vue = require('./nativescript-vue')

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
      stack: [],
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
      },
      _setPending(path, clear = false, data) {
        navigatorLog(
          ` *** NAVIGATOR::_setPending(path = ${path}, clear = ${clear}, data = ${data}) ***`
        )

        let stack = this.stack.slice()
        if (clear) {
          stack = [path]
        } else {
          stack.push(path)
        }

        this.pending = {
          path,
          stack,
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
          this.stack.pop()
          this.path = this.stack[this.stack.length - 1] || '/'
        } else {
          this.$navigateBack({
            frame: '__navigator_frame__'
          })
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
      </StackLayout>
    </Page>
  `
}

Vue.use(FrameRouter, {
  routes: [
    { path: '/', component: HomePage },
    { path: '/details', component: DetailsPage }
  ],
  debug: true
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
