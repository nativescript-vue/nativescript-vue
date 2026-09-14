---
title: NavigationButton
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_action_bar_.navigationbutton
contributors: [rigor789, ikoevska]
---

`<NavigationButton>` is a UI component that provides an abstraction for the Android navigation button and the iOS back button.

Extends [`<ActionItem>`](/en/docs/elements/action-bar/action-item).

---

```html
<ActionBar title="My App">
  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
</ActionBar>
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `text` | `String` | (iOS-only) Sets the text of the button.
| `android.systemIcon` | `String` | (Android-only) The icon to be shown in the button. You can specify any system icon whose name begins with the `ic_` prefix. For a complete list of the available icons, see [the `R.drawable` Android class](https://developer.android.com/reference/android/R.drawable.html).

## Events

| Name | Description |
|------|-------------|
| `tap`| Emitted when the `<NavigationButton>` is tapped.

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.Toolbar`](https://developer.android.com/reference/android/widget/Toolbar.html) | [`UINavigationItem`](https://developer.apple.com/documentation/uikit/uinavigationitem)