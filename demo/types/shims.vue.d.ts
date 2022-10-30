declare module "*.vue" {
  import type { DefineComponent } from "../../src/withCompiler";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
