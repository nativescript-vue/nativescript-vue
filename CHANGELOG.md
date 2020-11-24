## [2.8.3](https://github.com/nativescript-vue/nativescript-vue/compare/v2.8.2...v2.8.3) (2020-11-24)


### Bug Fixes

* patchTemplate should flush pending callbacks ([9125286](https://github.com/nativescript-vue/nativescript-vue/commit/91252861a7f1f8ca02dbf5704e7edac81250b0cf))



## [2.8.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.8.1...v2.8.2) (2020-11-21)


### Bug Fixes

* once event modifier ([#752](https://github.com/nativescript-vue/nativescript-vue/issues/752)) ([2a1b06f](https://github.com/nativescript-vue/nativescript-vue/commit/2a1b06fc29f1289dae33170c5b706f94c96da328)), closes [#748](https://github.com/nativescript-vue/nativescript-vue/issues/748)
* wrong import for getCssFileName ([#738](https://github.com/nativescript-vue/nativescript-vue/issues/738)) ([f1110f1](https://github.com/nativescript-vue/nativescript-vue/commit/f1110f14f3dca664c6789e4d2cbb61dbaba3ea5d))



## [2.8.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.8.0...v2.8.1) (2020-09-03)


### Bug Fixes

* use preferred imports for ns7 ([4c38dfa](https://github.com/nativescript-vue/nativescript-vue/commit/4c38dfa42491742262aecc81951d4b80ae8fd2db))


### Features

* upgrade to NS7 ([#709](https://github.com/nativescript-vue/nativescript-vue/issues/709)) ([6d1f02b](https://github.com/nativescript-vue/nativescript-vue/commit/6d1f02b7a37a89d015f7a059e93f3f3540ab627a))



# [2.8.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.7.1...v2.8.0) (2020-08-31)


### Features

* upgrade to NS7 ([261f701](https://github.com/nativescript-vue/nativescript-vue/commit/261f7015d606d7ca82a135d9b531baa47d9ec9fe))



## [2.7.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.7.0...v2.7.1) (2020-07-23)


### Bug Fixes

* double navigation is certain conditions ([6a710aa](https://github.com/nativescript-vue/nativescript-vue/commit/6a710aaa31eaa4d2c6d7e1b0ae41869c3908f25d))



# [2.7.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.6.4...v2.7.0) (2020-07-15)


### Bug Fixes

* **ios:** fix white screen on start ([#672](https://github.com/nativescript-vue/nativescript-vue/issues/672)) ([d2899a1](https://github.com/nativescript-vue/nativescript-vue/commit/d2899a17ecdb805c7cdc637ed211f06e8f8fa6b3))
* **types:** fix TS2702 can't use static class members ([eada027](https://github.com/nativescript-vue/nativescript-vue/commit/eada027bb43870dc46cd7d189c7bf256d137c36f))
* **types:** navigateBack options types ([#679](https://github.com/nativescript-vue/nativescript-vue/issues/679)) ([53695ed](https://github.com/nativescript-vue/nativescript-vue/commit/53695eda9498cd6f6daea50f8b554aa817090209))


### Features

* global navigation methods ([#675](https://github.com/nativescript-vue/nativescript-vue/issues/675)) ([#677](https://github.com/nativescript-vue/nativescript-vue/issues/677)) ([bf1c708](https://github.com/nativescript-vue/nativescript-vue/commit/bf1c7080969d6ad23ab6c968b1391395bb729e75))



## [2.6.4](https://github.com/nativescript-vue/nativescript-vue/compare/v2.6.3...v2.6.4) (2020-05-25)


### Bug Fixes

* remove debugger statements ([6d0f954](https://github.com/nativescript-vue/nativescript-vue/commit/6d0f9547cfacc64f54acc31ba42ac2399048ce0c))



## [2.6.3](https://github.com/nativescript-vue/nativescript-vue/compare/v2.6.2...v2.6.3) (2020-05-23)


### Bug Fixes

* wrong child order ([929b11a](https://github.com/nativescript-vue/nativescript-vue/commit/929b11a2d9dfcd7439495bf4a47bfdddc5f74f7e))
* **formatted-string:** wrong atIndex condition ([8939f7c](https://github.com/nativescript-vue/nativescript-vue/commit/8939f7c1a072809c6aa5d670357c4adfe37e4664))
* **trace:** print actual nativeView's with their id ([b2adf9c](https://github.com/nativescript-vue/nativescript-vue/commit/b2adf9cb656487010faa6cfd87660e95741f57b1))
* **trace:** print tagName without the native prefix ([3b22260](https://github.com/nativescript-vue/nativescript-vue/commit/3b2226094e42908fc74fd59b819d31c3e541fcc8))



## [2.6.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.6.1...v2.6.2) (2020-05-20)


### Bug Fixes

* correctly handle child reordering ([a735ee5](https://github.com/nativescript-vue/nativescript-vue/commit/a735ee534d03c49d0b9b01cb68468ae546556cd3)), closes [#608](https://github.com/nativescript-vue/nativescript-vue/issues/608)
* properly remove Spans from FormattedString ([80fa127](https://github.com/nativescript-vue/nativescript-vue/commit/80fa127dbe1ce27137538bec9d14b5de97ba1b5c))
* v-if/v-else-if/v-else and v-model updating the wrong model ([5314f17](https://github.com/nativescript-vue/nativescript-vue/commit/5314f1736da6e6082adf858b93db6e5a27537274)), closes [#644](https://github.com/nativescript-vue/nativescript-vue/issues/644) [#569](https://github.com/nativescript-vue/nativescript-vue/issues/569) [#402](https://github.com/nativescript-vue/nativescript-vue/issues/402) [#405](https://github.com/nativescript-vue/nativescript-vue/issues/405)


### Performance Improvements

* cache require calls ([#639](https://github.com/nativescript-vue/nativescript-vue/issues/639)) ([91f128a](https://github.com/nativescript-vue/nativescript-vue/commit/91f128a28840109327773031c24dc9c7ace876d2))



## [2.6.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.6.0...v2.6.1) (2020-04-24)


### Bug Fixes

* check _Vue before accessing ([#632](https://github.com/nativescript-vue/nativescript-vue/issues/632)) ([29e7f47](https://github.com/nativescript-vue/nativescript-vue/commit/29e7f470b3fd1e11aa4b22e90a6e40e8a25f7f9b))



# [2.6.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.5.1...v2.6.0) (2020-04-13)


### Bug Fixes

* remove console.log override ([#627](https://github.com/nativescript-vue/nativescript-vue/issues/627)) ([226e108](https://github.com/nativescript-vue/nativescript-vue/commit/226e108b92273b7a2f3e133e71f9f4fe3f5935b0))
* **renderer:** check for undefined before trimming style ([#622](https://github.com/nativescript-vue/nativescript-vue/issues/622)) ([9ce38a0](https://github.com/nativescript-vue/nativescript-vue/commit/9ce38a0af940681e300aa8464243e78fd632bb4e))


### Features

* resolve navigation page on navigation event ([#624](https://github.com/nativescript-vue/nativescript-vue/issues/624)) ([787d1a5](https://github.com/nativescript-vue/nativescript-vue/commit/787d1a5547f6a381538ffa2cdf0d0e5eacfa80c3))
* **logging:** log node creation errors ([#625](https://github.com/nativescript-vue/nativescript-vue/issues/625)) ([b502fc8](https://github.com/nativescript-vue/nativescript-vue/commit/b502fc86dc3736891f4df91d7b997f715eff97a8))
* **registry:** allow overriding elements ([#626](https://github.com/nativescript-vue/nativescript-vue/issues/626)) ([e37788c](https://github.com/nativescript-vue/nativescript-vue/commit/e37788c9a0aa5593e636e190ceb8e79b6604c715))


### BREAKING CHANGES

* Our `console.log` override using `util-inspect` has been removed due to performance concerns. If you were using `Vue.config.debug = true` to get colorful console.logs, this will no longer work. We have documented how you may add this feature back to your app if you relied on this behavior. See [CONSOLE_LOG_OVERRIDE.md](https://github.com/nativescript-vue/nativescript-vue/blob/master/CONSOLE_LOG_OVERRIDE.md) for details. 



## [2.5.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.5.0...v2.5.1) (2020-03-28)


### Features

* **modals:** allow passing in the target for opening the modal ([#614](https://github.com/nativescript-vue/nativescript-vue/issues/614)) ([31bc425](https://github.com/nativescript-vue/nativescript-vue/commit/31bc425c1b9827b1716a0e48a6254798f62bfe76)), closes [#612](https://github.com/nativescript-vue/nativescript-vue/issues/612)



# [2.5.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.5.0-alpha.3...v2.5.0) (2020-02-28)


### Bug Fixes

* **TabStripItem:** bind attributes and listeners ([#601](https://github.com/nativescript-vue/nativescript-vue/issues/601)) ([aa42642](https://github.com/nativescript-vue/nativescript-vue/commit/aa42642ca62b82887457388eb3fe203a144595a9))
* nativeView accessor when $el is undefined. fixes [#595](https://github.com/nativescript-vue/nativescript-vue/issues/595) ([#602](https://github.com/nativescript-vue/nativescript-vue/issues/602)) ([6df1351](https://github.com/nativescript-vue/nativescript-vue/commit/6df135144a56f64de95091ccf84ae27d0843a1ac))


### Features

* **types:** export ListView ItemEventData with `item` ([3ba4941](https://github.com/nativescript-vue/nativescript-vue/commit/3ba4941831bfba8b7e26c9bc06673c24fd951533))



# [2.5.0-alpha.3](https://github.com/nativescript-vue/nativescript-vue/compare/v2.5.0-alpha.2...v2.5.0-alpha.3) (2019-11-29)


### Bug Fixes

* **ListView:** v-if usage crash inside RLV template ([#554](https://github.com/nativescript-vue/nativescript-vue/issues/554)) ([838d98a](https://github.com/nativescript-vue/nativescript-vue/commit/838d98a9f05f6d219e4b64326f1fec3e0d2ec455))
* **modals:** no ActionBar when launched from a frame within a component ([#558](https://github.com/nativescript-vue/nativescript-vue/issues/558)) ([3225852](https://github.com/nativescript-vue/nativescript-vue/commit/322585232c448ed82f66aa8b53dc7f356df07365)), closes [#536](https://github.com/nativescript-vue/nativescript-vue/issues/536) [#536](https://github.com/nativescript-vue/nativescript-vue/issues/536)


### Features

* allow suppressing renderer logs ([#586](https://github.com/nativescript-vue/nativescript-vue/issues/586)) ([12e5154](https://github.com/nativescript-vue/nativescript-vue/commit/12e5154ab82b8bddcd116b57a45e732fddef6210))
* use scoped nativescript packages ([#589](https://github.com/nativescript-vue/nativescript-vue/issues/589)) ([121c11d](https://github.com/nativescript-vue/nativescript-vue/commit/121c11d5a11760cb9b0709dd1b02e866302737f9))



# [2.5.0-alpha.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.5.0-alpha.1...v2.5.0-alpha.2) (2019-11-13)


### Bug Fixes

* listview view recycling ([#572](https://github.com/nativescript-vue/nativescript-vue/issues/572)) ([7a220c9](https://github.com/nativescript-vue/nativescript-vue/commit/7a220c997c1526c481e1dca53d8f813ec571a849))
* **router module:** safely check parent tagname. fixes [#542](https://github.com/nativescript-vue/nativescript-vue/issues/542) ([#550](https://github.com/nativescript-vue/nativescript-vue/issues/550)) ([1cc8142](https://github.com/nativescript-vue/nativescript-vue/commit/1cc8142222c29f6dfb83b9b771590057cfac0d65))



# [2.5.0-alpha.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.5.0-alpha.0...v2.5.0-alpha.1) (2019-09-07)


### Bug Fixes

* **frame:** $refs inside default page ([#544](https://github.com/nativescript-vue/nativescript-vue/issues/544)) ([4872304](https://github.com/nativescript-vue/nativescript-vue/commit/4872304c882ea1849dfdb3b3f009a3ec2b5c0011)), closes [#543](https://github.com/nativescript-vue/nativescript-vue/issues/543)
* honour the ID of the <Frame> components in the App ([#541](https://github.com/nativescript-vue/nativescript-vue/issues/541)) ([a2b0cd6](https://github.com/nativescript-vue/nativescript-vue/commit/a2b0cd6dc19689cc1f5fbbacec79c5e7a49fcbee))
* look for parent Frame instead of a NavigationEntry ([7147a9f](https://github.com/nativescript-vue/nativescript-vue/commit/7147a9f25c3ee7b71e0509ba55c59d2c8ac595c4))


### Features

* improve modals in DevTools ([8677a52](https://github.com/nativescript-vue/nativescript-vue/commit/8677a5234d0ea8fa7cbe8b65066bd59d3f501fa5))



# [2.5.0-alpha.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.4.0...v2.5.0-alpha.0) (2019-08-24)


### Bug Fixes

* **devtools:** refresh devtools when state changes ([4d28b34](https://github.com/nativescript-vue/nativescript-vue/commit/4d28b34b542536360fa68bcaa82ae4b0909ac055))
* crash on blank .vue template section ([0295650](https://github.com/nativescript-vue/nativescript-vue/commit/02956500e8e8d650da4548a5682142072188b3f1))


### Features

* **devtools:** show navigation entries under Frame ([e82d067](https://github.com/nativescript-vue/nativescript-vue/commit/e82d0676e79a836e387ee380131c1d9e1565ac1b))



# [2.4.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.4.0-alpha.0...v2.4.0) (2019-07-23)


### Features

* add support for Tabs and BottomNavigation ([#524](https://github.com/nativescript-vue/nativescript-vue/issues/524)) ([806658b](https://github.com/nativescript-vue/nativescript-vue/commit/806658bc46c9dd3602af636b52cc1f769d650b63))



# [2.3.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.3.0-rc.2...v2.3.0) (2019-07-10)



# [2.4.0-alpha.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.3.0...v2.4.0-alpha.0) (2019-07-10)


### Bug Fixes

* livesync and HMR fixes for NativeScript 6.0  ([#508](https://github.com/nativescript-vue/nativescript-vue/issues/508)) ([be95893](https://github.com/nativescript-vue/nativescript-vue/commit/be958931aeab3303a371cb326dfc9e1da2f15397)), closes [#481](https://github.com/nativescript-vue/nativescript-vue/issues/481)


### Features

* **frame:** allow setting clearHistory and backstackVisible options for default pages. ([#514](https://github.com/nativescript-vue/nativescript-vue/issues/514)) ([d06a7bd](https://github.com/nativescript-vue/nativescript-vue/commit/d06a7bd6f5ff04a16f84780a611ec46bb68a16fc))



# [2.3.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.3.0-rc.2...v2.3.0) (2019-07-10)


### Bug Fixes

* **listview:** correct items prop type check ([c770745](https://github.com/nativescript-vue/nativescript-vue/commit/c77074595fadd41f832900ed2e6ee17990c5f461)), closes [#522](https://github.com/nativescript-vue/nativescript-vue/issues/522)
* **listview:** fix prop type check ([5780bac](https://github.com/nativescript-vue/nativescript-vue/commit/5780bac87c764683b5a049abee22dd370d462525)), closes [#522](https://github.com/nativescript-vue/nativescript-vue/issues/522)



# [2.3.0-rc.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.3.0-rc.1...v2.3.0-rc.2) (2019-07-03)


### Bug Fixes

* import `frame` module before __onLiveSyncCore override  ([#517](https://github.com/nativescript-vue/nativescript-vue/issues/517)) ([cbee066](https://github.com/nativescript-vue/nativescript-vue/commit/cbee066624c34b3591b73050a68358ba870feb2f)), closes [NativeScript/nativescript-dev-webpack#943](https://github.com/NativeScript/nativescript-dev-webpack/issues/943)



# [2.3.0-rc.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.3.0-rc.0...v2.3.0-rc.1) (2019-07-01)


### Bug Fixes

* import `application` module ([#512](https://github.com/nativescript-vue/nativescript-vue/issues/512)) ([3f03251](https://github.com/nativescript-vue/nativescript-vue/commit/3f03251e33a84c7d3e2dceac9aea3d82ec8822eb))



# [2.3.0-rc.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.2.2...v2.3.0-rc.0) (2019-05-31)


### Bug Fixes

* **hooks:** make hooks compatible with CLI's 6.0.0 changes ([#500](https://github.com/nativescript-vue/nativescript-vue/issues/500)) ([6f8945e](https://github.com/nativescript-vue/nativescript-vue/commit/6f8945ed2895664735b1ec91d152fb403f23981a))
* **listview:** only require tns module at runtime ([4c00885](https://github.com/nativescript-vue/nativescript-vue/commit/4c00885d38ebc7aa8d424f33a4ae14d9ae8c22c6))
* **ListView:** allow ObservableArray items in ListView (Fixes [#464](https://github.com/nativescript-vue/nativescript-vue/issues/464)) ([#498](https://github.com/nativescript-vue/nativescript-vue/issues/498)) ([a904c7b](https://github.com/nativescript-vue/nativescript-vue/commit/a904c7b3dc8890cbbd8b5da639ad70c6fa808056))
* build and use local template compiler in samples ([0282eca](https://github.com/nativescript-vue/nativescript-vue/commit/0282ecaf854eec4620d9735db8d1beda8970106a))


### Features

* upgrade to vue 2.6 ([e983a90](https://github.com/nativescript-vue/nativescript-vue/commit/e983a90e484f964e6561477711a5c991cfac86c3))



## [2.2.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.2.1...v2.2.2) (2019-04-10)


### Reverts

* Revert "fix: fix  HMR issue on Android (#461)" as it does not work with {N}-5.2 but works with {N}-5.3 ([621e7e6](https://github.com/nativescript-vue/nativescript-vue/commit/621e7e6318a3fe88fd72b1ec7176e7479ebcad0e)), closes [#461](https://github.com/nativescript-vue/nativescript-vue/issues/461)



## [2.2.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.2.0...v2.2.1) (2019-04-04)


### Bug Fixes

* fix  HMR issue on Android ([#461](https://github.com/nativescript-vue/nativescript-vue/issues/461)) ([595d2a0](https://github.com/nativescript-vue/nativescript-vue/commit/595d2a0032de2b7b45805ef0a5266e6fd4dbe820))



# [2.2.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.1.0...v2.2.0) (2019-03-18)


### Bug Fixes

* correct `--bundle` option checking ([#455](https://github.com/nativescript-vue/nativescript-vue/issues/455)) ([acbc18b](https://github.com/nativescript-vue/nativescript-vue/commit/acbc18b9d7104c2479a0d99f93e47efe254e90c7))



# [2.1.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.2...v2.1.0) (2019-03-18)


### Bug Fixes

* add registerElement to NativeScriptVueConstructor ([#413](https://github.com/nativescript-vue/nativescript-vue/issues/413)) ([7adad31](https://github.com/nativescript-vue/nativescript-vue/commit/7adad31eded5d3e0570ca04cbb9d149cf4774d06)), closes [#409](https://github.com/nativescript-vue/nativescript-vue/issues/409)
* Extend ModalOptions type definitions ([#422](https://github.com/nativescript-vue/nativescript-vue/issues/422)) ([72e9097](https://github.com/nativescript-vue/nativescript-vue/commit/72e909779c974a49f828140cbb1f8cc6dd484373))
* **v-model:** export registerElement in webpack. fix v-model issue [#371](https://github.com/nativescript-vue/nativescript-vue/issues/371) ([e1bc562](https://github.com/nativescript-vue/nativescript-vue/commit/e1bc5629e01c73542f9fb12bba143a3e498d9102))


### Features

* show error when --bundle option is not provided ([#361](https://github.com/nativescript-vue/nativescript-vue/issues/361)) ([265f416](https://github.com/nativescript-vue/nativescript-vue/commit/265f416d5d1bbe6ea3e36f68dddc5e512bf3d970))
* **list-view:** Add support for default ListView item template ([#438](https://github.com/nativescript-vue/nativescript-vue/issues/438)) ([748d39a](https://github.com/nativescript-vue/nativescript-vue/commit/748d39addfd4304567612f9d2375e9f37a4fdac2))



## [2.0.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.1...v2.0.2) (2018-10-08)


### Bug Fixes

* destroy the navigation entry instance when the page is disposed ([63f8f14](https://github.com/nativescript-vue/nativescript-vue/commit/63f8f1457de7f4ef6daf82ab9a74611d65289f04))



## [2.0.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0...v2.0.1) (2018-10-08)


### Bug Fixes

* **transition:** use the correct transition when navigating ([799e42f](https://github.com/nativescript-vue/nativescript-vue/commit/799e42f29e9de48959dff1eb60dea9019b859e8a)), closes [#342](https://github.com/nativescript-vue/nativescript-vue/issues/342)
* destroy vue instance when page is disposed ([3df80ea](https://github.com/nativescript-vue/nativescript-vue/commit/3df80ea2260ca4c689ffe35a9137a4665106752e)), closes [#339](https://github.com/nativescript-vue/nativescript-vue/issues/339)
* fix function call order in `after` util ([16ffa1c](https://github.com/nativescript-vue/nativescript-vue/commit/16ffa1c6fca15a6af7a380e08883ee9d28f0deea))



# [2.0.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-rc.0...v2.0.0) (2018-09-22)



# [2.0.0-rc.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-beta.1...v2.0.0-rc.0) (2018-09-19)


### Features

* updated $showModal ([b2be4bd](https://github.com/nativescript-vue/nativescript-vue/commit/b2be4bdd34292b21463c598327a1495735ed99f9))



# [2.0.0-beta.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2018-09-19)


### Bug Fixes

* **build:** add buble as otherwise static bindings fail to generate ([f36d462](https://github.com/nativescript-vue/nativescript-vue/commit/f36d4623a758c7846fb322609fcbc4c7bb39be75))



# [2.0.0-beta.0](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-alpha.3...v2.0.0-beta.0) (2018-09-18)


### Features

* multiple frame navigation ([6c45812](https://github.com/nativescript-vue/nativescript-vue/commit/6c458127b48c46b96900b43d1d473e82c8b5e871)), closes [#188](https://github.com/nativescript-vue/nativescript-vue/issues/188)
* multiple frames ([#325](https://github.com/nativescript-vue/nativescript-vue/issues/325)) ([6d7b169](https://github.com/nativescript-vue/nativescript-vue/commit/6d7b16915e2ba1548398065edeae76a74cabbee2)), closes [#213](https://github.com/nativescript-vue/nativescript-vue/issues/213) [#286](https://github.com/nativescript-vue/nativescript-vue/issues/286) [#292](https://github.com/nativescript-vue/nativescript-vue/issues/292) [#292](https://github.com/nativescript-vue/nativescript-vue/issues/292) [#321](https://github.com/nativescript-vue/nativescript-vue/issues/321)


### BREAKING CHANGES

* $navigateTo: passing props should now be done using options.props instead of
options.context.propsData
* the options object of $navigateTo has been simplified



# [2.0.0-alpha.3](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2018-09-12)


### Bug Fixes

* canBeLeftOpenTag in defaultViewMeta instead of canBeLeftOpen ([#308](https://github.com/nativescript-vue/nativescript-vue/issues/308)) ([1b63f5b](https://github.com/nativescript-vue/nativescript-vue/commit/1b63f5ba425de6b779e667f0f586c7e260f2f68d))
* provide explicit type to data ([#305](https://github.com/nativescript-vue/nativescript-vue/issues/305)) ([4389228](https://github.com/nativescript-vue/nativescript-vue/commit/438922835e5155d1f9a1aeb4d06e35402332e148))



# [2.0.0-alpha.2](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2018-08-08)


### Bug Fixes

* ensre default is exported after bundling ([#301](https://github.com/nativescript-vue/nativescript-vue/issues/301)) ([7e39039](https://github.com/nativescript-vue/nativescript-vue/commit/7e3903972e37f154d08d8630e18344cd321f368b))
* **typings:** add proper typings ([#289](https://github.com/nativescript-vue/nativescript-vue/issues/289)) ([bb265bd](https://github.com/nativescript-vue/nativescript-vue/commit/bb265bd72cfa4b3a10f91b556a9f53300a1ea219))
* **typings:** declare explicitly the location of the TS typings ([259640e](https://github.com/nativescript-vue/nativescript-vue/commit/259640ea744128bb2016630fa957a2dd53b02981))
* re-adding <keep-alive> elements to view ([#291](https://github.com/nativescript-vue/nativescript-vue/issues/291)) ([a953db5](https://github.com/nativescript-vue/nativescript-vue/commit/a953db565348cee0fe0b24573d714bc7d5e90652)), closes [#220](https://github.com/nativescript-vue/nativescript-vue/issues/220) [#220](https://github.com/nativescript-vue/nativescript-vue/issues/220)



# [2.0.0-alpha.1](https://github.com/nativescript-vue/nativescript-vue/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2018-07-15)


### Bug Fixes

* action bar rendering - issue [#276](https://github.com/nativescript-vue/nativescript-vue/issues/276) ([#278](https://github.com/nativescript-vue/nativescript-vue/issues/278)) ([db6df39](https://github.com/nativescript-vue/nativescript-vue/commit/db6df397d35c77cbf8c4718c00f1824ebd4be41e))



# [2.0.0-alpha.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.4.0-alpha.0...v2.0.0-alpha.0) (2018-07-04)


### Bug Fixes

* Detect boolean attributes and expand them if value is empty ([#171](https://github.com/nativescript-vue/nativescript-vue/issues/171)) ([72f2102](https://github.com/nativescript-vue/nativescript-vue/commit/72f21020ea540e21bd4eb86d8ad05d7dfb6491e4))
* don't create view without data ([ba4e994](https://github.com/nativescript-vue/nativescript-vue/commit/ba4e9949cdea00adc9f6fc56e22334d2a01e4285)), closes [#229](https://github.com/nativescript-vue/nativescript-vue/issues/229)
* fix consecutive v-if's and v-for's ([821d726](https://github.com/nativescript-vue/nativescript-vue/commit/821d7267bed05c66ba063cab01ee5d474444d65d)), closes [#127](https://github.com/nativescript-vue/nativescript-vue/issues/127) [#240](https://github.com/nativescript-vue/nativescript-vue/issues/240)
* fix v-if in ActionBar ([95054ee](https://github.com/nativescript-vue/nativescript-vue/commit/95054ee51f33632ec501c34928f04897a530d04b)), closes [#76](https://github.com/nativescript-vue/nativescript-vue/issues/76)


### Features

* add refresh shortcut for ListView ([b809f0f](https://github.com/nativescript-vue/nativescript-vue/commit/b809f0f006503fd215fa4e922b122e771784c0ce)), closes [#193](https://github.com/nativescript-vue/nativescript-vue/issues/193)
* allow multiple nodes in <ios> and <android> tags ([7bf8b10](https://github.com/nativescript-vue/nativescript-vue/commit/7bf8b10104cd0e1b0c74d8dbd7dc020c611c75cd))
* improve v-show to support <transition> ([3e50a90](https://github.com/nativescript-vue/nativescript-vue/commit/3e50a90a2f7f6c21bea4f0ff4a42d086c1e1d6f0))
* include typedefinitions in npm package ([7286e67](https://github.com/nativescript-vue/nativescript-vue/commit/7286e67c988a0433bd6ddf1a1dbe8c08e860894f)), closes [#262](https://github.com/nativescript-vue/nativescript-vue/issues/262) [#263](https://github.com/nativescript-vue/nativescript-vue/issues/263)
* wrap all elements in functional Vue components ([#267](https://github.com/nativescript-vue/nativescript-vue/issues/267)) ([a4e2fa5](https://github.com/nativescript-vue/nativescript-vue/commit/a4e2fa57af8e1e2fc56698216a8271a232b86ff2)), closes [#127](https://github.com/nativescript-vue/nativescript-vue/issues/127) [#266](https://github.com/nativescript-vue/nativescript-vue/issues/266) [#241](https://github.com/nativescript-vue/nativescript-vue/issues/241)


### BREAKING CHANGES

* All elements are now Vue components, in some cases where a ref is used to get the
nativeView will have to be updated to use `this.$refs.element.$el.nativeView` instead of
`this.$refs.element.nativeView`. There may be other breaking changes this introduces that are not
known at this point.



# [1.4.0-alpha.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.2-rc.4...v1.4.0-alpha.0) (2018-05-07)


### Features

* allow custom getRootView implementation ([4ec580c](https://github.com/nativescript-vue/nativescript-vue/commit/4ec580c7d6dd6823dc078ea81ebee5f5e1388bcb))
* use the new run method instead of the old start method ([d840d3c](https://github.com/nativescript-vue/nativescript-vue/commit/d840d3cd8537a3e0670ac1bcda0543ca2533bf24))


### BREAKING CHANGES

* nativescript 3.x will no longer work with this change because application.run has
been added in 4.0



## [1.3.2-rc.4](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.2-rc.3...v1.3.2-rc.4) (2018-04-22)


### Bug Fixes

* add missing setStyleScope method ([eb03732](https://github.com/nativescript-vue/nativescript-vue/commit/eb03732f6410b8ee6178e8afd29ee6a2b271c9a9))
* check for existence of meta before accessing it ([a67119e](https://github.com/nativescript-vue/nativescript-vue/commit/a67119ea725adf582d4cb5e69e38024d153c8a0d))
* check for parentNode before calling .meta on it ([45cb46d](https://github.com/nativescript-vue/nativescript-vue/commit/45cb46d5432f092500ee570bf52d5525031b2152))



## [1.3.2-rc.3](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.2-rc.2...v1.3.2-rc.3) (2018-04-22)


### Features

* support for frame elements ([bb14c23](https://github.com/nativescript-vue/nativescript-vue/commit/bb14c230a52785ad21677f9a14efedd04ca3a17f))



## [1.3.2-rc.2](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.2-rc.1...v1.3.2-rc.2) (2018-04-18)


### Features

* **bootstrap:** use the launch event instead of a navigation entry ([13192b0](https://github.com/nativescript-vue/nativescript-vue/commit/13192b0e34075103c5519790857408bd937f2940))



## [1.3.2-rc.1](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.2-rc.0...v1.3.2-rc.1) (2018-04-18)


### Bug Fixes

* **bootstrap:** re-mount when activity is re-created ([850b12b](https://github.com/nativescript-vue/nativescript-vue/commit/850b12b88ef1cdd33d4be81d63366ff2995c708f))



## [1.3.2-rc.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.1...v1.3.2-rc.0) (2018-04-15)


### Bug Fixes

* destroy modal vm when modal is closed ([#131](https://github.com/nativescript-vue/nativescript-vue/issues/131)) ([1fd7c81](https://github.com/nativescript-vue/nativescript-vue/commit/1fd7c81767ec8ebd30c5593eead2125507c1b129))
* return mounted component ([#132](https://github.com/nativescript-vue/nativescript-vue/issues/132)) ([a9187b7](https://github.com/nativescript-vue/nativescript-vue/commit/a9187b7c9937b641acde8784f23455c1b9539ec5))



## [1.3.1](https://github.com/nativescript-vue/nativescript-vue/compare/v1.3.0...v1.3.1) (2018-03-10)


### Bug Fixes

* allow using for attribute in custom components ([3114cca](https://github.com/nativescript-vue/nativescript-vue/commit/3114cca2f21e56077dad796224b8a0e81eec19e3))
* assign to existing instead of replacing ([ce3e9ea](https://github.com/nativescript-vue/nativescript-vue/commit/ce3e9ea7ff19eaaa4ab8ed161c4168a858d519d3))



# [1.3.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.2.0...v1.3.0) (2018-02-27)


### Bug Fixes

* allow deepProxy to be used in expressions ([d7646ee](https://github.com/nativescript-vue/nativescript-vue/commit/d7646eeaef1272734c55b94e04edccfe77460904))
* fix list view template selector getting the wrong item ([d648a57](https://github.com/nativescript-vue/nativescript-vue/commit/d648a570cae77c647aacc6c12f52ffc1f4a46608))


### Features

* add transition component ([4951821](https://github.com/nativescript-vue/nativescript-vue/commit/4951821b2e01cdb0eb00d49a020331656710d18b)), closes [#110](https://github.com/nativescript-vue/nativescript-vue/issues/110)



# [1.2.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.1.3...v1.2.0) (2018-02-22)


### Features

* silence framework output by default ([0e5c55b](https://github.com/nativescript-vue/nativescript-vue/commit/0e5c55bf3fa2747e3ad94adcad3283cbf05421d4))



## [1.1.3](https://github.com/nativescript-vue/nativescript-vue/compare/v1.0.0...v1.1.3) (2018-02-21)


### Bug Fixes

* fix option name for pageRouting ([8a8446f](https://github.com/nativescript-vue/nativescript-vue/commit/8a8446fd0cb7706c8c317076ccf02230a745c5d0))


### Features

* add <android> and <ios> elements ([ed96746](https://github.com/nativescript-vue/nativescript-vue/commit/ed967466a8fb0a53f1930bf2f572b65a56c19323))
* add platform-dependent property setting ([f981816](https://github.com/nativescript-vue/nativescript-vue/commit/f981816fd67f2a9aa19284c115a4f1769f9c3ed4))



# [1.0.0](https://github.com/nativescript-vue/nativescript-vue/compare/v1.0.0-alpha.1...v1.0.0) (2018-02-13)



# [1.0.0-alpha.1](https://github.com/nativescript-vue/nativescript-vue/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2018-02-12)



# [1.0.0-alpha.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.12...v1.0.0-alpha.0) (2018-02-12)



## [0.7.12](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.11...v0.7.12) (2018-01-30)


### Bug Fixes

* fix nested components in v-template ([30a11bf](https://github.com/nativescript-vue/nativescript-vue/commit/30a11bf901b230caf5b2bf4cb0fc29fb2441ccdb)), closes [#107](https://github.com/nativescript-vue/nativescript-vue/issues/107)
* reload css on livesync ([b2ac1b5](https://github.com/nativescript-vue/nativescript-vue/commit/b2ac1b5ada4e68ae36c9c1b0410adc0adbc7817a))



## [0.7.11](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.10...v0.7.11) (2018-01-26)


### Bug Fixes

* improve console.dir output ([848440a](https://github.com/nativescript-vue/nativescript-vue/commit/848440aca2dac795b9990e658960dffa0ae903e1))



## [0.7.10](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.9...v0.7.10) (2018-01-24)


### Bug Fixes

* disable pageRouting when not in use ([7def3e2](https://github.com/nativescript-vue/nativescript-vue/commit/7def3e2c248978bee674192c4bc07af24030dbe9)), closes [#98](https://github.com/nativescript-vue/nativescript-vue/issues/98)



## [0.7.9](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.8...v0.7.9) (2018-01-23)


### Bug Fixes

* don't import Vue in utils ([7335fd0](https://github.com/nativescript-vue/nativescript-vue/commit/7335fd034c4bd45725cc9d3ab8414be519bd544b))



## [0.7.8](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.7...v0.7.8) (2018-01-10)


### Bug Fixes

* fix v-model not working for non-components ([4cc399e](https://github.com/nativescript-vue/nativescript-vue/commit/4cc399ee34b926200bad1424b546f1a2aeb3386b))



## [0.7.7](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.6...v0.7.7) (2018-01-10)


### Bug Fixes

* don't throw error when livesyncing css ([8365141](https://github.com/nativescript-vue/nativescript-vue/commit/8365141ced612f381340c42458313a1b02337f19)), closes [#63](https://github.com/nativescript-vue/nativescript-vue/issues/63)



## [0.7.6](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.5...v0.7.6) (2018-01-10)


### Bug Fixes

* fix view already has a parent bug ([e252544](https://github.com/nativescript-vue/nativescript-vue/commit/e2525440836b65028e5185b134e44763d1a2217a)), closes [#59](https://github.com/nativescript-vue/nativescript-vue/issues/59) [#78](https://github.com/nativescript-vue/nativescript-vue/issues/78)


### Features

* allow silencing the console ouput ([8f98ad7](https://github.com/nativescript-vue/nativescript-vue/commit/8f98ad75acb29a6ca01fb19972b28a3ac0bf5948)), closes [#99](https://github.com/nativescript-vue/nativescript-vue/issues/99)



## [0.7.5](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.4...v0.7.5) (2017-12-23)


### Features

* support array properties in v-view directive ([a49ca5d](https://github.com/nativescript-vue/nativescript-vue/commit/a49ca5d0575fafe7548dbcbecc06825ce15d5484)), closes [#80](https://github.com/nativescript-vue/nativescript-vue/issues/80)



## [0.7.4](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.3...v0.7.4) (2017-12-23)



## [0.7.3](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.2...v0.7.3) (2017-12-23)



## [0.7.2](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.1...v0.7.2) (2017-12-23)


### Bug Fixes

* proper v-model for tab-view ([ef26448](https://github.com/nativescript-vue/nativescript-vue/commit/ef264483df516215b710d6c66a3b1fef93b9b93f)), closes [#50](https://github.com/nativescript-vue/nativescript-vue/issues/50)


### Features

* warn when using v-for on a list-view ([2ddd253](https://github.com/nativescript-vue/nativescript-vue/commit/2ddd253f8a9e4864b0048308b6ec9d0f3382dfb0))



## [0.7.1](https://github.com/nativescript-vue/nativescript-vue/compare/v0.7.0...v0.7.1) (2017-12-22)


### Bug Fixes

* don't color console output unless Vue.config.debug is true ([14e5ed4](https://github.com/nativescript-vue/nativescript-vue/commit/14e5ed49b3759d67cfba39e26f01c7dd34134093))
* update sample with new list-view syntax ([e2b5225](https://github.com/nativescript-vue/nativescript-vue/commit/e2b5225e9052086d731a78192e0cdd3fac4734ba))


### Features

* allow setting custom iterator, fixes [#58](https://github.com/nativescript-vue/nativescript-vue/issues/58) ([7aba01c](https://github.com/nativescript-vue/nativescript-vue/commit/7aba01ce244d2920716896bd9542cbf119698b8e))



# [0.7.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.6.0...v0.7.0) (2017-12-21)


### Features

* Add improved <list-view> syntax: for="item in items" ([81af134](https://github.com/nativescript-vue/nativescript-vue/commit/81af1342286392d3573618d47a20b83de0193fbb))
* update sample app to new list-view syntax ([0318163](https://github.com/nativescript-vue/nativescript-vue/commit/0318163b856dc05af18aa7d642dcec624a9489b0))
* update to vue v2.5.13 ([67a1d6a](https://github.com/nativescript-vue/nativescript-vue/commit/67a1d6af9c97df44e4127406f1fa04877c30717c))



# [0.6.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.5.1...v0.6.0) (2017-12-21)


### Features

* replace console.log with better support for nested / circular objects ([83aaccf](https://github.com/nativescript-vue/nativescript-vue/commit/83aaccfe6947017f704a232ac6679f902dea89f5))



## [0.5.1](https://github.com/nativescript-vue/nativescript-vue/compare/v0.5.0...v0.5.1) (2017-12-18)



# [0.5.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.4.0...v0.5.0) (2017-12-18)



# [0.4.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.3.1...v0.4.0) (2017-12-14)


### Bug Fixes

* assign template bag to current instance ([dd74d2f](https://github.com/nativescript-vue/nativescript-vue/commit/dd74d2fbcc99c1d15fa37aae57876dcbb6155abe))


### Features

* Better templating syntax ([51d2ca4](https://github.com/nativescript-vue/nativescript-vue/commit/51d2ca4ea0906871c231d277f64ecaceccea2bb9))
* updated list-view to use the new v-template ([5a9e377](https://github.com/nativescript-vue/nativescript-vue/commit/5a9e377bb5e69f1c0ba30225d08778e6fbe23419))



## [0.3.1](https://github.com/nativescript-vue/nativescript-vue/compare/v0.3.0...v0.3.1) (2017-11-26)



# [0.3.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.2.0...v0.3.0) (2017-11-24)


### Features

* Add router transitions  ([#86](https://github.com/nativescript-vue/nativescript-vue/issues/86)) ([381843e](https://github.com/nativescript-vue/nativescript-vue/commit/381843ede8242c12a5193809bc4e0ca74fe67a1a))



# [0.2.0](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.25...v0.2.0) (2017-11-20)



## [0.1.25](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.24...v0.1.25) (2017-11-20)



## [0.1.24](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.23...v0.1.24) (2017-11-17)


### Features

* Added view directive ([#80](https://github.com/nativescript-vue/nativescript-vue/issues/80)) ([611eb83](https://github.com/nativescript-vue/nativescript-vue/commit/611eb8368e5da074adfde08acd8ddd76f0f889bc))



## [0.1.23](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.22...v0.1.23) (2017-10-20)



## [0.1.22](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.21...v0.1.22) (2017-10-15)



## [0.1.21](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.20...v0.1.21) (2017-10-15)



## [0.1.20](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.19...v0.1.20) (2017-10-15)



## [0.1.19](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.18...v0.1.19) (2017-10-15)



## [0.1.18](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.17...v0.1.18) (2017-10-15)


### Reverts

* Revert "Remove registration code" ([0632a7f](https://github.com/nativescript-vue/nativescript-vue/commit/0632a7f50e07e22f010b215a1b51f811f454a338))



## [0.1.17](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.16...v0.1.17) (2017-10-13)


### Reverts

* Revert "Remove unnecessary logic, which has been solved in the renderer" ([ab7f674](https://github.com/nativescript-vue/nativescript-vue/commit/ab7f6741bf7cf5ce6ef97d65869cd76369c38295))



## [0.1.16](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.15...v0.1.16) (2017-10-09)



## [0.1.15](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.14...v0.1.15) (2017-10-04)



## [0.1.14](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.13...v0.1.14) (2017-10-04)



## [0.1.13](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.12...v0.1.13) (2017-10-04)



## [0.1.12](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.11...v0.1.12) (2017-10-01)



## [0.1.11](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.10...v0.1.11) (2017-10-01)



## [0.1.10](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.9...v0.1.10) (2017-09-28)



## [0.1.9](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.8...v0.1.9) (2017-09-26)



## [0.1.8](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.7...v0.1.8) (2017-09-26)



## [0.1.7](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.6...v0.1.7) (2017-09-25)



## [0.1.6](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.5...v0.1.6) (2017-09-19)



## [0.1.5](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.4...v0.1.5) (2017-08-10)



## [0.1.4](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.3...v0.1.4) (2017-07-14)



## [0.1.3](https://github.com/nativescript-vue/nativescript-vue/compare/v0.1.2...v0.1.3) (2017-07-09)



## 0.1.2 (2017-07-09)



