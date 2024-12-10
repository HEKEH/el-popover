export { isClient } from '@vueuse/core';

export const isNumber = (val: unknown): val is number =>
  typeof val === 'number';
export const isBoolean = (val: unknown): val is boolean =>
  typeof val === 'boolean';

export const isNil = (val: unknown): val is null | undefined =>
  val === null || val === undefined;

export const isArray = (val: unknown): val is Array<any> => {
  return Array.isArray(val);
};
export const isString = (val: unknown): val is string =>
  typeof val === 'string';

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function';

export const isObject = (val: unknown): val is Record<string, any> =>
  val !== null && typeof val === 'object';

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};
