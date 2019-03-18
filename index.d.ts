// import vue.js typings
// import Vue from 'vue';
import { Vue, VueConstructor } from 'vue/types/vue'
import { Page, NavigationEntry } from 'tns-core-modules/ui/frame/frame'
import { View } from 'tns-core-modules/ui/core/view'

export interface NavigationEntryVue extends NavigationEntry {
    props?: Record<string, any>
}

export type navigateTo = (
    component: VueConstructor,
    options?: NavigationEntryVue,
    cb?: () => Page,
) => Promise<Page>;

export interface ModalOptions {
    context?: any;
    fullscreen?: boolean;
    props?: Record<string, any>;
}

// create a nativescript vue class that extends vue.js
export interface NativeScriptVue<V = View> extends Vue {
    nativeView: V

    $navigateTo: navigateTo
    $navigateBack: () => void

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

export interface NativeScriptVueConstructor extends VueConstructor<NativeScriptVue> {
    navigateTo: navigateTo
    navigateBack: () => void
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
