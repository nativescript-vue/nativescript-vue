import { describe, expect, it } from 'vitest';
import { NSVElement, NSVText, NSVComment } from '../src';
import { elementChildren, nativeChildren } from './helpers';

function label(text: string) {
  const el = new NSVElement('Label');
  el.setAttribute('text', text);
  return el;
}

describe('NSVElement tree operations', () => {
  it('appends children to layout views in order', () => {
    const layout = new NSVElement('StackLayout');
    layout.appendChild(label('A'));
    layout.appendChild(label('B'));

    expect(elementChildren(layout)).toEqual(['A', 'B']);
    expect(nativeChildren(layout)).toEqual(['A', 'B']);
  });

  it('inserts before an anchor, skipping non-visual nodes for the native index', () => {
    const layout = new NSVElement('StackLayout');
    const a = label('A');
    const c = label('C');
    layout.appendChild(a);
    layout.appendChild(new NSVComment(''));
    layout.appendChild(c);

    layout.insertBefore(label('B'), c);

    expect(elementChildren(layout)).toEqual(['A', 'B', 'C']);
    expect(nativeChildren(layout)).toEqual(['A', 'B', 'C']);
  });

  it('removes children from both trees', () => {
    const layout = new NSVElement('StackLayout');
    const a = label('A');
    const b = label('B');
    layout.appendChild(a);
    layout.appendChild(b);

    layout.removeChild(a);

    expect(elementChildren(layout)).toEqual(['B']);
    expect(nativeChildren(layout)).toEqual(['B']);
    expect(a.parentNode).toBeNull();
    expect(a.nativeView.parent).toBeNull();
  });

  it('sets content on content views', () => {
    const page = new NSVElement('Page');
    const layout = new NSVElement('StackLayout');
    page.appendChild(layout);
    expect(page.nativeView.content).toBe(layout.nativeView);

    page.removeChild(layout);
    expect(page.nativeView.content).toBeNull();
  });

  it('aggregates text nodes into the text attribute', () => {
    const el = new NSVElement('Label');
    const hello = new NSVText('Hello');
    el.appendChild(hello);
    el.appendChild(new NSVText(' world'));
    expect(el.nativeView.text).toBe('Hello world');

    hello.text = 'Bye';
    expect(el.nativeView.text).toBe('Bye world');

    el.removeChild(hello);
    expect(el.nativeView.text).toBe(' world');
  });

  it('restores the original value when an attribute is removed', () => {
    const el = new NSVElement('Switch');
    expect(el.getAttribute('checked')).toBe(false);
    el.setAttribute('checked', true);
    el.removeAttribute('checked');
    expect(el.getAttribute('checked')).toBe(false);
  });

  it('throws for unknown elements', () => {
    expect(() => new NSVElement('div')).toThrow(/No known component/);
  });
});
