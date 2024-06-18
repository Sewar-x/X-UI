<template>
  <LayoutMenu :options="options">
    <template #sideHeader>
      <img class="logo" :src="Logo" />
    </template>
    <template #sideFooter>
      <img class="logo" :src="Logo" />
    </template>
  </LayoutMenu>
</template>

<script setup lang="ts">
import { LayoutMenu } from "@/xw-ui/element-plus";
import Logo from "../assets/logo.svg";
import routes from "./routes.js";

const options = {
  layoutMode: "topAside",
  routes,
  asyncRoutes: [],
  asyncSideRoutes: [],
  defaultActive: "", //authMenus
};
</script>

<style scoped lang="less">
.logo {
  height: 60px;
}
</style>
