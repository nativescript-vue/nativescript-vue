import { createApp } from 'nativescript-vue';

import App from './components/HMRTestLoader.vue';

createApp(App)
  .use(() => {
    console.log('test1');
  })
  .start();
