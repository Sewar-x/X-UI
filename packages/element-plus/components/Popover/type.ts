import type { Ref } from "vue";

export interface PopoverType {
  attr?: Recordable;
  event?: Recordable;
  ref?: Ref<T>;
  isShowPopover?: Ref<Boolean>;
  referenceSlotConfig?: CompType;
  referenceSlotName?: String;
  defaultSlotConfig?: CompType;
  defaultSlotName?: String;
}
