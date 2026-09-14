import { defineComponent } from '@vue/runtime-core';
import { isAndroid, isIOS } from '../nativescript';

function platformComponent(name: string, enabled: () => boolean) {
  return defineComponent({
    name,
    setup(_props, { slots }) {
      return () => (enabled() ? slots.default?.() : null);
    },
  });
}

/** Renders its children on Android only. */
export const Android = /*#__PURE__*/ platformComponent(
  'Android',
  () => isAndroid,
);

/** Renders its children on iOS only. */
export const iOS = /*#__PURE__*/ platformComponent('iOS', () => isIOS);
