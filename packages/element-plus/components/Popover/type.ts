import type { Ref } from "vue";

export interface PopoverType {
  attr?: Recordable;
  event?: Recordable;
  ref?: Ref<T>;
  isShowPopover?: Ref<Boolean>;
  referenceSlot?: CompType;
  defaultSlot?: CompType;
}
