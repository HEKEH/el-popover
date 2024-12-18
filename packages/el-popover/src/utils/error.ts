import { isString } from './types';

class ElPopoverError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'ElementPlusError';
  }
}

export function throwError(scope: string, m: string): never {
  throw new ElPopoverError(`[${scope}] ${m}`);
}

export function debugWarn(err: Error): void;
export function debugWarn(scope: string, message: string): void;
export function debugWarn(scope: string | Error, message?: string): void {
  if (!import.meta.env.PROD) {
    const error: Error = isString(scope)
      ? new ElPopoverError(`[${scope}] ${message}`)
      : scope;
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}
