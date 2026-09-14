---
title: Contributing
contributors: [vallemar, rigor789]
---

# Contributing

Thank you for your interest in contributing to NativeScript-Vue!

## Development

The runtime, the project templates and this website all live in the
[nativescript-vue repository](https://github.com/nativescript-vue/nativescript-vue).

### Setup

Clone the repository and install its dependencies:

```bash
git clone https://github.com/nativescript-vue/nativescript-vue.git
cd nativescript-vue
npm install
```

Run the checks:

```bash
npm test            # vitest, runs the renderer against a stubbed @nativescript/core
npm run typecheck
npm run build
```

### Trying changes in an app

The `demo/` app resolves `nativescript-vue` straight from `src/`, so it picks
up uncommitted changes:

```bash
cd demo
npm install
ns run ios|android
```

## Documentation

The website is in the `docs/` folder of the same repository and is built with
[VitePress](https://vitepress.dev). All content is under `docs/content/`, and
every page has an "Edit this page" link that opens the file on GitHub.

### Running the documentation locally

```bash
cd docs
npm install
npm run dev
```

Open the URL printed in your terminal to preview your changes live.

### Building the documentation

```bash
npm run build
npm run preview
```

### Checking for broken links

After changing links or a large portion of a page, verify that all
documentation links still resolve:

```bash
npm run build
npm run check-links
```

Pull requests that touch `docs/` get a preview URL from the Docs workflow, and
the site deploys automatically when they are merged.
