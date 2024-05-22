<template>
  <el-descriptions v-bind="options.attr" v-on="options.event || {}" :ref="options.ref">
    <template #default v-if="isDef(options.defaultSlot)">
      <BasicComponent
        v-if="isObject(options.defaultSlot)"
        :options="options.defaultSlot"
      />
      <slot v-if="isString(options.defaultSlot)" :name="options.defaultSlot"></slot>
    </template>
    <template #title v-if="isDef(options.titleSlot)">
      <BasicComponent v-if="isObject(options.titleSlot)" :options="options.titleSlot" />
      <slot v-if="isString(options.titleSlot)" :name="options.titleSlot"></slot>
    </template>
    <template #extra v-if="isDef(options.extraSlot)">
      <BasicComponent v-if="isObject(options.extraSlot)" :options="options.extraSlot" />
      <slot v-if="isString(options.extraSlot)" :name="options.extraSlot"></slot>
    </template>
    <el-descriptions-item
      v-for="(descriptionsItem, index) of options.items"
      :key="index + `${descriptionsItem.attr?.label}`"
      v-bind="descriptionsItem.attr"
      v-on="descriptionsItem.event || {}"
    >
      <template #label v-if="isDef(descriptionsItem.labelSlot)">
        <BasicComponent
          v-if="isObject(descriptionsItem.labelSlot)"
          :options="descriptionsItem.labelSlot"
        />
        <slot
          v-if="isString(descriptionsItem.labelSlot)"
          :name="descriptionsItem.labelSlot"
        ></slot>
      </template>
      <template #default>
        <BasicComponent
          v-if="isObject(descriptionsItem.defaultSlot)"
          :options="descriptionsItem.defaultSlot"
        />
        <slot
          v-if="isString(descriptionsItem.defaultSlot)"
          :name="descriptionsItem.defaultSlot"
        ></slot>
        <span> {{ descriptionsItem.text || descriptionsItem?.attr?.text }}</span>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import type { DescriptionsType } from "../type";
import BasicComponent from "../../BasicComponent";
import { isString, isEmpty, isObject, isDef } from "../../../utils/is.ts";

const props = defineProps<{
  options: DescriptionsType;
}>();
</script>

<style scoped lang="less"></style>
