import {View} from 'ui/core/view'
import {ContentView} from 'ui/content-view'
import {LayoutBase} from 'ui/layouts/layout-base'
import {TextBase} from 'ui/text-base'

export function isView(view) {
    return view instanceof View
}
export function isLayout(view) {
    return view instanceof LayoutBase
}
export function isContentView(view) {
    return view instanceof ContentView
}
export function isTextView(view) {
    return view instanceof TextBase
}
