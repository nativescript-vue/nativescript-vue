<template>
  <Page>
    <ActionBar class="action-bar" title="Home Page">
    </ActionBar>
    <StackLayout>
      <Button text="Open page" @tap="openPage" />
    </StackLayout>
  </Page>
</template>

<script>
import Details from './Details'

export default {
  components: [
    Details,
  ],
  methods: {
    openPage() {
      this.$navigateTo(Details)
    }
  }
}
</script>