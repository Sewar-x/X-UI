<template>
  <el-menu
    v-bind="options.attr"
    v-on="options.event || {}"
    :ref="options.ref"
    :collapse="isCollapse"
  >
    <div class="menu-header-collapse-container" :class="{ 'menu-collapsed': isCollapse }">
      <div class="menu-header" v-if="!isCollapse">
        <slot name="header" />
      </div>
      <div
        class="menu-collapse"
        v-if="isDef(options.collapse)"
        :class="options.collapse.class"
      >
        <XIcon
          class="menu-collapse-icon"
          v-if="collapseType === 'Icon'"
          :isSvgIcon="false"
          :name="isCollapse ? options.collapse?.colseIcon : options.collapse?.showIcon"
          :color="options.collapse?.color"
          :size="options.collapse?.size || 30"
          :style="options.collapse?.style"
          @click="handleCollapse"
        />
        <BasicComponent v-if="collapseType === 'Component'" :options="options.collapse" />
      </div>
    </div>

    <XMenuItem
      v-for="menuItem in options.menu"
      :key="menuItem.attr?.index"
      :options="menuItem"
    />
    <div class="menu-footer" v-if="!isCollapse">
      <slot name="footer" />
    </div>
  </el-menu>
</template>

<script setup lang="ts">
import type { MenuType } from "../type";
import { XMenuItem } from "..";
import { XIcon } from "../../Icon";
import { ref, toRef } from "vue";
import { isDef } from "../../../utils/is.ts";

const props = defineProps<{
  options: MenuType;
}>();
const collapseType = props.options.collapse?.type ? props.options.collapse?.type : "Icon";

let isCollapse = ref(false);
if (props.options?.attr && props.options?.attr.hasOwnProperty("collapse")) {
  isCollapse = toRef(props.options.attr.collapse);
}

function handleCollapse() {
  isCollapse.value = !isCollapse.value;
}
</script>

<style scoped lang="less">
.menu-header-collapse-container {
  display: flex;
  justify-content: space-between;
}
.menu-collapsed {
  display: flex;
  justify-items: center;
  justify-content: center;
}

.menu-collapse {
  display: flex;
  .menu-collapse-icon {
    cursor: pointer;
    margin-right: 5px;
  }
}
</style>
