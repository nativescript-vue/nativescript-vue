import { App, Component, Ref, unref } from "@vue/runtime-core";
import { Frame, NavigationEntry, Page } from "@nativescript/core";
import { NSVElement, NSVRoot } from "../dom";
import { NavigatedData } from "@nativescript/core";
import { createNativeView } from "../runtimeHelpers";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    /**
     * todo: update docblock
     * Navigate to {target} component.
     *
     * The frame to navigate defaults to the topmost frame
     * @param target
     * @param options
     */
    $navigateTo: (
      target: Component,
      options?: NavigationOptions
    ) => Promise<any>;
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

function createNavigationRoot(cb: (view: any) => void) {
  const defaultRoot = new NSVRoot();

  // flag to indicate when we need to call resetRoot
  // usually happens when the root component is re-mounted (HMR)
  let shouldResetRoot = false;

  const appendChild = defaultRoot.appendChild.bind(defaultRoot);
  const removeChild = defaultRoot.removeChild.bind(defaultRoot);

  defaultRoot.removeChild = (el) => {
    removeChild(el);

    shouldResetRoot = true;
    // console.log("remove child", (el as NSVElement).tagName);
  };

  defaultRoot.appendChild = (el) => {
    appendChild(el);

    if (shouldResetRoot) {
      shouldResetRoot = false;
      // console.log("append child", (el as NSVElement).tagName);
      cb((el as NSVElement).nativeView);
    }
  };

  return defaultRoot;
}

function attachDisposeCallbacks(
  targetPage: Page,
  disposeCallback: (targetPage: Page) => void
) {
  // const handler = (args: NavigatedData) => {
  //   if (args.isBackNavigation) {
  //     console.log("navigatedFrom called.");
  //     targetPage.off("navigatedFrom", handler as any);
  //     disposeCallback();
  //   }
  // };
  // targetPage.on("navigatedFrom", handler);

  const dispose = targetPage.disposeNativeView;
  targetPage.disposeNativeView = () => {
    // console.log("dispose native view called.");
    disposeCallback(targetPage);
    dispose.call(targetPage);
  };
}

export async function $navigateTo(
  target: Component,
  options?: NavigationOptions
): Promise<Page> {
  options = Object.assign({}, options);
  // console.log("$navigateTo");

  try {
    const frame = resolveFrame(options.frame);

    if (!frame) {
      throw new Error("Failed to resolve frame. Make sure your frame exists.");
    }

    const cleanup = (page) => {
      if (page === latestPage) {
        // console.log("DISPOSE NAVIGATION APP");
        view.unmount()
        view = null
        navRoot = null
      } else {
        // console.log("no dispose we have replaced page");
      }
    };

    let navRoot = createNavigationRoot((newPage) => {
      latestPage = newPage;
      attachDisposeCallbacks(newPage, cleanup);
      // cache the original transition of the current page
      const originalTransition = frame.currentEntry.transition;
      // replace current page
      frame.replacePage({
        ...options,
        transition: {
          name: "fade",
          duration: 10,
        },
        create: () => newPage,
      });
      // reset the transition to the original one
      frame.once("navigatedTo", () => {
        frame.currentEntry.transition = originalTransition;
      });
    });

    let view = createNativeView<Page>(target, options.props)

    const targetPage = view.mount(navRoot)

    let latestPage = targetPage;
    attachDisposeCallbacks(targetPage, cleanup);

    frame.navigate({
      ...options,
      create: () => targetPage,
    });
    return targetPage;
  } catch (e) {
    console.error("[$navigateTo] Failed to navigate:\n\n");
    console.error(e, e.stack);
    throw e;
  }
}

export async function $navigateBack(options?: BackNavigationOptions) {
  const frame = resolveFrame(options ? options.frame : undefined);

  if (!frame) {
    throw new Error("Failed to resolve frame. Make sure your frame exists.");
  }

  if (!frame.canGoBack()) {
    return;
  }

  frame.goBack();
}
