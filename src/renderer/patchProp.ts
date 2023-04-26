import { NSVElement } from '../dom';
import { patchAttr } from './modules/attrs';
import { patchClass } from './modules/class';
import { patchEvent } from './modules/events';
import { patchStyle } from './modules/style';

import { isOn } from '../runtimeHelpers';
import { getViewMeta, NSVModelDescriptor } from '../registry';

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
    case 'class':
      // console.log('->patchProp+Class')
      patchClass(el, nextValue);
      break;
    case 'style':
      // console.log('->patchProp+Style')
      patchStyle(el, prevValue, nextValue);
      break;
    case 'modelValue':
    case 'onUpdate:modelValue':
      try {
        // v-model - maps modelValue/onUpdate:modelValue to the correct prop/events from the registry meta
        const { prop, event } = getViewMeta(el.tagName)
          .model as NSVModelDescriptor;
        if (key === 'modelValue') {
          patchAttr(el, prop, prevValue, nextValue);
        } else {
          const cb = nextValue
            ? ($event) => nextValue($event.object[prop])
            : nextValue;
          patchEvent(el, `on:${event}`, prevValue, cb);
        }
      } catch (err) {
        // ignore if the view meta can't be found.
      }
      break;
    default:
      if (isOn(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      } else {
        patchAttr(el, key, prevValue, nextValue);
      }
  }
}
