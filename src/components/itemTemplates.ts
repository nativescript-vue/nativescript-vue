import {
  Comment,
  Fragment,
  getCurrentInstance,
  h,
  ref,
  Slots,
  VNode,
} from '@vue/runtime-core';
import { View } from '@nativescript/core';

import { logger } from '../util/logger';

/** The context a list-style view's template slot receives for one item. */
export interface ItemContext {
  [key: string]: any;
  index: number;
  even: boolean;
  odd: boolean;
}

export interface ListItem<T = any> extends ItemContext {
  item: T;
}

export interface ItemContextOptions {
  /** Key the item is exposed under. Defaults to `item`. */
  alias?: string;
  /** Extra key the index is exposed under, on top of `index`. */
  indexAlias?: string;
}

export function createItemContext<T>(item: T, index: number): ListItem<T>;
export function createItemContext<T>(
  item: T,
  index: number,
  options: ItemContextOptions,
): ItemContext;
export function createItemContext(
  item: unknown,
  index: number,
  { alias = 'item', indexAlias }: ItemContextOptions = {},
): ItemContext {
  const ctx: ItemContext = {
    [alias]: item,
    index,
    even: index % 2 === 0,
    odd: index % 2 !== 0,
  };
  if (indexAlias) {
    ctx[indexAlias] = index;
  }
  return ctx;
}

/**
 * The element vnodes a template renders. Fragments are unwrapped because a
 * forwarded `<slot>` renders as one, and a cell needs an element to hand to
 * the native view.
 */
export function templateRoots(vnodes: VNode[]): VNode[] {
  return vnodes.flatMap((vnode) => {
    if (vnode.type === Comment) {
      return [];
    }
    if (vnode.type === Fragment) {
      return templateRoots(vnode.children as VNode[]);
    }
    return [vnode];
  });
}

export interface ItemTemplatesOptions<C extends ItemContext> {
  slots: Slots;
  /** Slot name for an item; `undefined` falls back to `default`. */
  selectTemplate?: (ctx: C) => string | undefined;
  /** Rendered when the selected slot yields no element. */
  fallback?: (ctx: C) => VNode;
  /** Used in template warnings. */
  componentName?: string;
}

export interface ItemTemplates<C extends ItemContext> {
  /** Value for the native view's `itemTemplates` property. */
  itemTemplates: { key: string; createView(): void }[];
  /** Slot name for an item; wrap this for the native `itemTemplateSelector`. */
  templateNameFor(ctx: C): string;
  /**
   * Renders the template for `ctx` and returns its native view, reusing the
   * cell behind `recycled` when the native view hands one back.
   */
  renderCell(ctx: C, recycled?: View): View;
  /**
   * Unmounts the cell behind a view the native view is discarding. Views
   * that never came from `renderCell` are ignored.
   */
  disposeCell(view: View | undefined): void;
  /** Vnodes of every realized cell; render them as the native element's children. */
  cellVNodes(): VNode[];
}

const CELL_ID = Symbol('cell_id');
let cellCount = 0;

interface CellData<C> {
  ctx: C;
  slotName: string;
}

/**
 * Drives a native view that recycles cells (ListView, CollectionView, Pager)
 * from a component's slots, one slot per template. Call it in `setup` and
 * render `cellVNodes()` as the children of the native element. The element
 * must be registered with `NSVViewFlags.NO_CHILDREN`: cells are patched by
 * Vue as part of this component's tree but placed by the native view, so
 * they must never be inserted as its children.
 *
 * Which native events trigger `renderCell` and `disposeCell`, and how the
 * view gets back to the native side, is the caller's business.
 */
export function useItemTemplates<C extends ItemContext = ListItem>(
  options: ItemTemplatesOptions<C>,
): ItemTemplates<C> {
  const { slots, selectTemplate, componentName = 'List' } = options;
  const fallback =
    options.fallback ?? ((ctx: C) => h('Label', { text: ctx.item }));

  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error('useItemTemplates() must be called inside setup().');
  }

  const itemTemplates = Object.keys(slots).map((key) => ({
    key,
    createView() {},
  }));

  const templateNameFor = (ctx: C) => selectTemplate?.(ctx) ?? 'default';

  const cells = ref<Record<string, CellData<C>>>({});

  function renderCell(ctx: C, recycled?: View): View {
    const id: string = recycled?.[CELL_ID] ?? `CELL_${cellCount++}`;

    cells.value[id] = { ctx, slotName: templateNameFor(ctx) };
    vm.update();

    const vnode = findByKey(vm.subTree, id);
    if (!vnode) {
      throw new Error(
        `${componentName} must render cellVNodes() inside its native element.`,
      );
    }

    const view: View = vnode.el.nativeView;
    view[CELL_ID] = id;
    return view;
  }

  function disposeCell(view: View | undefined) {
    const id: string | undefined = view?.[CELL_ID];
    if (id === undefined || !(id in cells.value)) {
      return;
    }
    delete cells.value[id];
    delete view[CELL_ID];
    vm.update();
  }

  function cellVNodes(): VNode[] {
    return Object.entries(cells.value).map(([id, cell]) => {
      const roots = templateRoots(slots[cell.slotName]?.(cell.ctx) ?? []);

      if (roots.length === 0) {
        logger.warn(
          `${componentName} template must contain at least one element.`,
        );
      } else if (roots.length > 1) {
        logger.warn(
          `${componentName} template must contain a single root element. Found: ${roots.length}. Only the first one will be used.`,
        );
      }

      const vnode = roots.at(0) ?? fallback(cell.ctx);
      // the key is how renderCell finds this cell after the update
      vnode.key = id;
      return vnode;
    });
  }

  return {
    itemTemplates,
    templateNameFor,
    renderCell,
    disposeCell,
    cellVNodes,
  };
}

function findByKey(vnode: VNode, key: string): VNode | undefined {
  if (vnode.key === key) {
    return vnode;
  }
  // cells are keyed vnodes in this component's own tree; a cell's content
  // (which may hold another list with cells of its own) is never searched
  if (!vnode.component && Array.isArray(vnode.children)) {
    for (const child of vnode.children as VNode[]) {
      const found = findByKey(child, key);
      if (found) {
        return found;
      }
    }
  }
}
