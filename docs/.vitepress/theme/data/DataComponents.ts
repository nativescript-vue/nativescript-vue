const nativescriptUIbaseUrl = "https://docs.nativescript.org/ui";

export interface DataComponent {
  name: string;
  description: string;
  url: string;
  vModel?: string;
  img?: string;
}
export interface SectionComponent {
  name: string;
  views: DataComponent[];
}

export const dataComponents: SectionComponent[] = [
  {
    name: "Layout Containers​",
    views: [
      {
        name: "StackLayout",
        description: "Stacks views vertically or horizontally",
        url: `${nativescriptUIbaseUrl}/stack-layout`,
        img: "https://art.nativescript.org/layouts/wrap_layout_horizontal.svg",
      },
      {
        name: "GridLayout",
        description: "Arranges views in a grid of rows and columns",
        url: `${nativescriptUIbaseUrl}/grid-layout`,
        img: "https://art.nativescript.org/layouts/grid_layout.svg",
      },
      {
        name: "RootLayout",
        description: "Dynamically positions views relative to parent edges",
        url: `/docs/elements/components/root-layout`,
        img: "/images/components/root_layout.png",
      },
      {
        name: "FlexboxLayout",
        description: "Layouts views with CSS Flexbox properties",
        url: `${nativescriptUIbaseUrl}/flexbox-layout`,
        img: "https://art.nativescript.org/layouts/flexbox_layout_row_stretch.svg",
      },
      {
        name: "WrapLayout",
        description: "Wraps views onto multiple lines",
        url: `${nativescriptUIbaseUrl}/wrap-layout`,
        img: "https://art.nativescript.org/layouts/wrap_layout_horizontal.svg",
      },
      {
        name: "DockLayout",
        description: "Positions views at edges of the container",
        url: `${nativescriptUIbaseUrl}/dock-layout`,
        img: "https://art.nativescript.org/layouts/dock_layout_stretch.svg",
      },
      {
        name: "AbsoluteLayout",
        description: "Places views at explicit x/y coordinates",
        url: `${nativescriptUIbaseUrl}/absolute-layout`,
        img: "https://art.nativescript.org/layouts/absolute_layout_grid.svg",
      },
    ],
  },
  {
    name: "Navigation Components​​",
    views: [
      {
        name: "Frame",
        description: "Root container for app navigation",
        url: `${nativescriptUIbaseUrl}/frame`,
      },
      {
        name: "Page",
        description: "Represents a single screen",
        url: `${nativescriptUIbaseUrl}/page`,
      },
      {
        name: "ActionBar",
        description: "Top app bar for navigation and actions",
        url: `${nativescriptUIbaseUrl}/action-bar`,
      },
      {
        name: "ActionItem",
        description: "Item within ActionBar for specific actions",
        url: `${nativescriptUIbaseUrl}/action-bar#action-item`,
      },
      {
        name: "NavigationButton",
        description: "Button for navigation in ActionBar",
        url: `${nativescriptUIbaseUrl}/action-bar#navigation-button`,
      },
    ],
  },
  {
    name: "Dialogs​​​",
    views: [
      {
        name: "Alert",
        description: "Displays an alert message",
        url: `${nativescriptUIbaseUrl}/dialogs#alert`,
        img: "/images/components/alert.png",
      },
      {
        name: "Action",
        description: "Shows multiple selectable options",
        url: `${nativescriptUIbaseUrl}/dialogs#action`,
        img: "/images/components/action.png",
      },
      {
        name: "Confirm",
        description: "Requests user confirmation",
        url: `${nativescriptUIbaseUrl}/dialogs#confirm`,
        img: "/images/components/confirm.png",
      },
      {
        name: "Prompt",
        description: "Requests text input from user",
        url: `${nativescriptUIbaseUrl}/dialogs#prompt`,
        img: "/images/components/prompt.png",
      },
      {
        name: "Login",
        description: "Dialog for username/password input",
        url: `${nativescriptUIbaseUrl}/dialogs#login`,
        img: "/images/components/login.png",
      },
    ],
  },
  {
    name: "Components​",
    views: [
      {
        name: "ActivityIndicator",
        description: "Shows a loading spinner",
        url: `${nativescriptUIbaseUrl}/activity-indicator`,
        img: "/images/components/activity_indicator.png",
      },
      {
        name: "Button",
        description: "Touchable button component",
        url: `${nativescriptUIbaseUrl}/button`,
        img: "/images/components/button.png",
      },
      {
        name: "DatePicker",
        description: "Allows date selection",
        vModel: "date",
        url: `${nativescriptUIbaseUrl}/date-picker`,
        img: "/images/components/date_picker.png",
      },
      {
        name: "HtmlView",
        description: "Renders HTML content",
        url: `${nativescriptUIbaseUrl}/html-view`,
        img: "/images/components/html_view.png",
      },
      {
        name: "Image",
        description: "Displays an image",
        url: `${nativescriptUIbaseUrl}/image`,
        img: "/images/components/image.png",
      },
      {
        name: "Label",
        description: "Displays text content",
        url: `${nativescriptUIbaseUrl}/label`,
        img: "/images/components/label.png",
      },
      {
        name: "ListPicker",
        description: "Dropdown to pick items",
        vModel: "selectedIndex",
        url: `${nativescriptUIbaseUrl}/list-picker`,
        img: "/images/components/list_picker.png",
      },
      {
        name: "ListView",
        description: "Scrollable list of items",
        url: `/docs/elements/components/list-view`,
        img: "/images/components/list_view.png",
      },
      {
        name: "Placeholder",
        description: "Container for dynamic views",
        url: `${nativescriptUIbaseUrl}/placeholder`,
        img: "/images/components/placeholder.png",
      },
      {
        name: "Progress",
        description: "Shows progress indicator",
        url: `${nativescriptUIbaseUrl}/progress`,
        img: "/images/components/progress.png",
      },
      {
        name: "ScrollView",
        description: "Scrollable container for content",
        url: `${nativescriptUIbaseUrl}/scroll-view`,
        img: "/images/components/scroll_view.png",
      },
      {
        name: "SearchBar",
        description: "Input for search queries",
        url: `${nativescriptUIbaseUrl}/search-bar`,
        img: "/images/components/search_bar.png",
      },
      {
        name: "SegmentedBar",
        description: "Horizontal bar with segments",
        url: `${nativescriptUIbaseUrl}/segmented-bar`,
        img: "/images/components/segmented_bar.png",
      },
      {
        name: "Slider",
        description: "Lets users pick a value within range",
        vModel: "value",
        url: `${nativescriptUIbaseUrl}/slider`,
        img: "/images/components/slider.png",
      },
      {
        name: "Switch",
        description: "Toggle switch control",
        vModel: "checked",
        url: `${nativescriptUIbaseUrl}/switch`,
        img: "/images/components/switch.png",
      },
      {
        name: "TabView",
        description: "View with tab-based navigation",
        url: `${nativescriptUIbaseUrl}/tab-view`,
        img: "/images/components/tab_view.png",
      },
      {
        name: "TextField",
        description: "Single-line text input",
        vModel: "text",
        url: `${nativescriptUIbaseUrl}/text-field`,
        img: "/images/components/text_field.png",
      },
      {
        name: "TextView",
        description: "Multi-line text input",
        vModel: "text",
        url: `${nativescriptUIbaseUrl}/text-view`,
        img: "/images/components/text_view.png",
      },
      {
        name: "TimePicker",
        description: "Allows time selection",
        vModel: "time",
        url: `${nativescriptUIbaseUrl}/time-picker`,
        img: "/images/components/time_picker.png",
      },
      {
        name: "WebView",
        description: "Displays web content",
        url: `${nativescriptUIbaseUrl}/web-view`,
        img: "/images/components/web_view.png",
      },
    ],
  },
];
