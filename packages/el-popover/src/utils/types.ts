export { isClient } from '@vueuse/core';

export function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}
export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean';
}

export function isNil(val: unknown): val is null | undefined {
  return val === null || val === undefined;
}

export function isArray(val: unknown): val is Array<any> {
  return Array.isArray(val);
}
export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

// eslint-disable-next-line ts/no-unsafe-function-type
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isObject(val: unknown): val is Record<string, any> {
  return val !== null && typeof val === 'object';
}

export function isStringNumber(val: string): boolean {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
}
