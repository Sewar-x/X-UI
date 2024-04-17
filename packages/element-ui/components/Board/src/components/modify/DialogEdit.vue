<template>
  <div class="top-content-wrap">
    <div class="top-content-header">
      <el-checkbox
        v-model="editFormData.check"
        @change="$emit('changeCheck', editFormData)"
      ></el-checkbox>
      <!-- ---------------------- 左侧信息区域 ---------------------->
      <div class="left-content-area">
        <div v-if="!showEditArea">
          <div class="header-content-dialog">
            <span class="header-title">{{ editFormData.title }}</span>
            <i @click="openEditArea" size="mini" class="el-icon-edit icon-class"></i>
          </div>
          <!-- <div v-for="(item, index) in editFormData.attachment" 
            :key="index"
            class="items-img">
            <el-image
              v-if="item.url && item.type!=='file'"
              class="image"
              :src="item.url"
              :preview-src-list="editFormData.srcList"
            />
          </div> -->
        </div>
        <!-- 任务信息在弹框里面-非编辑状态 -->
        <ul class="ul-class" v-if="!showEditArea">
          <div v-for="(row, rowIndex) in dialogEditItems" :key="rowIndex">
            <li v-for="(item, index) in row" :key="index">
              <div class="content-list-area-dialog" v-if="!item.noShow">
                <span class="require-class" :class="{ 'hidden-star': !item.required }">
                  *
                </span>
                <i :class="item.icon" class="icon-class-dialog" />
                <span class="label-class">{{ item.label }}</span>
                <span v-if="!item.slotName">{{ editFormData[item.props] }}</span>
                <slot v-if="item.slotName" :name="item.slotName" />
              </div>
            </li>
          </div>
        </ul>
        <!-- 任务信息在弹框里面-编辑状态 -->
        <ul class="ul-class" v-else>
          <div v-for="(row, rowIndex) in dialogEditItems" :key="rowIndex">
            <li v-for="(item, index) in row" :key="index">
              <div class="content-list-area-dialog" v-if="!item.noChange">
                <span class="require-class" :class="{ 'hidden-star': !item.required }">
                  *
                </span>
                <i :class="item.icon" class="icon-class-dialog" />
                <span class="label-class">{{ item.label }}</span>
                <div>
                  <component
                    v-if="item.options"
                    :is="
                      typeof item.options.comp === 'string'
                        ? item.options.comp
                        : `${item.options.comp}`
                    "
                    :ref="item.options.ref"
                    v-model="editFormData[item.props]"
                    v-bind="item.options.attr"
                    v-on="item.options.listeners || {}"
                  >
                    <div
                      v-if="item.options.children && item.options.children.length !== 0"
                    >
                      <BasicComponent
                        v-for="(chilOpt, index) of item.options.children"
                        :key="index"
                        :options="chilOpt"
                      />
                    </div>
                    <template v-if="item.options.content">
                      {{ item.options.content }}
                    </template>
                  </component>
                  <slot v-if="item.slotName && !item.options" :name="item.slotName" />
                </div>
              </div>
            </li>
          </div>
        </ul>
        <!-- 按钮 -->
        <div class="button-class" v-if="showEditArea">
          <el-button size="mini" type="primary" @click="submitEdit(editFormData)"
            >提交</el-button
          >
          <el-button size="mini" @click="closeEdit()">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicComponent from "@/xw-ui/element-ui/components/BasicComponent";

export default {
  name: "DialogContent",
  components: {
    BasicComponent,
  },
  props: {
    // 编辑表单数据
    editFormData: {
      type: Object,
      default: () => {},
    },
    // 编辑表单配置
    dialogEditItems: {
      type: Array,
      default: () => [],
    },
    // 编辑区是否可见
    editVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 是否显示编辑框
      showEditArea: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    editVisible: {
      handler(value) {
        this.showEditArea = value;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 显示编辑区域
    openEditArea() {
      this.showEditArea = true;
      this.$emit("changeEdit", this.showEditArea, this.editFormData);
    },
    // 提交编辑
    submitEdit(editFormData) {
      this.$emit("submitEdit", editFormData);
    },
    // 取消编辑
    closeEdit() {
      this.showEditArea = false;
      this.$emit("changeEdit", this.showEditArea, this.editFormData);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-content-wrap {
  width: 100%;
  border-right: 1px solid #eee;
}

.left-content-area {
  width: 100%;
}

.number {
  display: inline-block;
  width: 18px;
  height: 18px;
  text-align: center;
  border-radius: 50%;
  font-size: 12px;
  margin-right: 3px;
}

.title {
  color: #7c7a7a;
  font-weight: 600;
}

.icon-class {
  display: flex;
  float: inline-end;
  cursor: pointer !important;
  padding: 10px;
}

.header-content-dialog {
  display: flex;
  justify-content: space-between;
}

.header-title {
  font-size: 18px;
  margin-left: 20px;
  overflow: hidden;
  color: #373737;
  width: 90%;
}

.items-img {
  margin-left: 20px;
  margin-top: 10px;
  display: inline-block;
}

.image {
  height: 110px;
  width: 110px;
}

.top-content-header {
  display: flex;
  justify-content: space-between;
}

.content-list-area-dialog {
  display: ruby-text;
  font-size: 13px;
  line-height: 35px;
}

.icon-class-dialog {
  width: 20px;
  margin-right: 15px;
}

.label-class {
  width: 100px;
  display: block;
}

.ul-class {
  list-style: none;
  margin-left: -20px;
}

.button-class {
  width: 100%;
  display: block !important;
  text-align: right;
  margin: 10px 50px;
}
.el-select {
  width: 220px !important;
}
.require-class {
  color: red;
  display: inline-block;
  width: 10px;
}
.hidden-star {
  opacity: 0;
}
</style>
