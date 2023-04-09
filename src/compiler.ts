import { compile, CompilerError, CompilerOptions } from "@vue/compiler-dom";
import { RenderFunction, warn } from "@vue/runtime-core";
import * as runtime from "./index";

const NOOP = () => {};
const compileCache: Record<string, RenderFunction> = Object.create(null);

export function compileToFunction(
  template: string,
  options?: CompilerOptions
): RenderFunction {
  if (typeof template !== "string") {
    warn("invalid template option: ", template);
    return NOOP;
  }

  const key = template;
  const cached = compileCache[key];

  if (cached) {
    return cached;
  }

  const { code } = compile(template, {
    isNativeTag: (tag) => true,
    hoistStatic: true,
    prefixIdentifiers: true,
    onWarn(warn: CompilerError) {
      console.warn("Template Compile Warning", warn);
    },
    onError(err: CompilerError) {
      console.error("Template Compile Error", err);
    },
    ...options,
  });

  const render = new Function("Vue", code)(runtime) as RenderFunction;

  return (compileCache[key] = render);
}

export {
  compileToFunction as compile
}