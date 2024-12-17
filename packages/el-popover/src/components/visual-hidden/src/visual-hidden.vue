<script lang="ts" setup>
import type { StyleValue } from 'vue';
import { computed } from 'vue';
import { visualHiddenProps } from './visual-hidden';

defineOptions({
  name: 'ElVisuallyHidden',
});

const props = defineProps(visualHiddenProps);

const computedStyle = computed<StyleValue>(() => {
  return [
    props.style,
    {
      position: 'absolute',
      border: 0,
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
    },
  ];
});
</script>

<template>
  <span v-bind="$attrs" :style="computedStyle">
    <slot />
  </span>
</template>
