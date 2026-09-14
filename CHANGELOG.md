# Changelog

## 3.1.1 (2026-09-14)

- `@nativescript-vue/template-blank` declares its repository, which npm requires to accept the package's provenance. `nativescript-vue@3.1.0` shipped, but the template could not be staged for 3.1.0, so 3.1.1 is its first release of this line. (#1157)
- The release workflow stages each package in its own job and can be dispatched for an existing tag. (#1156)

## 3.1.0 (2026-09-14)

### Requirements

- **Vue Devtools now needs `@vue/devtools` 8.** It is an optional peer dependency instead of a bundled 6.x one. Install it only if you use devtools; the webpack integration errors with an upgrade hint on an older version. The 6.x client never connected on 3.0.x, which is what #1106, #1076 and #1069 reported. (#1133, #1136)
- Node 20 or newer is the declared engine, matching the current NativeScript tooling.
- `@nativescript/core` is now declared as a peer dependency (`>=8.9.0`), which was already what the runtime imported.

### Features

- **KeepAlive is supported.** Deactivated components keep their state and are moved back into place on activation, including multi-root components and `max` eviction. Native views are recreated on re-add, so native-only state such as scroll offsets does not survive unless the view sets `reusable`. (#1139)
- **`<Android>` and `<iOS>` components** render their children on one platform only, as in Vue 2. (#1154, closes #1049)
- **`$navigateBack({ to })`** unwinds to the `Page` returned by `$navigateTo` or to a `BackstackEntry` from `frame.backStack`. (#1153, closes #1025)
- **`ListView` emits `itemTap` with the item.** The event carries `item`, `index`, `even` and `odd` alongside the native fields; the type is exported as `ListViewItemTapEvent`. (#1151, closes #1057, #1047)
- **`ListView` templates can be forwarded through a wrapper component's slots**, the Vue 2 "CVWrapper" pattern, including `<slot>` fallback content. (#1147)
- `$showModal` presents nested modals from the topmost open modal, and a refused presentation rejects and unmounts instead of leaking a detached view. (#1135)
- `$modal` defaults to `false` outside a modal, so `v-if="$modal"` works without a null check. (#1135)
- Devtools names apps after their root component. (#1136)
- Project templates resolve `vue` types to `nativescript-vue`, which fixes type mismatches with plugins such as Pinia. Existing projects can add the same `paths` entry to their tsconfig; see the README. (#1132)
- Development warnings for usage that used to fail silently: `v-model` on an element without model meta, `v-model` modifiers, and removing a `<Frame>`'s current `<Page>` with `v-if` or `v-for`. (#1130)

### Fixes

- Keyed list reorders keep native child order stable. (#1124)
- `ListView` refreshes on in-place array mutations such as `push` and `splice`, and leaves `ObservableArray` to notify on its own. (#1125)
- Modals dismissed by the platform, such as a swipe or the back button, are dropped from the modal stack. (#1126)
- `$navigateTo` and `$showModal` can be called from the root component's `onMounted`. (#1127, closes #1081)
- `ActionItem`, `Span` and `TabViewItem` inserted at index 0 land at the front instead of the end. (#1128)
- Only `on` followed by a non-lowercase character is treated as an event listener, so props such as `onboardingTitle` are set as attributes. (#1129)
- Style patches diff against the previous value instead of clearing and reapplying every property. (#1131)
- Root component HMR keeps the current page and open modals instead of resetting the root view, and a reloaded modal is re-presented after its dismissal completes. (#1135)
- JavaScript-only projects build again: the webpack integration only taps `ForkTsCheckerWebpackPlugin` when it is registered. (#1148, closes #1115, #1103)
- `ios.position` and `android.position` style dotted keys are applied on their own platform only. (#1149, closes #1052)
- `<Page actionBarHidden />` and other empty-string shorthands set boolean properties that have no default value. (#1150, closes #1110)
- `$navigateTo` and `$navigateBack` find frames in the displayed views when core's frame stack is empty, as after Android recreates the activity. (#1152, closes #1034)

### Internal

- GitHub Actions CI, a vitest suite with a `@nativescript/core` stub, and a tag-driven release workflow that stages both packages on npm with provenance. (#1123)
- Dependency bumps, repository cleanup and package metadata, and a monthly Dependabot schedule. (#1121, #1122, #1146)
- The demo app boots into a switcher: Cmd+D (Ctrl+D on Android) lists every demo and the choice persists across launches. (#1140)
