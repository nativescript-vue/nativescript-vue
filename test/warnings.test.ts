import { afterEach, describe, expect, it, vi } from 'vitest';
import { h, KeepAlive, nextTick, ref } from '../src';
import { mount } from './helpers';

const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
afterEach(() => warn.mockClear());

const warnings = () => warn.mock.calls.map((c) => String(c[0]));

describe('dev warnings', () => {
  it('warns when v-model is used on an element without model meta', () => {
    mount({ render: () => h('Label', { modelValue: 'x' }) });
    expect(warnings()).toEqual([
      expect.stringMatching(/v-model is not supported on <label>/),
    ]);
  });

  it('warns about unsupported v-model modifiers', () => {
    mount({
      render: () =>
        h('TextField', { modelValue: 'x', modelModifiers: { trim: true } }),
    });
    expect(warnings()).toEqual([expect.stringMatching(/modifiers \(\.trim\)/)]);
  });

  it('warns when the current Page is removed from a Frame', async () => {
    const show = ref(true);
    mount({
      render: () => h('Frame', [show.value ? h('Page', { key: 'a' }) : null]),
    });
    expect(warnings()).toEqual([]);

    show.value = false;
    await nextTick();
    expect(warnings()).toEqual([
      expect.stringMatching(/Removing the current <Page>/),
    ]);
  });

  it('renders KeepAlive children without caching and warns once', () => {
    const { el } = mount({
      render: () => h(KeepAlive, null, () => h('Label', { text: 'kept' })),
    });
    expect(el.nativeView.text).toBe('kept');
    expect(warnings()).toEqual([
      expect.stringMatching(/KeepAlive is not supported/),
    ]);

    mount({ render: () => h(KeepAlive, null, () => h('Label')) });
    expect(warnings()).toHaveLength(1);
  });
});
