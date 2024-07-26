# 开发规范指南



## 组件开发流程

当需要新增/修改组件时，一般流程为：

1. 修改组件
2. 修改组件 demo 示例
3. 修改组件文档，新增 / 修改组件 文档 demo
4. 构建项目，执行 `pnpm run docs:build`
5. 上传到私有 npm 镜像：
   * 使用 nrm 切换为私有 npm 镜像： `nrm use 私有镜像名称`
   * 登录私有 npm 镜像： `npm login`
   * 上传包到私有 npm 镜像: `npm publish`
6. 提交代码到仓库



---

## 📑 版本规范

**递增已发布包中的语义版本**

为了帮助依赖你的代码的开发者，我们建议你从 `1.0.0` 开始你的包版本并按如下方式递增：

| 代码状态             | 阶段     | 规则                                         | 示例版本 |
| -------------------- | -------- | -------------------------------------------- | -------- |
| 首次发布             | 新产品   | 从 1.0.0 开始                                | 1.0.0    |
| 向后兼容的缺陷修复   | 补丁版本 | 增加第三个数字                               | 1.0.1    |
| 向后兼容的新功能     | 次要版本 | 增加中间数字并将最后一位重置为零             | 1.1.0    |
| 破坏向后兼容性的更改 | 主要版本 | 增加第一位数字并将中间和最后一位数字重置为零 | 2.0.0    |

你可以从包的 `package.json` 文件中的依赖中指定包可以接受的更新类型。

例如，要指定最高 1.0.4 的可接受版本范围，请使用以下语法：

- 补丁发布：`1.0` 或 `1.0.x` 或 `~1.0.4`

- 次要版本：`1` 或 `1.x` 或 `^1.0.4`

- 主要版本：`*` 或 `x`

有关语义版本控制语法的更多信息，请参阅 [npm semver 计算器](https://semver.npmjs.com/)。



---



## 💡 CSS 处理方案

在使用该组件时，强烈推荐使用 CSS  原子化方案作为该组件库的 CSS 处理方案。

> 关于什么是 CSS 原子化和 CSS 原子化框架选型，可以参考我的博客：[CSS 原子化 | Sewen 博客 (sewar-x.github.io)](https://sewar-x.github.io/myblog/article/css/CSS原子化.html)

### 为什么推荐原子化 CSS 方案？

使用配置化的组件，大大减少了模板的引入，因此在模板中使用 CSS  类和定位 CSS 样式优先级处理上，比较难处理和不直观。

以下是一个使用 Element Plus 的 Form 表单 JSON 配置的示例：

::: details 一个Form 表单配置示例

```vue
<template>
  <XForm :options="options"></XForm>
</template>

<script setup lang="ts">
import { XForm } from "@/xw-ui/element-plus";
import { reactive } from "vue";
import type { FormRules } from "element-plus";
interface RuleForm {
  username: string;
  description: string;
  place: string;
  remarks: string;
  github: string;
  start: boolean;
}

// 响应数据
let data = reactive<RuleForm>({
  username: "XW-UI",
  description: "an vue2/3 & react componet library",
  place: "huizhou",
  remarks: "Vue React",
  github: "https://github.com/Sewar-x/X-UI/",
  start: true,
});

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: "Please input  name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  description: [
    {
      required: true,
      message: "Please input description",
      trigger: "change",
    },
  ],
  place: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change",
    },
  ],
  remarks: [
    {
      required: true,
      message: "Please input a remarks",
      trigger: "change",
    },
  ],
  github: [
    {
      required: true,
      message: "Please input github",
      trigger: "change",
    },
  ],
  start: [
    {
      required: true,
      message: "Please input github",
      trigger: "change",
    },
  ],
});
// from 表单配置项
const options = {
  mode: data,
  attr: {
    "label-width": "auto",
    rules: rules,
  },
  items: [
    [
      {
        attr: {
          // 使用 Tailwind CSS: 背景颜色
          class: "bg-slate-200 hover:bg-slate-300",
          prop: "username",
          label: "项目名称",
        },
        component: {
          comp: "el-input",
        },
      },
    ],
    [
      {
        attr: {
          // 使用 Tailwind CSS: 字体加粗
          class: "font-extrabold",
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
          // 使用 Tailwind CSS: 模糊
          class: "blur-sm",
          prop: "place",
          label: "项目地址",
        },
        component: {
          comp: "el-select",
          attr: {
            placeholder: "项目地址",
          },
          children: [
            {
              comp: "el-option",
              attr: {
                label: "惠州",
                value: "huizhou",
              },
            },
            {
              comp: "el-option",
              attr: {
                label: "广州",
                value: "guangzhou",
              },
            },
          ],
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
    ],
    [
      {
        attr: {
          // 使用 Tailwind CSS:阴影
          class: "drop-shadow-xl",
          prop: "github",
          label: "GitHub",
        },
        component: {
          comp: "el-input",
        },
      },
      {
        span: 3,
        attr: {
          class: "scale-150",
          prop: "start",
          label: "关注",
        },
        component: {
          comp: "el-switch",
        },
      },
      {
        span: 2,
        component: {
          comp: "el-button",
          attr: {
            // 使用 Tailwind CSS: 放大
            class: "hover:scale-150",
            size: "mini",
            type: "primary",
          },
          content: {
            text: "查看",
          },
          event: {
            click: function (val: any) {
              window.open(data.github);
            },
          },
        },
      },
    ],
    [
      {
        span: 4,
        component: {
          attr: {
            // 使用 Tailwind CSS: 旋转动画、放大
            class: "animate-spin scale-125",
          },
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
  ],
};
</script>

<style scoped lang="less"></style>

```

:::



通过以上示例可以看到，在一个具有多个交互控件的 Form 表单中，我们通过 JSON 配置项自动生成了 Form 表单，整个页面只有一个 `<XForm/>` 模板组件。因此假如需要修改某个控件样式时，需要在 配置的空间的 `attr.class` 添加css类，然后再定义该css类，并且在定义时需要注意覆盖 Element Plus 的样式。



### 解决方案

**推荐解决方案**：使用原子化 CSS 可以很好解决以问题。

以 Tailwind CSS  为例，使用 Tailwind CSS  在对应的控件配置中的  `attr.class` 添加 UnoCSS 的类，即可控制对应控件的样式。

> Tailwind CSS 详细预设配置参考：[工具优先的基础 - Tailwind CSS 中文网 (nodejs.cn)](https://tailwind.nodejs.cn/docs/utility-first)

#### 使用 Tailwind CSS 配置类示例

<xw-demo
    demo-height="400px"
    source-code="element-plus:::form/form-tailwind-demo"
/>



> Tailwind CSS 安使用参考官网：[使用 PostCSS 安装 Tailwind CSS - Tailwind CSS 中文网 (nodejs.cn)](https://tailwind.nodejs.cn/docs/installation/using-postcss)

---





