import { dataComponents } from "../data/DataComponents";

export const componentMarkdownUtils = {
  buildIdMarkdown: (id: string) => {
    return id.trim().toLowerCase().replace(/\s/g, "-");
  },
  processSearchableVueContent(src: string) {
    if (src.includes("<!-- COMPONENT_LIST_CONTENT -->")) {
      src = src.replace(
        "<!-- COMPONENT_LIST_CONTENT -->",
        generateSearchableComponents()
      );
    }

    return src;
  },
};

function generateSearchableComponents() {
  let md = "";
  dataComponents.forEach((section) => {
    md += `## ${section.name}\n`;
    section.views.forEach((view) => {
      md += `### ${view.name}\n${view.description}\n`;
    });
  });
  return md;
}
