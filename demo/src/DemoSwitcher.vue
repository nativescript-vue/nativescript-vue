<script setup lang="ts">
import { ApplicationSettings } from '@nativescript/core';
import { computed, onUnmounted, ref } from 'nativescript-vue';
import { DEFAULT_DEMO, demos } from './demos';
import { onSwitcherKey, type SwitcherKey } from './switcherShortcut';

const OVERRIDE_KEY = 'demo-switcher.override';

const override = ref<string | undefined>(
  ApplicationSettings.getString(OVERRIDE_KEY),
);
const open = ref(false);
const focused = ref(0);

const current = computed(
  () =>
    demos.find((d) => d.name === override.value) ??
    demos.find((d) => d.name === DEFAULT_DEMO)!,
);

function toggle() {
  open.value = !open.value;
  focused.value = demos.indexOf(current.value);
}

function onKey(key: SwitcherKey) {
  if (key === 'toggle') {
    toggle();
    return true;
  }
  if (!open.value) {
    return false;
  }
  switch (key) {
    case 'up':
      focused.value = (focused.value + demos.length - 1) % demos.length;
      break;
    case 'down':
      focused.value = (focused.value + 1) % demos.length;
      break;
    case 'enter':
      select(demos[focused.value].name);
      break;
    case 'escape':
      open.value = false;
      break;
  }
  return true;
}

onUnmounted(onSwitcherKey(onKey));

function select(name: string) {
  ApplicationSettings.setString(OVERRIDE_KEY, name);
  override.value = name;
  open.value = false;
}

function clearOverride() {
  ApplicationSettings.remove(OVERRIDE_KEY);
  override.value = undefined;
  open.value = false;
}
</script>

<template>
  <GridLayout rows="*">
    <Frame v-if="current.root !== 'frame'" :key="current.name">
      <Page>
        <ActionBar :title="current.name" />
        <component :is="current.component" v-if="current.root === 'view'" />
      </Page>
      <component :is="current.component" v-if="current.root === 'page'" />
    </Frame>
    <component :is="current.component" v-else :key="current.name" />

    <GridLayout
      v-if="open"
      rows="auto, *, auto"
      class="switcher-panel"
      @tap="open = false"
    >
      <Label
        row="0"
        class="switcher-title"
        text="Demos  (↑↓ move · Enter select · Esc close)"
      />
      <ScrollView row="1">
        <StackLayout>
          <Button
            v-for="(demo, index) in demos"
            :key="demo.name"
            class="switcher-item"
            :class="{
              active: demo.name === current.name,
              focused: open && index === focused,
            }"
            :text="demo.name + (demo.name === DEFAULT_DEMO ? ' (default)' : '')"
            @tap="select(demo.name)"
          />
        </StackLayout>
      </ScrollView>
      <Button
        row="2"
        class="switcher-item"
        :text="override ? 'Clear override' : 'No override set'"
        :isEnabled="!!override"
        @tap="clearOverride"
      />
    </GridLayout>
  </GridLayout>
</template>
