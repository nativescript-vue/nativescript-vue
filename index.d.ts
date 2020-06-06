import {
    Page,
    NavigationEntry,
    BackstackEntry,
} from 'tns-core-modules/ui/frame/frame'
import { ItemEventData } from 'tns-core-modules/ui/list-view'
import { View } from 'tns-core-modules/ui/core/view'
import { ShowModalOptions } from 'tns-core-modules/ui/core/view-base'
import { Vue, VueConstructor } from 'vue/types/vue'

// ListView ItemEventData with the addition of the item property
export type NativeScriptVueItemEventData<T> = ItemEventData & { item: T }

export interface NavigationEntryVue extends NavigationEntry {
    props?: Record<string, any>,
    frame?: any,
    resolveOnEvent?: Page.navigatingToEvent | Page.navigatedToEvent
}

export type navigateTo = (
    component: VueConstructor,
    options?: NavigationEntryVue,
    cb?: () => Page,
) => Promise<Page>

export type navigateBack = (
    options?: NavigationEntryVue,
    backstackEntry?: BackstackEntry,
) => void

export interface ModalOptions extends Partial<ShowModalOptions> {
    target?: any; // optional Vue target to open the modal from
    props?: Record<string, any>;
}

// create a nativescript vue class that extends vue.js
export interface NativeScriptVue<V = View> extends Vue {
    nativeView: V

    $navigateTo: navigateTo
    $navigateBack: navigateBack

    $modal?: { close: (data?: any) => Promise<typeof data> };

    /**
     * Open a modal using a component
     * @param {typeof Vue} component
     * @param {ModalOptions} options
     * @returns {any}
     */
    $showModal: (component: typeof Vue, options?: ModalOptions) => Promise<any>;

    /**
     * starts the nativescript application
     */
    $start: () => void
}

export interface NativeScriptVueConstructor extends VueConstructor<NativeScriptVue>
{
    navigateTo: navigateTo
    navigateBack: navigateBack
    /**
     * Registers NativeScript Plugin.
     * @param elementName Name of the element to use in your template
     * @param resolver  function to register the element
     * @param meta meta associated with the element
     */
    registerElement: (elementName: string, resolver: Function, meta?: any) => void
}

export const NativeScriptVue: NativeScriptVueConstructor

// export as namespace NativeScriptVue;
export default NativeScriptVue;
