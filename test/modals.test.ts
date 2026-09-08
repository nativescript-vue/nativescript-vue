import { describe, expect, it } from 'vitest';
import { $closeModal, $showModal, createApp, h, onUnmounted } from '../src';
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
    const [firstView] = root.__modals;
    expect(firstView.__modals).toHaveLength(1);

    // the top modal goes away through the platform (back button, swipe)
    firstView.__modals[0].__dismissNatively();
    await expect(second).resolves.toBeUndefined();

    expect(() => $closeModal('first')).not.toThrow();
    await expect(first).resolves.toBe('first');
  });
});

describe('nested modals', () => {
  it('presents a modal opened while another is open from the open modal', async () => {
    const root = startApp();

    const outer = $showModal(Modal);
    expect(root.__modals).toHaveLength(1);
    const outerView = root.__modals[0];

    const inner = $showModal(Modal);
    expect(root.__modals).toHaveLength(1);
    expect(outerView.__modals).toHaveLength(1);

    $closeModal('inner');
    await expect(inner).resolves.toBe('inner');
    $closeModal('outer');
    await expect(outer).resolves.toBe('outer');
  });

  it('still honors an explicit target', async () => {
    startApp();
    const target = new View();
    const outer = $showModal(Modal);
    const inner = $showModal(Modal, { target });
    expect(target.__modals).toHaveLength(1);

    $closeModal();
    $closeModal();
    await Promise.all([outer, inner]);
  });
});

describe('refused presentation', () => {
  it('rejects and unmounts when the target refuses to present', async () => {
    const root = startApp();
    let unmounted = false;
    const Inner = {
      setup() {
        onUnmounted(() => (unmounted = true));
        return () => h('Label');
      },
    };

    const outer = $showModal(Modal);
    // root is already presenting, so this cannot be shown from it
    const refused = $showModal(Inner, { target: root });

    await expect(refused).rejects.toThrow(/refused to present/);
    expect(unmounted).toBe(true);

    $closeModal('outer');
    await expect(outer).resolves.toBe('outer');
  });
});
