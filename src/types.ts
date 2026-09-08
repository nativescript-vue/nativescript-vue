import type { DefineComponent } from '@vue/runtime-core';
import type * as NS from '@nativescript/core';
import type { ListItem } from './components/ListView';

type Platform = 'android' | 'ios';

/**
 * Attributes are strings in templates and NativeScript converts them, so
 * every property also accepts its string form.
 */
type Loose<V> = V extends string ? V : V | string;

type PropKeys<T> = {
  [K in keyof T]-?: K extends string
    ? K extends `_${string}` | 'style' | 'class' | Platform
      ? never
      : T[K] extends Function
        ? never
        : K
    : never;
}[keyof T];

/** Attached properties read by the layout containers. */
export interface LayoutProps {
  row?: number | string;
  col?: number | string;
  rowSpan?: number | string;
  colSpan?: number | string;
  dock?: 'left' | 'top' | 'right' | 'bottom';
  left?: number | string;
  top?: number | string;
  flexGrow?: number | string;
  flexShrink?: number | string;
  flexWrapBefore?: boolean | string;
  alignSelf?: string;
  order?: number | string;
}

/**
 * `ios:` / `android:` prefixed attributes are applied on that platform only;
 * the dotted form (`ios.position`) sets a nested platform-specific property.
 */
export type PlatformProps = {
  [K in `${Platform}:${string}` | `${Platform}.${string}`]?: unknown;
};

/** Bindable properties of a NativeScript view as accepted by its element. */
export type NativeViewProps<T> = {
  [K in PropKeys<T>]?: Loose<T[K]>;
} & LayoutProps &
  PlatformProps;

/** v-model support for elements registered with a model prop/event pair. */
export type ModelProps<T, K extends keyof T> = {
  modelValue?: T[K];
  'onUpdate:modelValue'?: (value: T[K]) => void;
};

export type NativeViewComponent<T, Extra = {}> = DefineComponent<
  NativeViewProps<T> & Extra
>;

export interface ListViewProps {
  items?: any[] | NS.ObservableArray<any> | NS.ItemsSource;
  itemTemplateSelector?: (item: ListItem) => string;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    // layouts
    AbsoluteLayout: NativeViewComponent<NS.AbsoluteLayout>;
    DockLayout: NativeViewComponent<NS.DockLayout>;
    FlexboxLayout: NativeViewComponent<NS.FlexboxLayout>;
    GridLayout: NativeViewComponent<NS.GridLayout>;
    RootLayout: NativeViewComponent<NS.RootLayout>;
    StackLayout: NativeViewComponent<NS.StackLayout>;
    WrapLayout: NativeViewComponent<NS.WrapLayout>;

    // content views
    ContentView: NativeViewComponent<NS.ContentView>;
    ScrollView: NativeViewComponent<NS.ScrollView>;

    // navigation
    Frame: NativeViewComponent<NS.Frame>;
    Page: NativeViewComponent<NS.Page>;
    ActionBar: NativeViewComponent<NS.ActionBar>;
    ActionItem: NativeViewComponent<NS.ActionItem>;
    NavigationButton: NativeViewComponent<NS.NavigationButton>;

    // html
    HtmlView: NativeViewComponent<NS.HtmlView>;
    WebView: NativeViewComponent<NS.WebView>;

    // widgets
    ActivityIndicator: NativeViewComponent<NS.ActivityIndicator>;
    Button: NativeViewComponent<NS.Button>;
    DatePicker: NativeViewComponent<
      NS.DatePicker,
      ModelProps<NS.DatePicker, 'date'>
    >;
    FormattedString: NativeViewComponent<NS.FormattedString>;
    Image: NativeViewComponent<NS.Image>;
    Label: NativeViewComponent<NS.Label>;
    ListPicker: NativeViewComponent<
      NS.ListPicker,
      ModelProps<NS.ListPicker, 'selectedIndex'>
    >;
    ListView: NativeViewComponent<NS.ListView, ListViewProps>;
    Placeholder: NativeViewComponent<NS.Placeholder>;
    Progress: NativeViewComponent<NS.Progress>;
    ProxyViewContainer: NativeViewComponent<NS.ProxyViewContainer>;
    SearchBar: NativeViewComponent<
      NS.SearchBar,
      ModelProps<NS.SearchBar, 'text'>
    >;
    SegmentedBar: NativeViewComponent<
      NS.SegmentedBar,
      ModelProps<NS.SegmentedBar, 'selectedIndex'>
    >;
    SegmentedBarItem: NativeViewComponent<NS.SegmentedBarItem>;
    Slider: NativeViewComponent<NS.Slider, ModelProps<NS.Slider, 'value'>>;
    Span: NativeViewComponent<NS.Span>;
    Switch: NativeViewComponent<NS.Switch, ModelProps<NS.Switch, 'checked'>>;
    TabView: NativeViewComponent<
      NS.TabView,
      ModelProps<NS.TabView, 'selectedIndex'>
    >;
    TabViewItem: NativeViewComponent<NS.TabViewItem>;
    TextField: NativeViewComponent<
      NS.TextField,
      ModelProps<NS.TextField, 'text'>
    >;
    TextView: NativeViewComponent<NS.TextView, ModelProps<NS.TextView, 'text'>>;
    TimePicker: NativeViewComponent<
      NS.TimePicker,
      ModelProps<NS.TimePicker, 'time'>
    >;
  }
}
