---
contributors: [rigor789, cemarta7]
---

# Vue Devtools

## Install

Since nativescript-vue 3.1, `@vue/devtools` is an optional peer dependency and must be version 8. It is not bundled with nativescript-vue because it depends on Electron:

```bash
npm i -D @vue/devtools@^8
```

With an older version installed, the build fails with:

```
@vue/devtools X is installed but nativescript-vue needs ^8. Run: npm i -D @vue/devtools@^8
```

If `--env.vueDevtools` is passed without it installed, the build warns `--env.vueDevtools was passed but @vue/devtools is not installed`.

## Run

```bash
ns run ios|android --env.vueDevtools
```

The standalone devtools window is launched on the host machine, and the app connects to it when it starts. Start order does not matter — the app reconnects.

Devtools only work in development builds. Apps are named after their root component in the devtools UI.

## Options

| Flag                              | Default                                          | Description                                                                                         |
| --------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `--env.vueDevtoolsPort=9000`      | first free port from `8098` up                   | Pins the port.                                                                                      |
| `--env.vueDevtoolsHost=http://IP` | `http://localhost`, `http://10.0.2.2` on Android | Sets the host the app connects to. `10.0.2.2` is the Android emulator's alias for the host machine. |
| `--env.vueDevtoolsSpawn=false`    | `true`                                           | Skips launching the devtools app, for when one is already running.                                  |
| `--env.vueDevtoolsDebug`          | off                                              | Logs the socket traffic between the app and the devtools.                                           |

## Physical devices

Pass your machine's LAN IP as the host so the device can reach the devtools:

```bash
ns run ios|android --env.vueDevtools --env.vueDevtoolsHost=http://192.168.1.10
```

The device and the machine must be on the same network.

## Android

The connection is plain HTTP, so cleartext traffic must be enabled — otherwise connections are silently dropped by the system. In `App_Resources/Android/src/main/AndroidManifest.xml`, add the following to your existing `<application>` tag:

```diff
<application ...
+  android:usesCleartextTraffic="true"
.../>
```

## Vite

The devtools integration is part of the webpack setup (`nativescript.webpack.js`); there is no Vue Devtools integration for `@nativescript/vite` yet.
