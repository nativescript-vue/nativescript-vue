---
title: ConfirmDialog
apiRef: https://docs.nativescript.org/api-reference/modules/_ui_dialogs_#confirm
contributors: [MisterBrownRSA, rigor789, ikoevska]
---

The `confirm()` method shows a confirmation message and Cancel and OK buttons.

The method is part of the [`dialogs` module](https://docs.nativescript.org/api-reference/modules/_ui_dialogs_).

---

## Basic use

The `confirm()` method is available globally. You can call it anywhere in your app.

```javascript
confirm('Your message')
  .then(result => {
    console.log(result);
  });
```

## Configure dialog options

```javascript
confirm({
  title: "Your title",
  message: "Your message",
  okButtonText: "Your OK button text",
  cancelButtonText: "Your Cancel text"
}).then(result => {
  console.log(result);
});
```

[> screenshots for=ConfirmDialog <]
