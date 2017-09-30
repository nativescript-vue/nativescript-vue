const Vue = require('./nativescript-vue')

const App = {
    template: `
        <stack-layout>
            <button text="Open page" @tap="openPage"></button>
        </stack-layout>
    `,

    methods: {
        openPage() {
            this.$navigateTo(DetailsPage)
        }
    }
}

const DetailsPage = {
    template: `
        <stack-layout>
            <label :text="'Details ' + Math.random()"></label>
            <button text="another" @tap="openDetails"></button>
            <button text="back" @tap="goBack"></button>
        </stack-layout>
    `,

    methods: {
        openDetails() {
            this.$navigateTo(DetailsPage)
        },
        goBack() {
            this.$navigateBack()
        }
    }
}

new Vue({
    render: h => h(App)
}).$start()
