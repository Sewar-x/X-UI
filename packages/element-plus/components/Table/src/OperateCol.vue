<template>
  <div class="x-table-oprations-container">
    <div>
      <el-button v-for="but in sigleOpe" v-bind="but" @click="commandHandler(but)">
        {{ but.text }}
      </el-button>
    </div>
    <el-dropdown type="primary" @command="commandHandler">
      <el-button type="primary">
        更多 <ArrowDownBold style="width: 1em; height: 1em" />
      </el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="ope in operateGroup" v-bind="ope" :command="ope">
            {{ ope.text }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { defineEmits } from "vue";
import { ArrowDownBold } from "@element-plus/icons-vue";
import type { OperateColType } from "../type";
const props = defineProps<{
  options: OperateColType;
  slotScope: any;
}>();
const emit = defineEmits(["command"]);
const operations = props.options.operations ? props.options.operations : [];
let operateGroup: Array<any> = []; // 更多操作集合
let sigleOpe: Array<any> = []; // 单独操作按钮
if (operations) {
  operations.forEach((ope: any) => {
    if (ope.notGroup) {
      sigleOpe.push(ope);
    } else {
      operateGroup.push(ope);
    }
  });
}

/**
 * 更多操作统一处理函数
 */
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

<style scoped lang="less">
.x-table-oprations-container {
  display: flex;
}
</style>
