import { warn } from 'core/util/debug'
import { topmost } from 'ui/frame'
import { android, AndroidApplication } from 'application'

export default {
  name: 'router-page',
  functional: true,

  render(h, { parent }) {
    if (!parent.__is_root__) {
      warn('<router-page> should be a direct child of the root instance.')
    }

    const router = parent.$router

    router.afterEach(({ matched }) => {
      const component = matched[0].components.default

      parent.$nextTick(() => {
        parent.$navigateTo(component, {
          context: { router }
        })
      })
    })

    if (android) {
      android.on(AndroidApplication.activityBackPressedEvent, e => {
        e.cancel = true
        router.back()
      })
    }
  }
}
