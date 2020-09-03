const Vue = require('nativescript-vue')
const { Application } = require('@nativescript/core')

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
    if (global.isAndroid) {
      const eventTypes = [
        Application.AndroidApplication.activityCreatedEvent,
        Application.AndroidApplication.activityDestroyedEvent,
        Application.AndroidApplication.activityStartedEvent,
        Application.AndroidApplication.activityPausedEvent,
        Application.AndroidApplication.activityResumedEvent,
        Application.AndroidApplication.activityStoppedEvent,
        Application.AndroidApplication.saveActivityStateEvent,
        Application.AndroidApplication.activityResultEvent,
        Application.AndroidApplication.activityBackPressedEvent
      ]
      for (let i = 0; i < eventTypes.length; i++) {
        Application.android.on(eventTypes[i], event => {
          console.log(`Event: ${event.eventName}, Activity: ${event.activity}`)
          this.androidEvents.push(event)
        })
      }
    }
  }
}).$start()
