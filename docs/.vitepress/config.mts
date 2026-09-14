import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vitepress";
import { componentMarkdownUtils } from "./theme/utils/ComponentMarkdownUtils";

const links = {
  playground:
    "https://stackblitz.com/fork/github/nativescript-vue/nativescript-vue/tree/main/packages/stackblitz-template?file=src%2Fcomponents%2FHome.vue&title=NativeScript%20Starter%20Vue3",
  editLinkPattern:
    "https://github.com/nativescript-vue/nativescript-vue.org/blob/v3/content/:path",
  v2Docs: "https://v2.nativescript-vue.org/",
  v1Docs: "https://v1-3-1.nativescript-vue.org/",
  github: "https://github.com/nativescript-vue/nativescript-vue",
  nativescriptDocs: "https://docs.nativescript.org/",
};

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "./theme/components"),
        "@data": path.resolve(__dirname, "./theme/data"),
      },
    },
  },
  srcDir: "content",
  title: "NativeScript-Vue",
  description: "Delightful mobile app development.",
  ignoreDeadLinks: true,
  cleanUrls: true,
  themeConfig: {
    logo: {
      dark: "https://art.nativescript-vue.org/NativeScript-Vue-White-Green.svg",
      light: "https://art.nativescript-vue.org/NativeScript-Vue.svg",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/docs/getting-started/introduction" },
      {
        text: "Playground",
        link: links.playground,
      },
      {
        text: "NativeScript Docs",
        link: links.nativescriptDocs,
      },
      {
        text: "v3",
        items: [
          { text: "Release Notes", link: `${links.github}/releases` },
          {
            text: "Versions",
            items: [
              { text: "v2", link: links.v2Docs },
              // { text: "v1.3.1", link: links.v1Docs },
            ],
          },
        ],
      },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/docs/getting-started/introduction" },
          { text: "Quick Start", link: "/docs/getting-started/installation" },
          {
            text: "Creating an Application",
            link: "/docs/getting-started/creating-an-application",
          },
        ],
      },
      {
        text: "Essentials",
        items: [
          {
            text: "NativeScript Plugins",
            link: "/docs/essentials/nativescript-plugins",
          },
          { text: "Vue Plugins", link: "/docs/essentials/vue-plugins" },
          { text: "Vue Devtools", link: "/docs/essentials/vue-devtools" },
          {
            text: "Template Refs",
            link: "/docs/essentials/template-refs",
          },
          {
            text: "Full Native API Access",
            link: "/docs/essentials/full-native-api-access",
          },
          { text: "Routing", link: "/docs/essentials/routing" },
          {
            text: "Upgrade Guide",
            link: "/docs/essentials/upgrade-guide",
          },
        ],
      },
      {
        text: "Utilities",
        items: [
          {
            text: "NativeScript View",
            link: "/docs/utilities/nativescript-view",
          },
        ],
      },
      {
        text: "Components",
        items: [
          {
            text: "NativeScript Components",
            link: "/docs/elements/components/ns-components",
          },
          {
            text: "ListView",
            link: "/docs/elements/components/list-view",
          },
          {
            text: "RootLayout",
            link: "/docs/elements/components/root-layout",
          },
        ],
      },
      {
        text: "Contributing",
        link: "/docs/contributing",
      },
      {
        text: "NativeScript Docs",
        link: links.nativescriptDocs,
      },
    ],

    socialLinks: [
      { icon: "discord", link: "https://nativescript.org/discord" },
      {
        icon: "github",
        link: links.github,
      },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2018-present Igor Randjelovic",
    },
    editLink: {
      pattern: links.editLinkPattern,
    },
    search: {
      provider: "local",
      options: {
        _render(src, env, md) {
          if (env.path.includes("archived-docs")) return "";

          return md.render(
            componentMarkdownUtils.processSearchableVueContent(src),
            env
          );
        },
      },
    },
  },
});
