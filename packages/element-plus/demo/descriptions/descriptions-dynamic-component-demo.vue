<template>
  <XDescriptions :options="desOptions"></XDescriptions>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { XForm, XDescriptions, XPopover } from "@/xw-ui/element-plus";
import { ArrowLeft, ArrowRight, Delete, Edit, Share } from "@element-plus/icons-vue";
// 编辑状态
const isEdit = ref<boolean>(false);
// 响应式数据
const data = reactive({
  username: "sewen",
  telephone: "12315",
  place: "Suzhou",
  remarks: "School",
  address: "中国广东省",
});
// 图标
const icons = {
  username: ArrowLeft,
  telephone: ArrowRight,
  place: Delete,
  remarks: Edit,
  address: Share,
};
// xform 表单组件
const getInputComp = (key: string): array => {
  return [
    [
      {
        span: 20,
        attr: {
          prop: key,
          style: {
            "margin-bottom": "0px",
          },
        },
        component: {
          comp: "el-input",
          attr: {
            type: key === "address" ? "textarea" : "text",
            rows: 1,
          },
        },
      },
      {
        span: 4,
        attr: {
          style: {
            "margin-bottom": "0px",
          },
        },
        component: {
          comp: "el-button",
          attr: {
            style: {
              width: "100%",
            },
          },
          event: {
            click: function () {
              console.log("您提交了数据", data[key]);
              alert(`您提交了数据${data[key]}`);
            },
          },
          content: {
            text: "提交",
          },
        },
      },
    ],
  ];
};

// form 表单组件配置
const getFormOptions = (key: string): object => {
  return {
    comp: "div",
    children: [
      {
        comp: XForm,
        attr: {
          options: {
            mode: data,
            items: getInputComp(key),
          },
        },
      },
    ],
  };
};

// 描述列表项配置
const descriptionItem = Object.keys(data).map((key) => {
  return {
    labelSlot: {
      comp: "div",
      attr: { class: "cell-key" },
      children: [
        {
          comp: icons[key],
          attr: {
            width: 20,
          },
        },
      ],
      content: {
        text: key,
      },
    },
    defaultSlot: isEdit.value
      ? getFormOptions(key)
      : {
          comp: "span",
          content: {
            text: data[key],
            key: key,
          },
        },
  };
});

// 描述列表配置
const desOptions = {
  attr: {
    title: "Form表单描述列表",
    column: 3,
    border: true,
    style: {
      width: "80%",
      margin: "0 auto",
    },
  },
  extraSlot: {
    comp: "el-button",
    attr: {
      type: "primary",
    },
    event: {
      click: () => {
        isEdit.value = !isEdit.value;
        console.log("🚀 ~  isEdit.value:", isEdit.value);
      },
    },
    content: {
      text: isEdit.value ? "提交" : "编辑",
    },
  }, // 	自定义操作区配置对象或者操作区插槽名称，显示在右上方
  items: descriptionItem,
};
</script>

<style lang="less">
.cell-key {
  display: flex;
}
</style>
