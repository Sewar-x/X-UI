<template>
  <template v-if="options.buttonPrevSlot">
    <div v-bind="options.buttonPrevSlot.attr" slot="button-prev">
      <BasicComponent
        v-if="options.buttonPrevSlot.childNode"
        :options="options.buttonPrevSlot.childNode"
      />
    </div>
  </template>
  <template v-if="options.buttonNextSlot">
    <div v-bind="options.buttonNextSlot.attr" slot="button-next">
      <BasicComponent
        v-if="options.buttonNextSlot.childNode"
        :options="options.buttonNextSlot.childNode"
      />
    </div>
  </template>
  <swiper :ref="options.ref" v-bind="options.attr" v-on="options.event || {}">
    <template v-for="swiperSlideOption in options.swiperSlide">
      <swiper-slide v-if="swiperSlideOption.isActiveSlotName" v-slot="{ isActive }">
        <slot :name="swiperSlideOption.isActiveSlotName" :isActive="isActive"></slot>
      </swiper-slide>
      <swiper-slide v-else-if="swiperSlideOption.isPrevSlotName" v-slot="{ isPrev }">
        <slot :name="swiperSlideOption.isPrevSlotName" :isPrev="isPrev"></slot>
      </swiper-slide>
      <swiper-slide v-else-if="swiperSlideOption.isNextSlotName" v-slot="{ isNext }">
        <slot :name="swiperSlideOption.isNextSlotName" :isNext="isNext"></slot>
      </swiper-slide>
      <swiper-slide
        v-else-if="swiperSlideOption.isVisibleSlotName"
        v-slot="{ isVisible }"
      >
        <slot :name="swiperSlideOption.isVisibleSlotName" :isVisible="isVisible"></slot>
      </swiper-slide>
      <swiper-slide
        v-else-if="swiperSlideOption.isDuplicateSlotName"
        v-slot="{ isDuplicate }"
      >
        <slot
          :name="swiperSlideOption.isDuplicateSlotName"
          :isDuplicate="isDuplicate"
        ></slot>
      </swiper-slide>
      <swiper-slide v-else v-bind="swiperSlideOption.attr">
        <BasicComponent :options="swiperSlideOption.swiperSlideDefault" />
      </swiper-slide>
    </template>
    <template v-if="options.containerStartSlotConfig" #container-start>
      <BasicComponent :options="options.containerStartSlotConfig" />
    </template>
    <template v-if="options.containerEndSlotConfig" #container-end>
      <BasicComponent :options="options.containerEndSlotConfig" />
    </template>
    <template v-if="options.wrapperStartSlotConfig" #wrapper-start>
      <BasicComponent :options="options.wrapperStartSlotConfig" />
    </template>
    <template v-if="options.wrapperEndSlotConfig" #wrapper-end>
      <BasicComponent :options="options.wrapperEndSlotConfig" />
    </template>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import type { SwiperType } from "../type";
import "swiper/css/bundle";
import {
  isString,
  isEmpty,
  isObject,
  isDef,
  isUnDef,
  isNullOrUnDef,
  isBoolean,
  isArray,
} from "../../../utils/is.ts";
defineProps<{
  options: SwiperType;
}>();
</script>

<style scoped lang="less"></style>
