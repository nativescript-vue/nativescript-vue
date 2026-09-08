/**
 * Minimal stand-in for @nativescript/core so the renderer can run under
 * vitest. Only the surface the renderer touches is modelled: the view
 * tree, event listeners, and the layout/content-view child APIs.
 */
type Listener = (...args: any[]) => void;

export class ViewBase {
  static disposeNativeViewEvent = 'disposeNativeView';

  _parent: ViewBase | null = null;
  _children: ViewBase[] = [];
  _listeners = new Map<string, Listener[]>();
  style: Record<string, any> = {};
  text: any;
  className = '';
  [key: string]: any;

  get parent() {
    return this._parent;
  }

  get ['class']() {
    return this.className;
  }
  set ['class'](v: string) {
    this.className = v;
  }

  addEventListener(event: string, handler: Listener) {
    const list = this._listeners.get(event) ?? [];
    list.push(handler);
    this._listeners.set(event, list);
  }
  removeEventListener(event: string, handler?: Listener) {
    if (!handler) {
      this._listeners.delete(event);
      return;
    }
    const list = this._listeners.get(event) ?? [];
    this._listeners.set(
      event,
      list.filter((h) => h !== handler),
    );
  }
  on(event: string, handler: Listener) {
    this.addEventListener(event, handler);
  }
  off(event: string, handler?: Listener) {
    this.removeEventListener(event, handler);
  }
  once(event: string, handler: Listener) {
    const wrapped = (...args: any[]) => {
      this.removeEventListener(event, wrapped);
      handler(...args);
    };
    this.addEventListener(event, wrapped);
  }
  notify(data: { eventName: string; [key: string]: any }) {
    for (const h of [...(this._listeners.get(data.eventName) ?? [])]) {
      h(data);
    }
  }

  _addView(view: ViewBase, atIndex?: number) {
    if (view._parent) {
      throw new Error(
        `View already has a parent. View: ${view.constructor.name} Parent: ${view._parent.constructor.name}`,
      );
    }
    view._parent = this;
    if (typeof atIndex === 'number') {
      this._children.splice(atIndex, 0, view);
    } else {
      this._children.push(view);
    }
  }
  _removeView(view: ViewBase) {
    const i = this._children.indexOf(view);
    if (i > -1) this._children.splice(i, 1);
    view._parent = null;
  }
  _addChildFromBuilder(_name: string, value: any) {
    this._addView(value);
  }
  _onCssStateChange() {}
}

export class View extends ViewBase {
  _modalOptions: any = null;
  _modalParent: View | null = null;
  __modals: View[] = [];
  /** Mirrors core: a view already presenting refuses silently. */
  showModal(view: View, options: any) {
    if (this.__modals.length) {
      return;
    }
    view._modalOptions = options;
    view._modalParent = this;
    this.__modals.push(view);
  }
  closeModal(...args: any[]) {
    const options = this._modalOptions;
    const parent = this._modalParent;
    this._modalOptions = null;
    this._modalParent = null;
    if (parent) {
      parent.__modals = parent.__modals.filter((m) => m !== this);
    }
    options?.closeCallback?.(...args);
  }
  /** Simulates the platform dismissing the modal (back button, swipe). */
  __dismissNatively() {
    this.closeModal();
  }
}

export class LayoutBase extends View {
  addChild(child: View) {
    this._addView(child);
  }
  insertChild(child: View, atIndex: number) {
    this._addView(child, atIndex);
  }
  removeChild(child: View) {
    this._removeView(child);
  }
  getChildrenCount() {
    return this._children.length;
  }
  getChildAt(i: number) {
    return this._children[i];
  }
}

export class ContentView extends View {
  private _content: View | null = null;
  get content() {
    return this._content;
  }
  set content(value: View | null) {
    if (this._content) this._removeView(this._content);
    this._content = value;
    if (value) this._addView(value);
  }
}

export class AbsoluteLayout extends LayoutBase {}
export class DockLayout extends LayoutBase {}
export class FlexboxLayout extends LayoutBase {}
export class GridLayout extends LayoutBase {}
export class RootLayout extends LayoutBase {}
export class StackLayout extends LayoutBase {}
export class WrapLayout extends LayoutBase {}
export class ScrollView extends ContentView {}
export class Page extends ContentView {
  actionBar: any;
}

export class Frame extends View {
  static _topmost: Frame | null = null;
  static topmost() {
    return Frame._topmost;
  }
  static getFrameById() {
    return null;
  }
  currentPage: any;
  currentEntry: any = {};
  navigate(entry: any) {
    this.currentPage = entry.create();
    this.currentEntry = entry;
  }
  replacePage() {}
  canGoBack() {
    return false;
  }
  goBack() {}
}

export class ActionBar extends View {
  navigationButton: any = null;
  titleView: any = null;
  actionItems = {
    _items: [] as any[],
    getItems() {
      return [...this._items];
    },
    setItems(items: any[]) {
      this._items = [...items];
    },
    addItem(item: any) {
      this._items.push(item);
    },
    removeItem(item: any) {
      this._items = this._items.filter((i) => i !== item);
    },
  };
}
export class ActionItem extends View {}
export class NavigationButton extends ActionItem {}
export class TabView extends View {
  items: any[] | undefined;
}
export class TabViewItem extends View {}
export class FormattedString extends View {
  spans: any[] = [];
}
export class Span extends View {}
export class ListView extends View {
  items: any;
  itemTemplates: any;
  itemTemplateSelector: any;
  refresh() {
    this.refreshCount = (this.refreshCount ?? 0) + 1;
  }
}
export class ObservableArray<T = any> extends Array<T> {
  getItem(i: number) {
    return this[i];
  }
}

export class HtmlView extends View {}
export class WebView extends View {}
export class ActivityIndicator extends View {}
export class Button extends View {}
export class DatePicker extends View {}
export class Image extends View {}
export class Label extends View {}
export class ListPicker extends View {}
export class Placeholder extends View {}
export class Progress extends View {}
export class ProxyViewContainer extends LayoutBase {}
export class SearchBar extends View {}
export class SegmentedBar extends View {}
export class SegmentedBarItem extends View {}
export class Slider extends View {}
export class Switch extends View {
  checked = false;
}
export class TextField extends View {}
export class TextView extends View {}
export class TimePicker extends View {}

export let isAndroid = false;
export let isIOS = true;
export function __setPlatform(platform: 'android' | 'ios') {
  isAndroid = platform === 'android';
  isIOS = platform === 'ios';
}

export const Application = {
  _rootView: null as View | null,
  run(entry: { create(): View }) {
    this._rootView = entry.create();
  },
  resetRootView(entry: { create(): View }) {
    this._rootView = entry.create();
  },
  getRootView() {
    return this._rootView;
  },
};

export type EventData = { eventName: string; object: any };
export type ItemEventData = any;
export type NavigationEntry = any;
export type ShowModalOptions = any;
