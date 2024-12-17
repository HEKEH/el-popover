<script lang="ts" setup>
import { useNamespace } from 'el-popover/hooks';
import { inject, onBeforeUnmount, watch } from 'vue';
import { popperArrowProps } from './arrow';
import { POPPER_CONTENT_INJECTION_KEY } from './constants';

defineOptions({
  name: 'ElPopperArrow',
  inheritAttrs: false,
});

const props = defineProps(popperArrowProps);

const ns = useNamespace('popper');
const { arrowOffset, arrowRef, arrowStyle } = inject(
  POPPER_CONTENT_INJECTION_KEY,
  undefined,
)!;

watch(
  () => props.arrowOffset,
  val => {
    arrowOffset.value = val;
  },
);
onBeforeUnmount(() => {
  arrowRef.value = undefined;
});

defineExpose({
  /**
   * @description Arrow element
   */
  arrowRef,
});
</script>

<template>
  <span
    ref="arrowRef"
    :class="ns.e('arrow')"
    :style="arrowStyle"
    data-popper-arrow
  />
</template>
