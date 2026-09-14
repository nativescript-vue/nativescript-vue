import { describe, expect, it } from 'vitest';
import { $navigateBack, $navigateTo, createApp, h, onMounted } from '../src';
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

describe('$navigateBack', () => {
  function page(text: string) {
    return { render: () => h('Page', [h('Label', { text })]) };
  }

  it('unwinds to a page returned by $navigateTo', async () => {
    const frame = new Frame();
    Frame._topmost = frame;
    createApp({ render: () => h('Frame') }).start();

    const first = $navigateTo(page('1'));
    $navigateTo(page('2'));
    $navigateTo(page('3'));
    expect(frame.backStack).toHaveLength(2);

    await $navigateBack({ to: first });
    expect(frame.currentPage.content.text).toBe('1');
    expect(frame.backStack).toHaveLength(0);
  });

  it('accepts a backstack entry and rejects pages that are not behind', async () => {
    const frame = new Frame();
    Frame._topmost = frame;
    createApp({ render: () => h('Frame') }).start();

    $navigateTo(page('1'));
    $navigateTo(page('2'));
    const third = $navigateTo(page('3'));

    await expect($navigateBack({ to: third })).rejects.toThrow(
      /not in the backstack/,
    );

    await $navigateBack({ to: frame.backStack[1] });
    expect(frame.currentPage.content.text).toBe('2');
  });
});
