<template>
  <el-popover
    v-if="isNullOrUnDef(options.isShowPopover) ? options.isShowPopover.value : true"
    v-bind="options.attr"
    v-on="options.event || {}"
    :ref="options.ref"
  >
    <template #reference>
      <BasicComponent
        v-if="isObject(options.referenceSlot)"
        :options="options.referenceSlot"
      />
      <slot v-if="isString(options.referenceSlot)" :name="options.referenceSlot"></slot>
    </template>

    <template #default>
      <BasicComponent
        v-if="isObject(options.defaultSlot)"
        :options="options.defaultSlot"
      />
      <slot v-if="isString(options.defaultSlot)" :name="options.defaultSlot"></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import type { PopoverType } from "../type";
import { isString, isObject, isNullOrUnDef } from "../../../utils/is.ts";
defineProps<{
  options: PopoverType;
}>();
</script>

<style scoped lang="less"></style>
