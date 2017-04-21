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

        template: `
            <scroll-view>
                <stack-layout>
                    <label>{{msg}}</label>
                    <label>##{{msg}}##</label>
                    <stack-layout orientation="horizontal">
                        <button text="Foo"></button>
                        <button text="Bar" @tap="onTap"></button>
                        <button text="Baz" style="color: red;"></button>
                    </stack-layout>
                </stack-layout>
            </scroll-view>
        `,

        _render(h) {
            console.log('render')
            return h('scroll-view', [
                h('stack-layout', [
                    this.msg, // creates a label
                    h('label', {attrs: {text: 'test1'}}), // same as this
                    h('label', [this.msg]), // or even this!
                    h('stack-layout', {attrs: {orientation: 'horizontal'}}, [
                        h('button', {attrs: {text: 'Foo'}, on: {tap: this.onTap}}),
                        h('button', {
                            attrs: {text: 'Bar'}, on: {
                                tap: () => {
                                    this.msg = 'BAR'
                                }
                            }
                        }),
                        h('button', {attrs: {text: 'Baz'}, style: {color: 'red', backgroundColor: 'cyan'}})
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
        },

        methods: {
            onTap(e) {
                alert('YOU HAVE TAPPED ME!')
            }
        }
    }).$mount()
}
