import { registerRuntimeCompiler } from "@vue/runtime-core";
import { compileToFunction } from "./compiler";

registerRuntimeCompiler(compileToFunction);

export { compileToFunction as compile }
export * from "./index";
