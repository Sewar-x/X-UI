<template>
  <el-descriptions v-bind="options.attr" v-on="options.event || {}" :ref="options.ref">
    <template #title v-if="options.titleSlotName || options.titleSlotConfig">
      <slot v-if="options.titleSlotConfig">
        <BasicComponent :options="options.titleSlotConfig" />
      </slot>
      <slot v-if="options.titleSlotName" :name="options.titleSlotName"></slot>
    </template>
    <template #extra v-if="options.extraSlotName || options.extraSlotConfig">
      <slot v-if="options.extraSlotConfig">
        <BasicComponent :options="options.extraSlotConfig" />
      </slot>
      <slot v-if="options.extraSlotName" :name="options.extraSlotName"></slot>
    </template>
    <el-descriptions-item
      v-for="(descriptionsItem, index) of options.itemArr"
      :key="index + `${descriptionsItem.attr?.label}`"
      v-bind="descriptionsItem.attr"
      v-on="descriptionsItem.event || {}"
    >
      <template
        #label
        v-if="descriptionsItem.labelSlotName || descriptionsItem.labelSlotConfig"
      >
        <slot v-if="descriptionsItem.labelSlotConfig">
          <BasicComponent :options="descriptionsItem.labelSlotConfig" />
        </slot>
        <slot
          v-if="descriptionsItem.labelSlotName"
          :name="descriptionsItem.labelSlotName"
        ></slot>
      </template>
      <template #default>
        <BasicComponent
          v-if="descriptionsItem.defaultSlotConfig"
          :options="descriptionsItem.defaultSlotConfig"
        />
        <slot
          v-if="descriptionsItem.defaultSlotName"
          :name="descriptionsItem.defaultSlotName"
        ></slot>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
import type { DescriptionsType } from "../type";

defineProps<{
  options: DescriptionsType;
}>();
</script>

<style scoped lang="less"></style>
