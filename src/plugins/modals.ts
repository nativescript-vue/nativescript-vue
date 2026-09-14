import {
  Application,
  ShowModalOptions as CoreShowModalOptions,
  View,
} from '@nativescript/core';
import {
  App,
  Component,
  ComponentPublicInstance,
  Ref,
  unref,
  warn,
} from '@vue/runtime-core';
import { isObject } from '@vue/shared';
import { NSVElement, NSVRoot } from '../dom';
import { CreateNativeViewProps, createNativeView } from '../runtimeHelpers';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $showModal: <T = any, P = any>(
      component: Component<P>,
      options?: ShowModalOptions<P, T>,
    ) => Promise<T | false | undefined>;
    $closeModal: <T = any>(data: T, ...args: any[]) => void;
    $modal: { close: <T = any>(data: T, ...args: any[]) => void };
  }
}

type ResolvableModalTarget = ComponentPublicInstance | NSVElement | View;

export type ShowModalOptions<P = any, T = any> = Partial<
  Omit<CoreShowModalOptions, 'closeCallback'>
> & {
  closeCallback?: (data?: T, ...args: any[]) => void;
  props?: CreateNativeViewProps<P>;
  target?: ResolvableModalTarget;
};

/**
 * @internal
 */
export function install(app: App) {
  app.config.globalProperties.$showModal = $showModal;
}

function resolveModalTarget(
  target: Ref<ResolvableModalTarget> | ResolvableModalTarget,
): View | false {
  const ob = unref<ResolvableModalTarget>(target);

  if (ob instanceof NSVElement) {
    return ob.nativeView;
  } else if (ob instanceof View) {
    return ob;
  } else if (isObject(ob) && isObject(ob.$el)) {
    return ob.$el.nativeView;
  }

  return false;
}

const modalStack = [];

export async function $showModal<T = any, P = any>(
  component: Component<P>,
  options: ShowModalOptions<P, T> = {},
): Promise<T | false | undefined> {
  // presenting from a view that is already presenting fails on iOS, so a
  // modal opened while another is open is shown from the topmost one
  const modalTarget = resolveModalTarget(
    options.target ??
      modalStack.at(-1)?.nativeView ??
      Application.getRootView(),
  );

  if (!modalTarget) {
    if (__DEV__) {
      warn(`could not open modal because the target does not exist`);
    }
    return;
  }

  return new Promise((resolve, reject) => {
    let isResolved = false;
    let isReloading = false;
    let root = new NSVRoot();

    const reloadModal = () => {
      isReloading = true;
      closeModal();
      // reopening is done in `closeCallback`
    };

    let view = createNativeView(component, options.props, {
      reload: reloadModal,
    });

    const closeCallback = (data?: T, ...args: any) => {
      if (isResolved) return;

      if (isReloading) {
        view.unmount();
        view.mount(root);
        try {
          openModal({
            // A Transition/SharedTransition instance is single-use: its state
            // was consumed by the presentation that just closed. Re-presenting
            // with it leaves the new modal's dismissal completion permanently
            // unfired, so no later close (HMR or user) ever calls back.
            transition: undefined,
            animated: false,
          });
        } catch (err) {
          fail(err);
          return;
        }
        modalStack.push(view);
        isReloading = false;

        return;
      }

      isResolved = true;
      removeFromStack();
      view.unmount();
      view = null;

      // call the closeCallback if it exists with all arguments
      options.closeCallback?.(data, ...args);

      // resolve the promise with the first argument, since Promise.resolve() expects only one argument
      resolve(data);
    };

    const openModal = (additionalOptions?: Partial<ShowModalOptions>) => {
      modalTarget.showModal(view.nativeView, {
        ...options,
        context: null,
        closeCallback,
        ...additionalOptions,
      });
      // core refuses to present (target already presenting, not in the
      // window hierarchy) by tracing an error and returning; a successful
      // presentation always links the modal to its parent synchronously
      if (!view.nativeView._modalParent) {
        throw new Error(
          `Could not show modal: ${modalTarget.constructor.name} refused to ` +
            `present it. Close the modal it is already presenting, or pass a ` +
            `different target.`,
        );
      }
    };
    const removeFromStack = () => {
      const stackIndex = modalStack.indexOf(view);
      if (stackIndex > -1) {
        modalStack.splice(stackIndex, 1);
      }
    };
    const closeModal = (...args: any[]) => {
      removeFromStack();
      view?.nativeView?.closeModal(...args);
    };

    // clone the config and globalProperties to avoid mutating the root app's config/globalProperties
    const context = view.context;
    context.config = Object.assign({}, context.config);
    context.config.globalProperties = Object.assign(
      {},
      context.config.globalProperties,
      { $closeModal: closeModal, $modal: { close: closeModal } },
    );

    // a modal that never presented must not keep its app instance alive
    const fail = (err: unknown) => {
      isResolved = true;
      removeFromStack();
      view?.unmount();
      view = null;
      reject(err);
    };

    view.mount(root);
    try {
      openModal();
    } catch (err) {
      fail(err);
      return;
    }
    modalStack.push(view);
  });
}

export function $closeModal(...args) {
  const view = modalStack.at(-1);

  view?.context.config.globalProperties.$closeModal(...args);
}
