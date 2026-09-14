---
title: Slider
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_slider_.slider
contributors: [MisterBrownRSA, rigor789, eddyverbruggen, ikoevska]

---

`<Slider>` is a UI component that provides a slider control for picking values within a specified numeric range.

---

```html
<Slider value="80" @valueChange="onValueChanged" />
```

`<Slider>` provides two-way data binding using `v-model`:

```html
<Slider v-model="value" />
```

[> screenshots for=Slider <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `value` | `Number` | Gets or sets the currently selected value of the slider.<br/>Default value: `0`.
| `minValue` | `Number` | Gets or sets the minimum value of the slider.<br/>Default value: `0`.
| `maxValue` | `Number` | Gets or sets the maximum value of the slider.<br/>Default value: `100`.

## Events

| Name | Description |
|------|-------------|
| `valueChange`| Emitted when the value of the slider changes.

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.SeekBar`](https://developer.android.com/reference/android/widget/SeekBar.html) | [`UISlider`](https://developer.apple.com/documentation/uikit/uislider)
