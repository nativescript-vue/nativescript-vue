import LayoutBase from 'ui/layouts/layout-base'

const VUE_VIEW = '_vueViewRef'

export default {
    name: 'list-view',

    template: `<native-list-view ref="listView" @itemLoading="onItemLoading"></native-list-view>`,

    props: {
        items: {
            type: Array,
            required: true
        }
    },

    created() {
        // this._templateMap = new Map()
    },

    mounted() {
        // this.setupTemplates()

        this.$refs.listView.setAttr('items', this.items)
    },

    watch: {
        items(newVal) {
            this.$refs.listView.setAttr('items', newVal)
            this.$refs.listView.view.refresh()
        }
    },

    methods: {
        // setupTemplates() {
        //     const slots = Object.keys(this.$scopedSlots)
        //
        //     slots.forEach((slotName) => {
        //         const keyedTemplate = {
        //             key: slotName,
        //             createView() {
        //                 this.getItemTemplate('foo', 0)
        //                 return view;
        //             }
        //         }
        //         this._templateMap.set(slotName, keyedTemplate)
        //     })
        //
        //     this.setItemTemplates()
        // },
        //
        // setItemTemplates() {
        //     const templates = [];
        //     this._templateMap.forEach(value => {
        //         templates.push(value);
        //     })
        //     this.$refs.listView.setAttr('itemTemplates', templates);
        // },

        onItemLoading(args) {
            const index = args.index
            const items = args.object.items
            const currentItem = typeof items.getItem === 'function' ? items.getItem(index) : items[index]

            let viewRef
            // if (args.view) {
            //     viewRef = args.view[VUE_VIEW]
            //
            //     if (!viewRef && args.view instanceof LayoutBase && args.view.getChildrenCount() > 0) {
            //         viewRef = args.view.getChildAt(0)[VUE_VIEW];
            //     }
            //
            //     if (!viewRef) {
            //         console.log('Cant reuse view...')
            //     }
            // }

            if (!viewRef) {
                viewRef = this.getItemTemplate(currentItem, index)
                args.view = viewRef.view
                args.view[VUE_VIEW] = viewRef;
            }

            // this.updateItemTemplate(viewRef, currentItem, index)
        },

        updateItemTemplate(viewRef, item, index) {
            return patchViewFromScopedSlot(
                viewRef,
                this.$scopedSlots.default,
                new ItemContext(item, index),
                this.__patch__
            )
        },

        getItemTemplate(item, index) {
            return generateViewFromScopedSlot(
                this.$scopedSlots.default,
                new ItemContext(item, index),
                this.__patch__
            )
        }
    }
}

class ItemContext {
    constructor(item, index) {
        this.$index = index
        if (typeof  item === 'object') {
            Object.assign(this, item)
        } else {
            this.value = item
        }
    }
}

export function generateViewFromScopedSlot(slot, context, patch) {
    return patch(
        undefined /* $el */,
        slot(context)[0]
    )
}


export function patchViewFromScopedSlot($el, slot, context, patch) {
    return patch(
        $el,
        slot(context)[0]
    )
}