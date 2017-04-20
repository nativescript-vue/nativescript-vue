const elementMap = new Map

class ViewMeta {
    constructor(options = {}) {
        this.skipAddToDom = options.skipAddToDom || false
        this.isUnaryTag = options.isUnaryTag || false
    }
}

// class VueView extends View {
//     constructor(name, meta) {
//         super()
//         this.nodeType = 0
//         this.nodeName = name
//         this.templateParent = null
//         this.meta = meta
//     }
// }

export function registerElement(elementName, resolver, meta) {
    if (elementMap.has(elementName)) {
        throw new Error(`Element for ${elementName} already registered.`)
    }

    const entry = {resolver: resolver, meta: meta}
    elementMap.set(elementName.toLowerCase(), entry)

    console.log(`Element ${elementName} has been registered!`)
}

export function getViewClass(elementName) {
    const entry = elementMap.get(elementName.toLowerCase())

    if (!entry) {
        throw new TypeError(`No known component for element ${elementName}.`)
    }

    try {
        return entry.resolver();
    } catch (e) {
        throw new TypeError(`Could not load view for: ${elementName}. ${e}`)
    }
}

export function getViewMeta(nodeName) {
    let meta = new ViewMeta()
    const entry = elementMap.get(nodeName.toLowerCase())

    if (entry && entry.meta) {
        meta = entry.meta;
    }

    return meta;
}

export function isKnownView(elementName) {
    return elementMap.has(elementName.toLowerCase())
}

registerElement("stack-layout", () => require('tns-core-modules/ui/layouts/stack-layout').StackLayout);
registerElement("Label", () => require("tns-core-modules/ui/label").Label);
registerElement("Button", () => require("tns-core-modules/ui/button").Button);
registerElement("TextField", () => require("tns-core-modules/ui/text-field").TextField);

