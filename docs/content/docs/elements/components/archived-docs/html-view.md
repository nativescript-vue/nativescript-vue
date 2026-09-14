---
title: HtmlView
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_html_view_.htmlview
contributors: [MisterBrownRSA, rigor789, ikoevska]
---

`<HtmlView>` is a UI component that lets you show static HTML content.

See also: [WebView](/en/docs/elements/components/web-view).

---

```html
<HtmlView html="<div><h1>HtmlView</h1></div>" />
```

[> screenshots for=HtmlView <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `html` | `String` | The HTML content to be shown.

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.TextView`](https://developer.android.com/reference/android/widget/TextView.html) | [`UITextView`](https://developer.apple.com/documentation/uikit/uitextview)