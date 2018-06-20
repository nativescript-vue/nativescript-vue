const Vue = require('./nativescript-vue')

Vue.config.silent = false

const ImageCard = {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  template: '<Image :src="src" stretch="aspectFit" />'
}
const url = 'https://api.giphy.com/v1/gifs/search'
const key = 'ZboEpjHv00FzK6SI7l33H7wutWlMldQs'
const filter = 'limit=25&offset=0&rating=G&lang=fr'

new Vue({
  components: {
    ImageCard
  },
  template: `
    <Frame>
      <Page class="page">
        <ActionBar class="action-bar" title="Poket Gif" />
        
        <StackLayout class="layout">
          <SearchBar hint="Chercher un gif" ref="search" v-model="q" @submit="search" />
    
          <ListView for="img in imgs" height="100%">
            <v-template>
              <ImageCard :src="img.images.downsized.url" />
            </v-template>
          </ListView>
        </StackLayout>
      </Page>
    </Frame>
  `,

  data() {
    return {
      imgs: [],
      surprise: false,
      q: ''
    }
  },

  methods: {
    search() {
      this.$refs.search.nativeView.dismissSoftInput()
      fetch(`${url}?api_key=${key}&q=${this.q}&${filter}`)
        .then(response => response.json())
        .then(json => (this.imgs = json.data))
    }
  }
}).$start()
