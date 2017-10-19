import { decode } from 'he'

export default {
  install(Vue) {
    Vue.filter('decode', value => {
      try {
        return decode(value)
      } catch (e) {
        return value
      }
    })
  }
}
