---
title: Placeholder
apiRef: https://docs.nativescript.org/api-reference/classes/_ui_placeholder_.placeholder
contributors: [moeddami]
---

`<Placeholder>` allows you to add any native widget to your application. To do that, you need to put a Placeholder somewhere in the UI hierarchy and then create and configure the native widget that you want to appear there. Finally, pass your native widget to the event arguments of the creatingView event.

---

```html
<Placeholder @creatingView="creatingView" />
```

#### Example with TextView in Android

```js
methods: {
  creatingView: function(args) {
      const nativeView = new android.widget.TextView(args.context);
      nativeView.setSingleLine(true);
      nativeView.setEllipsize(android.text.TextUtils.TruncateAt.END);
      nativeView.setText("Native View - Android");
      args.view = nativeView;
  }
}
```

#### Example with UILabel in iOS

```js
methods: {
  creatingView: function(args) {
      const nativeView = new UILabel();
      nativeView.text = "Native View - iOS";
      args.view = nativeView;
  }
}
```
