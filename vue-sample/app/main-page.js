const Page = require('tns-core-modules/ui/page').Page
// Odd behaviour, if these are commented out, Error is thrown
// otherwise works as expected
// Same require statement is run inside the element-registry.js (when required in this file)
// so it gets resolved, and it's not bundled.
const ViewBase = require('tns-core-modules/ui/core/view-base').ViewBase
const GridLayout = require("tns-core-modules/ui/layouts/grid-layout").GridLayout
require('tns-core-modules/ui/layouts/stack-layout').StackLayout
require('tns-core-modules/ui/label').Label
require('tns-core-modules/ui/button').Button
require('tns-core-modules/ui/switch').Switch
console.log(new GridLayout instanceof ViewBase)

function createPage() {
    let page = new Page()
    page.addEventListener('loaded', () => onReady(page))

    return page
}
exports.createPage = createPage

function onReady(page) {

    const Vue = require('nativescript-vue/dist/index')
    Vue.setDocument(page)

    const vm = new Vue({
        data: {
            msg: 'hi'
        },

        render(h) {
            console.log('render')
            return h('stack-layout', [
                this.msg, // creates a label
                h('label', {attrs: {text: 'test1'}}), // same as this
                h('stack-layout', {attrs: {orientation: 'horizontal'}}, [
                    h('button', {attrs: {text: 'Foo'}}),
                    h('button', {attrs: {text: 'Bar'}}),
                    h('button', {attrs: {text: 'Baz'}})
                ]),
                h('grid-layout', {attrs: {rows: 'auto auto', columns: '* *'}}, [
                    'test',
                    h('switch')
                ])
            ])
        },

        created() {
            console.log('created')
        },

        beforeMount() {
            console.log('beforeMount')
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
