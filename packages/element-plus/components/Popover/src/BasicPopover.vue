<template>
  <el-popover
    v-if="
      typeof options.isShowPopover !== 'undefined' ? options.isShowPopover.value : true
    "
    v-bind="options.attr"
    v-on="options.event || {}"
    :ref="options.ref"
  >
    <template #reference>
      <BasicComponent
        v-if="options.referenceSlotConfig"
        :options="options.referenceSlotConfig"
      />
      <slot v-if="options.referenceSlotName" :name="options.referenceSlotName"></slot>
    </template>

    <template #default>
      <BasicComponent
        v-if="options.defaultSlotConfig"
        :options="options.defaultSlotConfig"
      />
      <slot v-if="options.defaultSlotName" :name="options.defaultSlotName"></slot>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import type { PopoverType } from "../type";

defineProps<{
  options: PopoverType;
}>();
</script>

<style scoped lang="less"></style>
