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
  const modalTarget = resolveModalTarget(
    options.target ?? Application.getRootView(),
  );

  if (!modalTarget) {
    if (__DEV__) {
      warn(`could not open modal because the target does not exist`);
    }
    return;
  }

  return new Promise((resolve) => {
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
        openModal({
          // todo: for this to work nicely, we'd need to add `animated: false` to `closeModal` as well
          // but not currently possible without a core change.
          // animated: false,
        });
        isReloading = false;

        return;
      }

      isResolved = true;
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
    };
    const closeModal = (...args: any[]) => {
      // remove view from modalStack
      modalStack.splice(modalStack.indexOf(view), 1);

      view.nativeView?.closeModal(...args);
    };

    // clone the config and globalProperties to avoid mutating the root app's config/globalProperties
    const context = view.context;
    context.config = Object.assign({}, context.config);
    context.config.globalProperties = Object.assign(
      {},
      context.config.globalProperties,
      { $closeModal: closeModal, $modal: { close: closeModal } },
    );

    view.mount(root);
    openModal();
    modalStack.push(view);
  });
}

export function $closeModal(...args) {
  const view = modalStack.at(-1);

  view?.context.config.globalProperties.$closeModal(...args);
}
