import { NSVElement } from '../../dom';

// compiler should normalize class + :class bindings on the same element
// into a single binding ['staticClass', dynamic]
export function patchClass(el: NSVElement, value: string | null) {
  if (value == null) {
    value = '';
  }
  el.setAttribute('class', value);
}
