import { registerRuntimeCompiler } from "@vue/runtime-dom";
import { compileToFunction } from "./compiler";

registerRuntimeCompiler(compileToFunction);

export { compileToFunction as compile }
export * from "./index";
