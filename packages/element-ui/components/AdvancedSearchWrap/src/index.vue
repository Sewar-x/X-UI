<template>
  <!-- 高级搜索 -->
  <div
    class="advaced-search-container"
    :class="{
      'hidden-advaced-search': !(showAdvanceSearch && items && items.length > 0),
    }"
  >
    <form-wrap
      v-show="showAdvanceSearch && items && items.length > 0"
      form-ref="AdvancedSearch"
      class="advaced-search-buttons animate__animated"
      :class="{
        animate__fadeIn: showAdvanceSearch,
      }"
      :items="items"
      :data="listQuery"
      :is-form="false"
      @change="formChange"
    />

    <div v-if="showButtonGroup" class="search-container">
      <!-- 添加插槽 -->
      <slot name="slot-con" />
      <!-- 按钮组前置插槽 -->
      <slot name="prepend-buttons" />
      <!-- 下面是搜索框部分 -->
      <el-button-group>
        <el-input
          v-model="search"
          clearable
          autocomplete="on"
          class="search-button"
          placeholder="请输入搜索内容"
          suffix-icon="el-icon-search"
          size="mini"
          debounce="300"
          @input="inputChange"
          @keyup.enter.native="fuzzySearch"
        />
        <el-tooltip effect="dark" content="重置搜索" placement="top">
          <!-- 刷新按钮 -->
          <el-button
            size="mini"
            icon="el-icon-refresh"
            @click="$emit('refresh', search)"
          />
        </el-tooltip>
        <!-- 按钮组插槽 -->
        <slot name="buttons-group" />
        <!--按钮：展开高级搜索-->
        <el-tooltip
          v-if="items && items.length > 0"
          effect="dark"
          :content="showAdvanceSearch ? '关闭高级搜索' : '展开高级搜索'"
          placement="top"
        >
          <el-button
            size="mini"
            :icon="showAdvanceSearch ? 'el-icon-zoom-out' : 'el-icon-zoom-in'"
            @click="showAdvanceSearch = !showAdvanceSearch"
          />
        </el-tooltip>
        <!--按钮：列表-->
        <el-tooltip
          v-if="columns && columns.length > 0"
          effect="dark"
          content="列显示筛选"
          placement="top"
        >
          <el-dropdown trigger="click" :hide-on-click="false" class="advance-search">
            <!-- 列表按钮 -->
            <el-button size="mini" icon="el-icon-menu" />
            <el-dropdown-menu slot="dropdown">
              <el-checkbox-group v-model="checkColumnList" @change="columnsChange">
                <el-dropdown-item v-for="col in columns" :key="col.prop">
                  <el-checkbox :label="col.prop">
                    {{ col.label }}
                  </el-checkbox>
                </el-dropdown-item>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>
      </el-button-group>
      <!-- 按钮组后置插槽 -->
      <slot name="append-buttons" />
    </div>
  </div>
</template>

<script>
import FormWrap from "@/sewen-ui/element-ui/components/FormWrap";
export default {
  name: "AdvancedSearchWrap",
  components: {
    FormWrap,
  },
  props: {
    // 高级搜索项内容
    items: {
      type: Array,
      default: null,
    },
    // 查询参数
    listQuery: {
      type: Object,
      default: () => {},
    },
    // 列表按钮
    allColumns: {
      // 表头数据
      type: Array,
      default: () => [],
    },
    // 是否显示搜索框
    showButtonGroup: {
      type: Boolean,
      default: true,
    },
    // 输入框搜索初始值
    searchValue: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      search: "",
      showAdvanceSearch: true,
      checkColumnList: [],
      columns: this.allColumns,
    };
  },
  watch: {
    allColumns: {
      handler: function (newValue, oldValue) {
        this.columns = newValue;
        this.checkColumnList = [];
        newValue.map((item) => {
          if (item.checked === true) {
            this.checkColumnList.push(item.prop);
          }
        });
      },
      deep: true,
      immediate: true,
    },
    searchValue: {
      handler(val, oldVal) {
        if (val === oldVal) return;
        this.search = val;
      },
      immediate: true,
    },
  },
  methods: {
    // 显示列改变事件
    columnsChange(col) {
      const showColumn = [];
      this.columns.forEach((colItem) => {
        if (col.indexOf(colItem.prop) > -1) {
          showColumn.push(colItem);
        }
      });
      this.$emit("columnsChange", showColumn);
    },
    // 模糊搜索输入内容修改
    fuzzySearch() {
      this.$emit("fuzzySearch", { keyword: this.search });
    },
    // 输入框输入内容触发事件
    inputChange(value) {
      this.search = value && value.trim && value.trim();
      this.fuzzySearch();
    },
    // 高级搜索列表项内容改变触发事件
    formChange(value) {
      const { item, params } = value;
      this.$emit("formChange", {
        label: item.label,
        prop: item.prop,
        value: params,
        data: value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./advance-search.scss";
.advaced-search-container {
  transition: display 1s;
  border: 1px solid $borderBase;
  color: $regularText;
  font-size: $fontSizePrimary;
  padding: 0px 10px 0px 0px;
  // margin-bottom: 5px;
  .advaced-search-buttons {
    transition: display 1s;
    &::v-deep .form-item-required .el-form-item__label:before {
      content: "*" !important;
      color: #f56c6c;
      margin-right: 4px;
    }
    &::v-deep .el-form-item__label::after {
      content: "" !important;
    }
    // margin-top: 5px;
  }
  &::v-deep .form-buttons {
    position: absolute;
    // right: 0;
  }
  &::v-deep .el-form-item {
    margin-bottom: 0px;
  }
  &::v-deep .clear-margin {
    .el-form-item__content {
      margin: 0px !important;
    }
  }
  &::v-deep .el-form-item__label {
    font-size: $fontSizePrimary;
  }
  &::v-deep .el-input__inner {
    color: $primary;
  }
  &::v-deep .el-form-item--medium .el-form-item__label {
    line-height: 30px;
  }
  .search-container {
    display: flex;
    justify-content: flex-start;
    .search-button {
      width: $advancedSearchButtonLength;
      margin-right: 8px;
    }
    &::v-deep .el-input__inner {
      width: $advancedSearchButtonLength;
    }
  }
  .el-button-group {
    width: 100%;
  }
  .product-type-check-container {
    display: inline-block;
    margin-left: 15px;
    line-height: 29px;
  }
  &::v-deep .el-col-4 {
    padding: 0px 4px 0px 0px !important;
  }
  &::v-deep .el-col-3 {
    padding: 0px 4px 0px 0px !important;
  }
  &::v-deep .el-form-item__label {
    padding: 5px !important;
  }
  &::v-deep .el-select__tags {
    max-width: inherit !important;
  }
}
.hidden-advaced-search {
  border: none;
  margin: 0 !important;
  padding: 0;
  &::v-deep .advaced-search-buttons {
    display: none;
  }
  &::v-deep .search-container {
    margin: 0 !important;
  }
}
.search-container {
  float: right;
  margin-right: -10px;
  &::v-deep .el-button-group {
    display: flex;
  }
}
.el-button-group > .el-button {
  float: none;
}
.el-button-group > .el-button:not(:last-child) {
  margin-right: 0px;
}

@media screen and (min-width: 800px) and (max-width: 1380px) {
  @include advanceSearch(1280);
}
@media screen and (min-width: 1381px) and (max-width: 1920px) {
  @include advanceSearch(1920);
}
@media screen and (min-width: 1921px) {
  @include advanceSearch(1921);
}
</style>
