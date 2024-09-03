<template>
  <LayoutMenu :options="options">
    <template #avatarFilled>
      <el-avatar> user </el-avatar>
    </template>
    <template #dropdownMenu>
      <el-dropdown-menu>
        <el-dropdown-item @click="goHome">个人中心</el-dropdown-item>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
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
import { LayoutMenu } from "@/sewen-ui/element-plus";
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
  isShowLogout: true, //右侧添加下拉
};

function goHome() { 
}
function logout() { 
}
</script>

<style scoped lang="less">
.logo {
  height: 60px;
}
</style>
