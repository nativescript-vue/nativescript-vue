import { Application, ShowModalOptions, View } from '@nativescript/core';
import {
  App,
  Component,
  ComponentPublicInstance,
  Ref,
  unref,
  warn,
} from '@vue/runtime-core';
import { NSVElement, NSVRoot } from '../dom';
import { createNativeView } from '../runtimeHelpers';
import { isObject } from '@vue/shared';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * todo: update docblock
     */
    $showModal: <T = any>(
      component: Component,
      options?: ModalOptions,
    ) => Promise<T | false | undefined>;
    $closeModal: (arg: any) => void;
    $modal: {
      close: (arg: any) => void;
    };
  }
}

type ResolvableModalTarget = ComponentPublicInstance | NSVElement | View;

export interface ModalOptions extends Partial<ShowModalOptions> {
  props?: Record<string, any>;
  on?: Record<string, (...args: any[]) => any>;
  target?: ResolvableModalTarget;
}

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

export async function $showModal<T = any>(
  component: Component,
  options: ModalOptions = {},
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

    let view = createNativeView(component, options, {
      reload: reloadModal,
    });

    const closeCallback = (data?: T) => {
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
    const closeModal = (...args: any[]) => view.nativeView?.closeModal(...args);

    view.context.config.globalProperties.$closeModal = closeModal;
    view.context.config.globalProperties.$modal = { close: closeModal };

    view.mount(root);
    openModal();
  });
}
