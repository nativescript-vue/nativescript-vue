# nativescript-vue.org

Source of the [nativescript-vue.org](https://nativescript-vue.org) website,
built with [VitePress](https://vitepress.dev). All content lives in `content/`.

```sh
cd docs
npm install
npm run dev       # local dev server
npm run build     # static site in .vitepress/dist
npm run preview   # serve the built site
```

## Deployment

The site is served by a Cloudflare Worker (static assets only, see
`wrangler.jsonc`) on the `nativescript-vue.org/*` route. Every push to `main`
that touches `docs/` deploys it through the Docs workflow. To deploy by hand:

```sh
npm run deploy    # builds, then `wrangler deploy`
```

The v2 docs stay on Netlify at https://v2.nativescript-vue.org.

## Checking links

```sh
npm run build
npm run check-links
```
