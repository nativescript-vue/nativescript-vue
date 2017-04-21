const Page = require('tns-core-modules/ui/page').Page

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
            return h('scroll-view', [
                h('stack-layout', [
                    this.msg, // creates a label
                    h('label', {attrs: {text: 'test1'}}), // same as this
                    h('label', [this.msg]), // or even this!
                    h('stack-layout', {attrs: {orientation: 'horizontal'}}, [
                        h('button', {attrs: {text: 'Foo'}}),
                        h('button', {attrs: {text: 'Bar'}}),
                        h('button', {attrs: {text: 'Baz'}})
                    ]),
                    h('stack-layout', {attrs: {orientation: 'horizontal'}}, [
                        h('label', {attrs: {text: 'Label for Switch'}}),
                        h('switch')
                    ]),
                    h('slider'),
                    h('date-picker'),
                    h('image', {attrs: {src: '~/images/apple.jpg'}}),
                    h('image', {attrs: {src: '~/images/apple.jpg'}}),
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
