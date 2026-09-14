---
contributors: [rigor789]
---

# Gotchas

NativeScript-Vue is Vue 3, but it renders native views instead of DOM nodes. This page collects the differences that most often surprise developers arriving from web Vue, or from NativeScript-Vue 2.

## Coming from web Vue

### There is no DOM

Templates render NativeScript views. `<div>`, `<span>` and `<p>` do not exist — an unknown tag throws `No known component for element div.` at render time. Use the layouts (`StackLayout`, `GridLayout`, `FlexboxLayout`, ...) and views (`Label`, `Button`, ...) documented in the [NativeScript UI docs](https://docs.nativescript.org/ui/).

Text children of an element are joined and set as its `text` property, so the familiar shorthand works:

```vue
<template>
  <StackLayout>
    <Label>Hello</Label>
    <Button>Save</Button>
  </StackLayout>
</template>
```

### Styling

`class` is a plain class string handed to NativeScript's CSS engine, and `style` bindings set NativeScript style properties — a subset of CSS with some NativeScript-specific additions. See [styling](https://docs.nativescript.org/ui/styling) for the supported selectors and properties.

`v-show` sets `visibility: collapsed` on the view rather than `display: none`.

### `v-model` only works on elements that declare a model pair

An element supports `v-model` only if a model prop/event pair is registered for it. The built-ins are:

| Element        | Prop            | Event                 |
| -------------- | --------------- | --------------------- |
| `TextField`    | `text`          | `textChange`          |
| `TextView`     | `text`          | `textChange`          |
| `SearchBar`    | `text`          | `textChange`          |
| `Switch`       | `checked`       | `checkedChange`       |
| `Slider`       | `value`         | `valueChange`         |
| `DatePicker`   | `date`          | `dateChange`          |
| `TimePicker`   | `time`          | `timeChange`          |
| `ListPicker`   | `selectedIndex` | `selectedIndexChange` |
| `SegmentedBar` | `selectedIndex` | `selectedIndexChange` |
| `TabView`      | `selectedIndex` | `selectedIndexChange` |

On any other element `v-model` does nothing, and a warning is logged in development. Elements you register yourself opt in through the `model` meta:

```ts
import { registerElement } from 'nativescript-vue';

registerElement('Foo', () => Foo, {
  model: { prop: 'value', event: 'valueChange' },
});
```

::: warning
`v-model` modifiers (`.lazy`, `.trim`, `.number`) are ignored, with a development warning. Apply the transformation in a computed setter instead.
:::

### Events are native events

`@name` attaches a NativeScript event listener, so every event a view fires is available, including the ones inherited from `View` such as `tap`, `loaded`, `unloaded` and `layoutChanged`. The handler receives NativeScript's event data, where `$event.object` is the view that fired it.

```vue
<template>
  <Button text="Save" @tap="(e) => console.log(e.object.text)" />
</template>
```

Only `on` followed by a non-lowercase character is treated as a listener, so a prop such as `onboardingTitle` is set as a plain attribute.

### Boolean shorthand

An attribute with no value sets the property to `true`:

```vue
<template>
  <Page actionBarHidden />
</template>
```

### `onMounted` is not "on screen"

Vue's `onMounted` runs when the Vue component tree is created, which is not the moment the native view is shown. For work that needs the view on screen — measuring, focusing a field, showing an `alert()` from the first page — use NativeScript's view events: `@loaded` on a view, or `@navigatedTo` on a `Page`.

```vue
<script setup>
import { useTemplateRef } from 'nativescript-vue';

const input = useTemplateRef('input');

function onNavigatedTo() {
  input.value.nativeView.focus();
}
</script>

<template>
  <Page @navigatedTo="onNavigatedTo">
    <StackLayout>
      <TextField ref="input" />
    </StackLayout>
  </Page>
</template>
```

The root component's `onMounted` in particular runs before `Application.run()` has started the app. Since 3.1 you may call `$navigateTo`/`$showModal` from it, but the root view is not on screen yet.

### Navigation belongs to the native Frame

The native `Frame` owns the navigation stack, so removing a Frame's current `<Page>` with `v-if` or `v-for` has no effect on it (a warning is logged in development). Use [`$navigateBack()`/`$navigateTo()`](/docs/essentials/routing) instead.

### `<KeepAlive>`

`<KeepAlive>` is supported since 3.1. Deactivated components keep their Vue state, but their native views are removed from the tree and recreated on re-activation, so native-only state — a `ScrollView` offset, for example — is lost. To keep it, mark the view as `reusable`, a NativeScript `ViewBase` property meaning the view is not destroyed when it is removed from the tree:

```vue
<template>
  <ScrollView reusable>
    <!-- ... -->
  </ScrollView>
</template>
```

### Not supported

- `<TransitionGroup>` — warns when used.
- `<Teleport>` — there is no DOM to teleport into.
- vue-router — see [why](/docs/essentials/routing#why-not-vue-router) on the routing page.

## Platform-specific code

`<iOS>` and `<Android>` are built-in components that render their children on one platform and nothing on the other:

```vue
<template>
  <StackLayout>
    <iOS>
      <Label text="Only on iOS" />
    </iOS>
    <Android>
      <Label text="Only on Android" />
    </Android>
  </StackLayout>
</template>
```

Attributes can be targeted at a platform too. An `ios:`/`android:` prefix sets the property on that platform only, while a dotted `ios.`/`android.` key sets a nested platform-specific setting (`view.ios.position`) on that platform only — most commonly on `ActionItem`:

```vue
<template>
  <Page>
    <ActionBar title="Home">
      <ActionItem text="Share" ios.position="right" android.position="popup" />
    </ActionBar>
    <Label ios:color="red" android:color="blue" text="Platform colors" />
  </Page>
</template>
```

In script code, use `isIOS` and `isAndroid` from `@nativescript/core`:

```ts
import { isAndroid, isIOS } from '@nativescript/core';
```

## Coming from NativeScript-Vue 2

The [upgrade guide](/docs/essentials/upgrade-guide) covers the mechanics. The mental-model changes are:

- The app starts with `createApp(App).start()` instead of `new Vue({ ... }).$start()`.
- `$navigateTo`, `$showModal`, `$closeModal` and `$navigateBack` are imports from `nativescript-vue`. They are still available on `this` in the Options API.
- `registerElement` is an import instead of `Vue.registerElement`. See [NativeScript plugins](/docs/essentials/nativescript-plugins) and [Vue plugins](/docs/essentials/vue-plugins).
- [`ListView`](/docs/elements/components/list-view) takes `:items` and named slots (`<template #name>`) instead of `for=` and `<v-template>`.
- `<Android>` and `<iOS>` exist again since 3.1.
- `$modal` is `false` outside a modal, so `v-if="$modal"` distinguishes the two cases.

See also [template refs](/docs/essentials/template-refs) for reaching the underlying native view, and [TypeScript](/docs/essentials/typescript) for typing templates and components.
