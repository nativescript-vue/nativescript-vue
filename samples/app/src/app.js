const Vue = require('nativescript-vue');

require("application").setCssFileName("dist/bundle.css"); // TODO

const VueRouter = require('vue-router');

const fetch = require('fetch') // TODO: fix http module

const router = require('./router');


Vue.prototype.$http = fetch


Vue.use(VueRouter);

global.process = {env: {}};

const App = require('./App.vue');

const ImageViewer = require('./components/ImageViewer.vue');
Vue.component(ImageViewer.name, ImageViewer);

new Vue({
    router,
    components: {App},
    template: `<App/>`
}).$start()