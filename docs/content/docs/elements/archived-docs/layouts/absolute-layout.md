---
title: AbsoluteLayout
apiRef: https://docs.nativescript.org/api-reference/modules/_ui_layouts_absolute_layout_
docRef: https://docs.nativescript.org/ui/layouts/layout-containers#absolutelayout
contributors: [rigor789, ikoevska]
---

The `<AbsoluteLayout>` container is the simplest layout container in NativeScript. 

`<AbsoluteLayout>` has the following behavior:

* Uses a pair of absolute left/top coordinates to position its children.
* Doesn't enforce any layout constraints on its children.
* Doesn't resize its children at runtime when its size changes.

## Examples

### A grid-like layout

The following example creates a simple grid. For more information about creating grid layouts, see [GridLayout](/en/docs/elements/layouts/grid-layout).

```html
<AbsoluteLayout backgroundColor="#3c495e">
  <Label text="10,10" left="10" top="10" width="100" height="100" backgroundColor="#43b883"/>
  <Label text="120,10" left="120" top="10" width="100" height="100" backgroundColor="#43b883"/>
  <Label text="10,120" left="10" top="120" width="100" height="100" backgroundColor="#43b883"/>
  <Label text="120,120" left="120" top="120" width="100" height="100" backgroundColor="#43b883"/>
</AbsoluteLayout>
```
<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/absolute_layout_grid.svg" />

### Overlapping elements

The following example creates a group of overlapping items.

```html
<AbsoluteLayout backgroundColor="#3c495e">
  <Label text="10,10" left="10" top="10" width="100" height="100" backgroundColor="#289062"/>
  <Label text="30,40" left="30" top="40" width="100" height="100" backgroundColor="#43b883"/>
</AbsoluteLayout>
```
<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/absolute_layout_overlap.svg" />

## Props

None.

## Additional children props

When an element is a direct child of `<AbsoluteLayout>`, you can work with the following additional properties.

| Name | Type | Description |
|------|------|-------------|
| `top` | `Number` | Gets or sets the distance, in pixels, between the top edge of the child and the top edge of its parent.
| `left` | `Number` | Gets or sets the distance, in pixels, between the left edge of the child and the left edge of its parent.
