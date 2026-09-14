---
title: AlertDialog
apiRef: https://docs.nativescript.org/api-reference/modules/_ui_dialogs_#alert
contributors: [MisterBrownRSA, rigor789, ikoevska]
---

The `alert()` method shows a message and an OK button. Use it to show information and notifications that do not require an action from the user.

The method is part of the [`dialogs` module](https://docs.nativescript.org/api-reference/modules/_ui_dialogs_).

---

## Basic use

The `alert()` method is available globally. You can call it anywhere in your app.

```javascript
alert('Your message')
  .then(() => {
    console.log("Alert dialog closed.");
  });
```

## Configure dialog options

```JavaScript
alert({
  title: "Your title",
  message: "Your message",
  okButtonText: "Your OK button text"
}).then(() => {
  console.log("Alert dialog closed");
});
```

[> screenshots for=AlertDialog <]
