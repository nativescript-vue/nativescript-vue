---
title: ActivityIndicator
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_activity_indicator_.activityindicator
contributors: [MisterBrownRSA, rigor789, ikoevska]
---

`<ActivityIndicator>` is a UI component that shows a progress indicator signalling to the user of an operation running in the background.

---

```html
<ActivityIndicator busy="true" @busyChange="onBusyChanged" />
```

[> screenshots for=ActivityIndicator <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `busy` | `Boolean` | Gets or sets whether the indicator is active. When `true`, the indicator is active.

## Events

| Name | Description |
|------|-------------|
| `busyChange`| Emitted when the `busy` property is changed.

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.ProgressBar` (indeterminate = true)](https://developer.android.com/reference/android/widget/ProgressBar.html)	| [`UIActivityIndicatorView`](https://developer.apple.com/documentation/uikit/uiactivityindicatorview)