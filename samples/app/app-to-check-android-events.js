const Vue = require('nativescript-vue')
const application = require('tns-core-modules/application')
const platform = require('tns-core-modules/platform')

Vue.config.silent = false
Vue.config.debug = true

new Vue({
  template: `
    <Frame>
      <Page>
        <ActionBar title="Android Event Test" />
        <StackLayout>
          <Label text="Event List:" />
          <ListView class="m-t-10" for="event in androidEvents">
            <v-template>
              <Label :text="event.eventName" />
            </v-template>
          </ListView>
          <StackLayout class="m-t-10" orientation="horizontal">
            <Label text="Switch for checking responsiveness" />
            <Switch v-model="switchValue" />
          </StackLayout>
        </StackLayout>
      </Page>
    </Frame>
  `,
  data: {
    androidEvents: [],
    switchValue: false
  },
  created() {
    if (platform.isAndroid) {
      const eventTypes = [
        application.AndroidApplication.activityCreatedEvent,
        application.AndroidApplication.activityDestroyedEvent,
        application.AndroidApplication.activityStartedEvent,
        application.AndroidApplication.activityPausedEvent,
        application.AndroidApplication.activityResumedEvent,
        application.AndroidApplication.activityStoppedEvent,
        application.AndroidApplication.saveActivityStateEvent,
        application.AndroidApplication.activityResultEvent,
        application.AndroidApplication.activityBackPressedEvent
      ]
      for (let i = 0; i < eventTypes.length; i++) {
        application.android.on(eventTypes[i], event => {
          console.log(`Event: ${event.eventName}, Activity: ${event.activity}`)
          this.androidEvents.push(event)
        })
      }
    }
  }
}).$start()
