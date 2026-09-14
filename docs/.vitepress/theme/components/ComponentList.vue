<script setup lang="ts">
import { dataComponents } from "../data/DataComponents";
import ComponentListItem from "./ComponentListItem.vue";
import H2Title from "./match_markdown/H2Title.vue";
</script>
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <template v-for="(data, i) in dataComponents" :key="i">
      <H2Title
        :title="data.name"
        class="col-span-1 sm:col-span-2 md:col-span-3 mt-8"
      ></H2Title>
      <ComponentListItem v-for="(view, j) in data.views" :data="view" />
    </template>
  </div>
</template>
