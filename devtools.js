if (__DEV__) {
  const temp = globalThis.global;

  const document = {
    title: '',
    querySelector: () => null,
    querySelectorAll: () => [],
  };

  temp.document = document;
  temp.addEventListener = () => {};
  temp.removeEventListener = () => {};
  temp.window = temp;

  require('@vue/devtools/build/hook.js');
  require('@vue/devtools/build/backend.js');
}
