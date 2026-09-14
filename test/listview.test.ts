import { describe, expect, it } from 'vitest';
import {
  defineComponent,
  h,
  nextTick,
  reactive,
  ref,
  renderSlot,
  ListView,
  type ListItem,
} from '../src';
import { ObservableArray } from './stubs/nativescript-core';
import { mount } from './helpers';

describe('ListView', () => {
  it('refreshes when a reactive array is mutated in place', async () => {
    const items = reactive(['A', 'B']);
    const { el } = mount({ render: () => h(ListView, { items }) });
    expect(el.nativeView.refreshCount).toBeUndefined();

    items.push('C');
    await nextTick();
    expect(el.nativeView.refreshCount).toBe(1);

    items.splice(0, 1);
    await nextTick();
    expect(el.nativeView.refreshCount).toBe(2);
  });

  it('refreshes when the items array is replaced', async () => {
    const items = ref(['A']);
    const { el } = mount({ render: () => h(ListView, { items: items.value }) });

    items.value = ['B'];
    await nextTick();
    expect(el.nativeView.refreshCount).toBe(1);
  });

  it('leaves refreshing to ObservableArray', async () => {
    const items = ref(new ObservableArray('A'));
    const { el } = mount({ render: () => h(ListView, { items: items.value }) });

    items.value.push('B');
    await nextTick();
    expect(el.nativeView.refreshCount).toBeUndefined();
  });
});

describe('ListView cells', () => {
  it('renders the slot template for each loaded item', () => {
    const { el } = mount({
      render: () =>
        h(
          ListView,
          { items: ['A', 'B'] },
          {
            default: ({ item, index }: { item: string; index: number }) =>
              h('Label', { text: `${index}:${item}` }),
          },
        ),
    });
    expect(el.nativeView._listeners.has('itemLoading')).toBe(true);

    const event: any = {
      eventName: 'itemLoading',
      object: el.nativeView,
      index: 1,
    };
    el.nativeView.notify(event);
    expect(event.view?.text).toBe('1:B');
  });
});

describe('ListView slot forwarding', () => {
  function load(el: any, index: number) {
    const event: any = {
      eventName: 'itemLoading',
      object: el.nativeView,
      index,
    };
    el.nativeView.notify(event);
    return event.view;
  }

  // A wrapper that forwards every slot it receives, plus a fallback default
  // template, the way `<template v-for="(_, name) in $slots" #[name]="scope">
  // <slot :name="name" v-bind="scope" /></template>` compiles.
  const Wrapper = defineComponent({
    props: { items: Array, itemTemplateSelector: Function },
    setup(props, { slots }) {
      return () =>
        h(
          ListView,
          {
            items: props.items,
            itemTemplateSelector: props.itemTemplateSelector,
          },
          {
            ...Object.fromEntries(
              Object.keys(slots).map((name) => [
                name,
                (scope: any) => [renderSlot(slots, name, scope)],
              ]),
            ),
            default: (scope: any) => [
              renderSlot(slots, 'default', scope, () => [
                h('Label', { text: `fallback:${scope.item}` }),
              ]),
            ],
          },
        );
    },
  });

  it('renders templates forwarded through a wrapper component', () => {
    const { el } = mount({
      render: () =>
        h(
          Wrapper,
          {
            items: ['A', 'B'],
            itemTemplateSelector: ({ index }: ListItem) =>
              index === 0 ? 'image' : 'default',
          },
          {
            image: ({ item }: ListItem) =>
              h('Label', { text: `image:${item}` }),
          },
        ),
    });

    expect(load(el, 0)?.text).toBe('image:A');
    expect(load(el, 1)?.text).toBe('fallback:B');
  });

  it('registers forwarded slot names as native templates', () => {
    const { el } = mount({
      render: () =>
        h(
          Wrapper,
          { items: ['A'] },
          { image: () => h('Label'), 'no-image': () => h('Label') },
        ),
    });
    expect(el.nativeView.itemTemplates.map((t: any) => t.key).sort()).toEqual([
      'default',
      'image',
      'no-image',
    ]);
  });
});
