import { createModelToggleComposable } from 'el-popover/hooks';
import { popperArrowProps, popperProps } from 'el-popover/components/popper';
import { useTooltipContentProps } from './content';
import { useTooltipTriggerProps } from './trigger';
import type Tooltip from './tooltip.vue';

import type { ExtractPropTypes } from 'vue';

export const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle,
} = createModelToggleComposable('visible' as const);

export const useTooltipProps = {
  ...popperProps,
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...popperArrowProps,
  /**
   * @description whether the tooltip content has an arrow
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
} as const;

export const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  'before-show',
  'before-hide',
  'show',
  'hide',
  'open',
  'close',
];

export type ElTooltipProps = ExtractPropTypes<typeof useTooltipProps>;

export type TooltipInstance = InstanceType<typeof Tooltip>;
