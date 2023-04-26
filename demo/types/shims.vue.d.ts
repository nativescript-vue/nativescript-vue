declare module '*.vue' {
  import type { DefineComponent } from 'nativescript-vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
