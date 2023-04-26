import { Frame, NavigationEntry, Page } from '@nativescript/core';
import { App, Component, Ref, nextTick, unref } from '@vue/runtime-core';
import { NSVElement } from '../dom';
import { createNativeView } from '../runtimeHelpers';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * todo: update docblock
     * Navigate to {target} component.
     *
     * The frame to navigate defaults to the topmost frame
     * @param target
     * @param options
     */
    $navigateTo: (target: Component, options?: NavigationOptions) => Page;
    $navigateBack: (options?: NavigationOptions) => void;
  }
}

type ResolvableFrame = string | Ref | NSVElement | Frame | undefined;

export interface NavigationOptions extends NavigationEntry {
  props?: Record<string, any>;
  frame?: ResolvableFrame;
}

export interface BackNavigationOptions {
  frame?: ResolvableFrame;
}

/**
 * @internal
 */
export function install(app: App) {
  app.config.globalProperties.$navigateTo = $navigateTo;
  app.config.globalProperties.$navigateBack = $navigateBack;
}

function resolveFrame(frame?: ResolvableFrame): Frame {
  if (!frame) {
    return Frame.topmost();
  }

  const ob = unref(frame);

  if (ob instanceof Frame) {
    return ob;
  }

  if (ob instanceof NSVElement) {
    return ob.nativeView;
  }

  // todo: either change core Frame to add frames to the stack when they are created
  // or do as we did in 2.x - handle a Map of frames.
  // right now, empty frames can't be navigated as they are not recognized by `getFrameById`
  return Frame.getFrameById(ob);
}

export function $navigateTo(
  target: Component,
  options?: NavigationOptions
): Page {
  try {
    const frame = resolveFrame(options?.frame);

    if (!frame) {
      throw new Error('Failed to resolve frame. Make sure your frame exists.');
    }

    let view = createNativeView<Page>(target, options?.props);

    view.mount();

    const page = view.nativeView;
    const dispose = page.disposeNativeView;

    page.disposeNativeView = () => {
      dispose.call(page);

      nextTick(() => {
        view.unmount();
        view = null;
      });
    };

    frame.navigate({
      ...options,
      create: () => page,
    });

    return page;
  } catch (e) {
    console.error('[$navigateTo] Failed to navigate:\n\n');
    console.error(e, e.stack);
    throw e;
  }
}

export async function $navigateBack(options?: BackNavigationOptions) {
  const frame = resolveFrame(options?.frame);

  if (!frame) {
    throw new Error('Failed to resolve frame. Make sure your frame exists.');
  }

  if (!frame.canGoBack()) {
    return;
  }

  frame.goBack();
}
