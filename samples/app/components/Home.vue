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
const DetailsPage = {
  template: `
  <Page>
    <ActionBar class="action-bar" title="Details Page">
      <ActionItem text="Action"></ActionItem>
    </ActionBar>
    <StackLayout>
      <Label :text="'Details ' + Math.random()" />
      <Button text="another" @tap="openDetails" />
      <Button text="back" @tap="goBack" />
    </StackLayout>
  </Page>
  `,
  methods: {
    openDetails() {
      this.$navigateTo(DetailsPage)
    },
    goBack() {
      this.$navigateBack()
    }
  }
}

export default {
  components: [
    DetailsPage,
  ],
  methods: {
    openPage() {
      this.$navigateTo(DetailsPage)
    }
  }
}
</script>