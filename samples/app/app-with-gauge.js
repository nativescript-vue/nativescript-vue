const Vue = require('nativescript-vue')
const VueRouter = require('vue-router')
const application = require('tns-core-modules/application')
const observable_array = require('tns-core-modules/data/observable-array')

Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)

Vue.registerElement(
  'RadRadialGauge',
  () => require('nativescript-ui-gauge').RadRadialGauge
)
Vue.registerElement(
  'RadialScale',
  () => require('nativescript-ui-gauge').RadialScale
)
Vue.registerElement(
  'ScaleStyle',
  () => require('nativescript-ui-gauge').ScaleStyle
)
Vue.registerElement(
  'RadialBarIndicator',
  () => require('nativescript-ui-gauge').RadialBarIndicator
)
Vue.registerElement(
  'BarIndicatorStyle',
  () => require('nativescript-ui-gauge').BarIndicatorStyle
)
Vue.registerElement(
  'RadialNeedle',
  () => require('nativescript-ui-gauge').RadialNeedle
)
Vue.registerElement(
  'TitleStyle',
  () => require('nativescript-ui-gauge').TitleStyle
)
Vue.registerElement(
  'SubtitleStyle',
  () => require('nativescript-ui-gauge').SubtitleStyle
)
Vue.registerElement(
  'NeedleStyle',
  () => require('nativescript-ui-gauge').NeedleStyle
)

Vue.directive('tkRadialGaugeScales', {
  inserted: function(el) {
    var scale = el._nativeView
    var gauge = el.parentNode._nativeView
    if (gauge.scales) {
      gauge.scales.push(scale)
    } else {
      gauge.scales = new observable_array.ObservableArray([scale])
    }
  }
})
Vue.directive('tkRadialScaleIndicators', {
  inserted: function(el) {
    var barIndicator = el._nativeView
    var scale = el.parentNode._nativeView
    if (scale.indicators) {
      scale.indicators.push(barIndicator)
    } else {
      scale.indicators = new observable_array.ObservableArray([barIndicator])
    }
  }
})
Vue.directive('tkRadialBarIndicatorStyle', {
  inserted: function(el) {
    el.parentNode._nativeView.indicatorStyle = el._nativeView
  }
})
Vue.directive('tkRadialGaugeTitleStyle', {
  inserted: function(el) {
    el.parentNode._nativeView.titleStyle = el._nativeView
  }
})
Vue.directive('tkRadialGaugeSubtitleStyle', {
  inserted: function(el) {
    el.parentNode._nativeView.subtitleStyle = el._nativeView
  }
})
Vue.directive('tkRadialNeedleStyle', {
  inserted: function(el) {
    el.parentNode._nativeView.needleStyle = el._nativeView
  }
})
Vue.directive('tkRadialScaleStyle', {
  inserted: function(el) {
    el.parentNode._nativeView.scaleStyle = el._nativeView
  }
})

Vue.config.silent = false
Vue.config.debug = true

new Vue({
  template: `
    <Frame>
      <Page>
        <ActionBar class="action-bar" title="Home" >
          <ActionItem text="Menu" @tap="$refs.drawer.nativeView.showDrawer()"/>
        </ActionBar>

        <StackLayout>
        <RadRadialGauge>
          <RadialScale v-tkRadialGaugeScales minimum="0" maximum="6" radius="1.00">
            <ScaleStyle v-tkRadialScaleStyle majorTicksCount="7" majorTicksStrokeColor="#00ff00" majorTicksFillColor="#ffffff" majorTicksWidth="8" minorTicksCount="14" minorTicksFillColor="#ff00ff" lineThickness="0" labelsCount="7" ticksOffset="0" />
            <RadialBarIndicator v-tkRadialScaleIndicators minimum="0" maximum="1.2" location="0.92">
              <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="#ffffff" />
            </RadialBarIndicator>
            <RadialBarIndicator v-tkRadialScaleIndicators minimum="1.2" maximum="2.4" location="0.92">
              <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="#cccccc" />
            </RadialBarIndicator>
            <RadialBarIndicator v-tkRadialScaleIndicators minimum="2.4" maximum="3.6" location="0.92">
              <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="#aaaaaa" />
            </RadialBarIndicator>
            <RadialBarIndicator v-tkRadialScaleIndicators minimum="3.6" maximum="4.8" location="0.92">
              <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="#777777" />
            </RadialBarIndicator>
            <RadialBarIndicator v-tkRadialScaleIndicators minimum="4.8" maximum="6" location="0.92">
              <BarIndicatorStyle v-tkRadialBarIndicatorStyle fillColor="#444444" />
            </RadialBarIndicator>
            <RadialNeedle v-tkRadialScaleIndicators :value="gaugeValue" minimum="0" maximum="0.5">
            <NeedleStyle v-tkRadialNeedleStyle length="0.4" android:topWidth="4" ios:topWidth="3" android:bottomWidth="20" ios:bottomWidth="3" circleFillColor="#00ff00" circleInnerRadius="10" offset="-25" fillColor="#00ff00" />
            </RadialNeedle>
          </RadialScale>
        </RadRadialGauge>
        </StackLayout>
      </Page>
    </Frame>
  `,
  data() {
    return {
      gaugeValue: 0.2
    }
  },
  created() {}
}).$start()
