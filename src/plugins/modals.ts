import {
  App,
  Component,
  ComponentInternalInstance,
  ComponentPublicInstance,
  h,
  Ref,
  warn,
} from "@vue/runtime-core";
import { Application, Page, ShowModalOptions, View } from "@nativescript/core";
import { isObject } from "@vue/shared";
import { NSVElement, NSVRoot } from "../dom";
import { rootContext } from '../runtimeHelpers'
import { renderer } from '../renderer'

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    /**
     * todo: update docblock
     */
    $showModal: <T = any>(
      component: Component,
      options?: ModalOptions
    ) => Promise<T | false | undefined>;
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
    let container = new NSVRoot();

    const closeCallback = (data?: T) => {
      renderer.render(null, container);
      container = null;

      resolve(data);
    };

    let vnode = h(component, options.props)

    vnode.appContext = Object.assign({}, rootContext)
    vnode.appContext.config.globalProperties.$modal = {
      close: (...args: any[]) => modalContent.closeModal(...args)
    }

    renderer.render(vnode, container);

    const modalContent = vnode.el.nativeView as Page

    modalTarget.showModal(modalContent, {
      ...options,
      context: null,
      closeCallback,
    });
  });
}
