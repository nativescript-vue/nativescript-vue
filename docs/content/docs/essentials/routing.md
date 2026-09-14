---
contributors:
  [eddyverbruggen, fartek, rigor789, ikoevska, tralves, sis0k0, vallemar]
---

# Manual Routing

The easiest way to implement routing in NativeScript-Vue is to use any of the following convenience functions:

- [`$navigateTo`](#view-navigation)
- [`$navigateBack`](#navigating-back)

For more complex navigation scenarios, you can use multiple `<Frame>` components and a navigation-specific component:

- [`Modal View`](#modal-view-navigation)

## Why not vue-router?

vue-router is not supported. NativeScript navigation is owned by the native `Frame`, which keeps a native backstack of `Page`s — a `UINavigationController` on iOS, fragments on Android — with platform transitions and hardware/gesture back handling. vue-router assumes it controls a single URL-driven view tree that it can swap in place, which does not map onto pushing and popping native pages. Navigation in NativeScript-Vue is therefore imperative, through `$navigateTo` and `$navigateBack`.

## Basic navigation concepts

The navigation elements that NativeScript relies on are `Frame` and `Page`.

- `Frame`. It is the main navigation element, it can have one or N depending on the design of the application. It is important that this element is declared before the `Page`.
- `Page`. These are the elements that `Frame` will navigate between.

A basic application structure for browsing is as follows.

```vue
// App.vue
<script setup>
import Detail from './Detail.vue';
</script>

<template>
  <Frame>
    <Page>
      <StackLayout>
        <Button text="Navigate to Detail Page" @tap="$navigateTo(Detail)" />
      </StackLayout>
    </Page>
  </Frame>
</template>
```

Note that in the App.vue component `Frame` is declared and inside it has a `Page`. When the user presses the button they will navigate to the `Detail` component.

```vue
// Detail.vue
<template>
  <Page>
    <StackLayout>
      <Label text="Navigation to Detail component completed" />
    </StackLayout>
  </Page>
</template>
```

As you can see, the Detail component does not have the `Frame` element but it does have the `Page` component, this is because NativeScript will use the `Frame` element declared in App.vue to navigate to the Detail component page.

This is just a basic but useful example to understand how navigation works in NativeScript.

## View Navigation

`$navigateTo(component, options?)` mounts the component and navigates the frame to it. It returns the resulting `Page` synchronously — it is not a promise.

Use it in the template or in a method.

### In the template

With `<script setup>`, an imported component can be referenced from the template directly, so `$navigateTo(Detail)` works without any extra wiring. Import target components rather than putting component definitions into reactive state — components are not data, and making them reactive only costs you overhead.

```vue
// Master.vue
<script setup>
import Detail from './Detail.vue';
</script>

<template>
  <Frame>
    <Page>
      <ActionBar title="Master" />
      <StackLayout>
        <Button text="To Detail directly" @tap="$navigateTo(Detail)" />
      </StackLayout>
    </Page>
  </Frame>
</template>
```

### In a method

Bind a button to a method and use `$navigateTo(Detail)` to navigate to the `Detail` component.

```vue
// Master.vue
<script setup>
import { $navigateTo } from 'nativescript-vue';
import Detail from './Detail.vue';

function goToDetailPage() {
  $navigateTo(Detail);
}
</script>

<template>
  <Frame>
    <Page>
      <ActionBar title="Master" />
      <StackLayout>
        <Button text="To Detail directly" @tap="goToDetailPage" />
      </StackLayout>
    </Page>
  </Frame>
</template>
```

### Options API

The navigation helpers are also exposed on the component instance, so no import is required:

```js
export default {
  methods: {
    goToDetailPage() {
      this.$navigateTo(Detail);
    },
  },
};
```

`this.$navigateBack`, `this.$showModal` and `this.$modal` are available the same way. `$closeModal` is the exception — outside a modal it has to be imported from `nativescript-vue`.

### Passing props to the target component

Pass a `props` object to be used when instantiating the target component.

```js
$navigateTo(Detail, {
  props: {
    id: 14,
  },
});
```

The target component declares them as usual:

::: code-group

```vue [TypeScript]
// Detail.vue
<script lang="ts" setup>
const props = defineProps<{ id: number }>();
</script>

<template>
  <Page>
    <ActionBar title="Detail" />
    <StackLayout>
      <Label :text="`Showing ${props.id}`" />
    </StackLayout>
  </Page>
</template>
```

```vue [JavaScript]
// Detail.vue
<script setup>
const props = defineProps({
  id: Number,
});
</script>

<template>
  <Page>
    <ActionBar title="Detail" />
    <StackLayout>
      <Label :text="`Showing ${props.id}`" />
    </StackLayout>
  </Page>
</template>
```

:::

### Listening to events emitted by the target component

Keys prefixed with `on` in the `props` object are registered as listeners for the events the target component emits.

```js
// Master.vue
$navigateTo(Detail, {
  props: {
    onChange(data) {
      // logic here
    },
  },
});
```

```vue
// Detail.vue
<script setup>
const emit = defineEmits(['change']);

function notifyMaster() {
  emit('change', { foo: 'bar' });
}
</script>
```

The remaining options are NativeScript's own, see [`NavigationEntry`](https://docs.nativescript.org/api/interface/NavigationEntry) for `clearHistory`, `backstackVisible`, `animated` and the rest.

### Specifying a transition

You can use any of the built-in transitions:

- curl (same as curlUp) (iOS only)
- curlUp (iOS only)
- curlDown (iOS only)
- explode (Android only)
- fade
- flip (same as flipRight)
- flipRight
- flipLeft
- slide (same as slideLeft)
- slideLeft
- slideRight
- slideTop
- slideBottom

For example:

```js
$navigateTo(Detail, {
  transition: {
    name: 'slideLeft',
    duration: 300,
    curve: 'easeIn',
  },
  transitioniOS: {},
  transitionAndroid: {},
});
```

### Navigating within a frame

Each [`<Frame>`](https://docs.nativescript.org/ui/frame) element has its own navigation stack. If you are using [multiple frames](https://docs.nativescript.org/ui/frame#multiple-root-frames), you may want to specify in which frame the navigation will occur. For example, having a button in the side bar that changes the page in the main area. You can do this by adding the `frame` option:

```js
$navigateTo(SomeComp, {
  frame: '<id, or ref, or instance>',
});
```

The value for the `frame` option can be one of the following:

- the `id` of the `<Frame>` component (for example: `<Frame id="main-frame">`)
- the `ref` for the `<Frame>` (for example: `<Frame ref="mainFrame">`)
- the `<Frame>` instance itself

When `frame` is omitted, the topmost frame is used. If no frame can be resolved, `$navigateTo` throws `Failed to resolve frame. Make sure your frame exists.`

## Navigating back

`$navigateBack(options?)` takes a single options object and returns a `Promise<void>`:

```js
$navigateBack({
  frame, // optional: id, ref or Frame instance; defaults to the topmost frame
  to, // optional: a Page or a BackstackEntry to unwind to
});
```

Called without arguments it goes back one page. If the frame cannot go back, the call is a no-op.

In the `Detail` component, add a button that triggers the globally exposed `$navigateBack` function.

```vue
// Detail.vue
<template>
  <Page>
    <ActionBar title="Detail" />
    <StackLayout>
      <Button text="Back to Master" @tap="$navigateBack()" />
    </StackLayout>
  </Page>
</template>
```

### Going back to a specific page

Pass `to` to unwind the frame to a specific page, popping everything above it in one go. Keep the `Page` that `$navigateTo` returned:

```vue
// Master.vue
<script setup>
import { $navigateBack, $navigateTo } from 'nativescript-vue';
import Detail from './Detail.vue';

let detail;

function goToDetail() {
  detail = $navigateTo(Detail);
}

function backToDetail() {
  $navigateBack({ to: detail });
}
</script>
```

`to` also accepts a `BackstackEntry` from `frame.backStack`, which is useful when you did not open the page yourself:

```js
$navigateBack({ frame, to: frame.backStack[0] });
```

If the target is no longer in the backstack, the returned promise rejects with `Failed to navigate back: the target is not in the backstack.`

::: tip
`$navigateBack` with `to` was added in 3.1.0.
:::

## Modal View Navigation

Navigation using modals - detached from the current backstack.

### Showing a modal

Use `$showModal` to show the `Detail` page modally. This function behaves similarly to `$navigateTo`, except that it returns a promise which resolves with the data the modal was closed with.

```vue
// Master.vue
<script setup>
import { $showModal } from 'nativescript-vue';
import Detail from './Detail.vue';

function showDetailPageModally() {
  $showModal(Detail);
}
</script>

<template>
  <Frame>
    <Page>
      <ActionBar title="Master" />
      <StackLayout>
        <Button text="Show Detail modally" @tap="showDetailPageModally" />
      </StackLayout>
    </Page>
  </Frame>
</template>
```

```vue
// Detail.vue
<template>
  <Frame>
    <Page>
      <ActionBar title="Detail" />
      <StackLayout>
        <Label text="I am a modal!" />
      </StackLayout>
    </Page>
  </Frame>
</template>
```

Note: We've wrapped the Detail page in a `<Frame>` element, which allows us to show the `<ActionBar>` as well as navigate further within the modal.

Besides `props`, `closeCallback` and `target`, the options are NativeScript's own — see [`ShowModalOptions`](https://docs.nativescript.org/api/interface/ShowModalOptions) for `animated`, `stretched`, `ios`, `android` and the rest.

#### Passing props to the modal

`$showModal` accepts a second parameter. You can use the parameter to pass in a `props` object to the target component. For example:

```js
$showModal(Detail, { props: { id: 14 } });
```

#### Forcing the modal to be fullscreen

This option only takes effect on Android, as iOS modals are always fullscreen.

```js
$showModal(Detail, { fullscreen: true, props: { id: 14 } });
```

#### Choosing what the modal is presented from

By default the modal is presented from the root view, or from the topmost open modal when one is already open — presenting from a view that is already presenting fails on iOS. Pass `target` to present from a specific view instead:

```js
$showModal(Detail, { target: someViewRef });
```

`target` accepts a component instance, a template ref or a `View`.

If the platform refuses to present the modal, the returned promise rejects with a "refused to present" error and the component is unmounted again.

Modals dismissed by the platform itself — an iOS swipe-down or the Android back button — are removed from the modal stack, so a subsequent `$closeModal()` targets the modal below them.

### Closing a modal

To close a modal we can close it from the modal template using `$modal.close()` or using the `$closeModal` function.

Inside a modal, `$modal` is an object with a single `close(data?, ...args)` method. Outside of any modal it is `false`, so a component that can be shown both ways can use `v-if="$modal"` to only render its close button when it is presented modally.

#### Close modal from modal template

```vue
<!-- inside Detail.vue -->
<Button v-if="$modal" @tap="$modal.close()" text="Close" />
```

#### Close modal using `$closeModal`

You can use the `$closeModal()` function from anywhere in your application, calling this function will close the last opened modal.

```vue
<script setup>
import { $closeModal } from 'nativescript-vue';

function closeModal() {
  $closeModal();
}
</script>

<template>
  <Button @tap="closeModal" text="Close" />
</template>
```

#### Returning data from the modal

When calling `$showModal`, a promise is returned which resolves with any data passed to the `$modal.close` or `$closeModal` functions. The same data is passed to the `closeCallback` option, along with any additional arguments.

In the following example, closing the modal outputs 'Foo' in the console.

```js
// ... inside Master
const data = await $showModal(Detail);
console.log(data); // print: Foo

// or, with a callback
$showModal(Detail, {
  closeCallback(data, ...args) {
    console.log(data); // print: Foo
  },
});
```

Examples:
<br>
Using `$modal.close`.

```vue
<!-- inside Detail.vue -->
<Button @tap="$modal.close('Foo')" text="Close" />
```

Using `$closeModal`.

```vue
<script setup>
import { $closeModal } from 'nativescript-vue';

function closeModal() {
  $closeModal('Foo');
}
</script>

<template>
  <Button @tap="closeModal" text="Close" />
</template>
```
