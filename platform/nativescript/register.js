const elementMap = {}
const nativeRegExp = /Native/gi
const dashRegExp = /-/g

const defaultViewMeta = {
  skipAddToDom: false,
  isUnaryTag: false,
  tagNamespace: '',
  canBeLeftOpenTag: false,
  model: null,
  component: null
}

export function normalizeElementName(elementName) {
  return `native${elementName
    .replace(nativeRegExp, '')
    .replace(dashRegExp, '')
    .toLowerCase()}`
}

export function registerElement(elementName, resolver, meta) {
  const normalizedName = normalizeElementName(elementName)

  meta = Object.assign({}, defaultViewMeta, meta)

  if (elementMap[normalizedName]) {
    throw new Error(`Element for ${elementName} already registered.`)
  }

  if (!meta.component) {
    // if no Vue component is passed, wrap the simpler vue component
    // which bind the events and attributes to the NS one
    meta.component = {
      functional: true,
      model: meta.model,
      render: (h, { data, children }) => {
        return h(normalizedName, data, children)
      }
    }
  }
  meta.component.name = elementName

  const entry = {
    resolver: resolver,
    meta: meta
  }
  elementMap[normalizedName] = entry
}

export function getElementMap() {
  return elementMap
}

export function getViewClass(elementName) {
  const normalizedName = normalizeElementName(elementName)
  const entry = elementMap[normalizedName]

  if (!entry) {
    throw new TypeError(`No known component for element ${elementName}.`)
  }

  try {
    return entry.resolver()
  } catch (e) {
    throw new TypeError(`Could not load view for: ${elementName}. ${e}`)
  }
}

export function getViewMeta(elementName) {
  const normalizedName = normalizeElementName(elementName)

  let meta = defaultViewMeta
  const entry = elementMap[normalizedName]

  if (entry && entry.meta) {
    meta = entry.meta
  }

  return meta
}

export function isKnownView(elementName) {
  return elementMap[normalizeElementName(elementName)]
}
