import { describe, expect, it } from 'vitest';
import { $closeModal, $showModal, createApp, h } from '../src';
import { Application, View } from './stubs/nativescript-core';

const Root = { render: () => h('StackLayout') };
const Modal = { render: () => h('Label', { text: 'modal' }) };

function startApp() {
  createApp(Root).start();
  return Application.getRootView() as View;
}

describe('$showModal / $closeModal', () => {
  it('resolves with the value passed to $closeModal', async () => {
    startApp();
    const result = $showModal(Modal);
    $closeModal('done');
    await expect(result).resolves.toBe('done');
  });

  it('forgets a modal the platform dismissed, so $closeModal targets the one below', async () => {
    const root = startApp();

    const first = $showModal(Modal);
    const second = $showModal(Modal);
    expect(root.__modals).toHaveLength(2);

    // the top modal goes away through the platform (back button, swipe)
    root.__modals[1].__dismissNatively();
    await expect(second).resolves.toBeUndefined();

    expect(() => $closeModal('first')).not.toThrow();
    await expect(first).resolves.toBe('first');
  });
});
