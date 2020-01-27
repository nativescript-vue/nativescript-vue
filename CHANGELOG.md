<a name="2.5.0-alpha.3"></a>
# [2.5.0-alpha.3](https://github.com/nativescript-vue/nativescript-vue/compare/v2.5.0-alpha.2...v2.5.0-alpha.3) (2019-11-29)


### Bug Fixes

* **ListView:** v-if usage crash inside RLV template ([#554](https://github.com/nativescript-vue/nativescript-vue/issues/554)) ([838d98a](https://github.com/nativescript-vue/nativescript-vue/commit/838d98a))
* **modals:** no ActionBar when launched from a frame within a component ([#558](https://github.com/nativescript-vue/nativescript-vue/issues/558)) ([3225852](https://github.com/nativescript-vue/nativescript-vue/commit/3225852)), closes [#536](https://github.com/nativescript-vue/nativescript-vue/issues/536) [#536](https://github.com/nativescript-vue/nativescript-vue/issues/536)


### Features

* allow suppressing renderer logs ([#586](https://github.com/nativescript-vue/nativescript-vue/issues/586)) ([12e5154](https://github.com/nativescript-vue/nativescript-vue/commit/12e5154))
* use scoped nativescript packages ([#589](https://github.com/nativescript-vue/nativescript-vue/issues/589)) ([121c11d](https://github.com/nativescript-vue/nativescript-vue/commit/121c11d))



<a name="2.5.0-alpha.2"></a>
# [2.5.0-alpha.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.5.0-alpha.1...v2.5.0-alpha.2) (2019-11-13)


### Bug Fixes

* listview view recycling ([#572](https://github.com/nativescript-vue/nativescript-vue/issues/572)) ([7a220c9](https://github.com/nativescript-vue/nativescript-vue/commit/7a220c9))
* **router module:** safely check parent tagname. fixes [#542](https://github.com/nativescript-vue/nativescript-vue/issues/542) ([#550](https://github.com/nativescript-vue/nativescript-vue/issues/550)) ([1cc8142](https://github.com/nativescript-vue/nativescript-vue/commit/1cc8142))



<a name="2.5.0-alpha.1"></a>
# [2.5.0-alpha.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.5.0-alpha.0...v2.5.0-alpha.1) (2019-09-07)


### Bug Fixes

* **frame:** $refs inside default page ([#544](https://github.com/nativescript-vue/nativescript-vue/issues/544)) ([4872304](https://github.com/nativescript-vue/nativescript-vue/commit/4872304)), closes [#543](https://github.com/nativescript-vue/nativescript-vue/issues/543)
* honour the ID of the <Frame> components in the App ([#541](https://github.com/nativescript-vue/nativescript-vue/issues/541)) ([a2b0cd6](https://github.com/nativescript-vue/nativescript-vue/commit/a2b0cd6))
* look for parent Frame instead of a NavigationEntry ([7147a9f](https://github.com/nativescript-vue/nativescript-vue/commit/7147a9f))


### Features

* improve modals in DevTools ([8677a52](https://github.com/nativescript-vue/nativescript-vue/commit/8677a52))



<a name="2.5.0-alpha.0"></a>
# [2.5.0-alpha.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.4.0...v2.5.0-alpha.0) (2019-08-24)


### Bug Fixes

* **devtools:** refresh devtools when state changes ([4d28b34](https://github.com/nativescript-vue/nativescript-vue/commit/4d28b34))
* crash on blank .vue template section ([0295650](https://github.com/nativescript-vue/nativescript-vue/commit/0295650))


### Features

* **devtools:** show navigation entries under Frame ([e82d067](https://github.com/nativescript-vue/nativescript-vue/commit/e82d067))


### BREAKING CHANGES

* **devtools:** A Frame now only accepts a single child element, that is the defaultPage for the Frame. If you have multiple pages nested under the Frame element, you will need to refactor to use `$navigateTo` instead. Additionally the default slot is only rendered once, meaning that it will not be reactive after the initial render. This is due to how the Frame element works, it renders the defaultPage, and then "navigates" to it, and it is no longer a direct child of the Frame and cannot be reactive. If this affects you, plese open an issue and describe your use case, so we can discuss possible solutions.

For most users this will not requre any additional refactoring.



<a name="2.4.0"></a>
# [2.4.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.4.0-alpha.0...v2.4.0) (2019-07-23)


### Features

* add support for Tabs and BottomNavigation ([#524](https://github.com/nativescript-vue/nativescript-vue/issues/524)) ([806658b](https://github.com/nativescript-vue/nativescript-vue/commit/806658b))



<a name="2.4.0-alpha.0"></a>
# [2.4.0-alpha.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.3.0...v2.4.0-alpha.0) (2019-07-10)


### Bug Fixes

* livesync and HMR fixes for NativeScript 6.0  ([#508](https://github.com/nativescript-vue/nativescript-vue/issues/508)) ([be95893](https://github.com/nativescript-vue/nativescript-vue/commit/be95893)), closes [#481](https://github.com/nativescript-vue/nativescript-vue/issues/481)


### Features

* **frame:** allow setting clearHistory and backstackVisible options for default pages. ([#514](https://github.com/nativescript-vue/nativescript-vue/issues/514)) ([d06a7bd](https://github.com/nativescript-vue/nativescript-vue/commit/d06a7bd))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.3.0-rc.2...v2.3.0) (2019-07-10)


### Bug Fixes

* **listview:** correct items prop type check ([c770745](https://github.com/nativescript-vue/nativescript-vue/commit/c770745)), closes [#522](https://github.com/nativescript-vue/nativescript-vue/issues/522)
* **listview:** fix prop type check ([5780bac](https://github.com/nativescript-vue/nativescript-vue/commit/5780bac)), closes [#522](https://github.com/nativescript-vue/nativescript-vue/issues/522)



<a name="2.3.0-rc.2"></a>
# [2.3.0-rc.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.3.0-rc.1...v2.3.0-rc.2) (2019-07-03)


### Bug Fixes

* import `frame` module before __onLiveSyncCore override  ([#517](https://github.com/nativescript-vue/nativescript-vue/issues/517)) ([cbee066](https://github.com/nativescript-vue/nativescript-vue/commit/cbee066)), closes [NativeScript/nativescript-dev-webpack#943](https://github.com/NativeScript/nativescript-dev-webpack/issues/943)



<a name="2.3.0-rc.1"></a>
# [2.3.0-rc.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.3.0-rc.0...v2.3.0-rc.1) (2019-07-01)


### Bug Fixes

* import `application` module ([#512](https://github.com/nativescript-vue/nativescript-vue/issues/512)) ([3f03251](https://github.com/nativescript-vue/nativescript-vue/commit/3f03251))



<a name="2.3.0-rc.0"></a>
# [2.3.0-rc.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.2.2...v2.3.0-rc.0) (2019-05-31)


### Bug Fixes

* **hooks:** make hooks compatible with CLI's 6.0.0 changes ([#500](https://github.com/nativescript-vue/nativescript-vue/issues/500)) ([6f8945e](https://github.com/nativescript-vue/nativescript-vue/commit/6f8945e))
* **listview:** only require tns module at runtime ([4c00885](https://github.com/nativescript-vue/nativescript-vue/commit/4c00885))
* **ListView:** allow ObservableArray items in ListView (Fixes [#464](https://github.com/nativescript-vue/nativescript-vue/issues/464)) ([#498](https://github.com/nativescript-vue/nativescript-vue/issues/498)) ([a904c7b](https://github.com/nativescript-vue/nativescript-vue/commit/a904c7b))
* build and use local template compiler in samples ([0282eca](https://github.com/nativescript-vue/nativescript-vue/commit/0282eca))


### Features

* upgrade to vue 2.6 ([e983a90](https://github.com/nativescript-vue/nativescript-vue/commit/e983a90))



<a name="2.2.2"></a>
## [2.2.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.2.1...v2.2.2) (2019-04-10)



<a name="2.2.1"></a>
## [2.2.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.2.0...v2.2.1) (2019-04-04)


### Bug Fixes

* fix  HMR issue on Android ([#461](https://github.com/nativescript-vue/nativescript-vue/issues/461)) ([595d2a0](https://github.com/nativescript-vue/nativescript-vue/commit/595d2a0))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.1.0...v2.2.0) (2019-03-18)


### Bug Fixes

* correct `--bundle` option checking ([#455](https://github.com/nativescript-vue/nativescript-vue/issues/455)) ([acbc18b](https://github.com/nativescript-vue/nativescript-vue/commit/acbc18b))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.2...v2.1.0) (2019-03-18)


### Bug Fixes

* add registerElement to NativeScriptVueConstructor ([#413](https://github.com/nativescript-vue/nativescript-vue/issues/413)) ([7adad31](https://github.com/nativescript-vue/nativescript-vue/commit/7adad31)), closes [#409](https://github.com/nativescript-vue/nativescript-vue/issues/409)
* Extend ModalOptions type definitions ([#422](https://github.com/nativescript-vue/nativescript-vue/issues/422)) ([72e9097](https://github.com/nativescript-vue/nativescript-vue/commit/72e9097))
* **v-model:** export registerElement in webpack. fix v-model issue [#371](https://github.com/nativescript-vue/nativescript-vue/issues/371) ([e1bc562](https://github.com/nativescript-vue/nativescript-vue/commit/e1bc562))


### Features

* show error when --bundle option is not provided ([#361](https://github.com/nativescript-vue/nativescript-vue/issues/361)) ([265f416](https://github.com/nativescript-vue/nativescript-vue/commit/265f416))
* **list-view:** Add support for default ListView item template ([#438](https://github.com/nativescript-vue/nativescript-vue/issues/438)) ([748d39a](https://github.com/nativescript-vue/nativescript-vue/commit/748d39a))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.1...v2.0.2) (2018-10-08)


### Bug Fixes

* destroy the navigation entry instance when the page is disposed ([63f8f14](https://github.com/nativescript-vue/nativescript-vue/commit/63f8f14))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0...v2.0.1) (2018-10-08)


### Bug Fixes

* **transition:** use the correct transition when navigating ([799e42f](https://github.com/nativescript-vue/nativescript-vue/commit/799e42f)), closes [#342](https://github.com/nativescript-vue/nativescript-vue/issues/342)
* destroy vue instance when page is disposed ([3df80ea](https://github.com/nativescript-vue/nativescript-vue/commit/3df80ea)), closes [#339](https://github.com/nativescript-vue/nativescript-vue/issues/339)
* fix function call order in `after` util ([16ffa1c](https://github.com/nativescript-vue/nativescript-vue/commit/16ffa1c))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-rc.0...v2.0.0) (2018-09-22)



<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-beta.1...v2.0.0-rc.0) (2018-09-19)


### Features

* updated $showModal ([b2be4bd](https://github.com/nativescript-vue/nativescript-vue/commit/b2be4bd))



<a name="2.0.0-beta.1"></a>
# [2.0.0-beta.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2018-09-19)


### Bug Fixes

* **build:** add buble as otherwise static bindings fail to generate ([f36d462](https://github.com/nativescript-vue/nativescript-vue/commit/f36d462))



<a name="2.0.0-beta.0"></a>
# [2.0.0-beta.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-alpha.3...v2.0.0-beta.0) (2018-09-18)


### Features

* multiple frame navigation ([6c45812](https://github.com/nativescript-vue/nativescript-vue/commit/6c45812)), closes [#188](https://github.com/nativescript-vue/nativescript-vue/issues/188)
* multiple frames ([#325](https://github.com/nativescript-vue/nativescript-vue/issues/325)) ([6d7b169](https://github.com/nativescript-vue/nativescript-vue/commit/6d7b169)), closes [#213](https://github.com/nativescript-vue/nativescript-vue/issues/213) [#286](https://github.com/nativescript-vue/nativescript-vue/issues/286) [#292](https://github.com/nativescript-vue/nativescript-vue/issues/292) [#292](https://github.com/nativescript-vue/nativescript-vue/issues/292) [#321](https://github.com/nativescript-vue/nativescript-vue/issues/321)


### BREAKING CHANGES

* $navigateTo: passing props should now be done using options.props instead of
options.context.propsData
* the options object of $navigateTo has been simplified



<a name="2.0.0-alpha.3"></a>
# [2.0.0-alpha.3](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2018-09-12)


### Bug Fixes

* canBeLeftOpenTag in defaultViewMeta instead of canBeLeftOpen ([#308](https://github.com/nativescript-vue/nativescript-vue/issues/308)) ([1b63f5b](https://github.com/nativescript-vue/nativescript-vue/commit/1b63f5b))
* provide explicit type to data ([#305](https://github.com/nativescript-vue/nativescript-vue/issues/305)) ([4389228](https://github.com/nativescript-vue/nativescript-vue/commit/4389228))



<a name="2.0.0-alpha.2"></a>
# [2.0.0-alpha.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2018-08-08)


### Bug Fixes

* ensre default is exported after bundling ([#301](https://github.com/nativescript-vue/nativescript-vue/issues/301)) ([7e39039](https://github.com/nativescript-vue/nativescript-vue/commit/7e39039))
* **typings:** add proper typings ([#289](https://github.com/nativescript-vue/nativescript-vue/issues/289)) ([bb265bd](https://github.com/nativescript-vue/nativescript-vue/commit/bb265bd))
* **typings:** declare explicitly the location of the TS typings ([259640e](https://github.com/nativescript-vue/nativescript-vue/commit/259640e))
* re-adding <keep-alive> elements to view ([#291](https://github.com/nativescript-vue/nativescript-vue/issues/291)) ([a953db5](https://github.com/nativescript-vue/nativescript-vue/commit/a953db5)), closes [#220](https://github.com/nativescript-vue/nativescript-vue/issues/220) [#220](https://github.com/nativescript-vue/nativescript-vue/issues/220)



<a name="2.0.0-alpha.1"></a>
# [2.0.0-alpha.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2018-07-15)


### Bug Fixes

* action bar rendering - issue [#276](https://github.com/nativescript-vue/nativescript-vue/issues/276) ([#278](https://github.com/nativescript-vue/nativescript-vue/issues/278)) ([db6df39](https://github.com/nativescript-vue/nativescript-vue/commit/db6df39))



<a name="2.0.0-alpha.0"></a>
# [2.0.0-alpha.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.4.0-alpha.0...v2.0.0-alpha.0) (2018-07-04)


### Bug Fixes

* Detect boolean attributes and expand them if value is empty ([#171](https://github.com/nativescript-vue/nativescript-vue/issues/171)) ([72f2102](https://github.com/nativescript-vue/nativescript-vue/commit/72f2102))
* don't create view without data ([ba4e994](https://github.com/nativescript-vue/nativescript-vue/commit/ba4e994)), closes [#229](https://github.com/nativescript-vue/nativescript-vue/issues/229)
* fix consecutive v-if's and v-for's ([821d726](https://github.com/nativescript-vue/nativescript-vue/commit/821d726)), closes [#127](https://github.com/nativescript-vue/nativescript-vue/issues/127) [#240](https://github.com/nativescript-vue/nativescript-vue/issues/240)
* fix v-if in ActionBar ([95054ee](https://github.com/nativescript-vue/nativescript-vue/commit/95054ee)), closes [#76](https://github.com/nativescript-vue/nativescript-vue/issues/76)


### Features

* add refresh shortcut for ListView ([b809f0f](https://github.com/nativescript-vue/nativescript-vue/commit/b809f0f)), closes [#193](https://github.com/nativescript-vue/nativescript-vue/issues/193)
* allow multiple nodes in <ios> and <android> tags ([7bf8b10](https://github.com/nativescript-vue/nativescript-vue/commit/7bf8b10))
* improve v-show to support <transition> ([3e50a90](https://github.com/nativescript-vue/nativescript-vue/commit/3e50a90))
* include typedefinitions in npm package ([7286e67](https://github.com/nativescript-vue/nativescript-vue/commit/7286e67)), closes [#262](https://github.com/nativescript-vue/nativescript-vue/issues/262) [#263](https://github.com/nativescript-vue/nativescript-vue/issues/263)
* wrap all elements in functional Vue components ([#267](https://github.com/nativescript-vue/nativescript-vue/issues/267)) ([a4e2fa5](https://github.com/nativescript-vue/nativescript-vue/commit/a4e2fa5)), closes [#127](https://github.com/nativescript-vue/nativescript-vue/issues/127) [#266](https://github.com/nativescript-vue/nativescript-vue/issues/266) [#241](https://github.com/nativescript-vue/nativescript-vue/issues/241)


### BREAKING CHANGES

* All elements are now Vue components, in some cases where a ref is used to get the
nativeView will have to be updated to use `this.$refs.element.$el.nativeView` instead of
`this.$refs.element.nativeView`. There may be other breaking changes this introduces that are not
known at this point.



<a name="1.4.0-alpha.0"></a>
# [1.4.0-alpha.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.2-rc.4...v1.4.0-alpha.0) (2018-05-07)


### Features

* allow custom getRootView implementation ([4ec580c](https://github.com/nativescript-vue/nativescript-vue/commit/4ec580c))
* use the new run method instead of the old start method ([d840d3c](https://github.com/nativescript-vue/nativescript-vue/commit/d840d3c))


### BREAKING CHANGES

* nativescript 3.x will no longer work with this change because application.run has
been added in 4.0



<a name="1.3.2-rc.4"></a>
## [1.3.2-rc.4](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.2-rc.3...v1.3.2-rc.4) (2018-04-22)


### Bug Fixes

* add missing setStyleScope method ([eb03732](https://github.com/nativescript-vue/nativescript-vue/commit/eb03732))
* check for existence of meta before accessing it ([a67119e](https://github.com/nativescript-vue/nativescript-vue/commit/a67119e))
* check for parentNode before calling .meta on it ([45cb46d](https://github.com/nativescript-vue/nativescript-vue/commit/45cb46d))



<a name="1.3.2-rc.3"></a>
## [1.3.2-rc.3](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.2-rc.2...v1.3.2-rc.3) (2018-04-22)


### Features

* support for frame elements ([bb14c23](https://github.com/nativescript-vue/nativescript-vue/commit/bb14c23))



<a name="1.3.2-rc.2"></a>
## [1.3.2-rc.2](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.2-rc.1...v1.3.2-rc.2) (2018-04-18)


### Features

* **bootstrap:** use the launch event instead of a navigation entry ([13192b0](https://github.com/nativescript-vue/nativescript-vue/commit/13192b0))



<a name="1.3.2-rc.1"></a>
## [1.3.2-rc.1](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.2-rc.0...v1.3.2-rc.1) (2018-04-18)


### Bug Fixes

* **bootstrap:** re-mount when activity is re-created ([850b12b](https://github.com/nativescript-vue/nativescript-vue/commit/850b12b))



<a name="1.3.2-rc.0"></a>
## [1.3.2-rc.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.1...v1.3.2-rc.0) (2018-04-15)


### Bug Fixes

* destroy modal vm when modal is closed ([#131](https://github.com/nativescript-vue/nativescript-vue/issues/131)) ([1fd7c81](https://github.com/nativescript-vue/nativescript-vue/commit/1fd7c81))
* return mounted component ([#132](https://github.com/nativescript-vue/nativescript-vue/issues/132)) ([a9187b7](https://github.com/nativescript-vue/nativescript-vue/commit/a9187b7))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.0...v1.3.1) (2018-03-10)


### Bug Fixes

* allow using for attribute in custom components ([3114cca](https://github.com/nativescript-vue/nativescript-vue/commit/3114cca))
* assign to existing instead of replacing ([ce3e9ea](https://github.com/nativescript-vue/nativescript-vue/commit/ce3e9ea))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.2.0...v1.3.0) (2018-02-27)


### Bug Fixes

* allow deepProxy to be used in expressions ([d7646ee](https://github.com/nativescript-vue/nativescript-vue/commit/d7646ee))
* fix list view template selector getting the wrong item ([d648a57](https://github.com/nativescript-vue/nativescript-vue/commit/d648a57))


### Features

* add transition component ([4951821](https://github.com/nativescript-vue/nativescript-vue/commit/4951821)), closes [#110](https://github.com/nativescript-vue/nativescript-vue/issues/110)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.1.3...v1.2.0) (2018-02-22)


### Features

* silence framework output by default ([0e5c55b](https://github.com/nativescript-vue/nativescript-vue/commit/0e5c55b))



<a name="1.1.3"></a>
## [1.1.3](https://github.com/nativescript-vue/nativescript-vue/compare/v1.1.2...v1.1.3) (2018-02-21)



<a name="1.1.2"></a>
## [1.1.2](https://github.com/nativescript-vue/nativescript-vue/compare/v1.0.0...v1.1.2) (2018-02-21)


### Bug Fixes

* fix option name for pageRouting ([8a8446f](https://github.com/nativescript-vue/nativescript-vue/commit/8a8446f))


### Features

* add <android> and <ios> elements ([ed96746](https://github.com/nativescript-vue/nativescript-vue/commit/ed96746))
* add platform-dependent property setting ([f981816](https://github.com/nativescript-vue/nativescript-vue/commit/f981816))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.0.0-alpha.1...v1.0.0) (2018-02-13)



<a name="1.0.0-alpha.1"></a>
# [1.0.0-alpha.1](https://github.com/nativescript-vue/nativescript-vue/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2018-02-12)



<a name="1.0.0-alpha.0"></a>
# [1.0.0-alpha.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.12...v1.0.0-alpha.0) (2018-02-12)



<a name="0.7.12"></a>
## [0.7.12](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.11...v0.7.12) (2018-01-30)


### Bug Fixes

* fix nested components in v-template ([30a11bf](https://github.com/nativescript-vue/nativescript-vue/commit/30a11bf)), closes [#107](https://github.com/nativescript-vue/nativescript-vue/issues/107)
* reload css on livesync ([b2ac1b5](https://github.com/nativescript-vue/nativescript-vue/commit/b2ac1b5))



<a name="0.7.11"></a>
## [0.7.11](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.10...v0.7.11) (2018-01-26)


### Bug Fixes

* improve console.dir output ([848440a](https://github.com/nativescript-vue/nativescript-vue/commit/848440a))



<a name="0.7.10"></a>
## [0.7.10](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.9...v0.7.10) (2018-01-24)


### Bug Fixes

* disable pageRouting when not in use ([7def3e2](https://github.com/nativescript-vue/nativescript-vue/commit/7def3e2)), closes [#98](https://github.com/nativescript-vue/nativescript-vue/issues/98)



<a name="0.7.9"></a>
## [0.7.9](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.8...v0.7.9) (2018-01-23)


### Bug Fixes

* don't import Vue in utils ([7335fd0](https://github.com/nativescript-vue/nativescript-vue/commit/7335fd0))



<a name="0.7.8"></a>
## [0.7.8](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.7...v0.7.8) (2018-01-10)


### Bug Fixes

* fix v-model not working for non-components ([4cc399e](https://github.com/nativescript-vue/nativescript-vue/commit/4cc399e))



<a name="0.7.7"></a>
## [0.7.7](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.6...v0.7.7) (2018-01-10)


### Bug Fixes

* don't throw error when livesyncing css ([8365141](https://github.com/nativescript-vue/nativescript-vue/commit/8365141)), closes [#63](https://github.com/nativescript-vue/nativescript-vue/issues/63)



<a name="0.7.6"></a>
## [0.7.6](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.5...v0.7.6) (2018-01-10)


### Bug Fixes

* fix view already has a parent bug ([e252544](https://github.com/nativescript-vue/nativescript-vue/commit/e252544)), closes [#59](https://github.com/nativescript-vue/nativescript-vue/issues/59) [#78](https://github.com/nativescript-vue/nativescript-vue/issues/78)


### Features

* allow silencing the console ouput ([8f98ad7](https://github.com/nativescript-vue/nativescript-vue/commit/8f98ad7)), closes [#99](https://github.com/nativescript-vue/nativescript-vue/issues/99)



<a name="0.7.5"></a>
## [0.7.5](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.4...v0.7.5) (2017-12-23)


### Features

* support array properties in v-view directive ([a49ca5d](https://github.com/nativescript-vue/nativescript-vue/commit/a49ca5d)), closes [#80](https://github.com/nativescript-vue/nativescript-vue/issues/80)



<a name="0.7.4"></a>
## [0.7.4](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.3...v0.7.4) (2017-12-23)



<a name="0.7.3"></a>
## [0.7.3](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.2...v0.7.3) (2017-12-23)



<a name="0.7.2"></a>
## [0.7.2](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.1...v0.7.2) (2017-12-23)


### Bug Fixes

* proper v-model for tab-view ([ef26448](https://github.com/nativescript-vue/nativescript-vue/commit/ef26448)), closes [#50](https://github.com/nativescript-vue/nativescript-vue/issues/50)


### Features

* warn when using v-for on a list-view ([2ddd253](https://github.com/nativescript-vue/nativescript-vue/commit/2ddd253))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.0...v0.7.1) (2017-12-22)


### Bug Fixes

* don't color console output unless Vue.config.debug is true ([14e5ed4](https://github.com/nativescript-vue/nativescript-vue/commit/14e5ed4))
* update sample with new list-view syntax ([e2b5225](https://github.com/nativescript-vue/nativescript-vue/commit/e2b5225))


### Features

* allow setting custom iterator, fixes [#58](https://github.com/nativescript-vue/nativescript-vue/issues/58) ([7aba01c](https://github.com/nativescript-vue/nativescript-vue/commit/7aba01c))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.6.0...v0.7.0) (2017-12-21)


### Features

* Add improved <list-view> syntax: for="item in items" ([81af134](https://github.com/nativescript-vue/nativescript-vue/commit/81af134))
* update sample app to new list-view syntax ([0318163](https://github.com/nativescript-vue/nativescript-vue/commit/0318163))
* update to vue v2.5.13 ([67a1d6a](https://github.com/nativescript-vue/nativescript-vue/commit/67a1d6a))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.5.1...v0.6.0) (2017-12-21)


### Features

* replace console.log with better support for nested / circular objects ([83aaccf](https://github.com/nativescript-vue/nativescript-vue/commit/83aaccf))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/nativescript-vue/nativescript-vue/compare/v0.5.0...v0.5.1) (2017-12-18)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.4.0...v0.5.0) (2017-12-18)



<a name="0.4.0"></a>
# [0.4.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.3.1...v0.4.0) (2017-12-14)


### Bug Fixes

* assign template bag to current instance ([dd74d2f](https://github.com/nativescript-vue/nativescript-vue/commit/dd74d2f))


### Features

* Better templating syntax ([51d2ca4](https://github.com/nativescript-vue/nativescript-vue/commit/51d2ca4))
* updated list-view to use the new v-template ([5a9e377](https://github.com/nativescript-vue/nativescript-vue/commit/5a9e377))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/nativescript-vue/nativescript-vue/compare/v0.3.0...v0.3.1) (2017-11-26)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.2.0...v0.3.0) (2017-11-24)


### Features

* Add router transitions  ([#86](https://github.com/nativescript-vue/nativescript-vue/issues/86)) ([381843e](https://github.com/nativescript-vue/nativescript-vue/commit/381843e))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.25...v0.2.0) (2017-11-20)



<a name="0.1.25"></a>
## [0.1.25](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.24...v0.1.25) (2017-11-20)



<a name="0.1.24"></a>
## [0.1.24](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.23...v0.1.24) (2017-11-17)


### Features

* Added view directive ([#80](https://github.com/nativescript-vue/nativescript-vue/issues/80)) ([611eb83](https://github.com/nativescript-vue/nativescript-vue/commit/611eb83))



<a name="0.1.23"></a>
## [0.1.23](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.22...v0.1.23) (2017-10-20)



<a name="0.1.22"></a>
## [0.1.22](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.21...v0.1.22) (2017-10-15)



<a name="0.1.21"></a>
## [0.1.21](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.20...v0.1.21) (2017-10-15)



<a name="0.1.20"></a>
## [0.1.20](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.19...v0.1.20) (2017-10-15)



<a name="0.1.19"></a>
## [0.1.19](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.18...v0.1.19) (2017-10-15)



<a name="0.1.18"></a>
## [0.1.18](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.17...v0.1.18) (2017-10-15)



<a name="0.1.17"></a>
## [0.1.17](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.16...v0.1.17) (2017-10-13)



<a name="0.1.16"></a>
## [0.1.16](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.15...v0.1.16) (2017-10-09)



<a name="0.1.15"></a>
## [0.1.15](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.14...v0.1.15) (2017-10-04)



<a name="0.1.14"></a>
## [0.1.14](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.13...v0.1.14) (2017-10-04)



<a name="0.1.13"></a>
## [0.1.13](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.12...v0.1.13) (2017-10-04)



<a name="0.1.12"></a>
## [0.1.12](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.11...v0.1.12) (2017-10-01)



<a name="0.1.11"></a>
## [0.1.11](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.10...v0.1.11) (2017-10-01)



<a name="0.1.10"></a>
## [0.1.10](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.9...v0.1.10) (2017-09-28)



<a name="0.1.9"></a>
## [0.1.9](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.8...v0.1.9) (2017-09-26)



<a name="0.1.8"></a>
## [0.1.8](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.7...v0.1.8) (2017-09-26)



<a name="0.1.7"></a>
## [0.1.7](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.6...v0.1.7) (2017-09-25)



<a name="0.1.6"></a>
## [0.1.6](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.5...v0.1.6) (2017-09-19)



<a name="0.1.5"></a>
## [0.1.5](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.4...v0.1.5) (2017-08-10)



<a name="0.1.4"></a>
## [0.1.4](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.3...v0.1.4) (2017-07-14)



<a name="0.1.3"></a>
## [0.1.3](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.2...v0.1.3) (2017-07-09)



<a name="0.1.2"></a>
## 0.1.2 (2017-07-09)



