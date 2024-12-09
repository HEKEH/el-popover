import { computed, onBeforeUnmount, ref, shallowRef, unref, watch } from 'vue';
import { createPopper } from '@popperjs/core';

import type { Ref } from 'vue';
import type {
  Instance,
  Modifier,
  Options,
  State,
  VirtualElement,
} from '@popperjs/core';
import { keysOf } from '../utils';

type ElementType = HTMLElement | undefined;
type ReferenceElement = ElementType | VirtualElement;
export type PartialOptions = Partial<Options>;

export const usePopper = (
  referenceElementRef: Ref<ReferenceElement>,
  popperElementRef: Ref<ElementType>,
  opts: Ref<PartialOptions> | PartialOptions = {} as PartialOptions,
) => {
  const stateUpdater = {
    name: 'updateState',
    enabled: true,
    phase: 'write',
    fn: ({ state }) => {
      const derivedState = deriveState(state);

      Object.assign(states.value, derivedState);
    },
    requires: ['computeStyles'],
  } as Modifier<'updateState', any>;

  const options = computed<Options>(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = unref(opts);

    return {
      onFirstUpdate,
      placement: placement || 'bottom',
      strategy: strategy || 'absolute',
      modifiers: [
        ...(modifiers || []),
        stateUpdater,
        { name: 'applyStyles', enabled: false },
      ],
    };
  });

  const popperInstanceRef = shallowRef<Instance | undefined>();
  const states = ref<Pick<State, 'styles' | 'attributes'>>({
    styles: {
      popper: {
        position: unref(options).strategy,
        left: '0',
        top: '0',
      },
      arrow: {
        position: 'absolute',
      },
    },
    attributes: {},
  });

  const destroy = () => {
    if (!popperInstanceRef.value) return;

    popperInstanceRef.value.destroy();
    popperInstanceRef.value = undefined;
  };

  watch(
    options,
    newOptions => {
      const instance = unref(popperInstanceRef);
      if (instance) {
        instance.setOptions(newOptions);
      }
    },
    {
      deep: true,
    },
  );

  watch(
    [referenceElementRef, popperElementRef],
    ([referenceElement, popperElement]) => {
      destroy();
      if (!referenceElement || !popperElement) return;

      popperInstanceRef.value = createPopper(
        referenceElement,
        popperElement,
        unref(options),
      );
    },
  );

  onBeforeUnmount(() => {
    destroy();
  });

  return {
    state: computed(() => ({ ...(unref(popperInstanceRef)?.state || {}) })),
    styles: computed(() => unref(states).styles),
    attributes: computed(() => unref(states).attributes),
    update: () => unref(popperInstanceRef)?.update(),
    forceUpdate: () => unref(popperInstanceRef)?.forceUpdate(),
    // Preventing end users from modifying the instance.
    instanceRef: computed(() => unref(popperInstanceRef)),
  };
};

function deriveState(state: State) {
  const elements = keysOf(state.elements);
  type ElementTypes = (typeof elements)[number];

  const styles = Object.fromEntries(
    elements.map(element => [element, state.styles[element] || {}] as const),
  ) as {
    [k in ElementTypes]: Partial<CSSStyleDeclaration>;
  };

  const attributes = Object.fromEntries(
    elements.map(element => [element, state.attributes[element]] as const),
  ) as {
    [k in ElementTypes]?: {
      [key: string]: string | boolean;
    };
  };

  return {
    styles,
    attributes,
  };
}

export type UsePopperReturn = ReturnType<typeof usePopper>;
