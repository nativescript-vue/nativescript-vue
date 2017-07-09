const Vue = require('nativescript-vue/dist/index')
const http = require('http')
const Page = require('ui/page').Page
const StackLayout = require('ui/layouts/stack-layout').StackLayout
const ScrollView = require('ui/scroll-view').ScrollView
const Image = require('ui/image').Image
const Label = require('ui/label').Label
const Button = require('ui/button').Button

Vue.prototype.$http = http

new Vue({
    data: {
        subreddit: '/r/funny',
        items: []
    },

    template: `
        <page ref="page">
            <stack-layout>
                <button class="btn btn-primary" :text="subreddit" @tap="chooseSubreddit"></button>
                <list-view :items="items" class="list-group" :templateSelector="templateSelector" separatorColor="red" @itemTap="onItemTap" @loaded="onLoaded" @loadMoreItems="onLoadMoreItems">
                    <template scope="item">
                        <stack-layout orientation="horizontal" class="list-group-item">
                            <image :src="item.image" class="thumb"></image>
                            <stack-layout>
                                <label class="list-group-item-heading" :text="item.title" textWrap="true"></label>
                                <label class="list-group-item-text" text="The rest of the content" textWrap="true"></label>
                            </stack-layout>
                        </stack-layout>
                    </template>
                    <template name="active" scope="item">
                        <stack-layout orientation="horizontal" class="list-group-item active">
                            <image :src="item.image" class="thumb"></image>
                            <stack-layout>
                                <label class="list-group-item-heading" :text="item.title" textWrap="true"></label>
                                <label class="list-group-item-text" text="The rest of the content" textWrap="true"></label>
                            </stack-layout>
                        </stack-layout>
                    </template>
                </list-view>
            </stack-layout>
        </page>
    `,

    created() {
        this.fetchItems()
    },

    methods: {
        onItemTap(e) {
            let item = this.items[e.index]
            let detailsPage = new Page()
            let layout = new StackLayout()
            let scroller = new ScrollView()
            scroller.content = layout

            let label = new Label()
            label.text = item.title
            label.className = 'h2'
            label.textAlignment = 'center'

            let image = new Image()
            image.src = item.fullImage

            let closeButton = new Button()
            closeButton.text = 'Close'
            closeButton.on('tap', () => detailsPage.closeModal())

            layout.addChild(label)
            layout.addChild(image)
            layout.addChild(closeButton)

            detailsPage.content = scroller
            this.$refs.page.nativeView.showModal(detailsPage)
        },

        onLoaded(e) {
            console.log('The list has been loaded')
        },

        onLoadMoreItems(e) {
            console.log('Loading (3) more items')
            this.items.push({
                title: 'Foo loaded @ ' + new Date().toTimeString(),
                image: this.items[0].image,
                fullImage: this.items[0].fullImage
            },
            {
                title: 'Bar loaded @ ' + new Date().toTimeString(),
                image: this.items[1].image,
                fullImage: this.items[1].fullImage
            },
            {
                title: 'Baz loaded @ ' + new Date().toTimeString(),
                image: this.items[2].image,
                fullImage: this.items[2].fullImage
            })
        },

        templateSelector(item) {
            return item.$index === 0 ? 'active' : 'default'
        },

        chooseSubreddit() {
            prompt({
                title: 'Change subreddit:',
                defaultText: this.subreddit,
                okButtonText: 'Ok',
                cancelButtonText: 'Cancel',
            }).then((r) => {
                if (r.result) {
                    this.subreddit = r.text
                    this.fetchItems()
                }
            })
        },

        fetchItems() {
            this.$http.getJSON(`https://www.reddit.com/${this.subreddit}.json`).then((res) => {
                this.items = res.data.children.map((item) => {
                    return {
                        title: item.data.title,
                        image: item.data.thumbnail,
                        fullImage: item.data.preview.images[0].source.url
                    }
                })
            }).catch((err) => {
                console.log('err..' + err)
            })
        }
    }
}).$start()