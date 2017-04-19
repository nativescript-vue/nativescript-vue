const Page = require('tns-core-modules/ui/page').Page

function createPage() {
    let page = new Page()
    page.addEventListener('loaded', () => onReady(page))
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
            return h('label', [this.msg])
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
