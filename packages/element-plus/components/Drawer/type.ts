import type { Ref } from "vue";

export interface DrawerType {
  drawer: Ref<Boolean>;
  attr?: Recordable;
  event?: Recordable;
  ref?: Ref<T>;
  content?: Array<CompType>;
  defaultSlotName?: String;
  headerSlotConfig?: CompType;
  headerSlotName?: String;
  footerSlotConfig?: CompType;
  footerSlotName?: String;
}
