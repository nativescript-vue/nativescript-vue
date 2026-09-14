import {
  Application,
  BackstackEntry,
  EventData,
  Frame,
  NavigationEntry,
  Page,
  ViewBase,
} from '@nativescript/core';
import { App, Component, Ref, nextTick, unref } from '@vue/runtime-core';
import { NSVElement, NSVRoot } from '../dom';
import { CreateNativeViewProps, createNativeView } from '../runtimeHelpers';

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
    $navigateTo: <P = any>(
      target: Component<P>,
      options?: NavigateToOptions<P>,
    ) => Page;
    $navigateBack: (options?: NavigateBackOptions) => Promise<void>;
  }
}

type ResolvableFrame = string | Ref | NSVElement | Frame | undefined;

export type NavigateToOptions<P = any> = NavigationEntry & {
  props?: CreateNativeViewProps<P>;
  frame?: ResolvableFrame;
};

export type NavigateBackOptions = {
  frame?: ResolvableFrame;
  /**
   * Backstack entry or page to go back to, unwinding every page above it.
   * Pages are what $navigateTo returns; entries come from frame.backStack.
   */
  to?: BackstackEntry | Page;
};

/**
 * @internal
 */
export function install(app: App) {
  app.config.globalProperties.$navigateTo = $navigateTo;
  app.config.globalProperties.$navigateBack = $navigateBack;
}

function resolveFrame(frame?: ResolvableFrame): Frame | undefined {
  if (!frame) {
    return Frame.topmost() ?? findFrame(() => true);
  }

  const ob = unref(frame);

  if (ob instanceof Frame) {
    return ob;
  }

  if (ob instanceof NSVElement) {
    return ob.nativeView;
  }

  return (
    Frame.getFrameById(ob) ?? findFrame((candidate) => candidate.id === ob)
  );
}

/**
 * Core's frame stack only lists frames that have navigated, so it is empty
 * after Android recreates the activity, and getFrameById misses frames that
 * never navigated. Walk the displayed views instead, topmost modal first.
 */
function findFrame(match: (frame: Frame) => boolean): Frame | undefined {
  const root = Application.getRootView();
  if (!root) {
    return undefined;
  }

  const roots = [...(root._getRootModalViews?.() ?? []).reverse(), root];
  for (const view of roots) {
    const frame = findFrameIn(view, match);
    if (frame) {
      return frame;
    }
  }
}

function findFrameIn(
  view: ViewBase,
  match: (frame: Frame) => boolean,
): Frame | undefined {
  if (view instanceof Frame && match(view)) {
    return view;
  }

  let found: Frame | undefined;
  view.eachChild((child) => {
    found = findFrameIn(child, match);
    return !found;
  });
  return found;
}

export function $navigateTo<P = any>(
  target: Component<P>,
  options?: NavigateToOptions<P>,
): Page {
  try {
    const frame = resolveFrame(options?.frame);

    if (!frame) {
      throw new Error('Failed to resolve frame. Make sure your frame exists.');
    }

    const root = new NSVRoot();
    let isReloading = false;

    const disposeCallback = (args: EventData) => {
      const page = args.object as Page;

      // if we are reloading, don't unmount the view, as the reload will unmount/remount it.
      if (!isReloading && view) {
        page.off(ViewBase.disposeNativeViewEvent, disposeCallback);
        view.unmount();
        view = null;
      }
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
      view.nativeView.off(ViewBase.disposeNativeViewEvent, disposeCallback);
      view.nativeView.on(ViewBase.disposeNativeViewEvent, disposeCallback);

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
    view.nativeView.off(ViewBase.disposeNativeViewEvent, disposeCallback);
    view.nativeView.on(ViewBase.disposeNativeViewEvent, disposeCallback);

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

export async function $navigateBack(options?: NavigateBackOptions) {
  const frame = resolveFrame(options?.frame);

  if (!frame) {
    throw new Error('Failed to resolve frame. Make sure your frame exists.');
  }

  if (!frame.canGoBack()) {
    return;
  }

  frame.goBack(resolveBackstackEntry(frame, options?.to));
}

function resolveBackstackEntry(
  frame: Frame,
  to?: BackstackEntry | Page,
): BackstackEntry | undefined {
  if (!to) {
    return undefined;
  }

  const entry =
    to instanceof Page
      ? frame.backStack.find((candidate) => candidate.resolvedPage === to)
      : to;

  if (!entry || !frame.backStack.includes(entry)) {
    throw new Error(
      'Failed to navigate back: the target is not in the backstack.',
    );
  }

  return entry;
}
