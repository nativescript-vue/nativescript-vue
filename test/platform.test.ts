import { describe, expect, it } from 'vitest';
import { Android, h, iOS, resolveComponent } from '../src';
import { __setPlatform } from './stubs/nativescript-core';
import { mount, nativeChildren } from './helpers';

const Tree = {
  render: () =>
    h('StackLayout', [
      h(Android, null, () => h('Label', { text: 'android' })),
      h(iOS, null, () => [
        h('Label', { text: 'ios 1' }),
        h('Label', { text: 'ios 2' }),
      ]),
      h('Label', { text: 'both' }),
    ]),
};

describe('platform components', () => {
  it('render their children on their own platform only', () => {
    __setPlatform('ios');
    expect(nativeChildren(mount(Tree).el)).toEqual(['ios 1', 'ios 2', 'both']);

    __setPlatform('android');
    expect(nativeChildren(mount(Tree).el)).toEqual(['android', 'both']);
    __setPlatform('ios');
  });

  it('resolve from templates by name', () => {
    expect(resolveComponent('Android', false)).toBe(Android);
    expect(resolveComponent('iOS', false)).toBe(iOS);
  });
});
