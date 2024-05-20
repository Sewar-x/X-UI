<template>
  <XMenu :options="options"></XMenu>
</template>

<script setup lang="ts">
import { XMenu } from "@/xw-ui/element-plus";
import { ref, reactive } from "vue";
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
// from 表单配置项
const options = {
  attr: {
    class: "el-menu-vertical-demo",
    "default-active": "2-1",
    "active-text-color": "#ffd04b",
  }, // el-menu的属性对象
  event: {
    open: () => {
      console.log("===打开侧边栏===");
    },
    close: () => {
      console.log("===关闭侧边栏===");
    },
  }, // el-menu的事件对象
  ref: ref(), // el-menu组件的实例对象
  menu: [
    // el-menu-item
    {
      attr: {
        index: "1",
      }, // el-menu-item的属性对象
      event: {
        click: (inst) => {
          console.log("===您点击了===", inst);
        },
      }, // el-menu-item的事件对象
      icon: {
        name: Document, // 图标名
      },
      title: "导航一", // 菜单项文本内容
    },

    // el-sub-menu
    {
      attr: {
        index: "2",
      }, // el-menu-item的属性对象
      event: {
        click: (inst) => {
          console.log("===您点击了===", inst);
        },
      }, // el-menu-item的事件对象
      icon: {
        name: IconMenu, // 图标名
      },
      title: "导航二", // 菜单项文本内容
      subMenu: [
        // 2
        // el-menu-item
        {
          attr: {
            index: "2-1",
          },
          icon: {
            name: Location,
          },
          title: "导航 2-1 ",
        },
        // el-sub-menu
        {
          attr: {
            index: "2-2",
          },
          icon: {
            name: Setting,
          },
          title: "导航 2-2 ",
        },
      ], // 2
    }, // *
    // el-sub-menu
    {
      attr: {
        index: "3",
      }, // el-menu-item的属性对象
      event: {
        click: (inst) => {
          console.log("===您点击了===", inst);
        },
      }, // el-menu-item的事件对象
      icon: {
        name: Setting, // 图标名
      },
      title: "导航三", // 菜单项文本内容
      subMenu: [
        // 2
        // el-menu-item
        {
          attr: {
            index: "3-1",
          },
          icon: {
            name: Location,
          },
          title: "导航 3-1 ",
        },
        // el-sub-menu
        {
          attr: {
            index: "3-2",
          },
          icon: {
            name: Setting,
          },
          title: "导航 3-2 ",
          subMenu: [
            // 3
            // el-menu-item
            {
              attr: {
                index: "3-2-1",
              },
              event: {},
              icon: {
                name: Setting,
              },
              title: "导航 3-2-1 ",
            },
          ], // 3
        },
      ], // 2
    }, // *
  ],
};
</script>

<style scoped lang="less"></style>
