import type { Ref } from "vue";

interface DropdownItemAttrType {
  command: string | number | object;
  [key: string]: any;
}

export interface DropdownItemType {
  attr?: DropdownItemAttrType;
  icon?: IconType;
  content: string;
}

interface DropdownIconType {
  prefixIcon?: string;
  suffixIcon?: string;
  isSvgIcon: boolean;
  size?: string;
  color?: string;
  style?: object;
}

export interface DropdownType {
  icon?: DropdownIconType;
  titleConfig?: CompType;
  attr?: Recordable;
  event?: Recordable;
  ref?: Ref<T>;
  items: Array<DropdownItemType>;
}
