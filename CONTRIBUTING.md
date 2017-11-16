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
# watch and auto re-build samples/app/nativescript-vue.js
$ npm run dev
```

# Testing with the sample application(s)

To test the sample applications provided in the repository, you need to `npm run dev` in the root directory. This will watch for changes, and rebuild nativescript-vue, which in dev mode will be generated into the samples/app directory (this has been done to reduce the required steps of linking local packages, which had many issues with the recent releases of npm).

Next, open up a new terminal window and run `npm run samples`. This will bring up a list of all the available sample applications which you can choose from with your arrow keys. Pressing enter/return will select that sample, and prompt you to choose the platform you'd like to run the sample on. After selecting the platform the application should start on your emulator, and the output will be in your terminal.

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

#### 2. Using XCode 8
Check if xcodeproj is installed
- `sudo gem install xcodeproj -v 1.4.1`
You may need to enable system ruby (macos)
- `rvm use system` // now using system ruby
- repeat `sudo gem install xcodeproj -v 1.4.1`
- tns run ios

You will probably get an error:
`No profiles for 'org.nativescript.MyApp' were found: Xcode couldn't find a provisioning profile matching 'org.nativescript.MyApp'`

- Open the project
- nav to app/iOS/build.xcconfig
- include `PROVISIONING_PROFILE = testapp;`

Change app.js to
```
const Vue = require('nativescript-vue');

new Vue({

  data: {
	message: "Hello Vue!"
  },

  template: `
    <page>
      <stack-layout>
        <label v-model="message"></label>
      </stack-layout>
    </page>
  `,

}).$start()
```

