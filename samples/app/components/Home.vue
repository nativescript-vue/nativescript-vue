<template>
  <Page id="home">
    <ActionBar class="action-bar" title="Home Page">
    </ActionBar>
    <StackLayout>
      <Button text="Open page." @tap="openPage" />
    </StackLayout>
  </Page>
</template>

<script>
import Details from './Details.vue'

export default {
  methods: {
    openPage() {
      this.$navigateTo(Details)
    }
  }
}
</script>