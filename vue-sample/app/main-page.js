const Page = require('tns-core-modules/ui/page').Page
const StackLayout = require('tns-core-modules/ui/layouts/stack-layout').StackLayout

function createPage() {
    let page = new Page()
    let layout = new StackLayout()
    page.content = layout
    page.addEventListener('loaded', () => onReady(layout))

    return page
}
exports.createPage = createPage

function onReady(page) {
    const Vue = require('nativescript-vue')
    Vue.prototype.$document = page

    const vm = new Vue({
        data: {
            msg: 'hi'
        },

        render(h) {
            return h('label', [
                h('button', [this.msg]),
                h('label', [this.msg]),
            ])
        },

        created() {
            console.log('created')
        },

        mounted() {
            console.log('mounted')
            let change = 1
            setInterval(() => {
                this.msg = 'changed ' + change++
            }, 1000)
        }
    }).$mount('#app')
}
