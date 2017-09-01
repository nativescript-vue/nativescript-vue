import { warn } from 'core/util/debug'
import { topmost } from 'ui/frame'
import { start } from 'application'

export default {
  name: 'router-page',

  template: `
        <detached-container>
            <component v-if="routeComponent" ref="routeComponent" :is="routeComponent"></component>
        </detached-container>
`,

  data() {
    return {
      routeComponent: null
    }
  },

  watch: {
    routeComponent() {
      const self = this

      setTimeout(() => {
        const frame = topmost()

        frame.navigate({
          create() {
            return self.$refs.routeComponent.$el.nativeView
          }
        })
      })
    }
  },

  created() {
    this.routeComponent = this.$route.matched[0].components.default
    this.$router.afterEach(to => {
      this.routeComponent = to.matched[0].components.default
    })
  },

  beforeCreate() {
    if (!this.$router) {
      // error, this component requires VueRouter
      warn(
        'VueRouter is required to use <router-page>. Please install VueRouter.'
      )

      return
    }

    if (!this.$parent.__is_root__) {
      // Router-page must be a direct child of the root vue instance
      warn('<router-page> must be a direct child of the root Vue instance.')
    }
  }
}
