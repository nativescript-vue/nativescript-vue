# Contributing to nativescript-vue

If you feel like contributing to this project, that is awesome! This guide should help you get started.

# Pull Request Guidelines

- It's OK to submit PR against the `master` branch
- It's OK to have multiple commits per PR (will be squashed during merge)
- Please describe the changes in every PR, to make it easier to review. (No empty PR's please)

We will re-iterate these guidelines as the project matures.

# Development setup
You will need Node.js installed, as well as Nativescript

Please make sure you are using Nativescript 3.0 (3.0.0-rc.2)

[Here is a guide to upgrade](https://www.nativescript.org/blog/nativescript-3.0-release-candidate-available-today)

After cloning the repo, run:

`npm install`

(inside the `nativescript-vue` folder)

# Commonly used NPM scripts

```bash
# watch and auto re-build dist/index.js
$ npm run dev
```

# Testing with the sample application

To test out changes, you will have to link `nativescript-vue` via npm's `link feature`:

Inside the `nativescript-vue` folder run:

`npm link`

This will create a symbolic link in your global node_modules folder, pointing to this location

And then you will have to go into the `samples` folder and run:

`npm link nativescript-vue`

Note: You only need to run this once

If all went well, `node_modules/nativescript-vue` should be a link to your global `node_modules/nativescript` folder, which is is also a link to the actual package.

Finally, you can run the application via:
`tns run android`

If you want to reload the application, every time the `nativescript-vue` module changes, use the `--syncAllFiles` option:

`tns run android --syncAllFiles`

# Project Structure

- `dist`: Directory for the bundled code
- `nativescript-vue`: This folder is the root of the module.
  - `index.js`: Entry file for the rollup build
  - `rollup.config.js`: rollup config for the build
  - `platform/nativescript`: Contains `nativescript` specific platform code
    - `compiler`: This is where template compilation logic will go (vue template -> render function)
    - `renderer`: The renderer that handles rendering vdom into actual elements in {N}
    - `runtime`: {N} specific Vue backend
    - `util`: Utilities
    - `element-registry.js`: Registry of supported elements
    - `framework.js`: Entry file for the platform

- `vue-sample`: Sample {N} application for testing

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
