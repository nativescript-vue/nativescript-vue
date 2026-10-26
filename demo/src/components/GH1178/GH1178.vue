<script setup lang="ts">
import type { Page } from '@nativescript/core';
import { $navigateTo, ref } from 'nativescript-vue';
import GH1178 from './GH1178.vue';
import {
  describeFrame,
  log,
  startHarness,
  watchWindowEvents,
  windowLabel,
} from './harness';
import TrackedPage from './TrackedPage.vue';
import WindowActions from './WindowActions.vue';

/**
 * Pages pushed with $navigateTo must stay mounted while their window's native
 * UI is torn down and rebuilt (Android Activity recreation, iOS scene
 * disconnect), and unmount once the window closes for good. Every page logs
 * mount/unmount, and a summary of still-mounted pages is logged every 3s.
 */
startHarness(GH1178);

const frame = ref();
const windowId = ref('?');
let frameLogged = false;

function onLoaded(args: { object: Page }) {
  const window = args.object.getNativeWindow();
  windowId.value = windowLabel(window);
  if (window) {
    watchWindowEvents(window);
  }
  const nativeFrame = frame.value?.nativeView;
  if (nativeFrame && !frameLogged) {
    frameLogged = true;
    for (const eventName of ['navigatingTo', 'navigatedTo']) {
      nativeFrame.on(eventName, (event: any) =>
        log(
          `frame ${eventName} isBack=${event.isBack} ${describeFrame(nativeFrame)}`,
        ),
      );
    }
  }
}

function push() {
  $navigateTo(TrackedPage, { frame, props: { frame, depth: 1 } });
}
</script>

<template>
  <Frame ref="frame">
    <Page @loaded="onLoaded">
      <ActionBar :title="`GH1178 - ${windowId}`" />
      <StackLayout class="p-4">
        <Label :text="`Window ${windowId}`" class="text-xl" />
        <Button text="Push tracked page" @tap="push" />
        <WindowActions />
      </StackLayout>
    </Page>
  </Frame>
</template>
