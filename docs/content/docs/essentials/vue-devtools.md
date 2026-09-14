---
contributors: [rigor789, cemarta7]
outdated: false
---

# Vue DevTools

To use VueDevtools, run:

```bash
ns run ios|android --env.vueDevtools
```

This will launch the standalone VueDevtools, and connect to it once the app launches. Right now, devtools are only supported on iOS Simulators and Android Emulators, but physical device support should come soon (requires configuring a host/port that the device can connect to.).

On android, you must enable cleartext http traffic, otherwise any connections are silently dropped by the system. In the `App_Resources/Android/src/main/AndroidManifext.xml` add the following to your existing `<application>` tag:

```diff
<application ...
+  android:usesCleartextTraffic="true"
.../>
```
