import { mount } from '@vue/test-utils'
import { getComponentByName } from 'register'

const Button = getComponentByName('Button')
const Label = getComponentByName('Label')
const StackLayout = getComponentByName('StackLayout')

const ButtonTest = {
  components: {
    Button,
    Label,
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
  const wrapper = mount(ButtonTest)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<nativestacklayout>\n  <nativelabel text="0"></nativelabel>\n  <nativebutton>Increment</nativebutton>\n</nativestacklayout>')
  })

  it('has a button', () => {
    expect(wrapper.contains('nativebutton')).toBe(true)
  })

  it('button should increment the count', async () => {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('nativebutton')
    button.trigger('tap')
    expect(wrapper.vm.count).toBe(1)
    await wrapper.vm.$nextTick() // wait until DOM gets updated
    const label = wrapper.find('nativelabel')
    expect(label.attributes('text')).toBe('1')
  })

  wrapper.destroy()
})