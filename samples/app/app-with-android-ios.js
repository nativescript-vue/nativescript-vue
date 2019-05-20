const Vue = require('nativescript-vue')

new Vue({
  template: `
    <Frame>
      <Page>
        <StackLayout>
          <Label android:text="hi android" ios:text="hi ios..." />

          <android>
            <Label text="hello android" />
            <Label text="hello android 2" />
          </android>
          <ios>
            <Label text="hello ios" />
            <Label text="hello ios 2" />
          </ios>
        </StackLayout>
      </Page>
    </Frame>
  `
}).$start()
