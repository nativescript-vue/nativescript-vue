<template>
    <Page>
        <CollectionView for="item in listItemsObservable"
                  separatorColor="transparent">
            <v-template if="item.type === 'post'">
                <!--<Label :text="JSON.stringify(item, null, 2)"/>-->
                <GridLayout rows="50, *, 50" margin="8" background="white" ___height="800px">
                    <!-- Top Actions -->
                    <Label backgroundColor="rgba(255, 0, 0, 0.2)"/>

                    <!-- Content -->
                    <Label :text="item.body" textWrap row="1"/>
                    <!--<Label text="Static text to test" textWrap row="1"/>-->

                    <!-- Bottom Actions -->
                    <Label @tap="togglePostLike(item, $index)"
                           :text="item.liked ? 'Unlike' : 'Like'"
                           backgroundColor="rgba(0, 0, 255, 0.2)"
                           row="2"/>
                </GridLayout>
            </v-template>

            <!--<v-template if="item.type === 'indicator' && item.state === 'loading'">-->
            <!--    <GridLayout rows="auto" padding="24">-->
            <!--        <Label text="Loading..." row="1"/>-->
            <!--    </GridLayout>-->
            <!--</v-template>-->
            <!--<v-template if="item.type === 'indicator' && item.state === 'end'">-->
            <!--    <GridLayout rows="auto" padding="24">-->
            <!--        <Label text="Reached end." row="1"/>-->
            <!--    </GridLayout>-->
            <!--</v-template>-->
        </CollectionView>
    </Page>
</template>

<script>
  import {ObservableArray} from '@nativescript/core'

  const loadItems = () => new Promise(resolve => setTimeout(() => {
    resolve({
      items: [
        {
          liked: false,
          body: 'Hello World '.repeat(200)
        },
        {
          liked: true,
          body: 'Something else... '.repeat(20)
        },
        {
          liked: false,
          body: 'Something even else. '.repeat(40)
        },
        {
          liked: true,
          body: 'Something else 2. '.repeat(50)
        },
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

        this.feedItems = res.items.map(item => {
          return {
            type: 'post',
            body: item.body,
            liked: !!item.liked
          }
        })

        this.listState = ListStates.IDLE

      },

      async togglePostLike(item) {
        console.log('post like changed')

        item.liked = !item.liked

        // this.listItemsObservable.setItem(this.listItemsObservable.indexOf(item), {
        //   ...item,
        // })
      }
    }
  }


</script>
