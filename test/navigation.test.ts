import { describe, expect, it } from 'vitest';
import { $navigateTo, createApp, h, onMounted } from '../src';
import { Frame } from './stubs/nativescript-core';

const Details = { render: () => h('Page', [h('Label', { text: 'details' })]) };

describe('$navigateTo', () => {
  it('can be called from the root component mounted hook', () => {
    const frame = new Frame();
    Frame._topmost = frame;

    const App = {
      setup() {
        onMounted(() => {
          $navigateTo(Details);
        });
        return () => h('Frame');
      },
    };

    expect(() => createApp(App).start()).not.toThrow();
    expect(frame.currentPage?.content?.text).toBe('details');
  });
});
