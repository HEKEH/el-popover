import type { Arrayable } from 'el-popover/types';
import type { Ref } from 'vue';
import type { TooltipTriggerType } from './trigger';
import { isArray } from 'el-popover/utils';
import { unref } from 'vue';

export function isTriggerType(
  trigger: Arrayable<TooltipTriggerType>,
  type: TooltipTriggerType,
) {
  if (isArray(trigger)) {
    return trigger.includes(type);
  }
  return trigger === type;
}

export function whenTrigger(
  trigger: Ref<Arrayable<TooltipTriggerType>>,
  type: TooltipTriggerType,
  handler: (e: Event) => void,
) {
  return (e: Event) => {
    isTriggerType(unref(trigger), type) && handler(e);
  };
}
