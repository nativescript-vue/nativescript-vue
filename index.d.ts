// Typings for NativeScript-Vue
declare module 'nativescript-vue' {
    // import vue.js typings
    import Vue from 'vue';

    // creat a nativescript vue class that extends vue.js
    class NativeScriptVue extends Vue {
        /**
         * Registers NativeScript Plugin.
         * @param elementName Name of the element to use in your template
         * @param resolver  function to register the element
         * @param meta meta associated with the element
         */
        static registerElement(elementName: string, resolver: Function, meta?: any): void;
        
        /**
         * starts the nativescript application
         */
        $run(): void
    }

    export = NativeScriptVue;
}
