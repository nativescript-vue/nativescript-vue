import { describe, expect, it } from 'vitest';
import { $closeModal, $showModal, createApp, h, onUnmounted } from '../src';
import { Application, View } from './stubs/nativescript-core';
import { mount } from './helpers';

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

describe('modal hot reload', () => {
  const hmr = (globalThis as any).__VUE_HMR_RUNTIME__;

  it('re-presents the new modal only after the old one is fully closed', async () => {
    const root = startApp();
    const ReloadableModal = {
      __hmrId: 'modal-hmr',
      render: () => h('Label', { text: 'v1' }),
    };
    hmr.createRecord('modal-hmr', ReloadableModal);

    const result = $showModal(ReloadableModal, { animated: true });
    const oldView = root.__modals[0];
    expect(oldView.text).toBe('v1');

    let presentedDuringTeardown = false;
    root.showModal = new Proxy(root.showModal, {
      apply(target, thisArg, args) {
        if (!oldView.__tornDown) presentedDuringTeardown = true;
        return Reflect.apply(target, thisArg, args);
      },
    });

    hmr.reload('modal-hmr', {
      ...ReloadableModal,
      render: () => h('Label', { text: 'v2' }),
    });
    expect(root.__modals).toHaveLength(0);
    await new Promise((r) => setTimeout(r, 0));

    expect(presentedDuringTeardown).toBe(false);
    expect(oldView.__closedAnimated).toBe(false);
    expect(root.__modals).toHaveLength(1);
    const newView = root.__modals[0];
    expect(newView).not.toBe(oldView);
    expect(newView.text).toBe('v2');
    expect(newView._modalOptions.animated).toBe(false);
    expect(newView._modalOptions.transition).toBeUndefined();

    $closeModal('after-reload');
    await expect(result).resolves.toBe('after-reload');
  });
});

describe('$modal', () => {
  it('is false outside a modal and the close handle inside one', async () => {
    startApp();
    let outside: unknown;
    let inside: unknown;
    const Probe = {
      render(this: any) {
        inside = this.$modal;
        return h('Label');
      },
    };
    mount({
      render(this: any) {
        outside = this.$modal;
        return h('StackLayout');
      },
    });
    expect(outside).toBe(false);

    const modal = $showModal(Probe);
    expect(inside).toEqual({ close: expect.any(Function) });
    (inside as any).close('bye');
    await expect(modal).resolves.toBe('bye');
  });
});
