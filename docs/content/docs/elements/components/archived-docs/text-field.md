---
title: TextField
apiRef: https://docs.nativescript.org/api-reference/modules/_ui_text_field_
contributors: [MisterBrownRSA, rigor789, TheOriginalJosh, eddyverbruggen, ikoevska]

---

`<TextField>` is an input component that creates an editable single-line box.

`<TextField>` extends [`TextBase`](https://docs.nativescript.org/api-reference/classes/_ui_text_base_.textbase) and [`EditableTextBase`](https://docs.nativescript.org/api-reference/classes/_ui_editor_text_base_.editabletextbase) which provide additional properties and events.

---

```html
<TextField :text="textFieldValue" hint="Enter text..." />
```

`<TextField>` provides two-way data binding using `v-model`.

```html
<TextField v-model="textFieldValue" />
```

[> screenshots for=TextField <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `text` | `String` | Gets or sets the value of the field.
| `hint` | `String` | Gets or sets the placeholder text.
| `isEnabled` | `Boolean` | Make the field disabled or enabled. Default value is `true`.
| `editable` | `Boolean` | When `true`, indicates that the user can edit the value of the field.
| `maxLength` | `Number` | Limits input to the specified number of characters.
| `secure` | `Boolean` | Hides the entered text when `true`. Use this property to create password input fields.<br/>Default value: `false`.
| `keyboardType` | `KeyboardType` | Shows a custom keyboard for easier text input.<br/>Valid values: `datetime`, `phone`, `number`, `url`, or `email`.
| `returnKeyType` | `ReturnKeyType` | Gets or sets the label of the return key.<br/>Valid values: `done`, `next`, `go`, `search`, or `send`.
| `autocorrect` | `Boolean` | Enables or disables autocorrect.

## Events

| Name | Description |
|------|-------------|
| `textChange` | Emitted when the text changes.
| `returnPress` | Emitted when the return key is pressed.
| `focus` | Emitted when the field is in focus.
| `blur` | Emitted when the field loses focus.

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.EditText`](https://developer.android.com/reference/android/widget/EditText.html) | [`UITextField`](https://developer.apple.com/documentation/uikit/uitextfield)
