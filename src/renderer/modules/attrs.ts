import { NSVElement } from "../../dom";
import { isBoolean, isAndroidKey, isIOSKey } from "../../runtimeHelpers";
import { isAndroid, isIOS } from "../../nativescript";

export function patchAttr(
  el: NSVElement,
  key: string,
  prevValue: any,
  nextValue: any
) {
  if (isAndroidKey(key)) {
    if (!isAndroid) {
      // if we encounter an android key, and we are not on android we can safely ignore it
      return;
    }
    key = key.substring(8);
  } else if (isIOSKey(key)) {
    if (!isIOS) {
      // if we encounter an ios key, and we are not on ios we can safely ignore it
      return;
    }
    key = key.substring(4);
  }

  // detect expandable attrs for boolean values
  // see https://vuejs.org/v2/guide/components-props.html#Passing-a-Boolean
  if (isBoolean(el.getAttribute(key)) && nextValue === "") {
    nextValue = true;
  }

  if (nextValue === null) {
    // if the nextValue is null, we are removing the attribute
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, nextValue);
  }
}
