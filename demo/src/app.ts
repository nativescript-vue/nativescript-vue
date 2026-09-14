import { createApp } from 'nativescript-vue';

import DemoSwitcher from './DemoSwitcher.vue';
import { installSwitcherShortcut } from './switcherShortcut';

installSwitcherShortcut();

createApp(DemoSwitcher)
  .use(() => {
    console.log('test1');
  })
  .start();
