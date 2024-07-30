<template>
  <LayoutMenu :options="options" @logout="logout">
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
import { useRouter } from "vue-router";
const router = useRouter();
const options = {
  routeInst: router,
  layoutMode: "top",
  routes,
  asyncRoutes: [],
  asyncSideRoutes: [],
  defaultActive: "",
  isShowLogout: true
};

function logout() {
  console.log("🚀 ~ logout ~ logout:")
}
</script>

<style scoped lang="less">
.logo {
  height: 60px;
}
</style>
