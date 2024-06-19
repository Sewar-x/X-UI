<template>
  <div class="container">
    <div>
      <XDropdown :options="options1"></XDropdown>
    </div>

    <div>
      <XDropdown :options="options2">
        <el-button type="primary">
          标题使用插槽下拉<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
      </XDropdown>
    </div>

    <div>
      <XDropdown :options="options3">
        <el-button type="primary">
          下拉项使用插槽下拉<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropDownItem1Slot> 下拉1 </template>
        <template #dropDownItem2Slot> 下拉2 </template>
      </XDropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { XDropdown } from "@/xw-ui/element-plus";
import {
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from "@element-plus/icons-vue";
const options1 = {
  attr: {
    placement: "bottom",
    trigger: "click",
  },
  event: {
    command: (params: any) => {
      console.log("==点击菜单项触发的事件回调==", params);
    },
  },
  ref: ref(),
  icon: {
    prefixIcon: CirclePlusFilled,
    suffixIcon: ArrowDown,
    size: 16,
  },
  title: "标题使用配置下拉",
  items: [
    {
      attr: {
        icon: ArrowDown,
        command: {
          operate: "下拉菜单1",
        },
      },
      content: "下拉菜单1",
    },
    {
      attr: {
        icon: Check,
        command: {
          operate: "下拉菜单2",
        },
      },
      content: "下拉菜单2",
    },
    {
      attr: {
        icon: CircleCheck,
      },
      content: "下拉菜单3",
    },
    {
      attr: {
        icon: CirclePlus,
      },
      content: "下拉菜单4",
    },
    {
      attr: {
        icon: CirclePlusFilled,
      },
      content: "下拉菜单5",
    },
    {
      attr: {
        icon: Plus,
      },
      content: "下拉菜单6",
    },
  ],
};

const options2 = {
  attr: {
    placement: "bottom",
    trigger: "click",
  },
  event: {
    command: (params: any) => {
      console.log("==点击菜单项触发的事件回调==", params);
    },
  },
  ref: ref(),

  items: [
    {
      attr: {
        icon: ArrowDown,
        command: {
          operate: "下拉菜单1",
        },
      },
      content: "下拉菜单1",
    },
    {
      attr: {
        icon: Check,
        command: {
          operate: "下拉菜单2",
        },
      },
      content: "下拉菜单2",
    },
  ],
};

const options3 = {
  attr: {
    placement: "bottom",
    trigger: "click",
  },
  event: {
    command: (params: any) => {
      console.log("==点击菜单项触发的事件回调==", params);
    },
  },
  ref: ref(),

  items: [
    {
      attr: {
        icon: ArrowDown,
        command: {
          operate: "下拉菜单1",
        },
      },
      slot: "dropDownItem1Slot",
    },
    {
      attr: {
        icon: Check,
        command: {
          operate: "下拉菜单2",
        },
      },
      slot: "dropDownItem2Slot",
    },
  ],
};
</script>
<style scoped lang="less">
.container {
  display: flex;
  justify-content: space-between;
}
</style>
