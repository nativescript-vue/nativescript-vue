---
title: ListPicker
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_list_picker_.listpicker
contributors: [MisterBrownRSA, rigor789, ikoevska]
---

`<ListPicker>` is a UI component that lets the user select a value from a pre-configured list.

---

```html
<ListPicker :items="listOfItems" selectedIndex="0"
    @selectedIndexChange="selectedIndexChanged" />
```

`<ListPicker>` provides two-way data binding using `v-model`.

```html
<ListPicker :items="listOfItems" v-model="selectedItem" />
```

[> screenshots for=ListPicker <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `items` | `Array<String>` | Gets or sets the items displayed as options in the list picker.
| `selectedIndex` | `Number` | Gets or sets the index of the currently selected item.

## Events

| Name | Description |
|------|-------------|
| `selectedIndexChange`| Emitted when the currently selected option (index) changes. The new index can be retrieved via `$event.value`.

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.NumberPicker`](https://developer.android.com/reference/android/widget/NumberPicker.html) | [`UIPickerView`](https://developer.apple.com/documentation/uikit/uipickerview)
