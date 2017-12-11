const Vue = require('./nativescript-vue')

Vue.component('test', {
  mounted() {
    if (!this.$templates) {
      return
    }

    let selectorFn = this.$templates.selectorFn

    console.log(selectorFn({}))
    console.log(selectorFn({ cool: true }))
    console.log(selectorFn({ cool: true, featured: true }))

    let item = {
      cool: true
    }

    let keyedTemplate = this.$templates.getKeyedTemplate(selectorFn(item))

    console.log(keyedTemplate.createView())
    console.log(keyedTemplate.createView())
    console.log(keyedTemplate.createView())
    console.log(keyedTemplate.createView())
  },

  template: `<detached-container><slot /></detached-container>`
  //template: `<detached-container></detached-container>`
})

new Vue({
  template: `
    <Page>
        <ActionBar title="v-template" />
        <StackLayout>
            <test>
                <v-template>
                    <Label text="foobar" />
                </v-template>
                <v-template name="fool" if="item.featured && item.cool">
                    <Label text="foolbar" />
                </v-template>
                <v-template name="cool" if="item.cool">
                    <Label text="coolbar" />
                </v-template>
            </test>
        </StackLayout>
    </Page>
  `
}).$start()
