import { FetchInterceptors } from "./FetchInterceptors";
import { SidebarLogo } from "./plugins/SidebarLogo";
import { ExtendDocs } from "./plugins/ExtendDocs";

// add interceptors to fetch
window.fetch = FetchInterceptors(window.fetch)

docute.init({
  debug: true,

  url: './markdown/',
  toc: './markdown/_toc.md',

  nav: [
    {
      title: 'Roadmap',
      path: 'https://trello.com/b/mOdP0SHD/nativescript-vue-roadmap',
    },
  ],

  icons: [
    {
      icon: 'github',
      label: 'Contribute on GitHub',
      link: 'https://github.com/rigor789/nativescript-vue',
    },
  ],

  plugins: [
    SidebarLogo,
    ExtendDocs()
  ],
})