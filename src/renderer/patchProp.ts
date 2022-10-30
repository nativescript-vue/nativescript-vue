import { NSVElement } from "../dom";
import { patchAttr } from "./modules/attrs";
import { patchClass } from "./modules/class";
import { patchEvent } from "./modules/events";
import { patchStyle } from "./modules/style";

import { isOn } from "../runtimeHelpers";

export function patchProp(
  el: NSVElement,
  key: string,
  prevValue: any,
  nextValue: any,
  isSVG = false,
  prevChildren: any,
  parentComponent: any,
  parentSuspense: any,
  unmountChildren: any
) {
  switch (key) {
    // special
    case "class":
      // console.log('->patchProp+Class')
      patchClass(el, nextValue);
      break;
    case "style":
      // console.log('->patchProp+Style')
      patchStyle(el, prevValue, nextValue);
      break;
    case "modelValue":
    case "onUpdate:modelValue":
      // handled by v-model directive
      break;
    default:
      if (isOn(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      } else {
        patchAttr(el, key, prevValue, nextValue);
      }
  }
}
