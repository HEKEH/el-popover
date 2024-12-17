import type { ExtractPropTypes, PropType } from 'vue';
import type Popper from './popper.vue';

export const Effect = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const roleTypes = [
  'dialog',
  'grid',
  'group',
  'listbox',
  'menu',
  'navigation',
  'tooltip',
  'tree',
] as const;

export type PopperEffect = 'light' | 'dark';
export type PopperTrigger = 'click' | 'contextmenu' | 'hover' | 'focus';

export const popperProps = {
  role: {
    type: String as PropType<(typeof roleTypes)[number]>,
    validator: (val: string) => roleTypes.includes(val as any),
    default: 'tooltip',
  },
} as const;

export type PopperProps = ExtractPropTypes<typeof popperProps>;

export type PopperInstance = InstanceType<typeof Popper>;

/** @deprecated use `popperProps` instead, and it will be deprecated in the next major version */
export const usePopperProps = popperProps;

/** @deprecated use `PopperProps` instead, and it will be deprecated in the next major version */
export type UsePopperProps = PopperProps;
