export default {
  name: 'navigation-button',

  template: `<native-navigation-button ref="navigationButton" @tap="onTap" />`,

  props: {
    text: {
      type: String
    },
    'android.systemIcon': {
      type: String
    }
  },

  mounted() {
    const _nativeView = this.$refs.navigationButton.nativeView

    if (this.text) {
      _nativeView.text = this.text
    }

    if (_nativeView.android && this['android.systemIcon']) {
      _nativeView.android.systemIcon = this['android.systemIcon']
    }
  },

  methods: {
    onTap(args) {
      this.$emit('tap', args)
    }
  }
}
