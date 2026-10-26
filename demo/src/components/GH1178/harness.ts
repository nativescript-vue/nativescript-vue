import {
  Application,
  Utils,
  type Frame,
  type NativeWindow,
  type View,
} from '@nativescript/core';
import { createApp, type Component } from 'nativescript-vue';

export function log(...args: unknown[]) {
  console.log('[GH1178]', ...args);
}

interface LivePage {
  windowId: string;
  tick: number;
}

/** Pages whose Vue app is still mounted, keyed by page id. */
export const livePages = new Map<string, LivePage>();

let nextPageId = 1;
export function createPageId() {
  return `P${nextPageId++}`;
}

export function windowLabel(window?: NativeWindow | null) {
  if (!window) {
    return 'none';
  }
  return `${window.id}${window.isPrimary ? '(primary)' : ''}`;
}

const WINDOW_EVENTS = [
  'attached',
  'detached',
  'close',
  'background',
  'foreground',
  'sceneDidDisconnect',
];

const watchedWindows = new WeakSet<NativeWindow>();

export function watchWindowEvents(window: NativeWindow) {
  if (watchedWindows.has(window)) {
    return;
  }
  watchedWindows.add(window);
  for (const eventName of WINDOW_EVENTS) {
    window.on(eventName as 'close', () =>
      log(`window ${windowLabel(window)} ${eventName} state=${window.state}`),
    );
  }
}

let started = false;

/**
 * Starts window logging and a periodic summary of mounted pages, and gives
 * every additional window its own instance of `harness`.
 */
export function startHarness(harness: Component) {
  if (started) {
    return;
  }
  started = true;

  Application.setWindowContentResolver(({ window, isPrimary }) => {
    if (isPrimary) {
      return undefined;
    }
    log(`creating harness for window ${windowLabel(window)}`);
    return (createApp(harness).mount().$el as any).nativeView;
  });

  Application.on(Application.windowOpenEvent, (args: any) => {
    log(`app windowOpen ${windowLabel(args.window)}`);
    watchWindowEvents(args.window);
  });
  Application.on(Application.windowCloseEvent, (args: any) => {
    log(`app windowClose ${windowLabel(args.window)}`);
  });
  for (const window of Application.getWindows()) {
    watchWindowEvents(window);
  }

  setInterval(() => {
    const pages = [...livePages.entries()]
      .map(([id, page]) => `${id}@${page.windowId}#${page.tick}`)
      .join(' ');
    const windows = Application.getWindows()
      .map((window) => `${windowLabel(window)}:${window.state}`)
      .join(' ');
    log(`summary windows=[${windows}] live=[${pages}]`);
  }, 3000);
}

export function openWindow() {
  log('opening window');
  if (__APPLE__) {
    Application.ios.openWindow();
  } else {
    Application.android.openWindow();
  }
}

export function closeWindow(view?: View) {
  const window = view?.getNativeWindow();
  if (!window) {
    log('no window to close');
    return;
  }
  log(`closing window ${windowLabel(window)}`);
  window.close();
}

// Bypasses NativeWindow.close() so core doesn't flag the close as requested:
// the scene disconnects (window detaches) and its session is discarded after,
// the same path as swiping a window away in the app switcher.
export function destroySceneSession(view?: View) {
  const window = view?.getNativeWindow();
  const session = window?.ios?.scene?.session;
  if (!session) {
    log('no scene session to destroy');
    return;
  }
  log(`destroying scene session of window ${windowLabel(window)}`);
  UIApplication.sharedApplication.requestSceneSessionDestructionOptionsErrorHandler(
    session,
    null,
    (error) => error && log(`destroy failed: ${error.localizedDescription}`),
  );
}

export function recreateActivity(view?: View) {
  const window = view?.getNativeWindow();
  const activity = window?.android?.activity;
  if (!activity) {
    log('no activity to recreate');
    return;
  }
  log(`recreating activity of window ${windowLabel(window)}`);
  activity.recreate();
}

export function describeFrame(frame?: Frame) {
  if (!frame) {
    return 'frame=none';
  }
  const internal = frame as any;
  const state = [
    `canGoBack=${frame.canGoBack()}`,
    `backStack=${frame.backStack.length}`,
    `queue=${internal._navigationQueue?.length}`,
    `executing=${!!internal._executingContext}`,
    `isReset=${internal._isReset}`,
  ];
  if (__ANDROID__) {
    const activity = frame.getNativeWindow()?.android?.activity;
    state.push(
      `attachedToWindow=${internal._attachedToWindow}`,
      `activity=${activity?.getLifecycle().getCurrentState()}`,
      `currentActivityIsWindows=${Utils.android.getCurrentActivity() === activity}`,
    );
  }
  return state.join(' ');
}
