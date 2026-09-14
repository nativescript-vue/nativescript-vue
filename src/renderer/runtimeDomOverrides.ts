import {
  getCurrentInstance,
  KeepAlive as KeepAliveCore,
} from '@vue/runtime-core';
import { NSVDetachedContainer } from '../dom';
import { logger } from '../util/logger';

export const TransitionGroup = {
  new() {
    logger.warn('TransitionGroup is not supported');
    return { $props: {} };
  },
};

/**
 * runtime-core's KeepAlive parks deactivated subtrees in a container it
 * obtains from createElement('div'), which is not a registered view here.
 * It reads the renderer from the instance context during setup, so hand it
 * one whose createElement yields a detached container instead. Deactivated
 * views are removed from their native parent and re-added on activation;
 * NativeScript recreates their native views then, so the component state
 * survives but native-only state such as scroll offsets does not.
 */
export const KeepAlive = {
  ...(KeepAliveCore as any),
  setup(props: any, ctx: any) {
    const { ctx: sharedContext } = getCurrentInstance() as any;
    const renderer = sharedContext.renderer;

    sharedContext.renderer = {
      ...renderer,
      o: { ...renderer.o, createElement: () => new NSVDetachedContainer() },
    };

    return (KeepAliveCore as any).setup(props, ctx);
  },
} as unknown as typeof KeepAliveCore;
