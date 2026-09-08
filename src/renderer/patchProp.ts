import { NSVElement } from '../dom';
import { patchAttr } from './modules/attrs';
import { patchClass } from './modules/class';
import { patchEvent } from './modules/events';
import { patchStyle } from './modules/style';

import { getViewMeta, NSVModelDescriptor } from '../registry';
import { isOn } from '../runtimeHelpers';
import { logger } from '../util/logger';

import type {
  ComponentInternalInstance,
  ElementNamespace,
  RendererOptions,
} from '@vue/runtime-core';

export const patchProp: RendererOptions['patchProp'] = (
  el: NSVElement,
  key: string,
  prevValue: any,
  nextValue: any,
  namespace?: ElementNamespace,
  parentComponent?: ComponentInternalInstance | null,
) => {
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
    case 'onUpdate:modelValue': {
      // v-model maps modelValue/onUpdate:modelValue to the prop/event pair
      // declared in the element's registry meta
      const model = resolveModel(el);
      if (!model) {
        break;
      }
      if (key === 'modelValue') {
        patchAttr(el, model.prop, prevValue, nextValue);
      } else {
        const cb = nextValue
          ? ($event) => nextValue($event.object[model.prop])
          : nextValue;
        patchEvent(el, `on:${model.event}`, prevValue, cb);
      }
      break;
    }
    case 'modelModifiers':
      if (__DEV__ && nextValue && Object.keys(nextValue).length) {
        logger.warn(
          `v-model modifiers (.${Object.keys(nextValue).join(', .')}) are ` +
            `not supported on <${el.tagName}>; apply the transformation in ` +
            `a computed setter instead.`,
        );
      }
      break;
    default:
      if (isOn(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      } else {
        patchAttr(el, key, prevValue, nextValue);
      }
  }
};

function resolveModel(el: NSVElement): NSVModelDescriptor | undefined {
  let model: NSVModelDescriptor | undefined;
  try {
    model = getViewMeta(el.tagName).model;
  } catch {
    // unregistered element, fall through to the warning
  }
  if (!model && __DEV__) {
    logger.warn(
      `v-model is not supported on <${el.tagName}>: no model prop/event ` +
        `pair is registered for it. Pass { model: { prop, event } } to ` +
        `registerElement() to enable it.`,
    );
  }
  return model;
}
