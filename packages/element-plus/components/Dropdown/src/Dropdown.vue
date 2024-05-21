<template>
  <el-dropdown
    v-bind="options.attr"
    v-on="options.event || {}"
    :ref="options.ref"
    class="default-style"
  >
    <span class="el-dropdown-link">
      <XIcon
        v-if="options.XIcon?.prefixIcon"
        :isSvgIcon="options.XIcon?.isSvgIcon || false"
        :name="options.XIcon?.prefixIcon"
        :size="options.XIcon?.size"
        :color="options.XIcon?.color"
        :style="options.XIcon?.style"
      />
      <slot>
        <BasicComponent v-if="options.titleConfig" :options="options.titleConfig" />
      </slot>
      <XIcon
        v-if="options.XIcon?.suffixIcon"
        :isSvgIcon="options.XIcon?.isSvgIcon || false"
        :name="options.XIcon?.suffixIcon"
        :size="options.XIcon?.size"
        :color="options.XIcon?.color"
        :style="options.XIcon?.style"
      />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) of options.itemArr"
          :key="index"
          v-bind="item.attr"
        >
          <XIcon
            v-if="item.XIcon"
            :isSvgIcon="item.XIcon.isSvgIcon || false"
            :name="item.XIcon.name"
            :size="item.XIcon.size"
            :color="item.XIcon.color"
            :style="item.XIcon.style"
          />
          <BasicComponent
            v-if="basicCompoType(item)"
            :options="(item.content as CompType)"
          />
          <span v-else>{{ item.content }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import type { DropdownType } from "../type";
import { XIcon } from "../../Icon";
import BasicComponent from "../../BasicComponent";

defineProps<{
  options: DropdownType;
}>();

//组件类型判断
function basicCompoType(comp: CompType): Boolean {
  return typeof comp.content !== "string";
}
</script>

<style scoped lang="less">
span {
  display: flex;
}

.default-style {
  cursor: pointer;
}
</style>
