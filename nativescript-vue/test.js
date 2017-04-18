const Vue = require('./index')

let vm = new Vue({
    el: '#app',

    render(h) {
        return h('root', [
            this.msg
        ])
    },

    data: {
        msg: 'hi'
    },

    created() {
        // console.log('created')
        setTimeout(() => {
            this.msg = 'updated'
        }, 1000)
    }
})