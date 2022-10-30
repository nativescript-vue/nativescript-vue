import {
  createApp,
  defineComponent,
  registerUnknownViewResolver,
} from "../src/withCompiler";

registerUnknownViewResolver((name) => {
  return class {
    constructor() {
      console.log("creating", name);
    }
  };
});

const TestComponent = defineComponent({
  data() {
    return {
      show: false,
    };
  },
  created() {
    setInterval(() => {
      this.show = !this.show;
    }, 1000);
  },
  template: `<section>
  <span v-show="show">vshow</span>
  <span v-show="show" visibility="block">vshow</span>
  </section>`,
});

const app = createApp({
  components: {
    TestComponent,
    Foo: {
      props: ["name"],
      template: "<div>{{ name }}</div>",
    },
  },
  template: `<div>Hello App! <Foo name="John Doe"/> <TestComponent/></div>`,
}).start();
