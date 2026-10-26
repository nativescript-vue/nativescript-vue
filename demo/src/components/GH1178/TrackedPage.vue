<script setup lang="ts">
import type { Frame, Page } from '@nativescript/core';
import {
  $navigateBack,
  $navigateTo,
  onMounted,
  onUnmounted,
  ref,
  unref,
  watch,
  type Ref,
} from 'nativescript-vue';
import {
  createPageId,
  describeFrame,
  livePages,
  log,
  windowLabel,
} from './harness';
import TrackedPage from './TrackedPage.vue';
import WindowActions from './WindowActions.vue';

const props = defineProps<{ frame: Ref; depth: number }>();

const id = createPageId();
const tick = ref(0);
const windowId = ref('?');
const timer = setInterval(() => tick.value++, 1000);

livePages.set(id, { windowId: windowId.value, tick: 0 });

// Only runs while this page's app is still reactive.
watch(tick, (value) => {
  const page = livePages.get(id);
  if (page) {
    page.tick = value;
  }
});

function onLoaded(args: { object: Page }) {
  windowId.value = windowLabel(args.object.getNativeWindow());
  livePages.get(id)!.windowId = windowId.value;
  log(`page ${id} loaded in window ${windowId.value}`);
}

onMounted(() => log(`page ${id} mounted depth=${props.depth}`));
onUnmounted(() => {
  clearInterval(timer);
  livePages.delete(id);
  log(`page ${id} unmounted`);
});

function nativeFrame(): Frame | undefined {
  return unref(props.frame)?.nativeView;
}

function push() {
  $navigateTo(TrackedPage, {
    frame: props.frame,
    props: { frame: props.frame, depth: props.depth + 1 },
  });
}

function back() {
  log(`page ${id} back: ${describeFrame(nativeFrame())}`);
  $navigateBack({ frame: props.frame }).catch((err) =>
    log(`page ${id} back failed: ${err}`),
  );
}

function coreBack() {
  const frame = nativeFrame();
  log(`page ${id} core back: ${describeFrame(frame)}`);
  frame?.goBack();
}
</script>

<template>
  <Page @loaded="onLoaded">
    <ActionBar :title="`${id} (depth ${depth})`" />
    <StackLayout class="p-4">
      <Label :text="`Page ${id} in window ${windowId}`" class="text-xl" />
      <Label :text="`tick ${tick}`" class="text-lg" />
      <Button text="Push tracked page" @tap="push" />
      <Button text="Back" @tap="back" />
      <Button text="Back (frame.goBack)" @tap="coreBack" />
      <WindowActions />
    </StackLayout>
  </Page>
</template>
