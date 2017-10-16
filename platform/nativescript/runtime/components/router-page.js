import { warn } from 'core/util/debug'

export default {
  name: 'router-page',
  functional: true,

  render(h, { parent }) {
    if (!parent.__is_root__) {
      warn('<router-page> should be a direct child of the root instance.')
    }

    parent.$options.pageRouting = true
  }
}
