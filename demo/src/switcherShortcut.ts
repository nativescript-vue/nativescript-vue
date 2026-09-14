import { Application, isIOS } from '@nativescript/core';

/**
 * Hardware keyboard support for the demo switcher: Cmd+D (Ctrl/Cmd+D on
 * Android) toggles it, and arrow keys, Enter and Escape drive it while open.
 * Listeners return whether they consumed the key; unconsumed keys continue to
 * the platform. On iOS, hardware key presses go to the first responder, so a
 * hidden child view controller of the root claims that role and matches keys
 * in pressesBegan. A focused text field takes the keys over while editing.
 */

export type SwitcherKey = 'toggle' | 'up' | 'down' | 'enter' | 'escape';

type Listener = (key: SwitcherKey) => boolean;

const listeners = new Set<Listener>();

export function onSwitcherKey(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function fire(key: SwitcherKey) {
  let handled = false;
  listeners.forEach((listener) => {
    handled = listener(key) || handled;
  });
  return handled;
}

const INSTALLED = '__demoSwitcherShortcutInstalled';

export function installSwitcherShortcut() {
  // HMR re-evaluates the entry module; a second install would register the
  // native class twice.
  if ((globalThis as any)[INSTALLED]) {
    return;
  }
  (globalThis as any)[INSTALLED] = true;

  if (isIOS) {
    installIOS();
  } else {
    installAndroid();
  }
}

function installIOS() {
  function keyFor(key: UIKey | null): SwitcherKey | undefined {
    const chars = key?.charactersIgnoringModifiers;
    if (chars === 'd' && key.modifierFlags & UIKeyModifierFlags.Command) {
      return 'toggle';
    }
    switch (chars) {
      case UIKeyInputUpArrow:
        return 'up';
      case UIKeyInputDownArrow:
        return 'down';
      case '\r':
        return 'enter';
      case UIKeyInputEscape:
        return 'escape';
    }
  }

  @NativeClass()
  class SwitcherKeyController extends UIViewController {
    // @ts-expect-error TS2611: accessor overriding a declared property
    get canBecomeFirstResponder() {
      return true;
    }

    pressesBeganWithEvent(presses: NSSet<UIPress>, event: UIPressesEvent) {
      const all = presses.allObjects;
      for (let i = 0; i < all.count; i++) {
        const key = keyFor(all.objectAtIndex(i).key);
        if (key && fire(key)) {
          return;
        }
      }
      super.pressesBeganWithEvent(presses, event);
    }
  }

  Application.on(Application.displayedEvent, () => {
    const root = Application.ios.rootController;
    if (!root) {
      return;
    }

    const controller = SwitcherKeyController.new();
    controller.view.frame = CGRectZero;
    controller.view.userInteractionEnabled = false;
    root.addChildViewController(controller);
    root.view.addSubview(controller.view);
    controller.didMoveToParentViewController(root);
    controller.becomeFirstResponder();
  });
}

function installAndroid() {
  const { KeyEvent } = android.view;

  function keyFor(event: android.view.KeyEvent): SwitcherKey | undefined {
    switch (event.getKeyCode()) {
      case KeyEvent.KEYCODE_D:
        return event.isCtrlPressed() || event.isMetaPressed()
          ? 'toggle'
          : undefined;
      case KeyEvent.KEYCODE_DPAD_UP:
        return 'up';
      case KeyEvent.KEYCODE_DPAD_DOWN:
        return 'down';
      case KeyEvent.KEYCODE_ENTER:
      case KeyEvent.KEYCODE_NUMPAD_ENTER:
        return 'enter';
      case KeyEvent.KEYCODE_ESCAPE:
        return 'escape';
    }
  }

  Application.android.on(
    Application.android.activityCreatedEvent,
    ({ activity }: { activity: android.app.Activity }) => {
      activity
        .getWindow()
        .getDecorView()
        .addOnUnhandledKeyEventListener(
          new android.view.View.OnUnhandledKeyEventListener({
            onUnhandledKeyEvent(_view, event) {
              if (event.getAction() !== KeyEvent.ACTION_DOWN) {
                return false;
              }
              const key = keyFor(event);
              return !!key && fire(key);
            },
          }),
        );
    },
  );
}
