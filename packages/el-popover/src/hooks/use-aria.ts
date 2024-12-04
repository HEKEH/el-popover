import type { PropType } from 'vue';
import { pick } from '../utils';

export const ariaProps = {
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel: { type: String },
  /**
   * @description native `aria-orientation` attribute
   */
  ariaOrientation: {
    type: String as PropType<'horizontal' | 'vertical' | 'undefined'>,
  },
  /**
   * @description native `aria-controls` attribute
   */
  ariaControls: { type: String },
} as const;

export const useAriaProps = <T extends keyof typeof ariaProps>(
  arias: Array<T>,
) => {
  return pick<typeof ariaProps, T>(ariaProps, arias);
};
