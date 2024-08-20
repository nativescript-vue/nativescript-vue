import type { DefineComponent } from '@vue/runtime-core';

declare module 'vue' {
  interface GlobalComponents {
    Frame: DefineComponent<{}>;
    Page: DefineComponent;
    StackLayout: DefineComponent;
    GridLayout: DefineComponent;
    Label: DefineComponent<{ text?: unknown }>;
    Button: DefineComponent<{ text?: unknown }>;
  }
}
