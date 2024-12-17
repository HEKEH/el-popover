import { isClient } from 'el-popover/utils';
import { computed, onBeforeMount } from 'vue';
import { useIdInjection } from './use-id';
import { useGetDerivedNamespace } from './use-namespace';

export function usePopperContainerId() {
  const namespace = useGetDerivedNamespace();
  const idInjection = useIdInjection();

  const id = computed(() => {
    return `${namespace.value}-popper-container-${idInjection.prefix}`;
  });
  const selector = computed(() => `#${id.value}`);

  return {
    id,
    selector,
  };
}

function createContainer(id: string) {
  const container = document.createElement('div');
  container.id = id;
  document.body.appendChild(container);
  return container;
}

export function usePopperContainer() {
  const { id, selector } = usePopperContainerId();
  onBeforeMount(() => {
    if (!isClient) {
      return;
    }

    // This is for bypassing the error that when under testing env, we often encounter
    // document.body.innerHTML = '' situation
    // for this we need to disable the caching since it's not really needed
    if (
      // eslint-disable-next-line node/prefer-global/process
      process.env.NODE_ENV === 'test' ||
      !document.body.querySelector(selector.value)
    ) {
      createContainer(id.value);
    }
  });

  return {
    id,
    selector,
  };
}
