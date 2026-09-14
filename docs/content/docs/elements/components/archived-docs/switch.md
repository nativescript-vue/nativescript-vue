---
title: Switch
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_switch_.switch
contributors: [MisterBrownRSA, rigor789, ikoevska]
---

`<Switch>` is a UI component that lets users toggle between two states.

The default state is `false` or OFF.

---

```html
<Switch checked="true" />
```

`<Switch>`provides two-way data binding using `v-model`.

```html
<Switch v-model="itemEnabled" />
```

[> screenshots for=Switch <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `checked` | `Boolean` | Gets or sets the value of the switch selection.<br/>Default value: `false`.

## Events

| Name | Description |
|------|-------------|
| `checkedChange`| Emitted when the switch selection changes.

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.Switch`](https://developer.android.com/reference/android/widget/Switch.html) | [`UISwitch`](https://developer.apple.com/documentation/uikit/uiswitch)
