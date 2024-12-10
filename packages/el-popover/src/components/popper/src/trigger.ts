import type { PropType } from 'vue';
import type { Measurable } from './constants';
import type Trigger from './trigger.vue';

export const popperTriggerProps = {
  virtualRef: {
    type: Object as PropType<Measurable>,
  },
  virtualTriggering: {
    type: Boolean,
  },
  onMouseenter: {
    type: Function as PropType<(e: Event) => void>,
  },
  onMouseleave: {
    type: Function as PropType<(e: Event) => void>,
  },
  onClick: {
    type: Function as PropType<(e: Event) => void>,
  },
  onKeydown: {
    type: Function as PropType<(e: Event) => void>,
  },
  onFocus: {
    type: Function as PropType<(e: Event) => void>,
  },
  onBlur: {
    type: Function as PropType<(e: Event) => void>,
  },
  onContextmenu: {
    type: Function as PropType<(e: Event) => void>,
  },
  id: {
    type: String,
  },
  open: {
    type: Boolean,
  },
} as const;

export type PopperTriggerProps = typeof popperTriggerProps;

export type PopperTriggerInstance = InstanceType<typeof Trigger>;

/** @deprecated use `popperTriggerProps` instead, and it will be deprecated in the next major version */
export const usePopperTriggerProps = popperTriggerProps;

/** @deprecated use `PopperTriggerInstance` instead, and it will be deprecated in the next major version */
export type ElPopperArrowTrigger = PopperTriggerInstance;
