export default {
  name: 'tab-view',

  props: ['selectedTab'],

  template: `
    <native-tab-view ref="tabView" v-model="selectedIndex">
      <slot></slot>
    </native-tab-view>
  `,

  data() {
    return {
      selectedIndex: 0
    }
  },

  watch: {
    selectedTab(index) {
      this.selectedIndex = index
    },
    selectedIndex(index) {
      this.$emit('tabChange', index)
    }
  },

  methods: {
    registerTab(tabView) {
      let items = this.$refs.tabView.nativeView.items || []

      this.$refs.tabView.setAttribute('items', items.concat([tabView]))
    }
  }
}
