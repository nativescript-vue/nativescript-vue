const Page = require('tns-core-modules/ui/page').Page
const StackLayout = require('tns-core-modules/ui/layouts/stack-layout').StackLayout
// Odd behaviour, if these are commented out, Error is thrown
// otherwise works as expected
// Same require statement is run inside the element-registry.js (when required in this file)
// so it gets resolved, and it's not bundled.
require('tns-core-modules/ui/label').Label
require('tns-core-modules/ui/button').Button

function createPage() {
    let page = new Page()
    let layout = new StackLayout()
    page.content = layout

    page.addEventListener('loaded', () => onReady(layout))

    return page
}
exports.createPage = createPage

function onReady(page) {

    const Vue = require('nativescript-vue/dist/index')
    Vue.prototype.$document = page

    const vm = new Vue({
        data: {
            msg: 'hi'
        },

        render(h) {
            return h('div', [
                this.msg, // creates a label
                h('label', {attrs: {text: 'test1'}}), // same as this
                h('label', ['test2']), // or this
                h('button', {attrs: {text: 'Hello World'}})
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
    }).$mount()
}
