import type { ExtractPropTypes, PropType } from 'vue';
import { popperTriggerProps } from 'el-popover/components/popper';
import type { Arrayable } from 'el-popover/types';
import { EVENT_CODE } from 'el-popover/constants';

export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu';

export const useTooltipTriggerProps = {
  ...popperTriggerProps,
  /**
   * @description whether Tooltip is disabled
   */
  disabled: Boolean,
  /**
   * @description How should the tooltip be triggered (to show)
   */
  trigger: {
    type: [String, Array] as PropType<Arrayable<TooltipTriggerType>>,
    default: 'hover',
  },
  /**
   * @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of tooltip through the keyboard
   */
  triggerKeys: {
    type: Array as PropType<string[]>,
    default: () => [EVENT_CODE.enter, EVENT_CODE.space],
  },
} as const;

export type ElTooltipTriggerProps = ExtractPropTypes<
  typeof useTooltipTriggerProps
>;
