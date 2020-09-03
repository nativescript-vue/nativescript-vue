const Vue = require('nativescript-vue')
const { Frame, Utils } = require('@nativescript/core')

Vue.config.debug = true
Vue.config.silent = false

// for animated GIF search
const url = 'https://api.giphy.com/v1/gifs/search'
const key = 'ZboEpjHv00FzK6SI7l33H7wutWlMldQs'
const filter = 'limit=10&offset=0&rating=G&lang=en'

new Vue({
  data() {
    return {
      activeTab: 0,
      switchValue: false,
      textfieldValue: 'Some text',
      textviewValue: 'TextView\nhas\nmultiple\nlines',
      selectedItem: 'first',
      listOfItems: ['first', 'second', 'third'],
      selectedIndex: 0,
      timesPressed: 0,
      labelCondition: true,
      selectedDate: new Date(),
      selectedTime: new Date(),
      q: '',
      listViewImgs: [],
      progressValue: 50
    }
  },
  template: `
  <Frame>
    <Page>
      <ActionBar title="test">
        <ActionItem
          @tap="dismissKeyboard"
          ios.position="right"
          android.position="right"
          text="Hide Keyboard" />
      </ActionBar>
      <StackLayout>
        <TabView ref="tabview" v-model="activeTab">
          <TabViewItem title="Form">
            <ScrollView orientation="vertical">
              <StackLayout>
                <Label
                  v-if="labelCondition"
                  ref="label1"
                  text="Label with labelCondition enabled. Tap me to disable"
                  textWrap
                  style="margin-top: 10"
                  @tap="labelCondition = false"/>
                <Label
                  v-else
                  ref="label2"
                  text="Label with labelCondition disabled. Tap me to enable"
                  @tap="labelCondition = true"
                  textWrap />
                <Switch
                  ref="switch"
                  v-model="switchValue"
                  @checkedChange="onSwitchChanged" />
                <TextField
                  ref="textfield"
                  v-model="textfieldValue"
                  hint="Enter text..."
                  @textChange="onTextFiedChanged" />
                <TextView
                  ref="textview"
                  v-model="textviewValue"
                  @textChange="onTextViewChanged"
                  @blur="dismissKeyboard" />
                <DatePicker
                  ref="date"
                  v-model="selectedDate"
                  @dateChange="onDateChanged" />
                <TimePicker
                  ref="time"
                  v-model="selectedTime"
                  @timeChange="onTimeChanged" />
                <ListPicker
                  ref="listpicker"
                  v-model="selectedIndex"
                  :items="listOfItems"
                  @selectedIndexChange="onListPickerChanged" />
                <Button
                  ref="button"
                  :text="buttonText"
                  style="margin-bottom: 10"
                  @tap="onButtonPress" />
              </StackLayout>
            </ScrollView>
          </TabViewItem>
          <TabViewItem title="List">
            <StackLayout>
              <SearchBar
                ref="search"
                v-model="q"
                hint="Search a GIF"
                @submit="onSearchGif" />
              <ListView
                for="img in listViewImgs"
                height="100%">
                <v-template>
                  <StackLayout>
                    <Label
                      :text="'Loading ' + $index + ' result...'" />
                    <Image
                      :src="getImgUrl(img)"
                      stretch="none"
                      @loaded="onImageLoaded" />
                  </StackLayout>
                </v-template>
              </ListView>
            </StackLayout>
          </TabViewItem>
          <TabViewItem title="Other">
            <StackLayout>
              <SegmentedBar
                ref="segmentedbar"
                @selectedIndexChange="onSegmentedBarChanged">
                <SegmentedBarItem title="First" />
                <SegmentedBarItem title="Second" />
                <SegmentedBarItem title="Third" />
              </SegmentedBar>
              <Progress
                ref="progress"
                v-model="progressValue"
                minValue="0"
                maxValue="100" />
              <Slider
                ref="slider"
                v-model="progressValue"
                @valueChange="onSliderChanged" />
              <ActivityIndicator
                ref="activityindicator"
                :busy="progressValue !== 100"
                height="50"
                style="margin-top: 10" />
              <TextView editable="false">
                <FormattedString ref="formattedstring">
                  <Span ref="span1" text="This is a FormattedString. You can use text attributes such as " />
                  <Span ref="span2" text="bold, " fontWeight="Bold" />
                  <Span ref="span3" text="italic " fontStyle="Italic" />
                  <Span ref="span4" text="and " />
                  <Span ref="span5" text="underline." textDecoration="Underline" />
                </FormattedString>
              </TextView>
              <ScrollView ref="scrollview" orientation="horizontal">
                <StackLayout
                  orientation="horizontal"
                  style="font-size: 30; margin: 10">
                  <Label style="margin-right: 10" text="This is" />
                  <Label style="margin-right: 10" text="a text" />
                  <Label style="margin-right: 10" text="which scrolls" />
                  <Label style="margin-right: 10" text="horizontally" />
                  <Label style="margin-right: 10" text="if necessary." />
                </StackLayout>
              </ScrollView>
              <HtmlView
                ref="htmlview"
                html="<p><b>HtmlView</b> renders HTML</p>" />
              <WebView
                ref="webview"
                src="<p><b>WebView</b> with some static HTML</p>" />
            </StackLayout>
          </TabViewItem>
        </TabView>
      </StackLayout>
    </Page>
  </Frame>
`,
  computed: {
    buttonText() {
      return this.timesPressed > 0
        ? `Pressed ${this.timesPressed} times`
        : 'Press me'
    }
  },
  methods: {
    isTabActive(key) {
      return this.tabs[this.activeTab].key === key
    },
    onSwitchChanged() {
      console.log(`Switch changed to ${this.switchValue}`)
    },
    onTextFiedChanged() {
      console.log(`TextField changed to "${this.textfieldValue}"`)
    },
    onTextViewChanged() {
      console.log(`TextView changed to "${this.textviewValue}"`)
    },
    onListPickerChanged() {
      console.log(`ListPicker selectedIndex changed to ${this.selectedIndex}`)
    },
    onDateChanged() {
      console.log(`Date changed to ${this.selectedDate}`)
    },
    onTimeChanged() {
      console.log(`Time changed to ${this.selectedTime.toTimeString()}`)
    },
    onButtonPress() {
      console.log('Button pressed')
      this.timesPressed++
    },
    onSearchGif() {
      this.dismissKeyboard()
      fetch(`${url}?api_key=${key}&q=${this.q}&${filter}`)
        .then(response => response.json())
        .then(json => {
          this.listViewImgs = json.data
        })
    },
    onImageLoaded(event) {
      console.log('Image loaded')
    },
    onSegmentedBarChanged(event) {
      console.log(`SegmentedBar index changed to ${event.value}`)
    },
    onSliderChanged() {
      console.log(`Slider value changed to ${this.progressValue}`)
    },
    getImgUrl(img) {
      return `${img.images.fixed_height_still.url}?${Date.now()}`
    },
    dismissKeyboard() {
      if (global.isAndroid) {
        Utils.android.dismissSoftInput()
      } else {
        Frame.topmost().nativeView.endEditing(true)
      }
    }
  },
  created() {
    console.log(Vue.compile(this.$options.template).render.toString())
  },
  mounted() {
    Object.keys(this.$refs).map(key => {
      console.log(`this.$refs.${key} -> ${this.$refs[key]}`)
    })
  }
}).$start()
