<template>
  <div :class="{ 'form-label-container': !isForm, 'form-container': isForm }">
    <!--stop的iframe阻止submit后跳转-->
    <iframe name="stop" class="none" style="display: none" />
    <!--stop的iframe阻止submit后跳转 end-->
    <!--form表单集合-->
    <el-form
      :ref="formRef"
      :model="data"
      :label-width="labelWidth"
      label-position="left"
      v-bind="$attrs"
      target="stop"
    >
      <el-row
        v-for="(row, rowIndex) in items"
        :key="rowIndex"
        :gutter="24"
        :class="`form-row-${rowIndex}`"
      >
        <el-col
          v-for="(item, index) in row"
          :key="index"
          :span="item.span || 24 / row.length"
          :class="item.colClassName || null"
        >
          <el-form-item
            :key="item.label || index"
            :label="item.label"
            :prop="item.prop"
            :rules="item.rules"
            :class="[
              isRequire(item) ? 'form-item-required' : '',
              item.className,
              item.attrs && item.attrs.disabled ? 'hidden-tips' : '',
            ]"
            :style="item.styles"
            :label-width="item.labelWidth || '120px'"
            :name="item.prop"
          >
            <slot
              v-if="item.type == FormCompType.slot"
              :item="item"
              :name="item.slotName"
            />
            <!--输入框-->
            <el-input
              v-if="item.type == FormCompType.input"
              v-model="data[item.prop]"
              :name="item.prop"
              auto-complete="on"
              class="item-inputs"
              :style="{ width: `${item.width || width || '100%'}` }"
              :placeholder="placeholderFormate(item)"
              v-bind="item.attrs"
              v-on="item.listeners"
            />
            <!--数字输入框-->
            <el-input-number
              v-if="item.type == FormCompType.number"
              v-model="data[item.prop]"
              class="item-inputs"
              :style="{ width: `${item.width || width || '100%'}` }"
              :placeholder="placeholderFormate(item)"
              v-bind="item.attrs"
              v-on="item.listeners"
            />
            <!--多行输入框-->
            <el-input
              v-if="item.type == FormCompType.textarea"
              v-model="data[item.prop]"
              class="item-inputs"
              :name="item.prop"
              auto-complete="on"
              :style="{ width: `${item.width || width || '100%'}` }"
              type="textarea"
              :placeholder="placeholderFormate(item)"
              v-bind="item.attrs"
              :autosize="(item.attrs && item.attrs.autosize) || true"
              v-on="item.listeners"
            />
            <!--富文本编辑器-->
            <tinymce
              v-if="item.type == FormCompType.editor"
              v-model="data[item.prop]"
              class="item-inputs form-wrap-richtext"
              v-bind="item.attrs"
              v-on="item.listeners"
            />
            <!--日期选择-->
            <el-date-picker
              v-if="item.type == FormCompType.datePicker"
              v-model="data[item.prop]"
              class="item-inputs"
              :type="(item.attrs && item.attrs.type) || 'date'"
              :placeholder="placeholderFormate(item)"
              :style="{ width: `${item.width || width || '100%'}` }"
              v-bind="item.attrs"
              v-on="item.listeners"
              @change="
                eventHandler($event, {
                  name: 'change',
                  events: item.listeners,
                  item,
                })
              "
            />
            <!--日期时间选择器-带标记封装组件-->
            <date-picker-wrap
              v-if="item.type == FormCompType.datePickerColor"
              :date="data[item.prop]"
              class="item-inputs"
              :placeholder="placeholderFormate(item)"
              :style="{ width: `${item.width}` }"
              v-bind="item.attrs"
              v-on="item.listeners"
            />
            <el-date-picker
              v-if="item.type == FormCompType.daterange"
              v-model="data[item.prop]"
              class="item-inputs"
              :type="(item.attrs && item.attrs.type) || 'daterange'"
              :placeholder="placeholderFormate(item)"
              :style="{ width: `${item.width || width || '100%'}` }"
              v-bind="item.attrs"
              v-on="item.listeners"
              @change="
                eventHandler($event, {
                  name: 'change',
                  events: item.listeners,
                  item,
                })
              "
            />
            <!--时间范围选择-->
            <el-time-select
              v-if="item.type == FormCompType.timePicker"
              v-model="data[item.prop]"
              class="item-inputs"
              :placeholder="placeholderFormate(item)"
              :style="{ width: `${item.width || width || '100%'}` }"
              v-bind="item.attrs"
              v-on="item.listeners"
              @change="
                eventHandler($event, {
                  name: 'change',
                  events: item.listeners,
                  item,
                })
              "
            />

            <!--普通下拉选择器-->
            <SelectorWrap
              v-if="item.type == FormCompType.select"
              :key="item.prop"
              :item="item"
              :data="data"
              :check-all="item.checkAll"
              v-bind="$attrs"
              v-on="$listeners"
            />

            <!--级联下拉选择器-->
            <el-cascader
              v-if="item.type == FormCompType.cascader"
              v-model="data[item.prop]"
              :placeholder="placeholderFormate(item)"
              class="item-inputs"
              popper-class="form-wrap-cascader"
              :options="item.optionList"
              :style="{ width: `${item.width || width || '100%'}` }"
              v-bind="item.attrs"
              @change="
                eventHandler($event, {
                  name: 'change',
                  events: item.listeners,
                  item,
                })
              "
            />
            <!--级联面板下拉选择器-->
            <el-cascader-panel
              v-if="item.type == FormCompType.cascaderPanel"
              v-model="data[item.prop]"
              :placeholder="placeholderFormate(item)"
              class="item-inputs"
              popper-class="form-wrap-cascader"
              :options="item.optionList"
              :style="{ width: `${item.width || width || '100%'}` }"
              v-bind="item.attrs"
              @change="
                eventHandler($event, {
                  name: 'change',
                  events: item.listeners,
                  item,
                })
              "
            />
            <!--穿梭面板-->
            <el-transfer
              v-if="item.type == FormCompType.transfer"
              v-model="data[item.prop]"
              :data="item.data"
              v-bind="item.attrs"
              v-on="item.listeners"
            >
              <template v-if="item.type == FormCompType.transfer && item.slotContent">
                <BasicComponent :options="item.slotContent" />
              </template>
              <template
                v-if="item.type == FormCompType.transfer && item.slotLeftFooter"
                slot="left-footer"
              >
                <BasicComponent :options="item.slotLeftFooter" />
              </template>
              <template
                v-if="item.type == FormCompType.transfer && item.slotRightFooter"
                slot="right-footer"
              >
                <BasicComponent :options="item.slotRightFooter" />
              </template>
            </el-transfer>
            <!--远程搜索选择器-->
            <RemoteSearchSelector
              v-if="item.type == FormCompType.remoteSearchSelector"
              class="item-inputs"
              :init-value="data[item.prop]"
              :placeholder="placeholderFormate(item)"
              v-bind="item.attrs"
              :options="item.optionList"
              :show-value="item.showValue"
              :remote-methods="item.remoteMethod"
              :style="{ width: `${item.width || width || '100%'}` }"
              v-on="item.listeners"
              @valueChange="remoteSearchValueChage($event, data, item)"
            />
            <!--开关-->
            <el-switch
              v-if="item.type == FormCompType.switch"
              v-model="data[item.prop]"
              v-bind="item.attrs"
              v-on="item.listeners"
              @change="
                eventHandler($event, {
                  name: 'change',
                  events: item.listeners,
                  item,
                })
              "
            />
            <!--下拉菜单-->
            <el-dropdown
              v-if="item.type == FormCompType.dropdown"
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
            <!--单选-->
            <el-radio-group
              v-if="item.type == FormCompType.radio"
              v-model="data[item.prop]"
              v-bind="item.attrs"
              @change="
                eventHandler($event, {
                  name: 'change',
                  events: item.listeners,
                  item,
                })
              "
            >
              <el-radio
                v-for="radio in item.optionList"
                :key="radio.label"
                :label="radio.value"
                :disabled="radio.disabled"
              >
                {{ radio.label }}
              </el-radio>
            </el-radio-group>

            <!--checkbox多选-->
            <el-checkbox-group
              v-if="item.type == FormCompType.checkbox"
              v-model="data[item.prop]"
              v-bind="item.attrs"
              v-on="item.listeners"
            >
              <el-checkbox
                v-for="option in item.optionList"
                :key="option.id"
                :label="option.label"
                :value="option.value"
                :name="item.name"
              />
            </el-checkbox-group>
            <!--滑动条-->
            <el-slider
              v-if="item.type == FormCompType.slider"
              v-model="data[item.prop]"
              class="item-inputs form-wrap-slider"
              v-bind="item.attrs"
              v-on="item.listeners"
            />
            <!--文件上传-->
            <FileUploadWrap
              v-if="item.type == FormCompType.files"
              class="item-inputs"
              v-bind="item.attrs"
              v-on="item.listeners"
            />
            <!--警告-->
            <el-alert v-if="item.type == FormCompType.alert" v-bind="item.attrs" />
            <!--分割线-->
            <el-divider v-if="item.type == FormCompType.divider" v-bind="item.attrs">
              <span v-if="item.tips">{{ item.tips }}</span>
            </el-divider>
            <div
              v-if="item.type == FormCompType.buttons"
              class="form-buttons"
              :style="{
                'justify-content': buttonsAlign[item.align] || 'flex-start',
              }"
            >
              <el-button
                v-for="but in item.buttons"
                :key="but.label"
                :type="but.type"
                v-bind="but.attrs"
                @click="submitValidate(but.validate, but.reset, but.event, data)"
              >
                {{ but.label }}
              </el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import BasicComponent from "@/xw-ui/element-ui/components/BasicComponent";
import FileUploadWrap from "@/xw-ui/element-ui/components/FileUploadWrap";
import RemoteSearchSelector from "@/xw-ui/element-ui/components/RemoteSearchSelector";
import Tinymce from "@/xw-ui/element-ui/components/Tinymce";
import DatePickerWrap from "@/xw-ui/element-ui/components/DatePickerWrap";
import SelectorWrap from "@/xw-ui/element-ui/components/SelectorWrap";
import { placeholderFormate, eventHandler } from "./config.js";
import { FormCompType } from "./constant.js";
export default {
  name: "FormWrap",
  components: {
    BasicComponent,
    FileUploadWrap,
    RemoteSearchSelector,
    Tinymce,
    DatePickerWrap,
    SelectorWrap,
  },
  model: {
    prop: "data",
    event: "change",
  },
  props: {
    isForm: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    width: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => {
        return [
          {
            prop: "",
            itemType: "",
            label: "label名",
            tips: "提示输入内容",
            optionList: [],
          },
        ];
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
  },
  data() {
    return {
      FormCompType,
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
    // 事件统一处理函数
    eventHandler,
    // 必填项数据格式化
    isRequire(item) {
      if (!item.rules) return false;
      if (Object.prototype.toString.call(item.rules) === "[object Array]") {
        return item.rules.some((item) => item.required);
      } else if (Object.prototype.toString.call(item.rules) === "[object Object]") {
        return item.rules.required;
      }
    },

    // 提交验证
    submitValidate(validate, reset, fn, params) {
      // 表单提交按钮事件
      if (validate) {
        // validate为 true 表示需要验证的表单
        this.$refs[this.formRef].$el.submit();
        this.$refs[this.formRef].validate((valid) => {
          if (valid) {
            fn(params);
            reset && this.resetForm(); // reset 为 true 表示需要重置的表单
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        fn(params);
      }
    },
    // 表单重置
    resetForm() {
      this.$refs[this.formRef].resetFields();
      this.$emit("update:data", {});
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
.form-container {
  &::v-deep .el-form-item__label {
    text-align: right;
    background-color: #f3f3f3;
    padding: 0 10px 0 0;
    margin-right: 10px;
    &::before {
      content: "" !important;
    }
  }
  &::v-deep .el-form-item {
    margin-bottom: 20px;
  }

  &::v-deep .el-upload-dragger {
    width: fit-content;
    height: fit-content;
  }
  &::v-deep .el-upload__tip {
    margin: 0 0 0 10px;
  }
  &::v-deep .el-form-item__error {
    right: 0px;
    left: auto;
    bottom: 0;
    z-index: 2;
    margin-top: -4px !important;
  }
  .item-inputs {
    width: calc(100% - 10px) !important;
  }
  .form-wrap-slider,
  .form-wrap-richtext {
    margin-left: 15px;
  }
}
.form-label-container {
  &::v-deep .el-form--label-left .el-form-item__label {
    text-align: right;
  }
  &::v-deep label {
    font-weight: normal;
  }
}
.form-buttons {
  display: flex;
  justify-content: flex-start;
  padding: 4px 0 2px 10px;
}
.form-item-required {
  &::v-deep .el-form-item__label {
    &::before {
      content: "" !important;
    }
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
