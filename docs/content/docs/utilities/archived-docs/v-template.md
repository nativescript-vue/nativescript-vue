---
title: v-template
contributors: [rigor789, ikoevska]
---

The `<v-template>` component lets you define markup that you can reuse as a template.

## Props

| Name | Type | Description |
|------|------|-------------|
| `if` | `String` | The condition for using this template.
| `name` | `String` | The name of the template, auto-generated if omitted.

## Basic usage

The `<v-template>` component is used internally by the [ListView component](/en/docs/elements/components/list-view) to iterate over its list items.

## Advanced usage

You can use `v-template` to implement custom components that require a template or multiple templates.

`v-template` does not render anything when placed in the template. Instead, it adds a `$templates` property to the parent element. This `$templates` property is a [`TemplateBag` instance](https://github.com/nativescript-vue/nativescript-vue/blob/master/platform/nativescript/runtime/components/v-template.js#L36).

Next, `v-template` registers itself as an available template in the respective `TemplateBag` instance for the parent element. Any existing `TemplateBag` instance on the parent element is reused.

### The `TemplateBag` class

The `TemplateBag` class lets you register multiple templates and select the correct template based on the item and the conditions provided for each template.

Templates are stored as objects conforming to the [`KeyedTemplate`](https://docs.nativescript.org/api-reference/interfaces/_ui_core_view_.keyedtemplate) interface.

#### The `selectorFn` property

The `selectorFn` property returns a function that accepts a single parameter. This parameter is the item whose template is selected. 

The single-parameter function goes through all templates registered in the `TemplateBag` instance and returns the first one where the `if` condition is met. If none of the templates match, returns `default`.

#### Available methods

| Method | Description |
|---|---|
| `registerTemplate(name: String, condition: String?, scopedFn: Function): void` | _Mainly used internally._<br/>Registers templates in the `TemplateBag` instance.<br/>The `scopedFn` should be a render function of a [scoped slot](https://vuejs.org/v2/guide/components.html#Scoped-Slots) |
| `getConditionFn(condition: String): Function` | _Used internally._<br/>Builds a function that evaluates the given condition. |
| `getAvailable(): Array<String>` | Returns an array of available [`KeyedTemplates`](https://docs.nativescript.org/api-reference/interfaces/_ui_core_view_.keyedtemplate). (Returns an array of template names.) |
| `getKeyedTemplate(name: String): KeyedTemplate` | Returns the [`KeyedTemplate`](https://docs.nativescript.org/api-reference/interfaces/_ui_core_view_.keyedtemplate) with the specified name. |
| `getKeyedTemplates(): Array<KeyedTemplate>` | Returns an array of all the [`KeyedTemplates`](https://docs.nativescript.org/api-reference/interfaces/_ui_core_view_.keyedtemplate) registered in the `TemplateBag`. |
| `patchTemplate(name: String, context: any, oldVnode: VNode?): View` | Patches an existing [`VNode`](https://vuejs.org/v2/guide/render-function.html#The-Virtual-DOM) using the provided `context`. If no `oldVnode` is provided, creates a new View instance for the specified template. |
