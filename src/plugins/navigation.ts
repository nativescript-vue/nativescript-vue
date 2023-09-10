import { Frame, NavigationEntry, Page } from '@nativescript/core';
import { App, Component, Ref, nextTick, unref } from '@vue/runtime-core';
import { NSVElement, NSVRoot } from '../dom';
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
  options?: NavigationOptions,
): Page {
  try {
    const frame = resolveFrame(options?.frame);

    if (!frame) {
      throw new Error('Failed to resolve frame. Make sure your frame exists.');
    }

    const root = new NSVRoot();
    let isReloading = false;

    const attachDisposeCallback = (page: Page) => {
      const dispose = page.disposeNativeView;

      page.disposeNativeView = () => {
        dispose.call(page);

        // if we are reloading, don't unmount the view, as the reload will unmount/remount it.
        if (!isReloading) {
          view.unmount();
          view = null;
        }
      };
    };
    const reloadPage = () => {
      if (isReloading) {
        return;
      }

      // if the page we are reloading is not the current page, wait for it to be navigated to
      if (frame.currentPage !== view.nativeView) {
        view.nativeView.once('navigatedTo', () => {
          nextTick(() => {
            reloadPage();
          });
        });
        return;
      }

      isReloading = true;
      view.unmount();
      view.mount(root);
      attachDisposeCallback(view.nativeView);

      const originalTransition = frame.currentEntry.transition;
      // replace current page
      frame.replacePage({
        ...options,
        transition: {
          name: 'fade',
          duration: 10,
        },
        create: () => view.nativeView,
      });
      // reset the transition to the original one
      frame.once('navigatedTo', () => {
        frame.currentEntry.transition = originalTransition;
        isReloading = false;
      });
    };

    let view = createNativeView<Page>(target, options?.props, {
      /**
       * Called by @vue/runtime-core when the component is reloaded during HMR.
       */
      reload: reloadPage,
    });

    view.mount(root);
    attachDisposeCallback(view.nativeView);

    frame.navigate({
      ...options,
      create: () => view.nativeView,
    });

    return view.nativeView;
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
