import type { ExtractPropTypes, PropType } from 'vue';
import type { Placement, Strategy, VirtualElement } from '@floating-ui/dom';
import { useAriaProps } from '../../../hooks';

type PopperEffect = 'light' | 'dark';

const tooltipV2Strategies = ['absolute', 'fixed'] as const;

const tooltipV2Placements = [
  'top-start',
  'top-end',
  'top',
  'bottom-start',
  'bottom-end',
  'bottom',
  'left-start',
  'left-end',
  'left',
  'right-start',
  'right-end',
  'right',
] as const;

export const tooltipV2ContentProps = {
  arrowPadding: {
    type: Number,
    default: 5,
  },
  effect: {
    type: String as PropType<PopperEffect | string>,
    default: 'light',
  },
  contentClass: { type: String },
  /**
   * Placement of tooltip content relative to reference element (when absent it refers to trigger)
   */
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom',
    validator: (val: string) => tooltipV2Placements.includes(val as any),
  },
  /**
   * Reference element for tooltip content to set its position
   */
  reference: {
    type: Object as PropType<HTMLElement | VirtualElement | null>,
    default: null,
  },
  offset: {
    type: Number,
    default: 8,
  },
  strategy: {
    type: String as PropType<Strategy>,
    default: 'absolute',
    validator: (val: string) => tooltipV2Strategies.includes(val as any),
  },
  showArrow: { type: Boolean },
  ...useAriaProps(['ariaLabel']),
} as const;

export type TooltipV2ContentProps = ExtractPropTypes<
  typeof tooltipV2ContentProps
>;
