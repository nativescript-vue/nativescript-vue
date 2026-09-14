---
title: Page
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_page_.page
contributors: [rigor789, ikoevska, msaelices]
---

`<Page>` is a UI component that represents an application screen. NativeScript apps typically consist of one or more `<Page>` that wrap content such as an [`<ActionBar>`](/en/docs/elements/action-bar/action-bar) and other UI widgets.

---

#### A single page

```html
<Page>
  <ActionBar title="My App" />
  <GridLayout>
    <Label text="My Content"/>
  </GridLayout>
</Page>
```

#### Using the `loaded` event for triggering UI changes

A typical scenario is performing UI changes after the page is loaded. The recommended way to do it is by using the `loaded` event, triggered by NativeScript when the page is fully loaded:

```html
<Page @loaded="greet">
  <ActionBar title="My App" />
  <GridLayout>
    <Label text="My Content"/>
  </GridLayout>
</Page>
```

```js
export default {
  methods: {
    greet() {
      alert('Hello!').then(() => {
        console.log('Dialog closed')
      })
    }
  }
}
```

> **NOTE**: Developers coming from a web background would usually reach for the `mounted` lifecycle hook Vue provides, however in NativeScript the application, and certain elements might not yet be loaded when the `mounted` hook is executed, thus certain actions such as alerts, dialogs, navigation etc. are not possible inside the `mounted` hook. To work around this limitation, the `loaded` event may be used, which only fires after the application is ready. In this case, we are using the `loaded` event of the [`<Page>`](/en/docs/elements/components/page) element, but this event is available for all NativeScript elements.

## Props

| Name | Type | Description |
|------|------|-------------|
| `actionBarHidden` | `Boolean` | Shows or hides the `<ActionBar>` for the page.<br/>Default value: `false`.
| `backgroundSpanUnderStatusBar` | `Boolean` | Gets or sets whether the background of the page spans under the status bar.<br/>Default value: `false`.
| `androidStatusBarBackground` | `Color` | (Android-only) Gets or sets the color of the status bar on Android devices.
| `enableSwipeBackNavigation` | `Boolean` | (iOS-only) Gets or sets whether the page can be swiped back on iOS.<br/>Default value: `true`.
| `statusBarStyle` | `String` | Gets or sets the style of the status bar.<br/>Valid values:<br/>`light`,<br/>`dark`.

## Events

| Name | Description |
|------|-------------|
| `loaded` | Emitted after the page has been loaded.
| `navigatedFrom` | Emitted after the app has navigated away from the current page.
| `navigatedTo` | Emitted after the app has navigated to the current page.
| `navigatingFrom` | Emitted before the app has navigated away from the current page.
| `navigatingTo` | Emitted before the app has navigated to the current page.

## Native component

| Android | iOS |
|---------|-----|
| [`org.nativescript.widgets.GridLayout`](https://github.com/NativeScript/tns-core-modules-widgets/blob/master/android/widgets/src/main/java/org/nativescript/widgets/GridLayout.java) | [`UIViewController`](https://developer.apple.com/documentation/uikit/uiviewcontroller)
