import { describe, expect, it } from 'vitest';
import { h, nextTick, ref } from '../src';
import { __setPlatform } from './stubs/nativescript-core';
import { elementChildren, mount, nativeChildren } from './helpers';

describe('renderer', () => {
  it('mounts a component tree into native views', () => {
    const { el } = mount({
      render: () =>
        h('StackLayout', [
          h('Label', { text: 'A' }),
          h('Label', { text: 'B' }),
        ]),
    });

    expect(el.tagName).toBe('stacklayout');
    expect(nativeChildren(el)).toEqual(['A', 'B']);
  });

  it('patches attributes reactively', async () => {
    const text = ref('one');
    const { el } = mount({ render: () => h('Label', { text: text.value }) });
    expect(el.nativeView.text).toBe('one');

    text.value = 'two';
    await nextTick();
    expect(el.nativeView.text).toBe('two');
  });

  it('applies platform-prefixed attributes only on the matching platform', () => {
    __setPlatform('ios');
    const { el } = mount({
      render: () =>
        h('Label', { 'ios:text': 'ios', 'android:text': 'android' }),
    });
    expect(el.nativeView.text).toBe('ios');
  });

  it('wires event listeners and unwires them when removed', async () => {
    const calls: string[] = [];
    const handler = ref<(() => void) | null>(() => calls.push('tap'));
    const { el } = mount({
      render: () => h('Button', { onTap: handler.value }),
    });

    el.dispatchEvent('tap');
    expect(calls).toEqual(['tap']);

    handler.value = null;
    await nextTick();
    el.dispatchEvent('tap');
    expect(calls).toEqual(['tap']);
  });

  it('maps v-model to the registered prop and event', async () => {
    const checked = ref(false);
    const { el } = mount({
      render: () =>
        h('Switch', {
          modelValue: checked.value,
          'onUpdate:modelValue': (v: boolean) => (checked.value = v),
        }),
    });
    expect(el.nativeView.checked).toBe(false);

    el.nativeView.checked = true;
    el.nativeView.notify({ eventName: 'checkedChange', object: el.nativeView });
    expect(checked.value).toBe(true);
  });

  it('patches style objects and undoes removed properties', async () => {
    const style = ref<Record<string, any>>({
      color: 'red',
      textAlign: 'center',
    });
    const { el } = mount({ render: () => h('Label', { style: style.value }) });
    expect(el.nativeView.style.color).toBe('red');
    expect(el.nativeView.style.textAlignment).toBe('center');

    style.value = { color: 'blue' };
    await nextTick();
    expect(el.nativeView.style.color).toBe('blue');
    expect(el.nativeView.style.textAlignment).toBeUndefined();
  });

  it('renders v-for lists', async () => {
    const items = ref(['A', 'B', 'C']);
    const { el } = mount({
      render: () =>
        h(
          'StackLayout',
          items.value.map((t) => h('Label', { key: t, text: t })),
        ),
    });
    expect(nativeChildren(el)).toEqual(['A', 'B', 'C']);

    items.value = ['A', 'C'];
    await nextTick();
    expect(nativeChildren(el)).toEqual(['A', 'C']);
  });
});

describe('keyed reorders', () => {
  function mountList(initial: string[]) {
    const items = ref(initial);
    const { el } = mount({
      render: () =>
        h(
          'StackLayout',
          items.value.map((t) => h('Label', { key: t, text: t })),
        ),
    });
    return {
      el,
      async set(next: string[]) {
        items.value = next;
        await nextTick();
        expect(nativeChildren(el)).toEqual(next);
        expect(elementChildren(el)).toEqual(next);
      },
    };
  }

  it('moves an item to the end and keeps later appends after it', async () => {
    const list = mountList(['A', 'B', 'C', 'D']);
    await list.set(['B', 'C', 'D', 'A']);
    await list.set(['B', 'C', 'D', 'A', 'E']);
  });

  it('moves an item forward past its siblings', async () => {
    const list = mountList(['A', 'B', 'C', 'D']);
    await list.set(['B', 'C', 'A', 'D']);
    await list.set(['B', 'A', 'C', 'D']);
  });

  it('reverses and shuffles', async () => {
    const list = mountList(['A', 'B', 'C', 'D', 'E']);
    await list.set(['E', 'D', 'C', 'B', 'A']);
    await list.set(['C', 'A', 'E', 'B', 'D']);
    await list.set(['A', 'B', 'C', 'D', 'E']);
  });

  it('keeps sibling lookups consistent after moves', async () => {
    const list = mountList(['A', 'B', 'C']);
    await list.set(['B', 'C', 'A']);
    const [b, c, a] = list.el.childNodes.filter(
      (n) => n.nodeType === 'element',
    );
    expect(a.prevSibling).toBe(c);
    expect(b.nextSibling).toBe(c);
  });
});
