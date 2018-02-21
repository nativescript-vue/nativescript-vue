const Vue = require('./nativescript-vue')

new Vue({
  template: `
  <Page>
    <StackLayout>
      <Label android:text="hi android" ios:text="hi ios..." />
    
      <android>
        <Label text="hello android" />
      </android>
      <ios>
        <Label text="hello ios" />
      </ios>
    </StackLayout>
  </Page>
  `
}).$start()
