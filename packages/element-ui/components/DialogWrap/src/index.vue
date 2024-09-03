<template>
  <div class="dialog-wrapper">
    <!--stop的iframe阻止submit后跳转-->
    <iframe name="stop" class="none" style="display: none" />
    <!--stop的iframe阻止submit后跳转 end-->
    <el-dialog
      ref="dialogWrapper"
      v-el-drag-dialog
      class="dialog-component"
      :title="title"
      :visible="visible"
      :width="width"
      :close-on-click-modal="false"
      v-bind="$attrs"
      v-on="$listeners"
      @close="close"
    >
      <slot name="pre-content" />
      <template slot="title">
        <slot name="dialogTitle" />
      </template>
      <slot name="content" />
      <div v-if="items.length > 0">
        <el-form
          :ref="formRef"
          :model="data"
          :label-width="labelWidth"
          label-position="left"
          target="stop"
          :rules="rules"
        >
          <el-row
            v-for="(row, rowIndex) in items"
            :key="rowIndex"
            :gutter="24"
            :class="`form-row-${rowIndex}`"
          >
            <el-col
              v-for="(item, index) in isArray(row)"
              :key="index"
              :span="item.span || 24 / row.length"
              :class="item.colClassName || null"
            >
              <el-form-item
                :key="item.label || index"
                :style="item.styles"
                :class="[
                  isRequire(item) ? 'form-item-required' : '',
                  !item.label ? 'hidden-form-item-label' : '',
                  item.className,
                  item.attrs && item.attrs.disabled ? 'hidden-tips' : '',
                ]"
                :label="item.label"
                :prop="item.prop"
                :rules="item.rules"
                :label-width="item.labelWidth || '120px'"
                :name="item.prop"
              >
                <!--自定义插槽-->
                <slot
                  v-if="item.type == DialogCompType.slot"
                  :item="item"
                  :name="item.slotName"
                />
                <!--单行输入框-->
                <el-input
                  v-if="item.type == DialogCompType.input"
                  v-model="data[item.prop]"
                  :name="item.prop"
                  auto-complete="on"
                  class="item-inputs"
                  :style="{ width: `${item.width}` }"
                  :placeholder="placeholderFormate(item)"
                  v-bind="item.attrs"
                  v-on="item.listeners"
                >
                  <template v-if="item.slot" :slot="item.slotName">{{
                    item.slotContent
                  }}</template>
                </el-input>

                <!--远程搜索选择器-->
                <remote-search-selector
                  v-if="item.type == DialogCompType.remoteSearchSelector"
                  :init-value="data[item.prop]"
                  class="item-inputs"
                  :placeholder="placeholderFormate(item)"
                  v-bind="item.attrs"
                  :options="item.optionList"
                  :show-value="item.showValue"
                  :remote-methods="item.remoteMethod"
                  :style="{ width: `${item.width}` }"
                  v-on="item.listeners"
                  @valueChange="remoteSearchValueChage($event, data, item)"
                />
                <!--数字输入-->
                <el-input-number
                  v-if="item.type == DialogCompType.number"
                  v-model="data[item.prop]"
                  class="item-inputs"
                  :style="{ width: `${item.width}` }"
                  :placeholder="placeholderFormate(item)"
                  v-bind="item.attrs"
                  v-on="item.listeners"
                />
                <!--多行输入-->
                <el-input
                  v-if="item.type == DialogCompType.textarea"
                  v-model="data[item.prop]"
                  :name="item.prop"
                  auto-complete="on"
                  class="item-inputs"
                  :style="{ width: `${item.width}` }"
                  type="textarea"
                  :placeholder="placeholderFormate(item)"
                  v-bind="item.attrs"
                  autosize
                  v-on="item.listeners"
                />
                <!--日期选择器-->
                <el-date-picker
                  v-if="item.type == DialogCompType.datePicker"
                  v-model="data[item.prop]"
                  class="item-inputs"
                  :type="(item.attrs && item.attrs.type) || 'date'"
                  :placeholder="placeholderFormate(item)"
                  :style="{ width: `${item.width}` }"
                  v-bind="item.attrs"
                  v-on="item.listeners"
                />
                <!--日期时间选择器-->
                <el-date-picker
                  v-if="item.type == DialogCompType.dateTime"
                  v-model="data[item.prop]"
                  class="item-inputs"
                  type="datetime"
                  :placeholder="placeholderFormate(item)"
                  :style="{ width: `${item.width}` }"
                  v-bind="item.attrs"
                  v-on="item.listeners"
                />
                <!--日期时间选择器-带标记封装组件-->
                <date-picker-wrap
                  v-if="item.type == DialogCompType.datePickerColor"
                  :date="data[item.prop]"
                  class="item-inputs"
                  :placeholder="placeholderFormate(item)"
                  :style="{ width: `${item.width}` }"
                  v-bind="item.attrs"
                  v-on="item.listeners"
                />
                <!--开关-->
                <el-switch
                  v-if="item.type == DialogCompType.switch"
                  v-model="data[item.prop]"
                  v-bind="item.attrs"
                  v-on="item.listeners"
                />
                <!--下拉菜单-->
                <el-dropdown
                  v-if="item.type == DialogCompType.dropdown"
                  v-bind="item.attrs"
                  v-on="item.listeners"
                >
                  <el-button v-bind="item.dropdownButtonsAttrs">
                    {{ item.dropdownLabel }}
                    <i class="el-icon-arrow-down el-icon--right" />
                  </el-button>

                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="dItem in item.dropdownItem"
                      :key="dItem.label"
                      v-bind="dItem.attrs"
                      v-on="dItem.listeners"
                    >
                      {{ dItem.label }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

                <!--普通下拉选择器-->
                <SelectorWrap
                  v-if="item.type == DialogCompType.select"
                  :key="item.prop"
                  :item="item"
                  :data="data"
                  v-bind="item.attrs"
                  v-on="item.listeners"
                />

                <!--单选框-->
                <el-radio-group
                  v-if="item.type == DialogCompType.radio"
                  v-model="data[item.prop]"
                  class="item-inputs"
                  :style="{ width: `${item.width}` }"
                  v-bind="item.attrs"
                  v-on="item.listeners"
                >
                  <el-radio
                    v-for="option in item.optionList"
                    :key="option.id || option.value"
                    :label="option.value"
                  >
                    {{ option.label }}
                  </el-radio>
                </el-radio-group>
                <!--滑动条-->
                <el-slider
                  v-if="item.type == DialogCompType.slider"
                  v-model="data[item.prop]"
                  class="item-inputs"
                  v-bind="item.attrs"
                  v-on="item.listeners"
                />
                <!--警告-->
                <el-alert v-if="item.type == DialogCompType.alert" v-bind="item.attrs" />
                <el-divider
                  v-if="item.type == DialogCompType.divider"
                  v-bind="item.attrs"
                >
                  <span v-if="item.tips">{{ item.tips }}</span>
                </el-divider>
                <!--文件上传-->
                <file-upload
                  v-if="item.type == DialogCompType.files"
                  class="item-inputs"
                  v-bind="item.attrs"
                  v-on="item.listeners"
                />
                <!--按钮组-->
                <div
                  v-if="item.type == DialogCompType.buttons"
                  class="dialog-buttons"
                  :style="{
                    display: 'flex',
                    'justify-content': buttonsAlign[item.align] || 'flex-end',
                  }"
                >
                  <el-button
                    v-for="but in item.buttons"
                    :key="but.label"
                    :type="but.type"
                    v-bind="but.attrs"
                    size="small"
                    @click="submitValidate(but.validate, but.reset, but.event)"
                  >
                    {{ but.label }}
                  </el-button>
                </div>
                <!--富文本编辑器-->
                <tinymce
                  v-if="item.type == DialogCompType.editor"
                  v-model="data[item.prop]"
                  :height="item.height"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <slot name="after-content" />
    </el-dialog>
  </div>
</template>

<script>
import FileUploadWrap from "@/sewen-ui/element-ui/components/FileUploadWrap";
import Tinymce from "@/sewen-ui/element-ui/components/Tinymce";
import RemoteSearchSelector from "@/sewen-ui/element-ui/components/RemoteSearchSelector";
import elDragDialog from "./directive/el-drag-dialog"; // base on element-ui
import DatePickerWrap from "@/sewen-ui/element-ui/components/DatePickerWrap";
import SelectorWrap from "@/sewen-ui/element-ui/components/SelectorWrap";
import {
  placeholderFormate,
  eventHandler,
} from "@/sewen-ui/element-ui/components/FormWrap/src/config.js";
import { DialogCompType } from "./constant.js";
export default {
  name: "DialogWrap",
  directives: { elDragDialog },
  components: {
    FileUploadWrap,
    Tinymce,
    RemoteSearchSelector,
    DatePickerWrap,
    SelectorWrap,
  },
  model: {
    prop: "data",
    event: "change",
  },
  props: {
    // 是否使用指令式调用弹窗
    isFunctional: {
      type: Boolean,
      default: false,
    },
    title: {
      // title内容
      type: String,
      default: "对话提示",
    },
    visible: {
      // 是否显示对话框
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    width: {
      type: String,
      default: "500px",
    },
    items: {
      type: Array,
      default: () => {
        return [];
        //   item 格式：
        //   {
        //     prop: '',
        //     itemType: '',
        //     label: 'label名',
        //     tips: '提示输入内容',
        //     optionList: []
        //   }
      },
    },
    data: {
      type: Object,
      default: () => {},
    },
    formRef: {
      type: String,
      default: "dialogform",
    },
    // 规则
    rules: {
      type: Object,
      default: () => {},
    },
    isAutoComplete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      DialogCompType,
      buttonsAlign: {
        left: "flex-start",
        right: "flex-end",
        center: "center",
      },
    };
  },
  methods: {
    // 文本提示语格式化
    placeholderFormate,
    eventHandler,
    isArray(obj) {
      if (!(obj instanceof Array)) {
        return [obj];
      }
      return obj;
    },
    isRequire(item) {
      if (!item.rules) return false;
      if (Object.prototype.toString.call(item.rules) === "[object Array]") {
        return item.rules.some((item) => item.required);
      } else if (Object.prototype.toString.call(item.rules) === "[object Object]") {
        return item.rules.required;
      }
    },

    submitValidate(validate, reset, fn) {
      // 表单提交按钮事件
      if (validate) {
        // validate为 true 表示需要验证的表单
        if (this.isAutoComplete) {
          this.$refs[this.formRef].$el.submit();
        }
        this.$refs[this.formRef].validate((valid) => {
          if (valid) {
            fn();
            reset && this.resetForm(); // reset 为 true 表示需要重置的表单
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        fn();
      }
    },
    resetForm() {
      this.$refs[this.formRef].resetFields();
      this.$emit("update:data", {});
    },
    show() {
      this.visible = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    close() {
      this.$emit("update:visible", false);
      this.$emit("close");
      this.isFunctional && this.hidden();
    },
    // 指令式调用时移除dom
    hidden() {
      this.visible = false;
      this.reject && this.reject("cancel");
      document.body.removeChild(this.$el);
      this.$destroy();
    },
    // 远程搜索内容值修改
    remoteSearchValueChage(value, data, item) {
      data[item.prop] = value;
      this.$emit("valueChange", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  &::v-deep .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
  }
  &::v-deep .el-dialog__body {
    max-height: 90vh;
    overflow: auto;
  }
  &::v-deep .el-dialog__title {
    font-weight: 600;
  }
  &::v-deep .el-form-item__label {
    text-align: right;
    background-color: #f3f3f3;
    padding: 0 10px 0 0;
    border-radius: 5px;
    margin-right: 5px;
    &::before {
      content: "" !important;
    }
  }
  &::v-deep .el-form-item {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 5px;
    }
  }
  .item-inputs {
    width: calc(100% - 10px) !important;
  }
  .dialog-buttons {
    display: flex !important;
    justify-content: flex-start;
    margin: 0;
  }
  &::v-deep .el-upload__tip {
    margin: 0 0 0 10px;
  }
  &::v-deep .file-upload-container {
    width: 100%;
  }
  .hidden-form-item-label {
    &::v-deep .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
.form-item-required {
  &::v-deep .el-form-item__label {
    margin-right: 5px;
    &::after {
      content: "*";
      color: #f56c6c;
      padding-left: 4px;
    }
  }
}
.hidden-tips {
  &::v-deep .el-form-item__error {
    display: none !important;
  }
}
</style>
