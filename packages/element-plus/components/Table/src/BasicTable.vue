<template>
  <div>
    <XSearch
      class="advance-container"
      v-if="options.seachOptions"
      :options="options.seach"
      @search="advanceSearch"
    />
    <div class="table-container">
      <el-table
        v-loading="loading"
        :data="data"
        :ref="options.ref"
        v-bind="options.attr"
        v-on="options.event || {}"
      >
        <el-table-column
          v-for="(tableColumn, index) of options.columns"
          :key="setKey(index, tableColumn.attr?.label)"
          v-bind="tableColumn.attr"
        >
          <!--如果传入 headerSlot 或 headerSlot，则显示头部插槽 -->
          <template #header v-if="tableColumn.headerSlot">
            <!--传入 headerSlot 表示头部插槽为 JSON 配置 -->
            <BasicComponent
              v-if="tableColumn.headerSlot && typeof options.headerSlot === 'object'"
              :options="tableColumn.headerSlot"
            />
            <!--传入 headerSlot 表示头部插槽为 自定义 template -->
            <slot
              v-if="tableColumn.headerSlot && typeof options.headerSlot === 'string'"
              :name="tableColumn.headerSlot"
              :currentCellData="tableColumn"
            >
            </slot>
          </template>
          <!--默认插槽-->
          <template #default="scope" v-if="tableColumn.defaultSlot">
            <BasicComponent
              v-if="
                tableColumn.defaultSlot && typeof tableColumn.defaultSlot === 'object'
              "
              :options="defaultSlotHandle(tableColumn.defaultSlot as CompType)"
              v-model="scope.row[tableColumn.attr?.prop]"
              v-on="eventHandle(scope, tableColumn.defaultSlot as CompType) || {}"
            />
            <BasicComponent
              v-if="tableColumn.defaultSlot && Array.isArray(tableColumn.defaultSlot)"
              v-for="config of tableColumn.defaultSlot"
              :options="defaultSlotHandle(config as CompType)"
              v-on="eventHandle(scope, config as CompType) || {}"
            />
            <slot
              v-if="
                tableColumn.defaultSlot && typeof tableColumn.defaultSlot === 'string'
              "
              :name="tableColumn.defaultSlot"
              :currentCellData="scope"
            >
            </slot>
          </template>
        </el-table-column>
        <!--append 	插入至表格最后一行之后的内容-->
        <template #append v-if="options.appendSlot">
          <BasicComponent
            v-if="options.appendSlot && typeof options.appendSlot === 'object'"
            :options="options.appendSlot"
          />
          <slot
            v-if="options.appendSlot && typeof options.appendSlot === 'string'"
            :name="options.appendSlot"
            :options="options"
          ></slot>
        </template>
        <template #empty v-if="options.emptySlot">
          <BasicComponent
            v-if="options.emptySlot && typeof options.emptySlot === 'object'"
            :options="options.emptySlot"
          />
          <slot
            v-if="options.emptySlot && typeof options.emptySlot === 'string'"
            :name="options.emptySlot"
            :options="options"
          ></slot>
        </template>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-if="options.pagination"
          v-bind="getPaginationAttr()"
          v-on="getPaginationEvent()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableType } from "../type";
import { XSearch } from "../../Search";
import { ref, watch, onBeforeMount } from "vue";
import { CompType } from "@xw-ui/element-plus/types/gloabl";

const props = defineProps<{
  options: TableType;
}>();
const data = props.options.data;
const loading = ref(false);

onBeforeMount(() => {
  if (props.options.loading) {
    loading.value = props.options.loading.value;
  }
});
watch(
  () => props.options.loading,
  () => {
    if (props.options.loading) {
      loading.value = props.options.loading.value;
    }
  },
  { deep: true }
);

/**
 * 设置表格列的 key 值
 * @param index { number } 表单项或表单项子组件的在数组的位置
 * @param label { string } 表单项的 prop 值或 子组件的 label 值
 * @return string 对应表格列的 key 值
 * @author
 */
const setKey = (index: number, label: string | undefined) => {
  if (typeof label === "undefined") {
    return index;
  } else {
    return index + label;
  }
};
/**
 * 处理defaultSlot的事件对象
 * @param currentCellData { Object } 当前行数据对象
 * @param events { Object } 当前列的事件对象
 * @return Object 事件对象
 * @author
 */
const eventHandle = function (currentCellData: any, config: any) {
  if (!config.event) return;
  const eventObj = {};
  Object.keys(config.event).forEach((event) => {
    eventObj[event] = function () {
      config.event[event](currentCellData, ...arguments);
    };
  });
  return eventObj;
};

/**
 * 处理defaultSlot
 * @param config { Object } 当前列的配置对象
 * @return Object 除去事件对象的当前列配置对象
 * @author
 */
const defaultSlotHandle = function (config: CompType) {
  const { comp, data, key, attr, content, children, ref } = config;
  return {
    comp,
    data,
    key,
    attr,
    content,
    children,
    ref,
  };
};

/**
 * 高级搜索事件
 * @param params
 */
const advanceSearch = function (params: any) {
  const initTable = props.options?.tableEvent?.initTable;
  initTable && initTable(params);
};

/**
 * 获取分页属性
 */
const getPaginationAttr = function () {
  return props.options?.pagination?.attr || {};
};

/**
 * 获取分页事件
 */
const getPaginationEvent = function () {
  return props.options?.pagination?.event || {};
};
</script>

<style scoped lang="less">
.advance-container {
  margin-bottom: 10px;

  :deep(.el-card__body) {
    padding: 15px 20px;
  }
}

.pagination-container {
  margin: 10px auto 0 auto;
  display: flex;
  justify-content: center;
}

.table-container {
  background-color: white;
  padding: 20px 5px;
}
</style>
