export { isClient } from '@vueuse/core';
export { isString, isFunction, isObject } from '@vue/shared';

export const isNumber = (val: unknown): val is number =>
  typeof val === 'number';
export const isBoolean = (val: unknown): val is boolean =>
  typeof val === 'boolean';

export const isNil = (val: unknown): val is null | undefined =>
  val === null || val === undefined;
