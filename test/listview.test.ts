import { describe, expect, it } from 'vitest';
import { h, nextTick, reactive, ref, ListView } from '../src';
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
