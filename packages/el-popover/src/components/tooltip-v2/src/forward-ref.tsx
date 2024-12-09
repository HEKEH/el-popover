import { Fragment, defineComponent } from 'vue';

import type { ExtractPropTypes, PropType, VNodeArrayChildren } from 'vue';
import { isArray } from 'el-popover/utils';

export type RefSetter = (el: HTMLElement | null) => void;

export const forwardRefProps = {
  setRef: {
    type: Function as PropType<RefSetter>,
    required: true,
  },
  onlyChild: {
    type: Boolean,
    default: false,
  },
} as const;

export type ForwardRefProps = ExtractPropTypes<typeof forwardRefProps>;

const ensureOnlyChild = (children: VNodeArrayChildren | undefined) => {
  if (!isArray(children) || children.length > 1) {
    throw new Error('expect to receive a single Vue element child');
  }
  return children[0];
};

const ForwardRef = defineComponent({
  name: 'ForwardRef',
  props: forwardRefProps,
  setup(props, { slots }) {
    const setRef = (el: HTMLElement | null) => {
      // vue fragments is represented as a text element.
      // The first element sibling should be the first element children of fragment.
      // This is how we get the element.
      if (el) {
        props.setRef(el.nextElementSibling as HTMLElement | null);
      } else {
        props.setRef(null);
      }
    };
    return () => {
      const [firstChild] = slots.default?.() || [];
      const child = props.onlyChild
        ? ensureOnlyChild(firstChild?.children as VNodeArrayChildren)
        : firstChild?.children;
      return <Fragment ref={setRef as any}>{child}</Fragment>;
    };
  },
});

export default ForwardRef;
