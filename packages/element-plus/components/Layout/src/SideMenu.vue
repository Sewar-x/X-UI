<template>
  <XMenu key="sideMenu" :options="config">
    <template #header>
      <slot name="header" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </XMenu>
</template>

<script setup lang="ts">
import { XMenu } from "../../Menu";
import { useMenu } from "../hooks/useMenu.ts";
import { computed } from "vue";
import type { SideMenuType } from "../types.d";

const props = defineProps<{
  options: SideMenuType;
}>();

const { sideMenuOptions } = useMenu({
  type: "side",
  routeInst: props.options.routeInst,
  layoutMode: props.options.layoutMode,
  routes: props.options.routes,
  asyncRoutes: props.options.asyncRoutes,
  asyncSideRoutes: props.options.asyncSideRoutes,
  defaultActive: props.options.defaultActive,
});

const config = computed(() => sideMenuOptions.value);
</script>

<style scoped lang="less">
.logo {
  width: 120px;
}
</style>
