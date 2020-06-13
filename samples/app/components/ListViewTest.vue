<template>
    <Page>
        <CollectionView for="item in listItems"
                        separatorColor="transparent">


            <!-- A post with a single image -->
            <v-template if="item.type === 'post.image.single'">
                <ListItem :item="item" @toggleLike="togglePostLike(item)">
                    <GridLayout rows="auto, auto">
                        <Label textWrap :text="item.body" class="content"/>

                        <Label backgroundColor="red"
                               height="200"
                               stretch="aspectFill"
                               row="1"/>
                    </GridLayout>
                </ListItem>
            </v-template>

            <!-- A post with 2 images -->
            <v-template if="item.type === 'post.image.double'">
                <ListItem :item="item" @toggleLike="togglePostLike(item)">
                    <GridLayout rows="auto, auto" columns="*, *">
                        <Label textWrap :text="item.body" class="content" colSpan="2"/>

                        <Label backgroundColor="red"
                               height="200"
                               stretch="aspectFill"
                               col="0"
                               row="1"/>
                        <Label backgroundColor="green"
                               height="200"
                               stretch="aspectFill"
                               col="1"
                               row="1"/>
                    </GridLayout>
                </ListItem>
            </v-template>

            <!-- A post with more than 2 images -->
            <v-template if="item.type === 'post.image.multiple'">
                <ListItem :item="item" @toggleLike="togglePostLike(item)">
                    <GridLayout rows="auto, auto, auto" columns="2*, *">
                        <Label textWrap :text="item.body" class="content" colSpan="2"/>

                        <Label backgroundColor="red"
                               height="200"
                               stretch="aspectFill"
                               col="0"
                               row="1"
                               rowSpan="2"/>
                        <Label backgroundColor="green"
                               height="100"
                               stretch="aspectFill"
                               col="1"
                               row="1"/>
                        <Label backgroundColor="blue"
                               height="100"
                               stretch="aspectFill"
                               col="1"
                               row="2"/>
                    </GridLayout>
                </ListItem>
            </v-template>

            <!-- A default post if there are no events or images -->
            <v-template if="item.type === 'post'">
                <ListItem :item="item" @toggleLike="togglePostLike(item)"/>
            </v-template>

            <v-template>
                <ListItem :item="item" @toggleLike="togglePostLike(item)"/>
            </v-template>

            <!--<v-template if="item.type === 'post'">-->
            <!--    &lt;!&ndash;<Label :text="JSON.stringify(item, null, 2)"/>&ndash;&gt;-->
            <!--    <GridLayout rows="50, *, 50" margin="8" background="white" ___height="800px">-->
            <!--        &lt;!&ndash; Top Actions &ndash;&gt;-->
            <!--        <Label backgroundColor="rgba(255, 0, 0, 0.2)"/>-->

            <!--        &lt;!&ndash; Content &ndash;&gt;-->
            <!--        <Label :text="item.body" textWrap row="1"/>-->
            <!--        &lt;!&ndash;<Label text="Static text to test" textWrap row="1"/>&ndash;&gt;-->

            <!--        &lt;!&ndash; Bottom Actions &ndash;&gt;-->
            <!--        <Label @tap="togglePostLike(item, $index)"-->
            <!--               :text="item.liked ? 'Unlike' : 'Like'"-->
            <!--               backgroundColor="rgba(0, 0, 255, 0.2)"-->
            <!--               row="2"/>-->
            <!--    </GridLayout>-->
            <!--</v-template>-->

            <v-template if="item.type === 'indicator' && item.state === 'loading'">
                <GridLayout rows="auto" padding="24">
                    <Label text="Loading..." row="1"/>
                </GridLayout>
            </v-template>
            <v-template if="item.type === 'indicator' && item.state === 'end'">
                <GridLayout rows="auto" padding="24">
                    <Label text="Reached end." row="1"/>
                </GridLayout>
            </v-template>
        </CollectionView>
    </Page>
</template>

<script>
  import ListItem from './ListItem'
  import {ObservableArray} from '@nativescript/core'
  import {loremIpsum} from 'lorem-ipsum'

  const getType = (images, event) => {
    let type = 'post'

    if (event && images === 0) {
      type = 'post.event'
    } else if (images === 1) {
      type = 'post.image.single'
    } else if (images === 2) {
      type = 'post.image.double'
    } else if (images > 2) {
      type = 'post.image.multiple'
    }
    return type
  }
  const genPost = (sentences, images = 0, event = false) => ({
    liked: false,
    type: getType(images, event),
    body: loremIpsum({
      count: sentences,
      format: 'html'
    })
  })
  const loadItems = () => new Promise(resolve => setTimeout(() => {
    resolve({
      items: [
        genPost(1, 0, true),
        genPost(3, 1, false),
        genPost(1, 2, false),
        genPost(10, 5, false),
        genPost(1, 0, false),
        genPost(1, 4, false),
        genPost(1, 1, true),
        genPost(1, 0, true),
        genPost(10, 3, false),
        genPost(1, 2, false),
        genPost(10, 1, false),
        genPost(1, 1, false),
        genPost(10, 0, false),
      ]
    })
  }, 1000))

  const ListStates = {
    IDLE: 'idle',
    LOADING: 'loading',
    END: 'end'
  }

  export default {
    data() {
      return {
        feedItems: [],
        listState: ListStates.IDLE,
        listItemsObservable: new ObservableArray([])
      }
    },
    watch: {
      listItems: {
        handler(items) {
          console.log('listItems changed')
          this.listItemsObservable.splice(0)
          this.listItemsObservable.push(items)
        },
        deep: true
      }
    },
    computed: {
      listItems() {
        const items = this.feedItems
        //
        // if (this.listState !== ListStates.IDLE) {
        //   items.push({
        //     type: 'indicator',
        //     state: this.listState
        //   })
        // }
        console.log('listItems computed changed')

        return items
      }
    },
    created() {
      this.fetchItems()
    },
    methods: {
      async fetchItems() {
        if (this.listState !== ListStates.IDLE) {
          return
        }

        this.listState = ListStates.LOADING
        const res = await loadItems().catch(err => {
          console.log(err)
        })

        if (!res.items || res.items.length === 0) {
          this.listState = ListStates.END
          return
        }

        this.feedItems = res.items
        this.listState = ListStates.IDLE

      },

      async togglePostLike(item) {
        console.log('post like changed')
        item.liked = !item.liked
        // this.listItemsObservable.setItem(this.listItemsObservable.indexOf(item), {
        //   ...item,
        // })
      }
    },
    components: {
      ListItem
    }
  }
</script>
