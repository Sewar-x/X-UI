<template>
  <div class="dialog-add-wrap">
    <ul class="ul-class">
      <div v-for="(row, rowIndex) in dialogAddItems" :key="rowIndex">
        <li v-for="(item, index) in row" :key="index">
          <div class="content-list-area-dialog" v-if="!item.noChange">
            <!-- 图标 + label 区域 -->
            <span class="require-class" :class="{ 'hidden-star': !item.required }">
              *
            </span>
            <i :class="item.icon" class="icon-class-dialog" />
            <span class="label-class">{{ item.label }}</span>
            <!-- 表单控件设置区域 -->
            <div v-if="item.options">
              <component
                :is="
                  typeof item.options.comp === 'string'
                    ? item.options.comp
                    : `${item.options.comp}`
                "
                :ref="item.options.ref"
                v-model="addFormData[item.props]"
                v-bind="item.options.attr"
                v-on="item.options.listeners || {}"
              >
                <div v-if="item.options.children && item.options.children.length !== 0">
                  <BasicComponent
                    v-for="(chilOpt, index) of item.options.children"
                    :key="index"
                    :options="chilOpt"
                  />
                </div>
                <template v-if="item.options.content">
                  {{ item.options.content }}
                </template>
              </component>
            </div>
          </div>
          <!--自定义插槽-->
          <slot v-if="item.slotName" :name="item.slotName" />
        </li>
      </div>
    </ul>
    <!-- 按钮 -->
    <div class="button-class">
      <el-button size="mini" type="primary" @click="submitAdd(addFormData)"
        >提交</el-button
      >
      <el-button size="mini" @click="$emit('closeAdd')">取消</el-button>
    </div>
  </div>
</template>

<script>
import BasicComponent from "@/xw-ui/element-ui/components/BasicComponent";

export default {
  name: "DialogAdd",
  components: {
    BasicComponent,
  },
  props: {
    // 新增表单配置信息
    dialogAddItems: {
      type: Array,
      default: () => {
        return [{}];
      },
    },
    // 新增表单数据
    addFormData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    submitAdd(addFormData) {
      this.$emit("submitAdd", addFormData);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-add-wrap {
  overflow: auto;
  width: 100%;
  height: 700px;
}
.content-list-area-dialog {
  display: ruby;
  font-size: 15px;
  line-height: 45px;
}
.icon-class-dialog {
  width: 20px;
  margin-right: 15px;
}
.label-class {
  width: 100px;
  display: block;
}
.ul-class {
  list-style: none;
}
.button-class {
  width: 100%;
  text-align: right;
  padding: 10px 20px;
}
.el-select {
  width: 220px !important;
}
.require-class {
  color: red;
  display: inline-block;
  width: 10px;
}
.hidden-star {
  opacity: 0;
}
</style>
