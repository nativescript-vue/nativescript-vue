# NativeScript-Vue website [![Netlify Status](https://api.netlify.com/api/v1/badges/6b14c9ec-0c06-4ede-b8f6-0bdb13de2bfd/deploy-status)](https://app.netlify.com/sites/nativescript-vue/deploys)

This is the source for the [nativescript-vue.org](https://nativescript-vue.org/) website.

Contributions are welcome, all the content is placed in the `content` directory.

## Setup

Clone this repo to your local machine and install the dependencies.

```bash
cd nativescript-vue.org/
npm install
```

## Start documentation

We use VitePress for rapid development and documenting. You can start it locally by

```bash
npm run dev
```

Now, you can open the URL generated in your browser to see the generated docs.

## Build documentation
Run the HTTP server using the already generated `dist/` directory:

```bash
npm run build
npm run preview
```

## Good practices
### Check broken links
If you've modified a large portion of the documentation or added/modified links, it's a good idea to ensure that all the documentation links still work. To do this, you can run the command linkinator, which will return a report of the links that can't be resolved.
```
npm run build
npm run check-links
```