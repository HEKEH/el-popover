import type { ExtractPropTypes, PropType } from 'vue';

type StateUpdater = (state: boolean) => void;

export const tooltipV2RootProps = {
  delayDuration: {
    type: Number,
    default: 300,
  },
  defaultOpen: {
    type: Boolean,
  },
  open: {
    type: Boolean,
    default: undefined,
  },
  onOpenChange: {
    type: Function as PropType<StateUpdater>,
  },
  'onUpdate:open': {
    type: Function as PropType<StateUpdater>,
  },
} as const;

export type TooltipV2RootProps = ExtractPropTypes<typeof tooltipV2RootProps>;
