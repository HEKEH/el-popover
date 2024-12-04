import { tooltipV2RootProps } from './root';
import { tooltipV2TriggerProps } from './trigger';
import { tooltipV2ArrowProps } from './arrow';
import { tooltipV2ContentProps } from './content';

import type { ExtractPropTypes, PropType, TransitionProps } from 'vue';

export const tooltipV2Props = {
  ...tooltipV2RootProps,
  ...tooltipV2ArrowProps,
  ...tooltipV2TriggerProps,
  ...tooltipV2ContentProps,
  alwaysOn: { type: Boolean },
  fullTransition: { type: Boolean },
  transitionProps: {
    type: [Object, null] as PropType<TransitionProps | null>,
    default: null,
  },
  teleported: { type: Boolean },
  to: {
    type: String,
    default: 'body',
  },
} as const;

export type TooltipV2Props = ExtractPropTypes<typeof tooltipV2Props>;
