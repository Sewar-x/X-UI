<template>
  <XSearch :options="options"></XSearch>
</template>

<script setup lang="ts">
import { XSearch } from "@/xw-ui/element-plus";
import { reactive, watch } from "vue";
import { Share } from "@element-plus/icons-vue";
//配送方式下拉选项
const deliverOpt = ["送货上门", "自取"].map((option) => {
  return {
    comp: "el-option",
    attr: {
      key: option,
      label: option,
      value: option,
    },
  };
});
const typeOpt = ["搜索1", "搜索2"].map((option) => {
  return {
    comp: "el-option",
    attr: {
      key: option,
      label: option,
      value: option,
    },
  };
});

// 高级搜索初始数据
let seachData = reactive({
  type: "搜索1",
  date: "2016-05-02",
  name: "王小虎",
  address: "",
  select: "送货上门",
});

const getItmes = (type: string): Array<object> => {
  const typeItem = [
    {
      attr: {
        prop: "type",
        label: "搜索类型",
      },
      component: {
        comp: "el-select",
        attr: {
          placeholder: "搜索类型",
        },
        children: typeOpt,
      },
    },
  ];
  const cascadeItem = {
    搜索1: [
      {
        attr: {
          prop: "date",
          label: "日期",
        },
        component: {
          comp: "el-date-picker",
        },
      },
    ],
    搜索2: [
      {
        attr: {
          prop: "name",
          label: "姓名",
        },
        component: {
          comp: "el-input",
        },
      },

      {
        attr: {
          prop: "select",
          label: "配送方式",
        },
        component: {
          comp: "el-select",
          attr: {
            placeholder: "项目地址",
          },
          children: deliverOpt,
        },
      },
    ],
  };
  const append = cascadeItem[type];
  typeItem.splice(1, 0, ...append);
  return reactive([reactive(typeItem)]);
};

// 高级搜索配置项
const options = {
  cardAttr: {
    shadow: "none",
  },
  form: {
    mode: seachData,
    blurSearch: false, // 是否失去焦点时触发搜索
    attr: {
      "label-width": "80px",
    },
    items: getItmes(seachData.type),
  },
  inputShow: {
    attr: {
      class: "input-container",
    },
  },
  buttons: {
    search: true,
    clear: true,
    button: [
      {
        tip: "分享",
        text: "分享",
        attr: {
          type: "primary",
          icon: Share,
        },
      },
    ],
  },
};

/**
 * 当使用动态下拉时，需要监听 options.mode 中数据的变化
 * （注意不能监听 data 的变化，因为 data 不是响应式的，data 在 options 内部才被 XForm 定义为响应式）
 * 当 options.mode 中数据的变化时候，需要手动修改 options.items 的值,从而达到动态下拉的效果
 */
watch(
  () => options.form.mode.type,
  async (newVal: string) => {
    console.log("🚀 ~ newVal:", newVal);
    options.form.items = getItmes(newVal);
  },
  { deep: true }
);
</script>

<style lang="less">
.input-container {
  width: 60%;
}
</style>
