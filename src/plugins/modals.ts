import {
  App,
  Component,
  ComponentInternalInstance,
  ComponentPublicInstance,
  Ref,
  warn,
} from "@vue/runtime-core";
import { Application, ShowModalOptions, View } from "@nativescript/core";
import { isObject } from "@vue/shared";
import { NSVElement } from "../dom";
import { createNativeView } from "../runtimeHelpers";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    /**
     * todo: update docblock
     */
    $showModal: <T = any>(
      component: Component,
      options?: ModalOptions
    ) => Promise<T | false | undefined>;
    $closeModal: (arg: any) => void;
    $modal: {
      close: (arg: any) => void
    };
  }
}

type ResolvableModalTarget =
  | Ref
  | ComponentInternalInstance
  | ComponentPublicInstance
  | NSVElement
  | View
  | any;

export interface ModalOptions extends Partial<ShowModalOptions> {
  props?: Record<string, any>;
  target?: ResolvableModalTarget;
}

/**
 * @internal
 */
export function install(app: App) {
  app.config.globalProperties.$showModal = $showModal;
}

function resolveModalTarget(target: ResolvableModalTarget): View | false {
  if (isObject(target) && isObject(target.$el)) {
    return target.$el.nativeView;
  } else if (target instanceof NSVElement) {
    return target.nativeView;
  } else if (target instanceof View) {
    return target;
  }

  return false;
}

export async function $showModal<T = any>(
  component: Component,
  options?: ModalOptions
): Promise<T | false | undefined> {
  options = Object.assign(
    {
      target: Application.getRootView(),
    },
    options
  );

  const modalTarget = resolveModalTarget(options.target);

  if (!modalTarget) {
    if (__DEV__) {
      warn(`could not open modal because the target does not exist`);
    }
    return;
  }

  return new Promise((resolve) => {
    let view = createNativeView(component, options.props);
    const closeModal = (...args: any[]) => modalContent.closeModal(...args);

    const closeCallback = (data?: T) => {
      view.unmount();
      view = null;

      resolve(data);
    };

    view.context.config.globalProperties.$closeModal = closeModal;
    view.context.config.globalProperties.$modal = { close: closeModal };

    const modalContent = view.mount();

    modalTarget.showModal(modalContent, {
      ...options,
      context: null,
      closeCallback,
    });
  });
}
