const Vue = require('nativescript-vue')
const http = require('http')

Vue.config.debug = true
Vue.prototype.$http = http

new Vue({
  data: {
    subreddit: '/r/funny',
    page_num: 1,
    last_page: '',
    items: [],
  },

  template: `
  <Frame>
    <Page ref="page">
      <ActionBar :title="subreddit">
        <ActionItem android.systemIcon="ic_menu_refresh" ios.systemIcon="13" @tap="refresh" />
        <ActionItem text="change" android.position="popup" ios.position="right" @tap="chooseSubreddit" />
      </ActionBar>

      <StackLayout>
        <StackLayout orientation="horizontal" class="p-15 bg-danger">
          <Label class="p-5 c-white" horizontalAlignment="center" text="You are browsing" textWrap="true" />
          <Label class="p-5 c-white" horizontalAlignment="center" :text="subreddit" textWrap="true" />
        </StackLayout>

        <ListView
            for="item in items"
            class="list-group"
            separatorColor="red"
            @itemTap="onItemTap"
            @loaded="onLoaded"
            @loadMoreItems="onLoadMoreItems"
        >
          <v-template>
            <StackLayout orientation="horizontal" class="list-group-item">
              <Image :src="item.image" class="thumb" />
              <StackLayout>
                <Label class="list-group-item-heading" :text="item.title" textWrap="true" />
                <Label class="list-group-item-text" text="The rest of the content" textWrap="true" />
              </StackLayout>
            </StackLayout>
          </v-template>

          <v-template if="item.type === 'page'">
            <WrapLayout orientation="horizontal" class="list-group-item active">
              <Label :text="'<<< ' + item.title + ' >>>'" style="color: red;" />
            </WrapLayout>
          </v-template>

        </ListView>
      </StackLayout>
    </Page>
  </Frame>
  `,

  created() {
    this.fetchItems()
  },

  methods: {
    onItemTap({ item }) {
      if (item.type === 'page') {
        return alert('You shall not pass.')
      }

      this.$showModal(
        {
          template: `
            <Page style="background-color: rgba(0, 0, 0, .6);">
              <StackLayout>
                <Label class="h2" textAlignment="center" textWrap="true" text="${item.title}" style="color: #fff; margin-top: 20" />
                <GridLayout rows="*, 60">
                  <ActivityIndicator row="0" :busy="true" height="100" />
                  <Image row="0" src="${item.fullImage}" />
                  <Button row="1" @tap="$modal.close" text="Close" />
                </GridLayout>
              </StackLayout>
            </Page>
          `,
        },
        {
          fullscreen: true,
        }
      ).then((res) => {
        console.log('Modal closed')
        console.dir(res)
      })
    },

    onLoaded(e) {
      console.log('The list has been loaded')
    },

    onLoadMoreItems(e) {
      console.log('Loading more items')
      return this.fetchItems()
    },

    refresh() {
      this.items = []
      this.page_num = 1
      this.fetchItems()
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
          this.refresh()
        }
      })
    },

    fetchItems() {
      this.$http
        .getJSON(
          `https://www.reddit.com/${this.subreddit}.json?limit=10&count=10&after=${this.last_page}`
        )
        .then((res) => {
          this.items.push({
            title: 'Page ' + this.page_num,
            type: 'page',
          })

          res.data.children.forEach((item) => {
            const fullImage = item.data.preview
              ? item.data.preview.images[0].source.url
              : null
            const image = item.data.preview ? item.data.preview.thumbnail : null
            this.items.push({
              title: item.data.title,
              image: image,
              fullImage: fullImage,
              type: 'entry',
            })
          })
          this.last_page = res.data.after
          this.page_num++

          console.log('Loaded more items')
        })
        .catch((err) => {
          console.log('err..' + err)
        })
    },
  },
}).$start()
