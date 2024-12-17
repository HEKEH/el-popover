import type { ExtractPropTypes, PropType, StyleValue } from 'vue';
import type { Measurable } from './constants';

import type Content from './content.vue';
import type { PopperEffect } from './popper';
import { type Options, type Placement, placements } from '@popperjs/core';
import { useAriaProps } from 'el-popover/hooks';

type ClassObjectType = Record<string, boolean>;
type ClassType = string | ClassObjectType | ClassType[];

const POSITIONING_STRATEGIES = ['fixed', 'absolute'] as const;

export interface CreatePopperInstanceParams {
  referenceEl: Measurable;
  popperContentEl: HTMLElement;
  arrowEl: HTMLElement | undefined;
}

export const popperCoreConfigProps = {
  boundariesPadding: {
    type: Number,
    default: 0,
  },
  fallbackPlacements: {
    type: Array as PropType<Placement[]>,
    default: undefined,
  },
  gpuAcceleration: {
    type: Boolean,
    default: true,
  },
  /**
   * @description offset of the Tooltip
   */
  offset: {
    type: Number,
    default: 12,
  },
  /**
   * @description position of Tooltip
   */
  placement: {
    type: String as PropType<Placement>,
    validator: (val: string) => {
      return placements.includes(val as any);
    },
    default: 'bottom',
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) parameters
   */
  popperOptions: {
    type: Object as PropType<Partial<Options>>,
    default: () => ({}),
  },
  strategy: {
    type: String as PropType<(typeof POSITIONING_STRATEGIES)[number]>,
    validator: (val: string) => POSITIONING_STRATEGIES.includes(val as any),
    default: 'absolute',
  },
} as const;
export type PopperCoreConfigProps = ExtractPropTypes<
  typeof popperCoreConfigProps
>;

export const popperContentProps = {
  ...popperCoreConfigProps,
  id: { type: String },
  style: {
    type: [String, Array, Object] as PropType<StyleValue>,
  },
  className: {
    type: [String, Array, Object] as PropType<ClassType>,
  },
  effect: {
    type: String as PropType<PopperEffect | string>,
    default: 'dark',
  },
  visible: { type: Boolean },
  enterable: {
    type: Boolean,
    default: true,
  },
  pure: { type: Boolean },
  focusOnShow: {
    type: Boolean,
    default: false,
  },
  trapping: {
    type: Boolean,
    default: false,
  },
  popperClass: {
    type: [String, Array, Object] as PropType<ClassType>,
  },
  popperStyle: {
    type: [String, Array, Object] as PropType<StyleValue>,
  },
  referenceEl: {
    type: Object as PropType<HTMLElement>,
  },
  triggerTargetEl: {
    type: Object as PropType<HTMLElement>,
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true,
  },
  virtualTriggering: { type: Boolean },
  zIndex: { type: Number },
  ...useAriaProps(['ariaLabel']),
};
export type PopperContentProps = ExtractPropTypes<typeof popperContentProps>;

export const popperContentEmits = {
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  focus: () => true,
  blur: () => true,
  close: () => true,
};
export type PopperContentEmits = typeof popperContentEmits;

export type PopperContentInstance = InstanceType<typeof Content>;

/** @deprecated use `popperCoreConfigProps` instead, and it will be deprecated in the next major version */
export const usePopperCoreConfigProps = popperCoreConfigProps;

/** @deprecated use `popperContentProps` instead, and it will be deprecated in the next major version */
export const usePopperContentProps = popperContentProps;

/** @deprecated use `popperContentEmits` instead, and it will be deprecated in the next major version */
export const usePopperContentEmits = popperContentEmits;

/** @deprecated use `PopperCoreConfigProps` instead, and it will be deprecated in the next major version */
export type UsePopperCoreConfigProps = PopperCoreConfigProps;

/** @deprecated use `PopperContentProps` instead, and it will be deprecated in the next major version */
export type UsePopperContentProps = PopperContentProps;

/** @deprecated use `PopperContentInstance` instead, and it will be deprecated in the next major version */
export type ElPopperArrowContent = PopperContentInstance;
