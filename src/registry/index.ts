import { NSVElement, NSVViewFlags } from "../dom";

export type NSVElementResolver = () => any;

export type NSVModelDescriptor = {
  prop: string;
  event: string;
};

export interface NSVViewMeta {
  viewFlags: NSVViewFlags;
  nodeOps?: {
    insert(child: NSVElement, parent: NSVElement, atIndex?: number): void;
    remove(child: NSVElement, parent: NSVElement): void;
  };
  model?: NSVModelDescriptor;
  overwriteExisting?: boolean;
}

export interface NSVElementDescriptor {
  meta: NSVViewMeta;
  resolver?: NSVElementResolver;
}

export let defaultViewMeta: NSVViewMeta = {
  viewFlags: 0, // NSVViewFlags.NONE, // tsx can't resolve NSVViewFlags here?
};

let elementMap: Record<string, NSVElementDescriptor> = {};

export function getViewMeta(elementName: string): NSVViewMeta {
  // console.log(`->getViewMeta(${elementName})`)

  const normalizedName = normalizeElementName(elementName);

  const entry = elementMap[normalizedName];

  if (!entry) {
    throw new Error(`No known component for element ${elementName}.`);
  }

  return entry.meta;
}

let unknownViewResolver;

export function registerUnknownViewResolver(resolver: (name: string) => any) {
  unknownViewResolver = resolver;
}

export function getViewClass(elementName: string): any {
  // console.log(`->getViewClass(${elementName})`)
  const normalizedName = normalizeElementName(elementName);
  const entry = elementMap[normalizedName];

  if (!entry) {
    const resolved = unknownViewResolver?.(elementName);

    if (resolved) {
      return resolved;
    }

    throw new Error(`No known component for element ${elementName}.`);
  }

  try {
    return entry.resolver!();
  } catch (e) {
    throw new Error(`Could not load view for: ${elementName}. ${e}`);
  }
}

export function normalizeElementName(elementName: string): string {
  return elementName.replace(/-/g, "").toLowerCase();
}

export function registerElement(
  elementName: string,
  resolver?: NSVElementResolver,
  meta?: Partial<NSVViewMeta>
) {
  const normalizedName = normalizeElementName(elementName);
  const mergedMeta = Object.assign({}, defaultViewMeta, meta);

  if (elementMap[normalizedName] && !mergedMeta.overwriteExisting) {
    throw new Error(
      `Element for ${elementName} already registered.\n` +
        `If this is intentional set 'overwriteExisting: true' in 'meta'`
    );
  }

  elementMap[normalizedName] = {
    meta: mergedMeta,
    resolver,
  };
  // console.log(`->registerElement(${elementName})`)
}

export function isKnownView(elementName: string) {
  return elementMap.hasOwnProperty(normalizeElementName(elementName));
}
