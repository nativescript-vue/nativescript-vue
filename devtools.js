if (__DEV__) {
  try {
    const _global = globalThis.global;

    const host = (_global.__VUE_DEVTOOLS_HOST__ ??= __NS_VUE_DEVTOOLS_HOST__);
    const port = (_global.__VUE_DEVTOOLS_PORT__ ??= __NS_VUE_DEVTOOLS_PORT__);
    _global.__VUE_DEVTOOLS_TOAST__ ??= (message) => {
      console.warn('[VueDevtools]', message);
    };

    const platform = global.isAndroid ? 'Android' : 'iOS';

    const documentShim = {
      // this shows as the title in VueDevtools
      title: `${platform} :: ${host}:${port} :: NativeScript`,
      querySelector: () => null,
      querySelectorAll: () => [],
    };

    _global.document = Object.assign({}, documentShim, _global.document);
    _global.addEventListener ??= () => {};
    _global.removeEventListener ??= () => {};
    _global.window ??= _global;

    console.warn(
      `[VueDevtools] Connecting to ${global.__VUE_DEVTOOLS_HOST__}:${global.__VUE_DEVTOOLS_PORT__}...`,
    );
    require('@vue/devtools/build/hook.js');
    require('@vue/devtools/build/backend.js');
  } catch (e) {
    console.warn('[VueDevtools] Failed to init:', e);
  }
}
