<template>
  <div v-if="isDef(isVisible) ? isVisible : true" class="icon-style">
    <XSvgIcon
      v-if="isSvgIcon"
      :name="name"
      :size="isNullOrUnDef(size) ? size : 14"
      :style="style"
    />
    <el-icon v-else :color="color" :size="isNullOrUnDef(size) ? size : 14" :style="style">
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
  style?: object;
}>();
</script>

<style scoped lang="less">
.icon-style {
  display: flex;
  align-items: center;
}
</style>
