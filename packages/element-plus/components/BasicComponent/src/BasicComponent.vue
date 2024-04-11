<template>
  <component
    :is="compName"
    v-model="value"
    v-bind="options.attr"
    v-on="options.event || {}"
    :ref="options.ref"
    :class="options.className"
  >
    <div v-if="options.children && options.children.length !== 0">
      <BasicComponent
        v-for="(element, index) of options.children"
        :key="index"
        :options="element"
      />
    </div>
    <template v-if="options.content">
      {{ options.content.text ? options.content.text : options.content }}
    </template>
  </component>
</template>

<script setup lang="ts">
import { CompType } from "@/xw-ui/element-plus/types/gloabl.d.ts";
import { defineProps, toRef } from "vue";

const props = defineProps<{
  options: CompType;
}>();

const compName =
  typeof props.options.comp === "string" ? `${props.options.comp}` : props.options.comp;

/**
 * 依据 options 中 data 属性和 key 属性确定渲染组件的响应数据
 * 1.存在key：响应数据是响应数据对象中的某个属性，需传响应对象 data 和属性名 key
 * 2.不存在key：响应数据类型是除对象类型外的所有类型，但该数据必须是由 ref 或 reactive 包裹形成的响应数据
 */
const value =
  props.options.data && props.options.hasOwnProperty("key")
    ? toRef(props.options.data, props.options.key as string)
    : props.options.data;

/**
 * 依据 options 中 content 属性的 text 属性和 key 属性确定渲染组件的渲染文本内容
 * 1.存在key：如果 props.options 对象存在 key 属性，且为对象自身的属性，则使用 toRef 函数将 props.options.data 对象中 key 属性的值转换为响应式引用（ref）
 * 2.不存在key：如果 props.options 对象不存在 key 属性，或者 key 属性不是对象自身的属性，则直接将 props.options.data 赋值给 value。
 */
const content =
  props.options.content && props.options.content?.hasOwnProperty("key")
    ? toRef(props.options.content.text, props.options.content.key as string)
    : props.options.content?.text;
</script>

<style scoped lang="less"></style>
