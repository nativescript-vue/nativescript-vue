import { createApp } from "nativescript-vue";

import App from "./components/demo_ListView.vue";

createApp(App)
  .use(() => {
    console.log("test1");
  })
  .start();
