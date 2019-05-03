import { mount } from '@vue/test-utils'
import { getComponentByName } from 'register'


const Button = getComponentByName('Button')
const StackLayout = getComponentByName('StackLayout')

const ButtonTest = {
  components: {
    Button,
    StackLayout
  },
  template: `
  <StackLayout>
    <Label :text="count" />
    <Button @tap="increment">Increment</Button>
  </StackLayout>
  `,
  data () {
    return {
      count: 0
    }
  },
  methods: {
    increment () {
      this.count++
    }
  }
}

describe('Button', () => {
  const Button = getComponentByName('Button')
  const wrapper = mount(ButtonTest)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<nativestacklayout><label text="0"></label> <nativebutton>Increment</nativebutton></nativestacklayout>')
  })

  it('has a button', () => {
    expect(wrapper.contains('nativebutton')).toBe(true)
  })

  it('button should increment the count', () => {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('nativebutton')
    button.trigger('tap')
    expect(wrapper.vm.count).toBe(1)
    expect(wrapper.html()).toContain('<nativestacklayout><label text="1"></label> <nativebutton>Increment</nativebutton></nativestacklayout>')
  })
})