<template>
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
</template>

<script>
const page = {
  methods: {
    openDetails() {
      this.$navigateTo(page)
    },
    goBack() {
      this.$navigateBack()
    }
  }
}
export default page;
</script>