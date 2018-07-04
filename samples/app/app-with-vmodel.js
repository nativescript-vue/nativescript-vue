const Vue = require('./nativescript-vue')

new Vue({
  data: {
    test: 'testing',
    test2: 50,
    test3: 30,
    date: new Date(),
    time: new Date(),
    list: ['a', 'b', 'c'],
    listSel: 1,
    test4: false
  },

  template: `
    <Page>
      <ScrollView>
        <StackLayout>
          <Button text="whatever" @tap="onTap" />
          <TextField v-model="test" />
          <TextView v-model="test" />
          <Slider v-model.number="test2" />
          <Slider v-model.number="test3" minValue="-10" maxValue="50" style="margin-top: 15;" />
          <DatePicker v-model="date"/>
          <TimePicker v-model="time"/>
          <ListPicker v-model="listSel" :items="list"/>
          <Progress v-model="test2"/>
          <Switch v-model="test4" />
  
          <Label :text="test" />
          <Label :text="test2" />
          <Label :text="test3" />
          <Label :text="date" />
          <Label :text="time" />
          <Label :text="listSel" />
          <Label :text="test4" />
        </StackLayout>
      </ScrollView>
    </Page>
  `,

  methods: {
    onTap() {
      this.test = 'changed'
      this.test2 = 42
      this.test3 = 18
    }
  }
}).$start()
