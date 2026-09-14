<script setup lang="ts">
import { componentMarkdownUtils } from "../../utils/ComponentMarkdownUtils";
import HeaderAnchorPermanentLink from "./HeaderAnchorPermanentLink.vue";

defineProps<{ title: string }>();
</script>
<template>
  <h2
    :id="componentMarkdownUtils.buildIdMarkdown(title)"
    class="text-2xl mb-0!"
  >
    {{ title }}
    <HeaderAnchorPermanentLink :id="title"></HeaderAnchorPermanentLink>
  </h2>
</template>
