import { isClient } from 'el-popover/utils';
import { onBeforeUnmount, onMounted } from 'vue';

let registeredEscapeHandlers: ((e: KeyboardEvent) => void)[] = [];

const cachedHandler = (e: Event) => {
  const event = e as KeyboardEvent;
  if (event.key === 'Escape') {
    registeredEscapeHandlers.forEach(registeredHandler =>
      registeredHandler(event),
    );
  }
};

export const useEscapeKeydown = (handler: (e: KeyboardEvent) => void) => {
  onMounted(() => {
    if (!isClient) return;

    if (registeredEscapeHandlers.length === 0) {
      document.addEventListener('keydown', cachedHandler);
    }
    registeredEscapeHandlers.push(handler);
  });

  onBeforeUnmount(() => {
    if (!isClient) return;

    registeredEscapeHandlers = registeredEscapeHandlers.filter(
      registeredHandler => registeredHandler !== handler,
    );
    if (registeredEscapeHandlers.length === 0) {
      document.removeEventListener('keydown', cachedHandler);
    }
  });
};
