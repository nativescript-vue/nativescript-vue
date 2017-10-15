export default {
  name: 'action-item',

  template: `
    <native-action-item ref="actionItem" @tap="onTap">
      <slot></slot>
    </native-action-item>
  `,

  props: {
    text: {
      type: String
    },
    icon: {
      type: String
    },
    'android.position': {
      type: String
    },
    'android.systemIcon': {
      type: String
    },
    'ios.position': {
      type: String
    },
    'ios.systemIcon': {
      type: String | Number
    }
  },

  mounted() {
    const _nativeView = this.$refs.actionItem.nativeView

    if (this.text) {
      _nativeView.text = this.text
    }

    if (this.icon) {
      _nativeView.icon = this.icon
    }

    if (_nativeView.android && this['android.systemIcon']) {
      _nativeView.android.systemIcon = this['android.systemIcon']
    }

    if (_nativeView.android && this['android.position']) {
      _nativeView.android.position = this['android.position']
    }

    if (_nativeView.ios && this['ios.systemIcon']) {
      _nativeView.ios.systemIcon = this['ios.systemIcon']
    }

    if (_nativeView.ios && this['ios.position']) {
      _nativeView.ios.position = this['ios.position']
    }
  },

  methods: {
    onTap(args) {
      this.$emit('tap', args)
    }
  }
}
