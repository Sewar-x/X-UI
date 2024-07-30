<template>
  <LayoutMenu :options="options" @logout="logout">
    <template #avatarFilled>
      <el-avatar> user </el-avatar>
    </template>
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
import { useRouter } from "vue-router";
const router = useRouter();
const options = {
  routeInst: router,
  layoutMode: "topAside",
  routes,
  asyncRoutes: [],
  asyncSideRoutes: [],
  defaultActive: "", //authMenus
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
