import ElPopper from './src/popper.vue';

import ElPopperArrow from './src/arrow.vue';
import ElPopperTrigger from './src/trigger.vue';
import ElPopperContent from './src/content.vue';

export { ElPopper, ElPopperArrow, ElPopperTrigger, ElPopperContent };

export default ElPopper;

export * from './src/popper';
export * from './src/trigger';
export * from './src/content';
export * from './src/arrow';
export * from './src/constants';

/** need to export these types, or projects using this library will report a ts-plugin(4023) type error */
export type {
  Placement,
  Options,
  Instance,
  Modifier,
  State,
} from '@popperjs/core';
