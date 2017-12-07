export default {
  name: 'a',

  template: `<Button @tap="navigate"><slot /></Button>`,

  props: {
    href: {
      type: String,
      default: '/'
    },
    mode: {
      type: String,
      default: 'push',
      validator: function(value) {
        return ['push', 'replace'].indexOf(value.toLowerCase()) !== -1
      }
    }
  },

  methods: {
    navigate() {
      if (this.mode.toLowerCase() === 'replace') {
        this.$router.replace(this.href)
      } else {
        this.$router.push(this.href)
      }
    }
  }
}
