---
title: ActionItem
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_action_bar_.actionitem
contributors: [rigor789, ikoevska]
---

`<ActionItem>` is a UI component that lets you add action buttons to the `<ActionBar>` component.

---

#### Basic use

```HTML
<ActionBar title="My App">
  <ActionItem @tap="onTapShare"
    ios.systemIcon="9" ios.position="left"
    android.systemIcon="ic_menu_share" android.position="actionBar" />
  <ActionItem @tap="onTapDelete"
    ios.systemIcon="16" ios.position="right"
    text="delete" android.position="popup" />
</ActionBar>
```

#### Conditionally showing action items

You can use the `v-show` directive to show `<ActionItem>` components based on a condition.

```HTML
<ActionBar title="My App">
  <ActionItem @tap="onTapEdit"
    v-show="!isEditing"
    ios.systemIcon="2" ios.position="right"
    android.systemIcon="ic_menu_edit" />
  <ActionItem @tap="onTapSave"
    v-show="isEditing"
    ios.systemIcon="3" ios.position="right"
    android.systemIcon="ic_menu_save" />
  <ActionItem @tap="onTapCancel"
    v-show="isEditing"
    ios.systemIcon="1"
    android.systemIcon="ic_menu_close_clear_cancel" />
</ActionBar>
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `ios.systemIcon` | `Number` | Gets or sets the icon of the `ActionItem` for iOS. The value must be a number from the [`UIBarButtonSystemItem` enumeration](https://developer.apple.com/documentation/uikit/uibarbuttonitem/systemitem).
| `android.systemIcon` | `String` | Gets or sets the icon of the `ActionItem` for Android. The value must be the name of a [drawable resource](https://developer.android.com/guide/topics/resources/drawable-resource).
| `ios.position` | `String` | Gets or sets the position of the `ActionItem` within the `ActionBar` for iOS.<br/>Valid values: `left` or `right`.<br/>Default value is `left`.
| `android.position` | `String` | Gets or sets the position of the `ActionItem` within the `ActionBar` for Android.<br/>Valid values:<br/>`actionBar` (places the item in the ActionBar)<br/>`popup` (places the item in the options menu; renders items as text)<br/>`actionBarIfRoom` (places the item in the `ActionBar` if there is enough room for it there; otherwise, places it in the options menu)<br/>Default value is `actionBar`.

## Events

| Name | Description |
|------|-------------|
| `tap`| Emitted when the `ActionItem` is tapped.

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.Toolbar`](https://developer.android.com/reference/android/widget/Toolbar.html) | [`UINavigationItem`](https://developer.apple.com/documentation/uikit/uinavigationitem)
