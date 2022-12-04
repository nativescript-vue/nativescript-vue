declare module "*.vue" {
  import type { DefineComponent } from "../../dist/withCompiler";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
