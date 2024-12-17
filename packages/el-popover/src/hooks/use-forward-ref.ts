import type { InjectionKey, ObjectDirective, Ref } from 'vue';

import { provide } from 'vue';

type ForwardRefSetter = <T>(el: T) => void;

export interface ForwardRefInjectionContext {
  setForwardRef: ForwardRefSetter;
}

export const FORWARD_REF_INJECTION_KEY: InjectionKey<ForwardRefInjectionContext> =
  Symbol('elForwardRef');

export function useForwardRef<T>(forwardRef: Ref<T | null>) {
  const setForwardRef = (el: T) => {
    forwardRef.value = el;
  };

  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef,
  } as ForwardRefInjectionContext);
}

export function useForwardRefDirective(
  setForwardRef: ForwardRefSetter,
): ObjectDirective {
  return {
    mounted(el) {
      setForwardRef(el);
    },
    updated(el) {
      setForwardRef(el);
    },
    unmounted() {
      setForwardRef(null);
    },
  };
}
