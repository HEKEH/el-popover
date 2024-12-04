import type { ExtractPropTypes, PropType } from 'vue';

export const teleportProps = {
  to: {
    type: [String, Object] as PropType<string | HTMLElement>,
    required: true,
  },
  disabled: { type: Boolean },
} as const;

export type TeleportProps = ExtractPropTypes<typeof teleportProps>;
