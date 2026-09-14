<script setup lang="ts">
import { componentMarkdownUtils } from "../../utils/ComponentMarkdownUtils";

defineProps<{ id: string }>();
</script>
<template>
  <a
    class="header-anchor"
    :href="`#${componentMarkdownUtils.buildIdMarkdown(id)}`"
    :aria-label="`Permalink to &quot;${id}&ZeroWidthSpace;&quot;`"
    >&ZeroWidthSpace;</a
  >
</template>
