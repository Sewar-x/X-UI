<template>
  <div v-if="isDef(isVisible) ? isVisible : true" class="icon-style">
    <XSvgIcon
      v-if="isSvgIcon"
      :name="name"
      :size="isNullOrUnDef(size) ? 14 : size"
      :style="style"
    />
    <el-icon
      v-else
      :color="color"
      :size="isNullOrUnDef(size) ? 14 : size"
      :style="style"
      v-bind="attr || {}"
    >
      <component :is="name" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { XSvgIcon } from "../index";
import type { Ref } from "vue";
import { isNullOrUnDef, isDef } from "../../../utils/is.ts";
const props = defineProps<{
  isVisible?: Ref<Boolean>;
  isSvgIcon: boolean;
  name: string;
  size?: number | string;
  color?: string;
  attr?: object;
  style?: object;
}>();
</script>

<style scoped lang="less">
.icon-style {
  display: flex;
  align-items: center;
}
</style>
