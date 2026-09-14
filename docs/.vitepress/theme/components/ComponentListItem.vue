<script setup lang="ts">
import { DataComponent } from "../data/DataComponents";
import { componentMarkdownUtils } from "../utils/ComponentMarkdownUtils";

defineProps<{ data: DataComponent }>();
</script>

<template>
  <div class=" border-[1px] border-divider rounded-2xl p-3">
    <a :href="data.url" :target="data.url.startsWith('https:') ? '_blank': null!"  rel="noreferrer" class="no-underline!">
      <h3 :id="componentMarkdownUtils.buildIdMarkdown(data.name)" class="mt-0! text-color ">{{ data.name }}</h3>
      <p class="text-gray-500 text-sm  my-1! leading-4! h-8">{{ data.description }}</p>
      <div v-show="data.img" class="flex justify-center w-full bg-white rounded-xl p-2 mt-2" >
        <img class="h-[100px]! rounded-xl" :src="data.img"></img>
      </div>

      <div v-if="data.vModel" class="flex items-center flex-wrap text-xs mt-3 text-color">
        <img class="h-[16px]! mr-1" src="/images/vue.png"></img>
        <span class="mr-1 text-vue font-bold"> {{  data.vModel }}</span> prop supports <span class="text-vue font-bold ml-1">v-model</span></div>
    </a>
  </div>
</template>
