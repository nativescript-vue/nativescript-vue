# demo-vite

The blank template built with `@nativescript/vite` instead of webpack.

```sh
npm install
npx ns debug ios      # HMR dev server
npx ns run ios --no-hmr
```

`App_Resources` is not committed; the CLI generates it on the first prepare.

`npm install` gives you the published `nativescript-vue`. To run against the
runtime in this repo:

```sh
npm run link-runtime  # builds .., packs it, installs the tarball without saving
```

It installs a tarball rather than linking `..` on purpose. The HMR dev server
classifies a module as library code only when its resolved path contains
`node_modules/`; a symlinked package resolves to its real path, gets treated as
app code, and receives an injected import of the `/ns/rt` bridge. The bridge
then evaluates before `nativescript-vue` is registered on the device and every
binding from it is undefined (`_defineComponent is not a function`).

`vite.config.mts` sets Vite's own `resolve.alias` for `vue`. The helper from
`@nativescript/vite/vue` aliases it through `@rollup/plugin-alias`, which under
rolldown resolves the bare package name to its directory and fails the build
with "Could not load node_modules/nativescript-vue: Is a directory". Vite's
alias runs first and sidesteps that.
