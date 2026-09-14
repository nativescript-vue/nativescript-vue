---
title: SearchBar
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_search_bar_.searchbar
contributors: [MisterBrownRSA, rigor789, ikoevska]
---

`<SearchBar>` is a UI component that provides a user interface for entering search queries and submitting requests to the search provider.

---

```html
<SearchBar hint="Search hint" :text="searchPhrase" @textChange="onTextChanged" @submit="onSubmit" />
```

`<SearchBar>` provides two-way data binding using `v-model`.

```html
<SearchBar v-model="searchQuery" />
```

[> screenshots for=SearchBar <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `hint` | `String` | Gets or sets placeholder text for the input area.
| `text` | `String` | Gets or sets the value of the search query.
| `textFieldBackgroundColor` | `Color` | Gets or sets the background color of the input area.
| `textFieldHintColor` | `Color` | Gets or sets the color of the placeholder text.

## Events

| name | description |
|------|-------------|
| `textChange` | Emitted when the text is changed.
| `submit` | Emitted when the search input is submitted.
| `clear` | Emitted when the current search input is cleared through the **X** button in the input area.

## Native Component

| Android | iOS |
|---------|-----|
| [`android.widget.SearchView`](https://developer.android.com/reference/android/widget/SearchView.html)	| [`UISearchBar`](https://developer.apple.com/documentation/uikit/uisearchbar)
