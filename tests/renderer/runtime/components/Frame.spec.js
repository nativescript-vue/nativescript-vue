import { createLocalVue, mount } from '@vue/test-utils'
import NavigatorPlugin from 'plugins/navigator-plugin'
import { getComponentByName } from 'register'


const Frame = getComponentByName('Frame')
const Label = getComponentByName('Label')
const Page = getComponentByName('Page')

const FrameTest = {
  components: {
    Frame,
    Label,
    Page
  },
  template: `
  <Frame>
    <Page>
      <Label text="page1" />
    </Page>
  </Frame>
  `,
  data () {
    return {
    }
  }
}

const PageTest = {
  components: {
    Label,
    Page
  },
  template: `
  <Page>
    <Label text="page2" />
  </Page>
  `,
  data () {
    return {
    }
  }
}

jest.mock('tns-core-modules/ui/frame', () => {
  const getComponentByName = require('register').getComponentByName
  const Frame = getComponentByName('Frame')

  return {
    __esModule: true,
    default: Frame,
  }
}, {virtual: true})


describe('Frame', () => {
  const wrapper = mount(FrameTest)

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain(
      '<nativeframe><nativepage><nativelabel text="page1"></nativelabel></nativepage></nativeframe>')
  })
})

describe('navigateTo', () => {
  const localVue = createLocalVue()

  localVue.use(NavigatorPlugin)

  // pass the `localVue` to the mount options
  const wrapper = mount(FrameTest, {
    localVue
  })

  it('navigates to a different page', () => {
    wrapper.vm.$navigateTo(PageTest)
    expect(wrapper.html()).toContain(
      '<nativeframe><nativepage><nativelabel text=\"page2\"></nativelabel></nativepage></nativeframe>')
  })
})
