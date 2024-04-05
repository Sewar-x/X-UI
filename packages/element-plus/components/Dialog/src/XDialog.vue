<template>
  <el-dialog v-model="dialogVisible.value" v-bind="attr" v-on="event || {}">
    <template v-if="header" #header>
      <BasicComponent :options="header" />
    </template>
    <template v-for="(dialogItem, index) in content" :key="index">
      <XForm v-if="dialogItem.type === 'Form'" :options="<ContentFormType>dialogItem" />
      <XTable
        v-else-if="dialogItem.type === 'Table'"
        :options="<ContentTableType>dialogItem"
      />
      <BasicComponent v-else :options="dialogItem" />
    </template>
    <template v-if="footer" #footer>
      <BasicComponent :options="footer" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { XForm } from "../../Form";
import { XTable } from "../../Table";
import type { ContentType, ContentFormType, ContentTableType } from "../type";

defineProps<{
  dialogVisible: Ref<boolean>;
  attr?: { type: Object; default: {} };
  event?: { type: Object; default: {} };
  header?: CompType;
  content?: Array<ContentType>;
  footer?: CompType;
}>();
</script>

<style lang="less"></style>
