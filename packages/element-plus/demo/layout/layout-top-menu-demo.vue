<template>
  <LayoutMenu :options="options">
    <template #topHeader>
      <img class="logo" :src="Logo" />
    </template>
    <template #topFooter>
      <img class="logo" :src="Logo" />
    </template>
  </LayoutMenu>
</template>

<script setup lang="ts">
import { LayoutMenu } from "@/xw-ui/element-plus";
import Logo from "../assets/logo.svg";
import routes from "./routes.js";

const options = {
  layoutMode: "top",
  routes,
  asyncRoutes: [],
  asyncSideRoutes: [],
  defaultActive: "",
};
</script>

<style scoped lang="less">
.logo {
  height: 60px;
}
</style>
