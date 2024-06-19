<template>
  <el-dropdown
    v-bind="options.attr"
    v-on="options.event || {}"
    :ref="options.ref"
    :class="[`${prefixCls}`]"
  >
    <span :class="[`${prefixCls}-link`]">
      <XIcon
        v-if="options.icon?.prefixIcon"
        :isSvgIcon="options.icon?.isSvgIcon || false"
        :name="options.icon?.prefixIcon"
        :size="options.icon?.size"
        :color="options.icon?.color"
        :style="options.icon?.style"
      />
      <span :class="[`${prefixCls}-text-container`]">
        <slot
          v-if="isNullOrUnDef(options.title)"
          :class="[`${prefixCls}-text-container_slot`]"
        />
        <span
          v-else-if="isString(options.title)"
          :class="[`${prefixCls}-text-container_text`]"
          >{{ options.title }}</span
        >
        <BasicComponent v-else :options="options.title" />
      </span>
      <XIcon
        v-if="options.icon?.suffixIcon"
        :isSvgIcon="options.icon?.isSvgIcon || false"
        :name="options.icon?.suffixIcon"
        :size="options.icon?.size"
        :color="options.icon?.color"
        :style="options.icon?.style"
      />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) of options.items"
          :key="index"
          v-bind="item.attr"
        >
          <XIcon
            v-if="item.icon"
            :isSvgIcon="item.icon.isSvgIcon || false"
            :name="item.icon.name"
            :size="item.icon.size"
            :color="item.icon.color"
            :style="item.icon.style"
          />
          <span v-if="isString(item.content)">{{ item.content }}</span>
          <BasicComponent
            v-else-if="isDef(item.content) && isObject(item.content)"
            :options="(item.content as CompType)"
          />
          <slot v-if="isDef(item.slot) && isString(item.slot)" :name="item.slot" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import type { DropdownType } from "../type";
import { XIcon } from "../../Icon";
import BasicComponent from "../../BasicComponent";
import { useDesign } from "../../../hooks/useDesign";
import { isString, isNullOrUnDef, isObject, isDef } from "../../../utils/is";
const props = defineProps<{
  options: DropdownType;
}>();
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("dropdown");
</script>

<style scoped lang="less">
@prefix-cls: ~"@{XWUINamespace}-dropdown";
span {
  display: flex;
}
.@{prefix-cls} {
  cursor: pointer;
  &-link {
    display: flex;
  }
  &-text-container_text {
    font-size: 16px;
    color: black;
  }
}
</style>
