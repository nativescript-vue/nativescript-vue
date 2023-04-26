<script lang="ts" setup>
import type { Button, EventData } from "@nativescript/core";
import { Color } from "@nativescript/core";

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function animateIn(args: EventData) {
  console.log("ANIMATE")
  await wait(1);
  const view = args.object as Button;
  view.color = new Color("green");
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
      view.color = new Color("red");
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
