<template>
  <XSearch
    class="advance-container"
    v-if="options.seachOptions"
    :options="options.seachOptions"
    @XSearch="advanceSearch"
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
        v-for="(tableColumn, index) of options.columnArr"
        :key="setKey(index, tableColumn.attr?.label)"
        v-bind="tableColumn.attr"
      >
        <template
          #header
          v-if="tableColumn.headerSlotName || tableColumn.headerSlotConfig"
        >
          <BasicComponent
            v-if="tableColumn.headerSlotConfig"
            :options="tableColumn.headerSlotConfig"
          />
          <slot
            v-if="tableColumn.headerSlotName"
            :name="tableColumn.headerSlotName"
          ></slot>
        </template>

        <template
          #default="scope"
          v-if="tableColumn.defaultSlotName || tableColumn.defaultSlotConfig"
        >
          <BasicComponent
            v-if="
              tableColumn.defaultSlotConfig &&
              typeof tableColumn.defaultSlotConfig === 'object'
            "
            :options="defaultSlotConfigHandle(tableColumn.defaultSlotConfig as CompType)"
            v-model="scope.row[tableColumn.attr?.prop]"
            v-on="eventHandle(scope, tableColumn.defaultSlotConfig as CompType) || {}"
          />
          <BasicComponent
            v-if="
              tableColumn.defaultSlotConfig &&
              Array.isArray(tableColumn.defaultSlotConfig)
            "
            v-for="config of tableColumn.defaultSlotConfig"
            :options="defaultSlotConfigHandle(config as CompType)"
            v-on="eventHandle(scope, config as CompType) || {}"
          />
          <slot
            v-if="tableColumn.defaultSlotName"
            :name="tableColumn.defaultSlotName"
            :currentCellData="scope"
          ></slot>
        </template>
      </el-table-column>
      <template #append>
        <BasicComponent
          v-if="options.appendSlotConfig"
          :options="options.appendSlotConfig"
        />
        <slot v-else name="tableAppend"></slot>
      </template>
      <template #empty>
        <BasicComponent
          v-if="options.emptySlotConfig"
          :options="options.emptySlotConfig"
        />
        <slot v-else name="tableEmpty"></slot>
      </template>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-if="options.pagination"
        v-model:page-size="options.pagination.attr.per_page"
        v-model:current-page="options.pagination.attr.current_page"
        layout="sizes, prev, pager, next, jumper"
        :total="options?.pagination?.attr?.total"
        :background="true"
        v-bind="options?.pagination?.attr"
        v-on="options?.pagination?.event || {}"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableType } from "../type";
import { XSearch } from "../../Search";
import { ref, watch, onBeforeMount } from "vue";

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
 * 处理defaultSlotConfig的事件对象
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
 * 处理defaultSlotConfig
 * @param config { Object } 当前列的配置对象
 * @return Object 除去事件对象的当前列配置对象
 * @author
 */
const defaultSlotConfigHandle = function (config: CompType) {
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
 * 高级搜索内容
 * @param params
 */
const advanceSearch = function (params: any) {
  const initTable = props.options?.tableEvent?.initTable;
  initTable && initTable(params);
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
