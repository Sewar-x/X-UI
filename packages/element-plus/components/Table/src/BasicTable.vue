<template>
  <div>
    <XSearch
      class="advance-container"
      v-if="options.seach"
      :options="options.seach"
      @search="advanceSearch"
    >
      <template #buttonPrefix>
        <slot name="buttonPrefix" />
        <el-popover
          v-if="showColFilter()"
          :persistent="false"
          placement="bottom-start"
          trigger="hover"
        >
          <template #reference>
            <el-button :icon="Filter">筛选</el-button>
          </template>
          <el-checkbox-group class="selectCheck" v-model="selectColumns">
            <el-checkbox
              v-for="item in options.columns"
              :label="item.attr.label"
              :id="item.attr.prop"
              :key="item.attr.prop"
              :checked="!!item.isShow"
              @change="() => changeColumns(item)"
            />
          </el-checkbox-group>
        </el-popover>
      </template>
    </XSearch>
    <div class="table-container">
      <el-table
        v-loading="loading"
        :data="data"
        :ref="options.ref"
        v-bind="getTableHeaderAttr()"
        v-on="options.event || {}"
      >
        <template
          v-for="(tableColumn, index) of options.columns"
          :key="setKey(index, tableColumn.attr?.label)"
        >
          <el-table-column
            :key="setKey(index, tableColumn.attr?.label)"
            v-if="
              tableColumn.isShow == null || tableColumn.isShow == undefined
                ? true
                : tableColumn.isShow
            "
            v-bind="tableColumn.attr"
            v-on="tableColumn.event || {}"
          >
            <!--如果传入 headerSlot 或 headerSlot，则显示头部插槽 -->
            <template #header v-if="tableColumn.headerSlot">
              <!--传入 headerSlot 表示头部插槽为 自定义 template -->
              <slot
                v-if="
                  tableColumn.headerSlot && typeof tableColumn.headerSlot === 'string'
                "
                :name="tableColumn.headerSlot"
                :header="tableColumn"
              />
              <!--传入 headerSlot 表示头部插槽为 JSON 配置 -->
              <BasicComponent
                v-if="tableColumn.headerSlot && typeof options.headerSlot === 'object'"
                :options="tableColumn.headerSlot"
              />
            </template>
            <!--默认插槽-->
            <template #default="scope" v-if="tableColumn.defaultSlot">
              <slot
                v-if="
                  tableColumn.defaultSlot && typeof tableColumn.defaultSlot == 'string'
                "
                :name="tableColumn.defaultSlot"
                :row="scope.row"
                :columns="scope.column"
                :index="scope.$index"
              />

              <BasicComponent
                v-if="
                  tableColumn.defaultSlot && typeof tableColumn.defaultSlot == 'object'
                "
                :options="defaultSlotHandle(tableColumn.defaultSlot as CompType, scope)"
                v-model="scope.row[tableColumn.attr?.prop]"
                v-on="eventHandle(scope, tableColumn.defaultSlot as CompType) || {}"
              />
              <BasicComponent
                v-if="tableColumn.defaultSlot && Array.isArray(tableColumn.defaultSlot)"
                v-for="config of tableColumn.defaultSlot"
                :options="defaultSlotHandle(config as CompType, scope)"
                v-on="eventHandle(scope, config as CompType) || {}"
              />
            </template>
          </el-table-column>
        </template>
        <!--append 	插入至表格最后一行之后的内容-->
        <template #append v-if="options.appendSlot">
          <slot
            v-if="options.appendSlot && typeof options.appendSlot === 'string'"
            :name="options.appendSlot"
            :options="options"
          />
          <BasicComponent
            v-if="options.appendSlot && typeof options.appendSlot === 'object'"
            :options="options.appendSlot"
          />
        </template>
        <template #empty v-if="options.emptySlot">
          <slot
            v-if="options.emptySlot && typeof options.emptySlot === 'string'"
            :name="options.emptySlot"
            :options="options"
          />
          <BasicComponent
            v-if="options.emptySlot && typeof options.emptySlot === 'object'"
            :options="options.emptySlot"
          />
        </template>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-if="paginationConfig.show"
          v-bind="paginationConfig.attr"
          v-on="paginationConfig.event"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount, defineEmits, reactive } from "vue";
import type { TableType, columnsType, PaginationType } from "../type";
import { XSearch } from "../../Search";
import { CompType } from "@/xw-ui/element-plus/types/gloabl.d.ts";
import { deepMerge } from "@/xw-ui/element-plus/utils";
import BasicComponent from "../../BasicComponent";
import { Filter } from "@element-plus/icons-vue";
import OperateCol from "./OperateCol.vue";
const props = defineProps<{
  options: TableType;
}>();
const emit = defineEmits([
  "search",
  "sizeChange",
  "currentChange",
  "pageChange ",
  "prevClick",
  "nextClick",
  "operate",
]);

/**
 * 获取分页默认配置
 */

const getPaginationConfig = function (): PaginationType {
  // 默认分页配置
  const defalutConfig = {
    // 是否显示分页
    show: true,
    // 默认属性
    attr: {
      pageSizes: [5, 10, 15, 20, 100, 200, 500],
      layout: "prev, pager, next,jumper, sizes,total",
      total: props.options?.data?.total || 0,
      "default-current-page": props.options?.data?.currentPage || 1,
      "default-page-size": props.options?.data?.pageSize || 10,
    },
    //默认事件
    event: {
      "size-change": (value: number) => {
        emit("sizeChange", value);
      },
      "current-change": (value: number) => {
        emit("currentChange", value);
      },
      change: (currentPage: number, pageSize: number) => {
        emit("pageChange", currentPage, pageSize);
      },
      "prev-click": (value: number) => {
        emit("prevClick", value);
      },
      "next-click": (value: number) => {
        emit("nextClick", value);
      },
    },
  };
  // 如果没有配置分页，则返回默认选项
  if (!props.options.hasOwnProperty("pagination")) {
    return defalutConfig;
  }
  // 如果配置为 false,则不显示分页
  if (
    props.options.hasOwnProperty("pagination") &&
    typeof props.options.pagination === "boolean" &&
    !props.options.pagination
  ) {
    return {
      show: false,
      attr: {},
      event: {},
    };
  }
  // 如果存在 pagination 配置，则合并默认配置项和传入配置项
  if (
    props.options.hasOwnProperty("pagination") &&
    typeof props.options.pagination === "object"
  ) {
    return deepMerge(defalutConfig, props.options.pagination) as PaginationType;
  }

  return deepMerge(defalutConfig, props.options.pagination) as PaginationType;
};
// 分页配置项
const paginationConfig = getPaginationConfig();
// 获取表格数据，当使用分页时候，data 表示分页数据和数据，data.data 表示表格数据，当使用分页时，data 表示表格数据
const data = paginationConfig.show ? props.options.data.data : props.options.data;
const loading = ref(false);
//选中显示的列
const selectColumns: Array<columnsType> = ref([]);
/**
 * 获取表格头配置属性
 */
const getTableHeaderAttr = function (): object {
  const defalutAttr = {
    "header-cell-class-name": "x-table-header-row-class",
  };
  return deepMerge(props.options.attr || {}, defalutAttr);
};
// 所有表格列配置项
props.options.columns = reactive(
  props.options.columns.map((col) => {
    if (!col.hasOwnProperty("isShow")) {
      col.isShow = true;
    }
    return col;
  })
);

/**
 * 设置是否显示列筛选器
 */
const showColFilter = function (): boolean {
  if (
    props?.options?.seach?.buttons &&
    props?.options?.seach?.buttons.hasOwnProperty("colFilter") &&
    props?.options?.seach?.buttons.colFilter == false
  ) {
    return props?.options?.seach?.buttons.colFilter;
  }
  return true;
};

/**
 * 设置默认操作列
 */
const setShowDefaultOperateCol = function (): void {
  if (
    props.options.hasOwnProperty("operations") &&
    Object.prototype.toString.call(props.options.operations) === "[object Array]"
  ) {
    props.options.columns.push({
      attr: {
        prop: "",
        label: "操作",
        width: "80",
        fixed: "right",
      },
      // todo: 把默认插槽的行数据和外部传入的 common 对象传入 OperateCol 组件
      defaultSlot: {
        comp: OperateCol, // 使用 basicCponent渲染自定义组件
        attr: {
          // 自定义组件的 options 属性通过 attr 传入
          options: {
            operations: props.options.operations,
          },
        },
        event: {
          command: (row: any, data: any) => {
            emit("operate", data);
          },
        },
      },
    });
  }
};
setShowDefaultOperateCol();

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
 * @param row { Object } 当前行数据对象
 * @param events { Object } 当前列的事件对象
 * @return Object 事件对象
 * @author
 */
const eventHandle = function (row: any, config: any) {
  if (!config.event) return;
  const eventObj = {};
  Object.keys(config.event).forEach((event) => {
    eventObj[event] = function () {
      config.event[event](row, ...arguments);
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
const defaultSlotHandle = function (config: CompType, slotScope: any) {
  const { comp, data, key, attr, content, children, ref } = config;
  return {
    comp,
    data,
    key,
    attr,
    content,
    children,
    ref,
    slotScope,
  };
};

/**
 * 高级搜索事件
 * @param params
 */
const advanceSearch = function (params: any) {
  emit("search", params);
  const initTable = props.options?.tableEvent?.initTable;
  initTable && initTable(params);
};

/**
 * 修改显示列
 */
const changeColumns = (value: any) => {
  value.isShow = !value.isShow;
};

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

  :deep(.x-table-header-row-class) {
    background-color: rgb(242, 242, 242);
  }
  :deep(th.el-table-fixed-column--right) {
    background-color: rgb(242, 242, 242);
  }
}
</style>
