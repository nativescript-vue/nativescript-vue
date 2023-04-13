// import { hyphenate } from '@vue/shared'
import { NSVElement } from "../../dom";
import {
  callWithAsyncErrorHandling,
  ComponentInternalInstance,
} from "@vue/runtime-core";

interface Invoker extends EventListener {
  value: EventValue;
}

type EventValue = Function | Function[];

export function addEventListener(
  el: NSVElement,
  event: string,
  handler: EventListener,
  options: EventListenerOptions = {}
) {
  el.addEventListener(event, handler, options);
}

export function removeEventListener(
  el: NSVElement,
  event: string,
  handler: EventListener,
  options: EventListenerOptions = {}
) {
  el.removeEventListener(event, handler);
}

export function patchEvent(
  el: NSVElement & { _vei?: Record<string, Invoker | undefined> },
  rawName: string,
  prevValue: EventValue | null,
  nextValue: EventValue | null,
  instance: ComponentInternalInstance | null = null
) {
  // vei = vue event invokers
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    // patch
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      // add
      const invoker = (invokers[rawName] = createInvoker(nextValue, instance));
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      // remove
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = undefined;
    }
  }
}

const optionsModifierRE = /(?:Once|Capture)$/;

function parseName(name: string): [string, EventListenerOptions | undefined] {
  let options: EventListenerOptions | undefined;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while ((m = name.match(optionsModifierRE))) {
      name = name.slice(0, name.length - m[0].length);
      (options as any)[m[0].toLowerCase()] = true;
      options;
    }
  }

  // todo: optimise if necessary
  // this isn't technically perfect,
  // since if the event name was UPPER then we'll convert it to uPPER
  // but for the majority of cases, this should be the right thing to do.
  name = name.slice(name.startsWith("on:") ? 3 : 2);
  name = name.charAt(0).toLowerCase() + name.slice(1);

  // return event name by removing on prefix. eg. onitemTap -> itemTap
  return [name, options];
  // return [hyphenate(name.slice(2)), options]
}

function createInvoker(
  initialValue: EventValue,
  instance: ComponentInternalInstance | null
) {
  const invoker: Invoker = (e: Event) => {
    callWithAsyncErrorHandling(invoker.value, instance, 5, [e]);
  };
  invoker.value = initialValue;
  return invoker;
}
