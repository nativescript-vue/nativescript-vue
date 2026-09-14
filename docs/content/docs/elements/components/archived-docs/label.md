---
title: Label
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_label_.label
contributors: [MisterBrownRSA, rigor789, eddyverbruggen, ikoevska]
---

`<Label>` is a UI component that displays read-only text.

**IMPORTANT**: This `<Label>` is **not** the same as the HTML `<label>`.

---

```html
<Label text="Label" />
```

[> screenshots for=Label <]

### Styling the label

If you need to style parts of the text, you can use a combination of a [`FormattedString`](https://docs.nativescript.org/angular/ui/ng-ui-widgets/formatted-string) and [`Span`](https://docs.nativescript.org/api-reference/classes/_text_span_.span) elements.

```html
<Label textWrap="true">
  <FormattedString>
    <Span text="This text has a " />
    <Span text="red " style="color: red" />
    <Span text="piece of text. " />
    <Span text="Also, this bit is italic, " fontStyle="italic" />
    <Span text="and this bit is bold." fontWeight="bold" />
  </FormattedString>
</Label>
```

## Props

| Name | Type | Description |
|------|------|-------------|
| `text` | `String` | Gets or sets the text of the label.
| `textWrap` | `Boolean` | Gets or sets whether the label wraps text.<br/>Default value: `false`.

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.TextView`](https://developer.android.com/reference/android/widget/TextView.html) | [`UILabel`](https://developer.apple.com/documentation/uikit/uilabel)
