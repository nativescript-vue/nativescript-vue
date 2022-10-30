import { NSVElement } from "../../dom";

type Style = string | null;

function isRule(node: any): boolean {
  return node.type === "rule";
}

function isDeclaration(node: any): boolean {
  return node.type === "declaration";
}

function createDeclaration(decl: any): any {
  return { property: decl.property.toLowerCase(), value: decl.value };
}

function declarationsFromAstNodes(astRules: any[]): any[] {
  return astRules.filter(isRule).map((rule) => {
    return rule.declarations.filter(isDeclaration).map(createDeclaration);
  });
}

export function patchStyle(el: NSVElement, prev: Style, next: Style) {
  if (prev) {
    // todo: check if we can substitute cssTreeParse with parseInlineCSS from compiler/transforms/transformStyle (by extracting it to shared)
    // reset previous styles
    const localStyle = `local { ${prev} }`;
    // const ast: any = cssTreeParse(localStyle, undefined)
    // const [declarations] = declarationsFromAstNodes(ast.stylesheet.rules)

    // declarations.forEach((d: any) => {
    //   ;(el.nativeView.style as any)[d.property] = unsetValue
    // })
  }

  if (!next) {
    el.removeAttribute("style");
  } else {
    // set new styles
    el.style = next;
  }
}
