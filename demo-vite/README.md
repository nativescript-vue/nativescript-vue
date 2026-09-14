# demo-vite

The blank template built with `@nativescript/vite` instead of webpack, against
the runtime in this repo (`nativescript-vue` resolves to `..`, so run
`npm run build` at the root first).

```sh
npm install
npx ns debug ios      # HMR dev server
npx ns run ios --no-hmr
```

`vite.config.mts` sets Vite's own `resolve.alias` for `vue`. The helper from
`@nativescript/vite/vue` aliases it through `@rollup/plugin-alias`, which under
rolldown resolves the bare package name to its directory and fails the build
with "Could not load node_modules/nativescript-vue: Is a directory". Vite's
alias runs first and sidesteps that.
