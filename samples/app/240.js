const Vue = require('nativescript-vue')

Vue.config.debug = true
Vue.config.silent = false

new Vue({
  computed: {
    filteredFoo() {
      if (this.submittedPhrase == '') {
        return this.fooList
      }

      let foo = this.fooList.filter(item => {
        return (
          item.title
            .toLowerCase()
            .indexOf(this.submittedPhrase.toLowerCase()) !== -1
        )
      })

      return foo
    },
    filteredBar() {
      if (this.submittedPhrase == '') {
        return this.barList
      }

      let bar = this.barList.filter(item => {
        return (
          item.title
            .toLowerCase()
            .indexOf(this.submittedPhrase.toLowerCase()) !== -1
        )
      })

      return bar
    },
    filteredFooBar() {
      if (this.submittedPhrase == '') {
        return this.fooBarList
      }

      let fooBar = this.fooBarList.filter(item => {
        return (
          item.title
            .toLowerCase()
            .indexOf(this.submittedPhrase.toLowerCase()) !== -1
        )
      })

      return fooBar
    }
  },
  methods: {
    onSearchSubmit(args) {
      let searchBar = args.object
      console.log('You are searching for [' + searchBar.text + ']')

      this.submittedPhrase = searchBar.text
    }
  },
  data() {
    return {
      searchPhrase: '',
      submittedPhrase: '',
      fooList: [
        {
          id: 1,
          title: 'Foo 1'
        },
        {
          id: 2,
          title: 'Foo 2'
        },
        {
          id: 3,
          title: 'Foo 3'
        }
      ],
      barList: [
        {
          id: 11,
          title: 'Bar 1'
        },
        {
          id: 12,
          title: 'Bar 2'
        },
        {
          id: 13,
          title: 'Bar 3'
        }
      ],
      fooBarList: [
        {
          id: 21,
          title: 'Foo Bar 1'
        },
        {
          id: 22,
          title: 'Foo Bar 2'
        },
        {
          id: 23,
          title: 'Foo Bar 3'
        }
      ]
    }
  },
  template: `
    <Frame>
      <Page class="page">
        <ActionBar title="Issue #240" class="action-bar" />
        <ScrollView>
          <StackLayout class="home-panel">
            <SearchBar hint="Search hint" :text="searchPhrase" @submit="onSearchSubmit" />
  
            <StackLayout>
                <Label >
                  <FormattedString>
                    <Span text="Keyword : "/>
                    <Span :text="searchPhrase" />                  
                  </FormattedString>
                </Label>
            </StackLayout>
  
            <StackLayout>
                <Label >
                  <FormattedString>
                    <Span text="Submitted : "/>
                    <Span :text="submittedPhrase" />                  
                  </FormattedString>
                </Label>
            </StackLayout>
  
  
            <!-- Foo List -->
            <Label text="Foo" style="font-weight: bold; margin-top:8"></Label>
            <StackLayout v-for="(item, index) in filteredFoo" :key="item.id">
                <Label :text="item.title"></Label>
            </StackLayout>
  
  
            <!-- Bar List -->
            <Label text="Bar" style="font-weight: bold; margin-top:8"></Label>
            <StackLayout v-for="(item, index) in filteredBar" :key="item.id">
                <Label :text="item.title"></Label>
            </StackLayout>
  
  
            <!-- FooBar List -->
            <Label text="FooBar" style="font-weight: bold; margin-top:8"></Label>          
            <StackLayout v-for="(item, index) in filteredFooBar" :key="item.id">
                <Label :text="item.title"></Label>
            </StackLayout>
  
  
          </StackLayout>
        </ScrollView>
      </Page>
    </Frame>
  `
}).$start()
