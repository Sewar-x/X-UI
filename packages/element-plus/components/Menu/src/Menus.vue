<template>
  <el-menu
    v-bind="options.attr"
    v-on="options.event || {}"
    :ref="options.ref"
    :collapse="isCollapse"
    :class="prefixCls"
  >
    <div :class="[`${prefixCls}-header`, { [`${prefixCls}-header_closed`]: isCollapse }]">
      <div :class="[`${prefixCls}-header_slot`]" v-if="!isCollapse">
        <slot name="header" />
      </div>
      <div
        :class="[`${prefixCls}-header_collapse`, options.collapse.class]"
        v-if="isDef(options.collapse)"
      >
        <XIcon
          :class="[`${prefixCls}-header_collapse_icon`]"
          v-if="collapseType === 'Icon'"
          :isSvgIcon="false"
          :name="isCollapse ? options.collapse?.colseIcon : options.collapse?.showIcon"
          :color="options.collapse?.color"
          :size="options.collapse?.size || 30"
          :style="options.collapse?.style"
          @click="handleCollapse"
        />
        <BasicComponent
          :class="[`${prefixCls}-header_collapse_component`]"
          v-if="collapseType === 'Component'"
          :options="options.collapse"
        />
      </div>
    </div>

    <XMenuItem
      v-for="menuItem in options.menu"
      :key="menuItem.attr?.index"
      :options="menuItem"
    />
    <div :class="[`${prefixCls}-footer`]" v-if="!isCollapse">
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
import { useDesign } from "../../../hooks/useDesign";

const props = defineProps<{
  options: MenuType;
}>();

const { getPrefixCls } = useDesign();

const prefixCls = getPrefixCls("menus");
const collapseType = props.options.collapse?.type ? props.options.collapse?.type : "Icon";

let isCollapse = ref(false);
if (props.options?.attr && props.options?.attr.hasOwnProperty("collapse")) {
  isCollapse = toRef(props.options.attr.collapse);
}

function handleCollapse() {
  isCollapse.value = !isCollapse.value;
}
</script>

<style lang="less">
@prefix-cls: ~"@{XWUINamespace}-menus";

.@{prefix-cls}-header {
  display: flex;
  justify-content: space-between;
  &_collapse {
    display: flex;
    justify-items: center;
    justify-content: center;
    &_icon {
      cursor: pointer;
      margin-right: 5px;
    }
  }
  &_closed {
    display: flex;
    justify-items: center;
    justify-content: center;
  }
}
</style>
