import type { ExtractPropTypes, PropType } from 'vue';

const EventHandler = {
  type: Function as PropType<(e: Event) => boolean | void>,
} as const;

export const tooltipV2TriggerProps = {
  onBlur: EventHandler,
  onClick: EventHandler,
  onFocus: EventHandler,
  onMouseDown: EventHandler,
  onMouseEnter: EventHandler,
  onMouseLeave: EventHandler,
} as const;

export type TooltipV2TriggerProps = ExtractPropTypes<
  typeof tooltipV2TriggerProps
>;
