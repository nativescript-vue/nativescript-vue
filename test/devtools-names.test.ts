import { describe, expect, it } from 'vitest';
import { $navigateTo, createApp, h } from '../src';
import { Application, Frame } from './stubs/nativescript-core';

describe('component names for devtools', () => {
  it('names the root app after a script-setup component', () => {
    const Root = { __name: 'App', render: () => h('Frame', [h('Page')]) };
    const app = createApp(Root);
    app.start();
    expect((app as any)._component.name).toBe('App');
  });

  it('names navigated page apps after their component', () => {
    createApp({ render: () => h('Frame', [h('Page')]) }).start();
    Frame._topmost = Application.getRootView() as Frame;

    const Details = { __name: 'Details', render: () => h('Page') };
    $navigateTo(Details);
    expect(Details.name).toBe('Details');
  });

  it('leaves an explicit name alone', () => {
    const Named = { name: 'Explicit', __name: 'File', render: () => h('Page') };
    createApp(Named).start();
    expect(Named.name).toBe('Explicit');
  });
});
