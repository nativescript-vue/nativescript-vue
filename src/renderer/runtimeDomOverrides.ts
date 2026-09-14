import { defineComponent } from '@vue/runtime-core';
import { logger } from '../util/logger';

export const TransitionGroup = {
  new() {
    logger.warn('TransitionGroup is not supported');
    return { $props: {} };
  },
};

let warnedKeepAlive = false;

/**
 * KeepAlive needs a detached container to park deactivated subtrees in,
 * which has no native equivalent. Render the content without caching.
 */
export const KeepAlive = /*#__PURE__*/ defineComponent({
  name: 'KeepAlive',
  setup(_props, { slots }) {
    if (__DEV__ && !warnedKeepAlive) {
      warnedKeepAlive = true;
      logger.warn(
        'KeepAlive is not supported; its children are rendered without caching.',
      );
    }
    return () => slots.default?.();
  },
});
