const Vue = require('nativescript-vue');

const VueRouter = require('vue-router');

const Default = require('../views/Default.vue');
const TabView = require('../views/TabView.vue');
const VModel = require('../views/VModel.vue');
const ListView = require('../views/ListView.vue');

const routes = new VueRouter({
    routes: [
        {
            path: '/', component: Default
        },
        {
            path: '/tab-view', component: TabView
        },
        {
            path: '/v-model', component: VModel
        },

        {
            path: '/list-view', component: ListView
        },
        {path: '*', redirect: '/'}
    ]
});

module.exports = routes