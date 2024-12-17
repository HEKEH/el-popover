import ElPopperArrow from './src/arrow.vue';

import ElPopperContent from './src/content.vue';
import ElPopper from './src/popper.vue';
import ElPopperTrigger from './src/trigger.vue';

export { ElPopper, ElPopperArrow, ElPopperContent, ElPopperTrigger };

export default ElPopper;

export * from './src/arrow';
export * from './src/constants';
export * from './src/content';
export * from './src/popper';
export * from './src/trigger';

/** need to export these types, or projects using this library will report a ts-plugin(4023) type error */
export type {
  Instance,
  Modifier,
  Options,
  Placement,
  State,
} from '@popperjs/core';
