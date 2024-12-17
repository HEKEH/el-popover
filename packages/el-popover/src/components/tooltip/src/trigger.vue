<script lang="ts" setup>
import type { OnlyChildExpose } from 'el-popover/components/slot';
import { ElPopperTrigger } from 'el-popover/components/popper';
import { useNamespace } from 'el-popover/hooks';
import { composeEventHandlers } from 'el-popover/utils';
import { inject, ref, toRef, unref } from 'vue';
import { TOOLTIP_INJECTION_KEY } from './constants';
import { useTooltipTriggerProps } from './trigger';
import { whenTrigger } from './utils';

defineOptions({
  name: 'ElTooltipTrigger',
});

const props = defineProps(useTooltipTriggerProps);

const ns = useNamespace('tooltip');
const { controlled, id, open, onOpen, onClose, onToggle } = inject(
  TOOLTIP_INJECTION_KEY,
  undefined,
)!;

const triggerRef = ref<OnlyChildExpose | null>(null);

function stopWhenControlledOrDisabled() {
  if (unref(controlled) || props.disabled) {
    return true;
  }
}
const trigger = toRef(props, 'trigger');
const onMouseenter = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'hover', onOpen),
);
const onMouseleave = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'hover', onClose),
);
const onClick = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'click', e => {
    // distinguish left click
    if ((e as MouseEvent).button === 0) {
      onToggle(e);
    }
  }),
);

const onFocus = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'focus', onOpen),
);

const onBlur = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'focus', onClose),
);

const onContextMenu = composeEventHandlers(
  stopWhenControlledOrDisabled,
  whenTrigger(trigger, 'contextmenu', (e: Event) => {
    e.preventDefault();
    onToggle(e);
  }),
);

const onKeydown = composeEventHandlers(
  stopWhenControlledOrDisabled,
  (e: Event) => {
    const { code } = e as KeyboardEvent;
    if (props.triggerKeys.includes(code)) {
      e.preventDefault();
      onToggle(e);
    }
  },
);

defineExpose({
  /**
   * @description trigger element
   */
  triggerRef,
});
</script>

<template>
  <ElPopperTrigger
    :id="id"
    :virtual-ref="virtualRef"
    :open="open"
    :virtual-triggering="virtualTriggering"
    :class="ns.e('trigger')"
    @blur="onBlur"
    @click="onClick"
    @contextmenu="onContextMenu"
    @focus="onFocus"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @keydown="onKeydown"
  >
    <slot />
  </ElPopperTrigger>
</template>
