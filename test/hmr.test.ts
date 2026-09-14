import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  $closeModal,
  $navigateTo,
  $showModal,
  createApp,
  h,
  ref,
} from '../src';
import { Application, Frame } from './stubs/nativescript-core';

const hmr = (globalThis as any).__VUE_HMR_RUNTIME__;
vi.spyOn(console, 'warn').mockImplementation(() => {});
const resetSpy = vi.spyOn(Application, 'resetRootView');
afterEach(() => resetSpy.mockClear());

let hmrId = 0;

/** Shape vue-loader emits: render lives on the component, not in setup. */
function startRootApp() {
  const id = `root-${hmrId++}`;
  const Root = {
    __hmrId: id,
    render: () => h('Frame', [h('Page', [h('Label', { text: 'v1' })])]),
  };
  hmr.createRecord(id, Root);
  createApp(Root).start();
  const frame = Application.getRootView() as Frame;
  Frame._topmost = frame;
  const rootPageLabel = () =>
    (frame.backStack[0] ?? frame.currentPage).content.text;
  const reloadRoot = () =>
    hmr.reload(id, {
      ...Root,
      render: () => h('Frame', [h('Page', [h('Label', { text: 'v2' })])]),
    });
  return { frame, rootPageLabel, reloadRoot };
}

const Details = { render: () => h('Page', [h('Label', { text: 'details' })]) };
const Modal = { render: () => h('Label', { text: 'modal' }) };

describe('root component hot reload', () => {
  it('remounts the root when the user is on the root page', () => {
    const { frame, reloadRoot } = startRootApp();
    reloadRoot();

    expect(resetSpy).toHaveBeenCalledTimes(1);
    const root = Application.getRootView() as Frame;
    expect(root).not.toBe(frame);
    expect(root.currentPage.content.text).toBe('v2');
  });

  it('keeps the navigated page and updates the root in place', () => {
    const { frame, rootPageLabel, reloadRoot } = startRootApp();
    $navigateTo(Details);
    expect(frame.currentPage.content.text).toBe('details');

    reloadRoot();

    expect(resetSpy).not.toHaveBeenCalled();
    expect(Application.getRootView()).toBe(frame);
    expect(frame.currentPage.content.text).toBe('details');
    expect(frame.backStack).toHaveLength(1);
    expect(rootPageLabel()).toBe('v2');
  });

  it('treats a clearHistory navigation as being away from the root', () => {
    const { frame, reloadRoot } = startRootApp();
    $navigateTo(Details, { clearHistory: true });
    expect(frame.backStack).toHaveLength(0);

    reloadRoot();

    expect(resetSpy).not.toHaveBeenCalled();
    expect(frame.currentPage.content.text).toBe('details');
  });

  it('keeps an open modal', async () => {
    const { frame, reloadRoot } = startRootApp();
    const modal = $showModal(Modal);
    expect(frame.__modals).toHaveLength(1);

    reloadRoot();

    expect(resetSpy).not.toHaveBeenCalled();
    expect(frame.__modals).toHaveLength(1);
    $closeModal('done');
    await expect(modal).resolves.toBe('done');
  });

  it('keeps state for a setup-returned render even though it cannot refresh it', () => {
    const id = `root-${hmrId++}`;
    const count = ref(3);
    const Root = {
      __hmrId: id,
      setup: () => () =>
        h('Frame', [h('Page', [h('Label', { text: `n${count.value}` })])]),
    };
    hmr.createRecord(id, Root);
    createApp(Root).start();
    const frame = Application.getRootView() as Frame;
    Frame._topmost = frame;
    $navigateTo(Details);

    expect(() =>
      hmr.reload(id, {
        ...Root,
        setup: () => () =>
          h('Frame', [h('Page', [h('Label', { text: 'new' })])]),
      }),
    ).not.toThrow();

    expect(resetSpy).not.toHaveBeenCalled();
    expect(frame.currentPage.content.text).toBe('details');
    expect(frame.backStack[0].content.text).toBe('n3');
  });
});
