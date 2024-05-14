<template>
  <el-dialog
    v-if="options"
    v-model="dialogVisible"
    v-bind="options.attr"
    v-on="options.event || {}"
  >
    <template v-if="options.header" #header>
      <BasicComponent :options="options.header" />
    </template>
    <template v-for="dialogItem in content" :key="index">
      <XForm v-if="dialogItem.type === 'Form'" :options="dialogItem.options" />
      <XTable
        v-else-if="dialogItem.type === 'Table'"
        :options="<ContentTableType>dialogItem.options"
      />
      <BasicComponent v-else :options="dialogItem.options" />
    </template>
    <template v-if="options.footer" #footer>
      <BasicComponent :options="options.footer" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, isRef } from "vue";
import { XForm } from "../../Form";
import { XTable } from "../../Table";
import type { OptionType } from "../type";
import BasicComponent from "../../BasicComponent";

const props = defineProps<{
  options: OptionType;
}>();

let dialogVisible = isRef(props.options?.visible)
  ? props.options.visible
  : ref(props.options.visible);

const content = props.options?.content ? props.options.content : [];
</script>

<style lang="less"></style>
