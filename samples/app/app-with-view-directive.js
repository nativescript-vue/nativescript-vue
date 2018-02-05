const Vue = require('./nativescript-vue')

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-pro-ui/sidedrawer').RadSideDrawer
)

new Vue({
  template: `
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
  `
}).$start()
