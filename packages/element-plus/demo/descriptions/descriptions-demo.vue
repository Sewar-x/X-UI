<template>
  <XDescriptions :options="createDescriptions"></XDescriptions>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { XForm, XDescriptions, XPopover } from "@/xw-ui/element-plus";
const obj = reactive({
  username: "kooriookami",
  telephone: "18100000000",
  place: "Suzhou",
  remarks: "School",
  address: "No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province",
});

const testDialogVisible = ref<boolean>(false);

const icon = {
  username: ["user", "用户名"],
  telephone: ["iphone", "电话"],
  place: ["location", "所在城市"],
  remarks: ["tickets", "所在地点"],
  address: ["office-building", "详细地址"],
};

const descriptionItem = Object.keys(obj).map((item) => {
  return {
    labelSlotConfig: {
      comp: "div",
      attr: { class: "cell-item" },
      children: [
        {
          comp: "el-icon",
          attr: {
            style: {
              margin: "4.5px 6px 4.5px 0",
            },
            size: 16,
          },
          children: [{ comp: icon[item][0] }],
        },
      ],
      content: {
        text: item,
        attr: { style: { "text-transform": "capitalize" } },
      },
    },
    // defaultSlotConfig: {
    //   comp: "div",
    //   children: [
    //     {
    //       comp: "span",
    //       content: {
    //         text: obj,
    //         key: item,
    //       },
    //     },
    //     {
    //       comp: XPopover,
    //       attr: {
    //         popoverOption: {
    //           isShowPopover: testDialogVisible,
    //           attr: {
    //             trigger: "click",
    //             placement: "right",
    //             title: icon[item][1],
    //             width: "300px",
    //           },
    //           referenceSlotConfig: {
    //             comp: "el-icon",
    //             attr: {
    //               style: {
    //                 "margin-left": "6px",
    //               },
    //             },
    //             children: [{ comp: "EditPen" }],
    //           },
    //           defaultSlotConfig: {
    //             comp: XForm,
    //             attr: {
    //               formOption: {
    //                 mode: obj,
    //                 itemArr: [
    //                   [
    //                     {
    //                       span: 18,
    //                       attr: {
    //                         prop: item,
    //                         style: {
    //                           "margin-bottom": "0px",
    //                         },
    //                       },
    //                       component: {
    //                         comp: "el-input",
    //                         attr: {
    //                           type: item === "address" ? "textarea" : "text",
    //                           rows: 1,
    //                         },
    //                       },
    //                     },
    //                     {
    //                       span: 6,
    //                       attr: {
    //                         style: {
    //                           "margin-bottom": "0px",
    //                         },
    //                       },
    //                       component: {
    //                         comp: "el-button",
    //                         attr: {
    //                           style: {
    //                             width: "100%",
    //                           },
    //                         },
    //                         event: {
    //                           click: function () {},
    //                         },
    //                         content: {
    //                           text: "提交",
    //                         },
    //                       },
    //                     },
    //                   ],
    //                 ],
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   ],
    // },
  };
});

const createDescriptions = {
  attr: {
    title: "With border",
    column: 3,
    border: true,
    style: {
      width: "80%",
      margin: "0 auto",
    },
  },
  extraSlotConfig: {
    comp: "el-icon",
    event: {
      click: () => {
        testDialogVisible.value = !testDialogVisible.value;
      },
    },
    children: [
      {
        comp: "EditPen",
      },
    ],
  },
  itemArr: descriptionItem,
};
</script>

<style scoped lang="less"></style>
