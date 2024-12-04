<template>
  <slot :open="openState" />
</template>

<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  unref,
  useId,
} from 'vue';
import { tooltipV2RootProps } from './root';
import { useTimeoutFn } from '@vueuse/core';
import { useNamespace } from '../../../hooks';
import { TOOLTIP_V2_OPEN, tooltipV2RootKey } from './constants';

defineOptions({
  name: 'ElTooltipV2Root',
});
const props = defineProps(tooltipV2RootProps);
const internalOpen = ref(props.defaultOpen);
const triggerRef = ref<HTMLElement | null>(null);
const contentId = useId();
const openState = computed<boolean>({
  get() {
    return props.open ?? internalOpen.value;
  },
  set(val) {
    if (val) {
      document.dispatchEvent(
        new CustomEvent(TOOLTIP_V2_OPEN, { detail: contentId }),
      );
    }

    internalOpen.value = val;
    props['onUpdate:open']?.(val);
    props.onOpenChange?.(val);
  },
});

const isOpenDelayed = computed(
  () => typeof props.delayDuration === 'number' && props.delayDuration > 0,
);

const { start: onDelayedOpen, stop: clearTimer } = useTimeoutFn(
  () => {
    openState.value = true;
  },
  computed(() => props.delayDuration),
  {
    immediate: false,
  },
);
const ns = useNamespace('tooltip-v2');

const onNormalOpen = () => {
  clearTimer();
  openState.value = true;
};

const onDelayOpen = () => {
  unref(isOpenDelayed) ? onDelayedOpen() : onNormalOpen();
};

const onOpen = onNormalOpen;
const onClose = () => {
  clearTimer();
  openState.value = false;
};

const onTooltipOpenEvent = (event: Event) => {
  if ((event as CustomEvent).detail !== contentId) {
    // Close the tooltip if other tooltip is opened
    onClose();
  }
};

onMounted(() => {
  // Keeps only 1 tooltip open at a time
  document.addEventListener(TOOLTIP_V2_OPEN, onTooltipOpenEvent);
});

onBeforeUnmount(() => {
  clearTimer();
  document.removeEventListener(TOOLTIP_V2_OPEN, onTooltipOpenEvent);
});

provide(tooltipV2RootKey, {
  contentId,
  triggerRef,
  ns,

  onClose,
  onDelayOpen,
  onOpen,
});

defineExpose({
  /**
   * @description open tooltip programmatically
   */
  onOpen,

  /**
   * @description close tooltip programmatically
   */
  onClose,
});
</script>
