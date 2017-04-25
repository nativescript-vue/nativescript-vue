/*
 <list-view :items="items">
 <template scope="list">
 <stack-layout>
 <label>{{ list.index }} {{ list.item.prop1 }}</label>
 </stack-layout>
 </template>
 </list-view>
 */
import {Label} from 'ui/label'
import {createElement} from '../node-ops'

export default {
    name: 'list-view',
    // abstract: true,

    props: {
        items: {
            type: Array,
            required: true
        }
    },

    render() {
        let _vm = this
        let _h = _vm.$createElement
        let _c = _vm._self._c || _h

        let $index = 0
        return _c('native-list-view', {
            attrs: {
                items: _vm.items,
                itemTemplate: function () {
                    let item = _vm.items[$index]
                    if (typeof item === 'object') {
                        item = Object.assign({}, {$index}, item)
                    } else {
                        item = Object.assign({}, {$index, value: item})
                    }

                    let res = _vm.$scopedSlots.default(item)
                    let vnode = res[0]

                    let $el = _vm.__patch__(
                        undefined /* $el */,
                        vnode
                    )

                    $index++
                    return $el.view
                }
                // itemTemplate: '<Label text="{{ $value }}" padding="20" backgroundColor="red"/>'
            }
        })
    }
}