import { describe, expect, it } from 'vitest';
import { $navigateTo, createApp, h, onMounted } from '../src';
import { Application, Frame } from './stubs/nativescript-core';

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

  it('finds a frame in the root view when the frame stack is empty', () => {
    Frame._topmost = null;
    const App = {
      render: () => h('GridLayout', [h('Frame', { id: 'main' })]),
    };
    createApp(App).start();
    const frame = Application.getRootView()!._children[0] as Frame;

    $navigateTo(Details);
    expect(frame.currentPage?.content?.text).toBe('details');

    const Other = { render: () => h('Page', [h('Label', { text: 'other' })]) };
    $navigateTo(Other, { frame: 'main' });
    expect(frame.currentPage?.content?.text).toBe('other');
  });
});
