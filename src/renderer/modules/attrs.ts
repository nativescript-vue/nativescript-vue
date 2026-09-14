import { NSVElement } from '../../dom';
import {
  isBoolean,
  isAndroidKey,
  isIOSKey,
  stripPlatformPrefix,
} from '../../runtimeHelpers';
import { isAndroid, isIOS } from '../../nativescript';

export function patchAttr(
  el: NSVElement,
  key: string,
  prevValue: any,
  nextValue: any,
) {
  if (isAndroidKey(key)) {
    if (!isAndroid) {
      // if we encounter an android key, and we are not on android we can safely ignore it
      return;
    }
    key = stripPlatformPrefix(key, 'android');
  } else if (isIOSKey(key)) {
    if (!isIOS) {
      // if we encounter an ios key, and we are not on ios we can safely ignore it
      return;
    }
    key = stripPlatformPrefix(key, 'ios');
  }

  if (nextValue === null) {
    // if the nextValue is null, we are removing the attribute
    el.removeAttribute(key);
  } else if (nextValue === '') {
    setBooleanShorthand(el, key);
  } else {
    el.setAttribute(key, nextValue);
  }
}

/**
 * `<Page actionBarHidden />` compiles to an empty string, which means true
 * for a boolean property but is a legitimate value for a string one. Core
 * keeps a property's converter private, so a boolean property is recognised
 * either by its current value or by its converter rejecting the string.
 */
function setBooleanShorthand(el: NSVElement, key: string) {
  if (isBoolean(el.getAttribute(key))) {
    el.setAttribute(key, true);
    return;
  }

  try {
    el.setAttribute(key, '');
  } catch (e) {
    if (!String((e as Error)?.message).startsWith('Invalid boolean')) {
      throw e;
    }
    el.setAttribute(key, true);
  }
}
