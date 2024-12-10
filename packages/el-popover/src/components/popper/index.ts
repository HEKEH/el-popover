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

export type { Placement, Options } from '@popperjs/core';
