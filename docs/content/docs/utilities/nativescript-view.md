---
contributors: [vallemar, rigor789]
---

# createNativeView

Some NativeScript APIs take a view rather than a component: `RootLayout.open()`, `Frame.navigate()` with a custom page, a plugin that wants a `View` to embed, and so on. A Vue component is not a NativeScript view, but `createNativeView` renders one into a detached tree so its root view can be handed to any of those APIs.

```ts
import { createNativeView } from 'nativescript-vue';
import MyComponent from './MyComponent.vue';

const view = createNativeView(MyComponent, {
  foo: 'bar',
  onChange(data) {
    // `emit('change', data)` inside MyComponent ends up here
  },
});

view.mount();

const nativeView = view.nativeView;
```

The second argument holds the component's props. Keys starting with `on` are registered as listeners for the events the component emits, the same as with [`$navigateTo`](/docs/essentials/routing#listening-to-events-emitted-by-the-target-component).

## The returned object

| Member       | Description                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------ |
| `mount()`    | Renders the component and returns its root vnode. Calling it again on a mounted view is a no-op.             |
| `unmount()`  | Unmounts the component, running its `onUnmounted` hooks. Call it once the native view is no longer shown.    |
| `nativeView` | The NativeScript view rendered by the component's root element. `undefined` until `mount()` has been called. |
| `vnode`      | The component's root vnode.                                                                                  |
| `context`    | The app context the component is mounted with.                                                               |

The component is mounted as its own Vue root, sharing the plugins, globally registered components and app-level `provide` values of the app created with `createApp`. Values provided by the component that calls `createNativeView` do not reach it — pass them as props instead.

Nothing unmounts the view for you. When the view is removed from the screen, call `unmount()` so watchers and lifecycle hooks are cleaned up.

## Typing the native view

The first type parameter types `nativeView`:

```ts
import type { GridLayout } from '@nativescript/core';

const view = createNativeView<GridLayout>(MyComponent);
view.mount();
view.nativeView.columns = '*, *';
```

See [RootLayout](/docs/elements/components/root-layout) for a complete example.
