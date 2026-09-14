import { describe, expect, it } from 'vitest';
import {
  defineComponent,
  h,
  KeepAlive,
  nextTick,
  onActivated,
  onDeactivated,
  onUnmounted,
  ref,
} from '../src';
import { elementChildren, mount, nativeChildren } from './helpers';

function counter(name: string, log: string[]) {
  return defineComponent({
    name,
    setup() {
      const count = ref(0);
      onActivated(() => log.push(`${name} activated`));
      onDeactivated(() => log.push(`${name} deactivated`));
      onUnmounted(() => log.push(`${name} unmounted`));
      return () =>
        h('Label', {
          text: `${name} ${count.value}`,
          onTap: () => count.value++,
        });
    },
  });
}

describe('KeepAlive', () => {
  it('keeps component state across deactivation and restores the native view in place', async () => {
    const log: string[] = [];
    const A = counter('A', log);
    const B = counter('B', log);
    const active = ref<'A' | 'B'>('A');

    const { el, app } = mount({
      render: () =>
        h('StackLayout', [
          h('Label', { text: 'head' }),
          h(KeepAlive, null, () => h(active.value === 'A' ? A : B)),
          h('Label', { text: 'tail' }),
        ]),
    });

    const labelA = el.childNodes[1];
    labelA.nativeView.notify({ eventName: 'tap' });
    await nextTick();
    expect(nativeChildren(el)).toEqual(['head', 'A 1', 'tail']);
    expect(log).toEqual(['A activated']);

    active.value = 'B';
    await nextTick();
    expect(nativeChildren(el)).toEqual(['head', 'B 0', 'tail']);
    expect(elementChildren(el)).toEqual(['head', 'B 0', 'tail']);
    expect(labelA.parentNode?.nodeType).toBe('detached');
    expect(labelA.nativeView.parent).toBeNull();
    expect(log).toEqual(['A activated', 'A deactivated', 'B activated']);

    active.value = 'A';
    await nextTick();
    expect(nativeChildren(el)).toEqual(['head', 'A 1', 'tail']);
    expect(el.childNodes[1]).toBe(labelA);
    expect(log).toEqual([
      'A activated',
      'A deactivated',
      'B activated',
      'B deactivated',
      'A activated',
    ]);

    app.unmount();
    expect(log).toEqual(expect.arrayContaining(['A unmounted', 'B unmounted']));
  });

  it('moves multi-root components out and back in order', async () => {
    const Pair = defineComponent({
      name: 'Pair',
      render: () => [h('Label', { text: 'p1' }), h('Label', { text: 'p2' })],
    });
    const show = ref(true);

    const { el } = mount({
      render: () =>
        h('StackLayout', [
          h(KeepAlive, null, () => (show.value ? h(Pair) : null)),
          h('Label', { text: 'tail' }),
        ]),
    });
    expect(nativeChildren(el)).toEqual(['p1', 'p2', 'tail']);

    show.value = false;
    await nextTick();
    expect(nativeChildren(el)).toEqual(['tail']);

    show.value = true;
    await nextTick();
    expect(nativeChildren(el)).toEqual(['p1', 'p2', 'tail']);
  });

  it('unmounts evicted entries from the cache', async () => {
    const log: string[] = [];
    const comps = ['A', 'B', 'C'].map((n) => counter(n, log));
    const index = ref(0);

    const { el } = mount({
      render: () =>
        h('StackLayout', [
          h(KeepAlive, { max: 2 }, () => h(comps[index.value])),
        ]),
    });

    index.value = 1;
    await nextTick();
    index.value = 2;
    await nextTick();
    expect(nativeChildren(el)).toEqual(['C 0']);
    expect(log).toContain('A unmounted');
    expect(log).not.toContain('B unmounted');
  });
});
