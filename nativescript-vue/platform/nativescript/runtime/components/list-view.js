const VUE_VIEW = '__vueVNodeRef__'

export default {
    name: 'list-view',

    template: `<native-list-view ref="listView" @itemLoading="onItemLoading" @itemTap="onItemTap"></native-list-view>`,

    props: {
        items: {
            type: Array,
            required: true
        },
        templateSelector: {
            type: Function,
            default: () => 'default'
        }
    },

    created() {
        this._templateMap = new Map()
    },

    mounted() {
        this.setupTemplates()

        this.$refs.listView.setAttr('items', this.items)
    },

    watch: {
        items(newVal) {
            this.$refs.listView.setAttr('items', newVal)
            this.$refs.listView.view.refresh()
        }
    },

    methods: {
        onItemTap(args) {
            this.$emit('itemTap', args)
        },

        setupTemplates() {
            const self = this
            const slots = Object.keys(this.$scopedSlots)

            slots.forEach((slotName) => {
                const keyedTemplate = {
                    key: slotName,
                    createView() {
                        let vnode = self.getItemTemplate('', 0)
                        vnode.elm.view[VUE_VIEW] = vnode
                        return vnode.elm.view;
                    }
                }
                this._templateMap.set(slotName, keyedTemplate)
            })

            this.setItemTemplates()
        },

        setItemTemplates() {
            const templates = [];
            this._templateMap.forEach(value => {
                templates.push(value);
            })

            this.$refs.listView.setAttr('_itemTemplatesInternal', templates);

            if (typeof this.templateSelector === 'function') {
                this.$refs.listView.setAttr('_itemTemplateSelector', (item, index, items) => {
                    return this.templateSelector(new ItemContext(item, index))
                })
            }
        },

        onItemLoading(args) {
            const index = args.index
            const items = args.object.items
            const currentItem = typeof items.getItem === 'function' ? items.getItem(index) : items[index]

            let vnode
            if (args.view) {
                vnode = args.view[VUE_VIEW]

                if (!vnode) {
                    console.log('Cant reuse view...')
                }
            }

            vnode = this.getItemTemplate(currentItem, index, vnode)
            args.view = vnode.elm.view
            args.view[VUE_VIEW] = vnode;
        },

        getItemTemplate(item, index, oldVnode) {
            let context = new ItemContext(item, index)
            let template = 'default'
            if (typeof this.templateSelector === 'function') {
                template = this.templateSelector(context)
            }

            let slot = this.$scopedSlots[template] ? this.$scopedSlots[template] : this.$scopedSlots.default
            let vnode = slot(context)[0]
            this.__patch__(oldVnode, vnode)

            return vnode
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
        this.even = index % 2 === 0
        this.odd = !this.even
    }
}