import { defineConfig, mergeConfig } from 'vite';
import { vueConfig } from '@nativescript/vite/vue';

export default defineConfig(({ mode }) =>
  mergeConfig(vueConfig({ mode }), {
    resolve: {
      // @nativescript/vite/vue aliases `vue` through @rollup/plugin-alias,
      // which under rolldown resolves the bare name to the package directory
      // and fails with "Is a directory". Vite's own alias runs first.
      alias: [{ find: /^vue$/, replacement: 'nativescript-vue' }],
    },
  }),
);
