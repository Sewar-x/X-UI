<template>
  <el-aside
    v-if="mode === 'vertical'"
    :width="isCollapse ? closeWidth : opendWidth"
    class="aside"
  >
    <Menus :options="options" @collapse="handleCollapse">
      <template #header>
        <slot name="header" />
      </template>
      <template #footer>
        <slot name="footer" />
      </template>
    </Menus>
  </el-aside>
  <el-header v-if="mode === 'horizontal'">
    <Menus :options="options">
      <template #header>
        <slot name="header" />
      </template>
      <template #footer>
        <slot name="footer" />
      </template>
    </Menus>
  </el-header>
</template>

<script setup lang="ts">
import type { MenuType } from "../type";
import { ref, toRef } from "vue";
import { isDef } from "../../../utils/is.ts";
import Menus from "./Menus.vue";
const emit = defineEmits(["collapse"]);
const props = defineProps<{
  options: MenuType;
}>();

let isCollapse = ref(false);
if (props.options?.attr && props.options?.attr.hasOwnProperty("collapse")) {
  isCollapse = toRef(props.options.attr.collapse);
}

const opendWidth = props.options?.collapse?.opendWidth
  ? `${props.options?.collapse.opendWidth}px`
  : "240px";
const closeWidth = props.options?.collapse?.closeWidth
  ? `${props.options?.collapse.closeWidth}px`
  : "80px";

const mode = props.options?.attr?.mode ? props.options?.attr?.mode : "vertical";

function handleCollapse(status: boolean) {
  isCollapse.value = status;
  emit("collapse", isCollapse.value);
}
</script>

<style scoped lang="less"></style>
