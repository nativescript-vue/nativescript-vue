---
title: Image
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_image_.image
contributors: [MisterBrownRSA, rigor789, ikoevska, bundyo]
---

`<Image>` is a UI component that shows an image from an [ImageSource](https://docs.nativescript.org/api-reference/modules/_image_source_) or from a URL.

---

#### Displaying an image relative to the `app` directory

```html
<Image src="~/logo.png" stretch="none" />
```

#### Displaying an image from a URL

```html
<Image src="https://art.nativescript-vue.org/NativeScript-Vue-White-Green.png" stretch="none" />
```

#### Displaying an image from `App_Resources`

```html
<Image src="res://icon" stretch="none" />
```

#### Displaying a `base64`-encoded image

```html
<Image src="data:Image/png;base64,iVBORw..." stretch="none" />
```

#### Displaying an image with a font icon in {N} 6.2+

In NativeScript-Vue, `.decode` is required for parsing properties that have HTML entities in them.

```html
<Image src.decode="font://&#xf004;" class="fas" />
```

[> screenshots for=Image <]

## Props

| Name | Type | Description |
|------|------|-------------|
| `src` | `String` or [`ImageSource`](https://docs.nativescript.org/api-reference/modules/_image_source_) | Gets or sets the source of the image as a URL or an image source. If you use the new font:// icon protocol in {N} 6.2, make sure you add .decode to the name of the property - e.g. `src.decode="font://&#xf004;"`
|`imageSource` | [`ImageSource`](https://docs.nativescript.org/api-reference/modules/_image_source_) | Gets or sets the image source of the image.
| `tintColor` | `Color` | (Style property) Sets a color to tint template images.
| `stretch` | `Stretch` | (Style property) Gets or sets the way the image is resized to fill its allocated space.<br/>Valid values: `none`, `aspectFill`, `aspectFit`, or `fill`.<br/>For more information, see [Stretch](https://docs.nativescript.org/api-reference/modules/_ui_enums_.stretch). 
| `loadMode` | | Gets or sets the loading strategy for the images on the local file system.<br/>Valid values: `sync` or `async`.<br/>Default value: `async`.<br/>For more information, see [loadMode](https://docs.nativescript.org/api-reference/classes/_ui_image_.image#loadmode).

## Native component

| Android | iOS |
|---------|-----|
| [`android.widget.ImageView`](https://developer.android.com/reference/android/widget/ImageView.html) | [`UIImageView`](https://developer.apple.com/documentation/uikit/uiimageview)
