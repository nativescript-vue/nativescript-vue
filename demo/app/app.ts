import { createApp } from "vue";

// @ts-ignore
global.window = global;
// import Home from './components/Home.vue'

import App from "./components/demo_ListView.vue";

createApp(App)
  .use(() => {
    console.log("test1");
  })
  .start();
