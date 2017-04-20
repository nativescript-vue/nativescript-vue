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
const camelCaseSplit = /([a-z0-9])([A-Z])/g;

export function registerElement(elementName, resolver, meta) {
    if (elementMap.has(elementName)) {
        throw new Error(`Element for ${elementName} already registered.`)
    }

    const entry = {resolver: resolver, meta: meta}
    elementMap.set(elementName.toLowerCase(), entry)
    elementMap.set(elementName.replace(camelCaseSplit, "$1-$2").toLowerCase(), entry);

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

// registerElement("stack-layout", () => require('tns-core-modules/ui/layouts/stack-layout').StackLayout);
// registerElement("Label", () => require("tns-core-modules/ui/label").Label);
// registerElement("Button", () => require("tns-core-modules/ui/button").Button);
// registerElement("TextField", () => require("tns-core-modules/ui/text-field").TextField);

registerElement("AbsoluteLayout", () => require("tns-core-modules/ui/layouts/absolute-layout").AbsoluteLayout);
registerElement("ActivityIndicator", () => require("tns-core-modules/ui/activity-indicator").ActivityIndicator);
registerElement("Border", () => require("tns-core-modules/ui/border").Border);
registerElement("Button", () => require("tns-core-modules/ui/button").Button);
registerElement("ContentView", () => require("tns-core-modules/ui/content-view").ContentView);
registerElement("DatePicker", () => require("tns-core-modules/ui/date-picker").DatePicker);
registerElement("DockLayout", () => require("tns-core-modules/ui/layouts/dock-layout").DockLayout);
registerElement("GridLayout", () => require("tns-core-modules/ui/layouts/grid-layout").GridLayout);
registerElement("HtmlView", () => require("tns-core-modules/ui/html-view").HtmlView);
registerElement("Image", () => require("tns-core-modules/ui/image").Image);
registerElement("img", () => require("tns-core-modules/ui/image").Image);
registerElement("Label", () => require("tns-core-modules/ui/label").Label);
registerElement("ListPicker", () => require("tns-core-modules/ui/list-picker").ListPicker);
registerElement("ListView", () => require("tns-core-modules/ui/list-view").ListView);
registerElement("Page", () => require("tns-core-modules/ui/page").Page);
registerElement("Placeholder", () => require("tns-core-modules/ui/placeholder").Placeholder);
registerElement("Progress", () => require("tns-core-modules/ui/progress").Progress);
registerElement("ProxyViewContainer", () => require("tns-core-modules/ui/proxy-view-container").ProxyViewContainer);
registerElement("Repeater", () => require("tns-core-modules/ui/repeater").Repeater);
registerElement("ScrollView", () => require("tns-core-modules/ui/scroll-view").ScrollView);
registerElement("SearchBar", () => require("tns-core-modules/ui/search-bar").SearchBar);
registerElement("SegmentedBar", () => require("tns-core-modules/ui/segmented-bar").SegmentedBar);
registerElement("SegmentedBarItem", () => require("tns-core-modules/ui/segmented-bar").SegmentedBarItem);
registerElement("Slider", () => require("tns-core-modules/ui/slider").Slider);
registerElement("StackLayout", () => require("tns-core-modules/ui/layouts/stack-layout").StackLayout);
registerElement("FlexboxLayout", () => require("tns-core-modules/ui/layouts/flexbox-layout").FlexboxLayout);
registerElement("Switch", () => require("tns-core-modules/ui/switch").Switch);
registerElement("TabView", () => require("tns-core-modules/ui/tab-view").TabView);
registerElement("TextField", () => require("tns-core-modules/ui/text-field").TextField);
registerElement("TextView", () => require("tns-core-modules/ui/text-view").TextView);
registerElement("TimePicker", () => require("tns-core-modules/ui/time-picker").TimePicker);
registerElement("WebView", () => require("tns-core-modules/ui/web-view").WebView);
registerElement("WrapLayout", () => require("tns-core-modules/ui/layouts/wrap-layout").WrapLayout);
registerElement("FormattedString", () => require("tns-core-modules/text/formatted-string").FormattedString);
registerElement("Span", () => require("tns-core-modules/text/span").Span)