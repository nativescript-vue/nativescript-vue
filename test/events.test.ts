import { describe, expect, it } from 'vitest';
import { h, isOn } from '../src';
import { mount } from './helpers';

describe('event key detection', () => {
  it('treats on + uppercase and on: as events, other on-prefixed keys as props', () => {
    expect(isOn('onTap')).toBe(true);
    expect(isOn('on:textChange')).toBe(true);
    expect(isOn('onboardingTitle')).toBe(false);
    expect(isOn('online')).toBe(false);
  });

  it('sets on-prefixed props as attributes instead of listeners', () => {
    const { el } = mount({
      render: () => h('Label', { onboardingTitle: 'hi', online: true }),
    });
    expect(el.nativeView.onboardingTitle).toBe('hi');
    expect(el.nativeView.online).toBe(true);
    expect(el.nativeView._listeners.size).toBe(0);
  });

  it('honors the Once modifier', () => {
    let calls = 0;
    const { el } = mount({
      render: () => h('Button', { onTapOnce: () => calls++ }),
    });
    el.dispatchEvent('tap');
    el.dispatchEvent('tap');
    expect(calls).toBe(1);
  });
});
