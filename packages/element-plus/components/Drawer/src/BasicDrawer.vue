<template>
  <el-drawer
    v-model="options.drawer"
    :ref="options.ref"
    v-bind="options.attr"
    v-on="options.event || {}"
  >
    <template #header v-if="options.headerSlotConfig || options.headerSlotName">
      <BasicComponent
        v-if="options.headerSlotConfig"
        :options="options.headerSlotConfig"
      />
      <slot v-if="options.headerSlotName" :name="options.headerSlotName"></slot>
    </template>
    <template v-if="options.content || options.defaultSlotName">
      <div v-if="options.content">
        <BasicComponent
          v-for="element of options.content"
          :key="element"
          :options="element"
        />
      </div>

      <slot v-if="options.defaultSlotName" :name="options.defaultSlotName"></slot>
    </template>
    <template #footer v-if="options.footerSlotConfig || options.footerSlotName">
      <BasicComponent
        v-if="options.footerSlotConfig"
        :options="options.footerSlotConfig"
      />
      <slot v-if="options.footerSlotName" :name="options.footerSlotName"></slot>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import type { DrawerType } from "../type";
import BasicComponent from "../../BasicComponent";
defineProps<{
  options: DrawerType;
}>();
</script>

<style scoped lang="less"></style>
