import {warn} from 'core/util/debug'

export default {
    name: 'action-bar',

    template: `<native-action-bar ref="actionBar"><slot></slot></native-action-bar>`,

    props: {
        title: {
            type: String,
            required: false
        }
    },

    mounted() {
        const refKeys = Object.keys(this.$root.$refs)

        // TODO figure out how to find the Page object without using the $refs property
        if (refKeys.length === 0) {
            warn('Make sure the page element has a "ref" attribute like <page ref="page"> or <page ref="my-ref">, otherwise no action-bar will be shown!', this)
            return
        }

        const page = this.$parent.$refs[refKeys[0]].nativeView
        page.actionBar = this.$refs.actionBar.nativeView
        page.actionBarHidden = false
        if (this.title) {
            this.$refs.actionBar.setAttribute('title', this.title)
        }
    },

    watch: {
        title(newVal) {
            this.$refs.actionBar.setAttribute('title', newVal)
        }
    },

    methods: {
        registerActionItem(actionItem) {
            this.$refs.actionBar.nativeView.actionItems.addItem(actionItem)
        },
        registerNavigationButton(navigationButton) {
            this.$refs.actionBar.nativeView.navigationButton = navigationButton
        }
    }
}
