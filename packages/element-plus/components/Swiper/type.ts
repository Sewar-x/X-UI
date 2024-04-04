import type { Ref } from "vue";

interface SwiperSlideType {
  attr?: Recordable;
  swiperSlideDefault?: CompType;
  isActiveSlotName?: String;
  isPrevSlotName?: String;
  isNextSlotName?: String;
  isVisibleSlotName?: String;
  isDuplicateSlotName?: String;
}

interface ButtonSlotConfig {
  attr?: Recordable;
  childNode?: CompType;
}

export interface SwiperType {
  attr?: Recordable;
  event?: Recordable;
  ref?: Ref<T>;
  swiperSlide: Array<SwiperSlideType>;
  containerStartSlotConfig?: CompType;
  containerStartSlotName?: string;
  containerEndSlotConfig?: CompType;
  containerEndSlotName?: string;
  wrapperStartSlotConfig?: CompType;
  wrapperStartSlotName?: string;
  wrapperEndSlotConfig?: CompType;
  wrapperEndSlotName?: string;
  buttonNextSlotConfig?: ButtonSlotConfig;
  buttonPrevSlotConfig?: ButtonSlotConfig;
}
