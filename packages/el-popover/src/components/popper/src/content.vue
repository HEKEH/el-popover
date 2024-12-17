<script lang="ts" setup>
import type { WatchStopHandle } from 'vue';
import ElFocusTrap from 'el-popover/components/focus-trap';
import { isElement, isNil } from 'el-popover/utils';
import { onBeforeUnmount, onMounted, provide, ref, unref, watch } from 'vue';
import {
  usePopperContent,
  usePopperContentDOM,
  usePopperContentFocusTrap,
} from './composables';
import { POPPER_CONTENT_INJECTION_KEY } from './constants';

import { popperContentEmits, popperContentProps } from './content';

// const NOOP = () => {};

defineOptions({
  name: 'ElPopperContent',
});

const props = defineProps(popperContentProps);

const emit = defineEmits(popperContentEmits);

const {
  focusStartRef,
  trapped,

  onFocusAfterReleased,
  onFocusAfterTrapped,
  onFocusInTrap,
  onFocusoutPrevented,
  onReleaseRequested,
} = usePopperContentFocusTrap(props, emit);

const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } =
  usePopperContent(props);

const {
  ariaModal,
  arrowStyle,
  contentAttrs,
  contentClass,
  contentStyle,
  updateZIndex,
} = usePopperContentDOM(props, {
  styles,
  attributes,
  role,
});

const arrowOffset = ref<number>();

provide(POPPER_CONTENT_INJECTION_KEY, {
  arrowStyle,
  arrowRef,
  arrowOffset,
});

// const formItemContext = inject(formItemContextKey, undefined);

// if (formItemContext) {
//   // disallow auto-id from inside popper content
//   provide(formItemContextKey, {
//     ...formItemContext,
//     addInputId: NOOP,
//     removeInputId: NOOP,
//   });
// }

let triggerTargetAriaStopWatch: WatchStopHandle | undefined;

function updatePopper(shouldUpdateZIndex = true) {
  update();
  shouldUpdateZIndex && updateZIndex();
}

function togglePopperAlive() {
  updatePopper(false);
  if (props.visible && props.focusOnShow) {
    trapped.value = true;
  } else if (props.visible === false) {
    trapped.value = false;
  }
}

onMounted(() => {
  watch(
    () => props.triggerTargetEl,
    (triggerTargetEl, prevTriggerTargetEl) => {
      triggerTargetAriaStopWatch?.();
      triggerTargetAriaStopWatch = undefined;

      const el = unref(triggerTargetEl || contentRef.value);
      const prevEl = unref(prevTriggerTargetEl || contentRef.value);

      if (isElement(el)) {
        triggerTargetAriaStopWatch = watch(
          [role, () => props.ariaLabel, ariaModal, () => props.id],
          watches => {
            ['role', 'aria-label', 'aria-modal', 'id'].forEach((key, idx) => {
              isNil(watches[idx])
                ? el.removeAttribute(key)
                : el.setAttribute(key, watches[idx]!);
            });
          },
          { immediate: true },
        );
      }
      if (prevEl !== el && isElement(prevEl)) {
        ['role', 'aria-label', 'aria-modal', 'id'].forEach(key => {
          prevEl.removeAttribute(key);
        });
      }
    },
    { immediate: true },
  );

  watch(() => props.visible, togglePopperAlive, { immediate: true });
});

onBeforeUnmount(() => {
  triggerTargetAriaStopWatch?.();
  triggerTargetAriaStopWatch = undefined;
});

defineExpose({
  /**
   * @description popper content element
   */
  popperContentRef: contentRef,
  /**
   * @description popperjs instance
   */
  popperInstanceRef: instanceRef,
  /**
   * @description method for updating popper
   */
  updatePopper,

  /**
   * @description content style
   */
  contentStyle,
});
</script>

<template>
  <div
    ref="contentRef"
    v-bind="contentAttrs"
    :style="contentStyle"
    :class="contentClass"
    tabindex="-1"
    @mouseenter="e => $emit('mouseenter', e)"
    @mouseleave="e => $emit('mouseleave', e)"
  >
    <ElFocusTrap
      :trapped="trapped"
      :trap-on-focus-in="true"
      :focus-trap-el="contentRef"
      :focus-start-el="focusStartRef"
      @focus-after-trapped="onFocusAfterTrapped"
      @focus-after-released="onFocusAfterReleased"
      @focusin="onFocusInTrap"
      @focusout-prevented="onFocusoutPrevented"
      @release-requested="onReleaseRequested"
    >
      <slot />
    </ElFocusTrap>
  </div>
</template>
