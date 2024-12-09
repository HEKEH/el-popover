import { defineComponent, inject, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ElPopper from '../src/popper.vue';
import { POPPER_INJECTION_KEY } from '../src/constants';

const AXIOM = 'rem is the best girl';

const TestChild = defineComponent({
  setup() {
    const { contentRef } = inject(POPPER_INJECTION_KEY, undefined)!;
    return () => <div ref={contentRef}>{AXIOM}</div>;
  },
});

describe('<ElPopper />', () => {
  it('should be able to provide instance to its children', async () => {
    const wrapper = mount(
      <ElPopper>
        <TestChild />
      </ElPopper>,
    );

    await nextTick();

    const contentRef = wrapper.vm.contentRef as any;

    expect(contentRef).not.toBe(null);
    expect(contentRef!.innerHTML).toBe(AXIOM);
  });
});
