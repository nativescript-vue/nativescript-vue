import { $navigateTo, $showModal, createNativeView, h } from 'nativescript-vue';
import Home from '../components/Home.vue';

function test() {
  const home: typeof Home = Home;

  createNativeView(Home, {});
}

export function goHome(depth = 0, modal = false) {
  if (modal) {
    return $showModal<{
      strongTypeReturn: string;
    }>(Home, {
      props: {
        onVnodeMounted(vnode) {
          // console.log('MODAL VNODE MOUNTED', vnode);
        },
        onCustomEvent(e) {
          console.log('MODAL CUSTOM EVENT', e);
        },
        class: 'modal',
        depth,
      },
      closeCallback(data, ...args) {
        console.log('MODAL CLOSE CALLBACK', data, ...args);
      },
    }).then((data) => {
      console.log('MODAL CLOSED DATA', data);
    });
  }
  return $navigateTo(Home, {
    // clearHistory: true,
    props: {
      depth,
    },
  });
}
