import type { Component } from 'nativescript-vue';
import Bench from './components/Bench.vue';
import GH1010 from './components/GH1010.vue';
import GH1011 from './components/GH1011.vue';
import GH1012 from './components/GH1012.vue';
import GH1017 from './components/GH1017.vue';
import HMRTestLoader from './components/HMRTestLoader.vue';
import Home from './components/Home.vue';
import demo_KeepAlive from './components/demo_KeepAlive.vue';
import demo_ListView from './components/demo_ListView.vue';
import demo_ListViewTemplates from './components/demo_ListViewTemplates.vue';
import demo_ListViewWrapper from './components/demo_ListViewWrapper.vue';
import test_TextNodes from './components/test_TextNodes.vue';

/**
 * `root` describes what the component renders at its top level so the
 * switcher can wrap it into a Frame/Page as needed.
 */
export interface Demo {
  name: string;
  component: Component;
  root: 'frame' | 'page' | 'view';
}

export const DEFAULT_DEMO = 'ListView';

export const demos: Demo[] = [
  { name: 'ListView', component: demo_ListView, root: 'frame' },
  {
    name: 'ListView templates',
    component: demo_ListViewTemplates,
    root: 'frame',
  },
  {
    name: 'ListView wrapper (forwarded slots)',
    component: demo_ListViewWrapper,
    root: 'frame',
  },
  { name: 'KeepAlive', component: demo_KeepAlive, root: 'frame' },
  { name: 'Text nodes', component: test_TextNodes, root: 'frame' },
  { name: 'HMR', component: HMRTestLoader, root: 'frame' },
  { name: 'Home (navigation, modals)', component: Home, root: 'page' },
  { name: 'Bench', component: Bench, root: 'page' },
  { name: 'GH1010', component: GH1010, root: 'view' },
  { name: 'GH1011', component: GH1011, root: 'view' },
  { name: 'GH1012', component: GH1012, root: 'view' },
  { name: 'GH1017', component: GH1017, root: 'view' },
];
