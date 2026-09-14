---
title: v-view
contributors: [rigor789, eddyverbruggen, ikoevska]
---

The `v-view` directive lets you set the current element's `View` as a parent property.

---

```HTML
<Child v-view:parentPropertyName />
<!-- same as: -->
<Child ~parentPropertyName />
```

```HTML
<Child v-view:parentArrayPropertyName.array />
<!-- same as: -->
<Child ~parentArrayPropertyName.array />
```

---

### Example: `<RadSideDrawer>`

The `<RadSideDrawer>` component is part of the [Progress NativeScript UI](http://docs.telerik.com/devtools/nativescript-ui/Controls/Angular/SideDrawer/getting-started) package.

The `<RadSideDrawer>` component requires the `drawerContent` and `mainContent` properties to be set to `View` instances. Using the `v-view` directive, you can do this with a few lines of code:

```HTML
<RadSideDrawer>
  <StackLayout ~drawerContent />
  <StackLayout ~mainContent />
</RadSideDrawer>
```

Without the `v-view` directive, you need to go a more tedious and error-prone route:

```HTML
<RadSideDrawer ref="drawer">
  <StackLayout ref="drawerContent" />
  <StackLayout ref="mainContent" />
</RadSideDrawer>
```

```JavaScript
{
  mounted() {
    this.$refs.drawer.nativeView.drawerContent = this.$refs.drawerContent.nativeView
    this.$refs.drawer.nativeView.mainContent = this.$refs.mainContent.nativeView
  }
}
```