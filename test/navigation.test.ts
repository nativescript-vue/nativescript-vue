import { describe, expect, it, vi } from 'vitest';
import {
  $navigateBack,
  $navigateTo,
  createApp,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
} from '../src';
import { Application, Frame, ViewBase } from './stubs/nativescript-core';

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

function createWindow() {
  const window = new ViewBase();
  window.state = 'attached';
  return window;
}

function closeWindow(window: ViewBase) {
  window.notify({ eventName: 'close', object: window });
  window.state = 'closed';
}

describe('navigated page native UI disposal', () => {
  it('keeps apps reactive through window detach, then unmounts a discarded page once', async () => {
    const frame = new Frame();
    Frame._topmost = frame;
    const window = createWindow();
    frame.getNativeWindow = () => window;
    createApp({ render: () => h('Frame') }).start();
    const count = ref(1);
    const unmounted = vi.fn();
    const component = {
      setup() {
        onUnmounted(unmounted);
        return () => h('Page', [h('Label', { text: String(count.value) })]);
      },
    };
    const first = $navigateTo(component);
    const second = $navigateTo(component);
    // Core tears down native UI before reporting the detached state.
    first.notify({ eventName: ViewBase.disposeNativeViewEvent, object: first });
    second.notify({
      eventName: ViewBase.disposeNativeViewEvent,
      object: second,
    });
    window.state = 'detached';
    await nextTick();
    expect(unmounted).not.toHaveBeenCalled();
    window.state = 'attached';
    count.value = 2;
    await nextTick();
    expect(first.content.text).toBe('2');
    expect(second.content.text).toBe('2');

    // Native disposal can precede the frame updating its current entry.
    second.notify({
      eventName: ViewBase.disposeNativeViewEvent,
      object: second,
    });
    frame.goBack();
    await nextTick();
    expect(unmounted).toHaveBeenCalledOnce();
    count.value = 3;
    await nextTick();
    expect(first.content.text).toBe('3');
  });

  it('unmounts retained history when its window closes permanently', async () => {
    const frame = new Frame();
    Frame._topmost = frame;
    const window = createWindow();
    frame.getNativeWindow = () => window;
    createApp({ render: () => h('Frame') }).start();
    const unmounted = vi.fn();
    const target = $navigateTo({
      setup() {
        onUnmounted(unmounted);
        return () => h('Page');
      },
    });
    target.notify({
      eventName: ViewBase.disposeNativeViewEvent,
      object: target,
    });
    window.state = 'closed';
    await nextTick();
    expect(unmounted).toHaveBeenCalledOnce();
  });

  it('unmounts a page when its root is released from the window', async () => {
    const frame = new Frame();
    Frame._topmost = frame;
    let window: ViewBase | undefined = createWindow();
    frame.getNativeWindow = () => window;
    createApp({ render: () => h('Frame') }).start();
    const unmounted = vi.fn();
    const target = $navigateTo({
      setup() {
        onUnmounted(unmounted);
        return () => h('Page');
      },
    });
    target.notify({
      eventName: ViewBase.disposeNativeViewEvent,
      object: target,
    });
    window = undefined;
    await nextTick();
    expect(unmounted).toHaveBeenCalledOnce();
  });

  it('unmounts retained pages when their detached window closes later', async () => {
    const frame = new Frame();
    Frame._topmost = frame;
    const window = createWindow();
    frame.getNativeWindow = () => window;
    createApp({ render: () => h('Frame') }).start();
    const unmounted = vi.fn();
    const component = {
      setup() {
        onUnmounted(unmounted);
        return () => h('Page');
      },
    };
    const first = $navigateTo(component);
    const second = $navigateTo(component);
    first.notify({ eventName: ViewBase.disposeNativeViewEvent, object: first });
    second.notify({
      eventName: ViewBase.disposeNativeViewEvent,
      object: second,
    });
    window.state = 'detached';
    await nextTick();
    expect(unmounted).not.toHaveBeenCalled();

    closeWindow(window);
    await nextTick();
    expect(unmounted).toHaveBeenCalledTimes(2);
  });

  it('stops watching the window once a retained page is discarded', async () => {
    const frame = new Frame();
    Frame._topmost = frame;
    const window = createWindow();
    frame.getNativeWindow = () => window;
    createApp({ render: () => h('Frame') }).start();
    const unmounted = vi.fn();
    const target = $navigateTo({
      setup() {
        onUnmounted(unmounted);
        return () => h('Page');
      },
    });
    $navigateTo({ render: () => h('Page') });
    target.notify({
      eventName: ViewBase.disposeNativeViewEvent,
      object: target,
    });
    await nextTick();
    expect(window._listeners.get('close')).toHaveLength(1);

    frame.backStack = [];
    target.notify({
      eventName: ViewBase.disposeNativeViewEvent,
      object: target,
    });
    await nextTick();
    expect(unmounted).toHaveBeenCalledOnce();
    expect(window._listeners.get('close')).toHaveLength(0);
  });
});
