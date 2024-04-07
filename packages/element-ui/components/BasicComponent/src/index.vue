<template>
  <component
    :is="typeof options.comp === 'string' ? options.comp : `${options.comp}`"
    :ref="options.ref"
    v-model="options.data"
    v-bind="options.attr"
    v-on="options.listeners || {}"
  >
    <div v-if="options.children && options.children.length !== 0">
      <BasicComponent
        v-for="(chilOpt, index) of options.children"
        :key="index"
        :options="chilOpt"
      />
    </div>
    <template v-if="options.content">
      {{ options.content }}
    </template>
  </component>
</template>

<script>
export default {
  name: "BasicComponent",
  component: {},
  props: {
    options: {
      type: [Object, String],
      default: function () {
        return {
          comp: null, // 组件标签
          ref: null, // 组件引用对象
          data: null, // 组件数据
          attr: null, // 组件属性
          listeners: null, // 组件监听事件
          content: null, // 组件内容
          children: [
            {
              comp: null, // 组件标签
              ref: null, // 组件引用对象
              data: null, // 组件数据
              attr: null, // 组件属性
              listeners: null, // 组件监听事件
              children: [],
            },
          ],
        };
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
