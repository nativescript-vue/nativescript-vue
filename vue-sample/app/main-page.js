const Page = require('tns-core-modules/ui/page').Page

function createPage() {
    let page = new Page()
    page.addEventListener('loaded', onReady())
    return page
}
exports.createPage = createPage

function onReady() {
    const Vue = require('nativescript-vue')
    const vm = new Vue({
        data: {
            msg: 'hi'
        },

        render(h) {
            return h('app', [this.msg])
        },

        created() {
            console.log('created')
        },

        mounted() {
            console.log('mounted')
            setTimeout(() => {
                this.msg = 'changed'
            }, 1000)
        }
    }).$mount('#app')
}
