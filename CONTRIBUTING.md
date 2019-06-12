# Contributing to nativescript-vue

If you feel like contributing to this project, that is awesome! This guide should help you get started.

# Pull Request Guidelines

- It's OK to submit PR against the `master` branch
- It's OK to have multiple commits per PR (will be squashed during merge)
- Please describe the changes in every PR, to make it easier to review. (No empty PR descriptions please)

We will re-iterate these guidelines as the project matures.

# Contributing to docs

Refer to the [nativescript-vue/nativescript-vue.org repository](https://github.com/nativescript-vue/nativescript-vue.org)

# Development setup

You will need Node.js installed, as well as NativeScript.

Please make sure you are using Nativescript 4.x

After cloning the repo, run:

`npm install`

(inside the `nativescript-vue` folder)

# Commonly used NPM scripts

```bash
$ # watch and auto re-build dist/index.js
$ npm run dev
```

# Testing with the sample application(s)

To test the sample applications provided in the repository, you need to `npm run dev` in the root directory. This will watch for changes, and rebuild nativescript-vue, which in dev mode will be generated into the samples/app directory (this has been done to reduce the required steps of linking local packages, which had many issues with the recent releases of npm).

Next, open up a new terminal window and run `npm run samples`. This will bring up a list of all the available sample applications which you can choose from with your arrow keys. Pressing enter/return will select that sample, and prompt you to choose the platform you'd like to run the sample on. After selecting the platform the application should start on your emulator, and the output will be in your terminal.

If you want to test the sample apps with HMR activated, please run `npm run samples -- --hmr` instead. Actually, we can pass any arguments to the `tns debug platform` command placing them after the `--` separator.

# Project Structure

- `build`: Directory for the custom tooling for managing and building the project
- `dist`: Directory for the bundled code
- `packages`: Directory for tightly related packages
- `platform/nativescript`: Contains `nativescript` specific platform code
  - `compiler`: This is where template compilation logic will go (vue template -> render function)
  - `renderer`: The renderer that handles rendering vdom into actual elements in {N}
  - `runtime`: {N} specific Vue backend
  - `util`: Utilities
- `samples`: Sample {N} applications for testing

# Troubleshooting

#### 1. Husky 'binding.open' error

There is [currently] a bug in devDependencies husky 0.15 beta that aborts `npm install` if `.git/hooks` is missing.

https://github.com/typicode/husky/issues/195

```
> husky@0.15.0-rc.3 postinstall /.../nativescript-vue/node_modules/husky
> node lib/installer/bin install
husky > setting up git hooks
fs.js:663
  return binding.open(pathModule.toNamespacedPath(path),
                 ^
Error: ENOENT: no such file or directory, open '/.../nativescript-vue/.git/hooks/applypatch-msg'
```

Mac:
```
nativescript-vue$ mkdir -p .git/hooks/
```

#### 2. Make sure JAVA_HOME is set to your JAVA 8 JDK!

If JAVA_HOME isn't set correctly, then `npm run samples` will exit back to the command prompt after prompting for a sample and platform.

Mac:
```
export JAVA_HOME=`/usr/libexec/java_home -v1.8`
```

#### 3. Deploying to Android on MacOS fails due to a `ENFILE: file table overflow ...` error.

If you see an error like this:
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

#### 4. Using XCode 8

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

```javascript
const Vue = require('nativescript-vue');

new Vue({

  data: {
	message: "Hello Vue!"
  },

  template: `
    <Page>
      <StackLayout>
        <Label v-model="message" />
      </StackLayout>
    </Page>
  `,
}).$start()
```
