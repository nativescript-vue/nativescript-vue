---
title: Progress
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_progress_.progress
contributors: [MisterBrownRSA, rigor789, eddyverbruggen, ikoevska]
---

`<Progress>` is a UI component that shows a bar to indicate the progress of a task. 

See also: [ActivityIndicator](/en/docs/elements/components/activity-indicator).

---

```html
<Progress :value="currentProgress" />
```

[> screenshots for=Progress <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `value` | `Number` | Gets or sets the current value of the progress bar. Must be within the range of 0 to `maxValue`.
| `maxValue` | `Number` | Gets or sets the maximum value of the progress bar.<br/>Default value: `100`.

## Events

| Name | Description |
|------|-------------|
| `valueChange` | Emitted when the `value` property changes.

## Native Component

| Android | iOS |
|---------|-----|
| [`android.widget.ProgressBar` (indeterminate = false)](https://developer.android.com/reference/android/widget/ProgressBar.html) | [`UIProgressView`](https://developer.apple.com/documentation/uikit/uiprogressview)
