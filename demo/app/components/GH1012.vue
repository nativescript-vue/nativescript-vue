<script lang="ts" setup>
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function animateIn(args) {
  console.log("ANIMATE")
  await wait(1);
  const view = args.object;
  view.color = "green";
  view.scaleX = 0;
  view.scaleY = 0;

  view
    .animate({
      opacity: 1,
      scale: {
        x: 1,
        y: 1,
      },
      duration: 3000,
    })
    .then(() => {
      view.color = "red";
    })
    .catch((err) => console.log(err));
}
</script>

<template>
  <Button
    ref="btnNewTrip"
    opacity="0"
    scaleX="0.1"
    scaleY="0.1"
    @loaded="animateIn"
    @tap="animateIn"
  >
    New Trip
  </Button>
</template>
