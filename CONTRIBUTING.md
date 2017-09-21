# Contributing to nativescript-vue

If you feel like contributing to this project, that is awesome! This guide should help you get started.

# Pull Request Guidelines

- It's OK to submit PR against the `master` branch
- It's OK to have multiple commits per PR (will be squashed during merge)
- Please describe the changes in every PR, to make it easier to review. (No empty PR's please)

We will re-iterate these guidelines as the project matures.

# Contributing to docs

For the docs, we are using [docute.js](https://docute.js.org/#/home)

docute is very simple, so skim through their documentation to get started with it.

# Development setup
You will need Node.js installed, as well as Nativescript

Please make sure you are using Nativescript 3.x

After cloning the repo, run:

`npm install`

(inside the `nativescript-vue` folder)

# Commonly used NPM scripts

```bash
# watch and auto re-build dist/index.js
$ npm run dev
```

# Testing with the sample application

First, **[link](https://docs.npmjs.com/cli/link) the development version** to make it available globally.

```
cd nativescript-vue
npm link
```

This will create a symbolic link in your global `node_modules` folder, pointing to this location.

Then, **run the sample app** after linking it to the development code.

```
cd samples
npm link nativescript-vue
```

If all went well, `samples/node_modules/nativescript-vue` should be a link to your global `node_modules/nativescript` folder, which is is also a link to the actual package.

Finally, run the application :

```
npm install
tns run android --syncAllFiles
```

The `--syncAllFiles` option reloads the application every time the `nativescript-vue` module changes.

# Project Structure

- `dist`: Directory for the bundled code
- `platform/nativescript`: Contains `nativescript` specific platform code
  - `compiler`: This is where template compilation logic will go (vue template -> render function)
  - `renderer`: The renderer that handles rendering vdom into actual elements in {N}
  - `runtime`: {N} specific Vue backend
  - `util`: Utilities
  - `element-registry.js`: Registry of supported elements
  - `framework.js`: Entry file for the rollup build
- `samples`: Sample {N} applications for testing
- `rollup.config.js`: rollup config for the build

# Troubleshooting

#### 1. Deploying to Android on MacOS fails due to a `ENFILE: file table overflow ...` error.
If you see an eror like this:
```
Transferring project files...
Multiple errors were thrown:
ENFILE: file table overflow, open '/Users/tiagoalves/Projects/ns-vue/(...)/file-name-resolver/package.json'
```
it means you have to increase the file limits (see: [http://stackoverflow.com/a/27982223](http://stackoverflow.com/a/27982223)). You can do that with:
```
echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
ulimit -n 65536 65536
```
