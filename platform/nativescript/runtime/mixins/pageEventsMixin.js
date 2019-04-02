export default {
  // page is loaded.
  loaded(args) {},
  // page is unloaded.
  unloaded(args) {},
  // when leaving a page (the navigation has ended).
  navigatedFrom(args) {},
  // when entering a page (the navigation has ended).
  navigatedTo(args) {},
  // when leaving a page (the navigation has started).
  navigatingFrom(args) {},
  // when entering a page (the navigation has started)
  navigatingTo(args) {},

  // look for page instance
  mounted: function() {
    if (this.$children == undefined || this.$children.length !== 1) return

    if (this.$children[0].$el._tagName == 'nativepage') {
      const nativePage = this.$children[0].$el._nativeView
      if (nativePage != undefined) {
        // fire page events
        nativePage.on('loaded', args => this.$options.loaded(args))
        nativePage.on('unloaded', args => this.$options.unloaded(args))
        nativePage.on('navigatedFrom', args =>
          this.$options.navigatedFrom(args)
        )
        nativePage.on('navigatedTo', args => this.$options.navigatedTo(args))
        nativePage.on('navigatingFrom', args =>
          this.$options.navigatingFrom(args)
        )
        nativePage.on('navigatingTo', args => this.$options.navigatingTo(args))
      }
    }
  }
}
