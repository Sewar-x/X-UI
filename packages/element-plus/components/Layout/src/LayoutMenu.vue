<template>
  <div
    v-if="layoutMode !== 'none'"
    class="layout-container"
    :class="[`layout-${layoutMode}-container`]">
    <SideMenu
      class="layout-side-menu"
      v-if="layoutMode === 'aside' || layoutMode === 'topAside'"
      :options="options">
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
            <slot name="topFooterLeft" />
            <div class="logout_area-dropdown-avator" v-show="showLogout">
              <el-dropdown divided>
                <slot name="avatarFilled">
                  <el-avatar :icon="UserFilled" />
                </slot>
                <template #dropdown>
                  <slot name="dropdownMenu">
                    <el-dropdown-menu>
                      <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </slot>
                </template>
              </el-dropdown>
            </div>
            <slot name="topFooterRight" />
          </template>
        </TopMenu>
      </el-header>
      <el-main class="layout-content-main">
        <slot name="viewer">
          <router-view />
        </slot>
      </el-main>
      <el-footer v-if="isShowFooter">
        <slot name="layout-content-footer" />
      </el-footer>
    </div>
  </div>
  <div v-else class="layout-container">
    <el-main class="layout-content-main">
      <slot name="viewer">
        <router-view />
      </slot>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import TopMenu from './TopMenu.vue';
import SideMenu from './SideMenu.vue';
import type { SideMenuType } from '../types';
import { computed } from 'vue';
import { UserFilled } from '@element-plus/icons-vue';
const emit = defineEmits(['logout']);

const props = defineProps<{
  options: SideMenuType;
}>();
const layoutMode = props.options.layoutMode;
const routeInst = props.options.routeInst;
if (!routeInst) {
  throw Error('请传入路由对象！');
}
const options = {
  routeInst,
  layoutMode,
  routes: props.options.routes,
  asyncRoutes: props.options.asyncRoutes,
  asyncSideRoutes: props.options.asyncSideRoutes,
  defaultActive: props.options.defaultActive,
  defaultSideActive: props.options.defaultSideActive,
};

let showLogout = computed(() => props.options.isShowLogout);
let isShowFooter = computed(() => props.options.isShowFooter);

const handleLogout = () => {
  emit('logout');
};
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
.logout_area-dropdown-avator {
  position: fixed;
  right: 20px;
  top: 10px;
  z-index: 999;
  width: 30px;
  height: 30px;
}
</style>
