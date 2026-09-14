---
title: WebView
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_web_view_.webview
contributors: [MisterBrownRSA, rigor789, eddyverbruggen, ikoevska]
---

`<WebView>` is a UI component that lets you show web content in your app. You can pull and show content from a URL or a local HTML file, or you can render static HTML content.


See also: [HtmlView](/en/docs/elements/components/html-view).

---

```html
<WebView src="http://nativescript-vue.org/" />

<WebView src="~/html/index.html" />

<WebView src="<div><h1>Some static HTML</h1></div>" />
```

[> screenshots for=WebView <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `src` | `String` | Gets or sets the displayed web content.<br/>Valid values: an absolute URL, the path to a local HTML file, or static HTML.

## Events

| Name | Description |
|------|-------------|
| `loadStarted`| Emitted when the page has started loading in the `<WebView>`.
| `loadFinished`| Emitted when the page has finished loading in the `<WebView>`.

## Native component

| Android | iOS |
|---------|-----|
| [`android.webkit.WebView`](https://developer.android.com/reference/android/webkit/WebView) | [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview)