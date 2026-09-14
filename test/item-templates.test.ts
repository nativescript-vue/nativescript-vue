import { describe, expect, it } from 'vitest';
import {
  Comment,
  Fragment,
  defineComponent,
  h,
  ref,
  registerElement,
  NSVViewFlags,
  createItemContext,
  templateRoots,
  useItemTemplates,
  type ListItem,
} from '../src';
import { View } from './stubs/nativescript-core';
import { mount } from './helpers';

class Carousel extends View {
  itemTemplates: any;
}
registerElement('Carousel', () => Carousel, {
  viewFlags: NSVViewFlags.NO_CHILDREN,
});

// A list-style component built on the composable: the native view would
// call `load` from its own loading event with the cell it wants to reuse.
const Slides = defineComponent({
  props: { items: Array, selector: Function },
  setup(props, ctx) {
    const { itemTemplates, renderCell, cellVNodes } = useItemTemplates({
      slots: ctx.slots,
      selectTemplate: (item) => props.selector?.(item),
      componentName: 'Slides',
    });
    ctx.expose({
      load: (index: number, recycled?: View) =>
        renderCell(createItemContext(props.items[index], index), recycled),
    });
    return () => h('Carousel', { itemTemplates }, cellVNodes());
  },
});

function mountSlides(props: Record<string, any>, slots: Record<string, any>) {
  const slides = ref<any>(null);
  const { el } = mount({
    render: () => h(Slides, { ref: slides, ...props }, slots),
  });
  return { el, load: slides.value.load as (i: number, recycled?: View) => any };
}

describe('useItemTemplates', () => {
  it('registers a native template per slot', () => {
    const { el } = mountSlides(
      { items: [] },
      { default: () => [], hero: () => [] },
    );
    expect(el.nativeView.itemTemplates.map((t: any) => t.key)).toEqual([
      'default',
      'hero',
    ]);
  });

  it('renders the selected template and keeps cells out of the native tree', () => {
    const { el, load } = mountSlides(
      {
        items: ['A', 'B'],
        selector: ({ index }: ListItem) => (index === 0 ? 'hero' : undefined),
      },
      {
        default: ({ item }: ListItem) => h('Label', { text: `d:${item}` }),
        hero: ({ item }: ListItem) => h('Label', { text: `h:${item}` }),
      },
    );
    expect(load(0).text).toBe('h:A');
    expect(load(1).text).toBe('d:B');
    expect(el.nativeView._children).toHaveLength(0);
  });

  it('reuses a recycled cell for a new item', () => {
    const { load } = mountSlides(
      { items: ['A', 'B'] },
      { default: ({ item }: ListItem) => h('Label', { text: item }) },
    );
    const first = load(0);
    const reused = load(1, first);
    expect(reused).toBe(first);
    expect(reused.text).toBe('B');
  });

  it('falls back to a label when the slot renders nothing', () => {
    const { load } = mountSlides({ items: ['A'] }, { default: () => [] });
    expect(load(0).text).toBe('A');
  });
});

describe('templateRoots', () => {
  it('skips comments and unwraps fragments', () => {
    const label = h('Label');
    const roots = templateRoots([
      h(Comment, 'v-if'),
      h(Fragment, [h(Comment), h(Fragment, [label])]),
    ]);
    expect(roots).toEqual([label]);
  });
});

describe('createItemContext', () => {
  it('exposes the item and index under the default keys', () => {
    expect(createItemContext('A', 1)).toEqual({
      item: 'A',
      index: 1,
      even: false,
      odd: true,
    });
  });

  it('supports aliases', () => {
    expect(
      createItemContext('A', 0, { alias: 'slide', indexAlias: '$index' }),
    ).toEqual({ slide: 'A', index: 0, $index: 0, even: true, odd: false });
  });
});
