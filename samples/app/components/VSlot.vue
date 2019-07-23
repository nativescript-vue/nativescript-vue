<template>
  <Page>
    <ActionBar title="Vue 2.6 - v-slot" />
    <ComponentWithSlot>
      <template v-slot="scope">
        <Label :text="scope ? scope.counter : '(scope is not defined)'" />
      </template>
    </ComponentWithSlot>
  </Page>
</template>

<script>
import ComponentWithSlot from './ComponentWithSlot'

export default {
  components: {
    ComponentWithSlot,
  },
}
</script>
