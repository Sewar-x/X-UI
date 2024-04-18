<template>
  <XForm :options="options"></XForm>
</template>

<script setup lang="ts">
import { reactive, watchEffect, onMounted } from "vue";
import { XForm } from "@/xw-ui/element-plus";
// 异步获取下拉选项
const getOptions = (
  arr: Array<string>
): Promise<Array<{ comp: string; attr: { key: any; label: any; value: any } }>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const opt = arr.map((option) => {
          return {
            comp: "el-option",
            attr: {
              key: option,
              label: option,
              value: option,
            },
          };
        });

        return resolve(opt);
      } catch (error) {
        return reject(error);
      }
    }, 1000);
  });
};
// 响应数据
let data = {
  project: "XW-UI",
  description: "an vue2/3 & react componet library",
  hard: "描述项目的难易程度。",
  blogIntro: "博客介绍",
  blogUrl: "https://sewar-x.github.io/myblog/",
  place: "huizhou",
  remarks: "Vue React",
  github: "https://github.com/Sewar-x/",
  start: true,
};
// 获取 form 表单配置项
const getItmes = async (type: string): Promise<Array<object>> => {
  const blogFllower = ["A", "B", "C"];
  const uiFllower = ["D", "E", "F"];
  const projOpt = await getOptions(["XW-UI", "BLOG"]);
  const follwerOpt = await getOptions(type === "BLOG" ? blogFllower : uiFllower);
  return [
    [
      {
        attr: {
          prop: "project",
          label: "项目",
        },
        component: {
          comp: "el-select",
          attr: {
            placeholder: "项目",
          },
          children: projOpt,
        },
      },
    ],
    [
      {
        attr: {
          prop: "follwers",
          label: "follwers",
        },
        component: {
          comp: "el-select",
          attr: {
            placeholder: "follwers",
          },
          children: follwerOpt,
        },
      },
    ],
    [
      {
        attr: {
          prop: "hard",
          label: "项目难点",
        },
        component: {
          comp: "el-input",
          attr: {
            type: "textarea",
            disabled: type === "BLOG",
          },
        },
      },
    ],
    [
      {
        attr: {
          prop: "blogIntro",
          label: "博客介绍",
        },
        component: {
          comp: "el-input",
          attr: {
            type: "textarea",
            disabled: type === "XW-UI",
          },
        },
      },
    ],
    [
      {
        attr: {
          prop: "blogUrl",
          label: "博客地址",
        },
        component: {
          comp: "el-input",
          attr: {
            disabled: type === "XW-UI",
          },
        },
      },
    ],
    [
      {
        attr: {
          prop: "description",
          label: "项目描述",
        },
        component: {
          comp: "el-input",
          attr: {
            type: "textarea",
          },
        },
      },
    ],
    [
      {
        attr: {
          prop: "remarks",
          label: "标签",
        },
        component: {
          comp: "el-input",
        },
      },
      {
        attr: {
          prop: "github",
          label: "GitHub",
        },
        component: {
          comp: "el-input",
        },
      },
      {
        component: {
          comp: "el-button",
          attr: {
            size: "mini",
          },
          content: {
            text: "GitHub",
          },
          event: {
            click: function (val: any) {
              window.open(data.github);
            },
          },
        },
      },
      {
        attr: {
          prop: "start",
          label: "关注",
        },
        component: {
          comp: "el-switch",
        },
      },
    ],
    [
      {
        component: {
          comp: "el-button",
          content: {
            text: "提交",
          },
          event: {
            submit: (val: any) => {
              // 表单提交事件
              alert(`提交表单：${JSON.stringify(val)}`);
            },
          },
        },
      },
    ],
  ];
};

// from 表单配置项
const options = reactive({
  mode: data,
  attr: {
    "label-width": "auto",
  },
  items: {},
});

onMounted(async () => {
  try {
    options.items = await getItmes(data.project);
  } catch (error) {
    console.error("Failed to initialize form items: ", error);
  }
});
/**
 * 当使用动态下拉时，需要监听 options.mode 中数据的变化
 * （注意不能监听 data 的变化，因为 data 不是响应式的，data 在 options 内部才被 XForm 定义为响应式）
 * 当 options.mode 中数据的变化时候，需要手动修改 options.items 的值,从而达到动态下拉的效果
 */
watchEffect(
  async (onInvalidate) => {
    await onInvalidate;
    const newVal = options.mode.project;
    try {
      options.items = await getItmes(newVal);
    } catch (error) {
      console.error("Failed to update form items: ", error);
    }
  },
  { flush: "post", immediate: true }
);
</script>

<style scoped lang="less"></style>
