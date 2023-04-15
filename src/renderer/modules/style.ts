import { NSVElement } from "../../dom";
import { NormalizedStyle } from "@vue/shared";

type Style = string | null;

function normalizeStyle(style: NormalizedStyle | Style): NormalizedStyle {
  if (!style) {
    return null;
  }

  if (typeof style === "string" && style?.trim().charAt(0) === "{") {
    return JSON.parse(style);
  }

  return style as NormalizedStyle;
}

function normalizeProperty(property: string) {
  if (property.endsWith("Align")) {
    // NativeScript uses Alignment instead of Align, this ensures that text-align works
    property += "ment";
  }

  return property;
}

export const STYLE_ORIGINAL_VALUE = Symbol("style_original_value");

function addStyleProperty(el: NSVElement, property: string, value: any) {
  const _sov: Map<string, any> =
    el[STYLE_ORIGINAL_VALUE] ?? (el[STYLE_ORIGINAL_VALUE] = new Map());
  property = normalizeProperty(property);

  if (!_sov.has(property)) {
    _sov.set(property, el.style[property]);
  }

  el.style[property] = value;
}

function removeStyleProperty(el: NSVElement, property: string) {
  const _sov: Map<string, any> =
    el[STYLE_ORIGINAL_VALUE] ?? (el[STYLE_ORIGINAL_VALUE] = new Map());
  property = normalizeProperty(property);

  // only delete styles we added
  if (_sov.has(property) && _sov.get(property)) {
    const originalValue = _sov.get(property);
    _sov.delete(property);
    // edge case: if a style property also exists as an attribute (ie backgroundColor)
    // changing the attribute will not update our originalValue, so when removing
    // the previous color will be applied. Fixing this would involve listening to
    // individual attribute changes, and it's not worth the overhead.
    el.style[property] = originalValue;
  }
}

// todo: perhaps mimic dom version with prefixing stripped out: https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/modules/style.ts
export function patchStyle(el: NSVElement, prev: Style, next: Style) {
  if (prev) {
    const style = normalizeStyle(prev);
    // undo old styles
    Object.keys(style).forEach((property) => {
      removeStyleProperty(el, property);
    });
  }

  if (!next) {
    el.removeAttribute("style");
  } else {
    // set new styles
    const style = normalizeStyle(next);
    Object.keys(style).forEach((property) => {
      addStyleProperty(el, property, style[property]);
    });
  }
}
