const Vue = require('./nativescript-vue')

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

new Vue({
  template: `
    <Frame>
      <Page>
        <ActionBar text="Drawer Sample">
            <ActionItem text="Menu" @tap="$refs.drawer.nativeView.showDrawer()"/>
        </ActionBar>
        <RadSideDrawer ref="drawer">
          <StackLayout ~drawerContent backgroundColor="white">
            <Label text="Drawer" />
          </StackLayout>
          <StackLayout ~mainContent>
            <Label text="Main" />
            <Button text="Open Drawer" @tap="$refs.drawer.nativeView.showDrawer()"/>
          </StackLayout>
        </RadSideDrawer>
      </Page>
    </Frame>
  `
}).$start()
