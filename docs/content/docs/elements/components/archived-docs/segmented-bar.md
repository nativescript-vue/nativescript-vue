---
title: SegmentedBar
apiRef: http://docs.nativescript.org/api-reference/modules/_ui_segmented_bar_.html
contributors: [MisterBrownRSA, rigor789, eddyverbruggen, ikoevska]
---

`<SegmentedBar>` is a UI bar component that displays a set of buttons for discrete selection. Can show text or images.

As opposed to `<TabView>`:
* The position of `<SegmentedBar>` is not fixed. 
* You can place and style it as needed on the page or inside additional app elements such as hamburger menus.
* You need to handle the content shown after selection separately.

---
```html
<SegmentedBar>
  <SegmentedBarItem title="First" />
  <SegmentedBarItem title="Second" />
  <SegmentedBarItem title="Third" />
</SegmentedBar>
```

```html
<SegmentedBar :items="listOfItems" selectedIndex="0"
    @selectedIndexChanged="onSelectedIndexChange" />
```

`<SegmentedBar>` provides two-way data binding using `v-model`.

```html
<SegmentedBar :items="listOfItems" v-model="selectedItem" />
```

[> screenshots for=SegmentedBar <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `items` | `Array<SegmentedBarItem>` | An array of items to be displayed in the segmented bar. Represents the button labels or icons of the segmented bar.<br/>The array must be created in advance. 
| `selectedIndex` | `Number` | Gets or sets the index of the selected item.
| `selectedBackgroundColor` | `Color` | (Style property) Gets or sets the background color of the selected item. To set the background color of the entire bar, use `backgroundColor`.

## Events

| Name | Description |
|------|-------------|
| `selectedIndexChanged`| Emitted when the an item on the segmented bar is tapped.

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.TabHost`](https://developer.android.com/reference/android/widget/TabHost.html) | [`UISegmentedControl`](https://developer.apple.com/documentation/uikit/uisegmentedcontrol)
