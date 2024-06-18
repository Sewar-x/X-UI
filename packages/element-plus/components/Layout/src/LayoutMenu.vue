<template>
  <div
    v-if="layoutMode !== 'none'"
    class="layout-container"
    :class="[`layout-${layoutMode}-container`]"
  >
    <SideMenu
      class="layout-side-menu"
      v-if="layoutMode === 'aside' || layoutMode === 'topAside'"
      :options="options"
    >
      <template #header>
        <slot name="sideHeader" />
      </template>
      <template #footer>
        <slot name="sideFooter" />
      </template>
    </SideMenu>
    <div class="layout-content-container">
      <el-header class="header" v-if="layoutMode === 'top' || layoutMode === 'topAside'">
        <TopMenu :options="options" class="layout-top-menu">
          <template #header>
            <slot name="topHeader" />
          </template>
          <template #footer>
            <slot name="topFooter" />
          </template>
        </TopMenu>
      </el-header>
      <el-main class="layout-content-main">
        <router-view />
      </el-main>
      <el-footer>
        <slot name="layout-content-footer" />
      </el-footer>
    </div>
  </div>
  <div v-else class="layout-container">
    <el-main class="layout-content-main">
      <router-view />
    </el-main>
  </div>
</template>

<script setup lang="ts">
import TopMenu from "./TopMenu.vue";
import SideMenu from "./SideMenu.vue";
import { useRouter } from "vue-router";
import type { SideMenuType } from "../types";
const props = defineProps<{
  options: SideMenuType;
}>();

const router = useRouter();
const options = {
  routeInst: router,
  layoutMode: props.options.layoutMode,
  routes: props.options.routes,
  asyncRoutes: props.options.asyncRoutes,
  asyncSideRoutes: props.options.asyncSideRoutes,
  defaultActive: props.options.defaultActive,
};

const layoutMode = props.options.layoutMode;
</script>

<style scoped lang="less">
.layout-container {
  height: 100%;
  :deep(.xw-ui-menus-header) {
    height: 60px;
  }
}
.layout-aside-container {
  display: flex;
  flex-direction: row;
  justify-content: start;
  .layout-content-container {
    width: 100%;
  }
}
.layout-top-container {
  .layout-content-container {
    display: flex;
    justify-content: start;
    flex-direction: column;
    height: 100%;
    .layout-content-main {
      height: 100%;
    }
  }
}
.layout-topAside-container {
  display: flex;
  .layout-content-container {
    width: 100%;
    .header {
      padding: 0;
      :deep(.el-header) {
        padding: 0;
      }
    }
  }
}
</style>
