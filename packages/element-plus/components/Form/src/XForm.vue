<template>
  <el-form :model="data" v-bind="options.attr" :ref="setRef()">
    <el-row
      v-for="(item, index) of options.itemArr"
      :key="index"
      justify="space-between"
      class="default-form"
    >
      <el-col
        v-for="(formItem, findex) of item"
        :key="setKey(findex, formItem.attr?.prop)"
        :span="setSpan(item, formItem.span)"
        v-bind="formItem.colAttr"
      >
        <el-form-item v-bind="formItem.attr">
          <BasicComponent
            :options="formItem.component"
            v-model="data[formItem.attr?.prop]"
            @click="
              triggerEvent(
                formItem.component.publicEvent,
                formItem.component.event?.submit,
                formItem.component.event?.reset
              )
            "
            @change="($evnet: any) => changeHandler($evnet, formItem.attr?.prop as string)"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { ref, unref } from "vue";
import { FormType, FormItemType } from "../type";
import BasicComponent from "../../BasicComponent";
const emit = defineEmits(["changeAfter"]);
const props = defineProps<{
  // 表单数据
  options: FormType;
}>();

const data = props.options.mode;

// 表单Ref
const formRef = ref();

const setRef = function () {
  return typeof props.options.ref === "undefined" ? formRef : props.options.ref;
};

/**
 * 子组件触发的公共事件
 * @param val { string } 公共事件字符串
 * @return function 公共事件
 * @author
 */
const triggerEvent = (val: string | undefined, submit: Function, reset: Function) => {
  if (val === "submit" || submit) {
    (function () {
      setRef().value.validate((valid: boolean) => {
        if (!valid) return;
        submit && submit(unref(data));
        if (val === "reset") {
          setRef().value.resetFields();
        }
      });
    })();
  } else if (val === "reset" || reset) {
    (function () {
      reset && reset();
      setRef().value.resetFields();
    })();
  }
};

/**
 * 计算表单项的span
 * @param formItem { Array<FormItemType> } 表单一行的表单项数组
 * @param val { string | number } 表单项指定的 span 值
 * @return number span的值
 * @author
 */
const setSpan = (formItem: Array<FormItemType>, val: string | number | undefined) => {
  let spanValue = 24;
  let spanIndex = 0;
  formItem.forEach((item) => {
    if (item.hasOwnProperty("span")) {
      let value =
        typeof item.span === "string" ? parseInt(item.span) : (item.span as number);
      spanValue = spanValue - value;
      spanIndex++;
    }
  });
  if (val !== undefined) {
    return val;
  } else {
    return spanValue / (formItem.length - spanIndex);
  }
};

/**
 * 设置表单项或表单项子组件的 key 值
 * @param index { number } 表单项或表单项子组件的在数组的位置
 * @param prop { string } 表单项的 prop 值或 子组件的 label 值
 * @return string 对应表单项或表单项子组件的 key 值
 * @author
 */
const setKey = (index: number, prop: string | undefined) => {
  if (typeof prop === "undefined") {
    return index;
  } else {
    return index + prop;
  }
};

/**
 * change 事件后置处理器
 * @param parmas
 */
const changeHandler = function (parmas: any, prop: string) {
  emit("changeAfter", {
    prop: prop,
    value: parmas,
  });
};
</script>

<style scoped lang="less">
.default-form {
  width: 100%;
  white-space: nowrap;
}
</style>
