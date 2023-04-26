import { ObjectDirective } from '@vue/runtime-core';
import { NSVElement } from '../dom';

interface VShowElement extends NSVElement {
  // _vod = vue original display
  _vod: string;
}

export const vShow: ObjectDirective<VShowElement> = {
  beforeMount(el, { value }, { transition }) {
    el._vod =
      el.getAttribute('visibility') === 'none'
        ? ''
        : (el.getAttribute('visibility') as string);
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el) {
    setDisplay(el, true);
  },
};

function setDisplay(el: VShowElement, value: unknown): void {
  el.setAttribute('visibility', value ? el._vod : 'collapsed');
}
