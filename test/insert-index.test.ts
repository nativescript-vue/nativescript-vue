import { describe, expect, it } from 'vitest';
import { ActionBar, h, nextTick, ref } from '../src';
import { mount } from './helpers';

describe('inserting a child at index 0', () => {
  it('keeps ActionItems in template order', async () => {
    const showFirst = ref(false);
    const { el } = mount({
      render: () =>
        h('Page', [
          h(ActionBar, null, () => [
            showFirst.value ? h('ActionItem', { key: 'a', text: 'A' }) : null,
            h('ActionItem', { key: 'b', text: 'B' }),
          ]),
        ]),
    });
    const actionBar = el.nativeView.actionBar;
    const titles = () =>
      actionBar.actionItems.getItems().map((i: any) => i.text);
    expect(titles()).toEqual(['B']);

    showFirst.value = true;
    await nextTick();
    expect(titles()).toEqual(['A', 'B']);
  });

  it('keeps Spans in template order', async () => {
    const showFirst = ref(false);
    const { el } = mount({
      render: () =>
        h('Label', [
          h('FormattedString', [
            showFirst.value ? h('Span', { key: 'a', text: 'a' }) : null,
            h('Span', { key: 'b', text: 'b' }),
          ]),
        ]),
    });
    const spans = () =>
      el.nativeView._children[0].spans.map((s: any) => s.text);
    expect(spans()).toEqual(['b']);

    showFirst.value = true;
    await nextTick();
    expect(spans()).toEqual(['a', 'b']);
  });

  it('keeps TabViewItems in template order', async () => {
    const showFirst = ref(false);
    const { el } = mount({
      render: () =>
        h('TabView', [
          showFirst.value ? h('TabViewItem', { key: 'a', title: 'A' }) : null,
          h('TabViewItem', { key: 'b', title: 'B' }),
        ]),
    });
    const titles = () => el.nativeView.items.map((i: any) => i.title);
    expect(titles()).toEqual(['B']);

    showFirst.value = true;
    await nextTick();
    expect(titles()).toEqual(['A', 'B']);
  });
});
