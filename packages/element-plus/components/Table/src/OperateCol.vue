<template>
  <div>
    <el-dropdown type="primary" @command="commandHandler">
      <el-button type="primary">
        更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="ope in operations" v-bind="ope" :command="ope">
            {{ ope.text }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onBeforeMount, defineEmits, reactive } from "vue";
import type { OperateColType } from "../type";
const props = defineProps<{
  options: OperateColType;
  slotScope: any;
}>();
const emit = defineEmits(["command"]);
const operations = props.options.operations ? props.options.operations : [];
const commandHandler = (value: any) => {
  emit("command", {
    operation: value.text,
    params: value.command,
    data: props.slotScope.row,
    colum: props.slotScope.column,
    row: props.slotScope.$index,
  });
};
</script>

<style scoped lang="less"></style>
