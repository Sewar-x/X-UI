<!-- 一个纵列 -->
<template>
  <div class="board-column">
    <!-- 所在列的标题 -->
    <div
      :style="{ background: `${bgColor}`, width: `${headerWidth}` }"
      class="board-column-header"
    >
      {{ headerText }}({{ list.length }})
    </div>
    <!-- 各个子元素 -->
    <draggable
      :list="list"
      v-bind="$attrs"
      class="board-column-content"
      :set-data="setData"
      @change="change"
    >
      <div v-for="element in list" :key="element.id" class="board-item">
        <DragContent
          :element="element"
          @toShowContent="showContent(element)"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <template slot="DragContentMsg">
            <slot name="DragContentItems" :element="element" />
          </template>
        </DragContent>
      </div>
    </draggable>

    <!-- 弹框 -->
    <drag-content-dialog
      :dialogVisible="dialogVisible"
      :element="showContentsData"
      v-bind="$attrs"
      v-on="$listeners"
      @close="close"
    >
      <template slot="DragContentDialogMsg">
        <slot name="DragContentDialogMsg" :element="showContentsData" />
      </template>
    </drag-content-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import DragContent from "./DragContent.vue";
import DragContentDialog from "./DragContentDialog.vue";

export default {
  name: "DragKanbanDemo",
  components: {
    draggable,
    DragContent,
    DragContentDialog,
  },
  props: {
    // 列头部标题内容
    headerText: {
      type: String,
      default: "Header",
    },
    // 列头部标题宽度
    headerWidth: {
      type: String,
      default: "",
    },
    // 列头部标题背景颜色
    bgColor: {
      type: String,
      default: "#4A9FF9",
    },
    // 每一列的数据
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    // 列key
    columnKey: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dialogVisible: false,
      showContentsData: {},
    };
  },
  mounted() {},
  methods: {
    // 改变拖拽列
    change(evt) {
      const params = {
        key: this.columnKey,
        data: evt.added.element,
      };
      this.$emit("change", params);
    },
    // 拖拽结束
    setData(dataTransfer) {
      dataTransfer.setData("Text", "");
    },
    // 传送element并显示内容
    showContent(element) {
      this.showContentsData = element;
      this.$emit("showContent", element);
      this.dialogVisible = true;
    },
    close() {
      this.$emit("update:editVisible", false);
      this.dialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.board-column {
  max-height: 100%;
  min-height: 150px;
  height: auto;
  overflow: auto;
  background: #f0f0f0;
  border-radius: 3px;
  flex: 1;

  .board-column-header {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    color: #fff;
    border-radius: 3px 3px 0 0;
    z-index: 100;
    position: absolute;
    text-align: center;
  }

  .board-column-content {
    height: auto;
    overflow: auto;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;

    .board-item {
      border-radius: 10px;
      overflow: auto;
      cursor: pointer;
      width: 100%;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      padding: 1px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);

      .type-tag {
        display: block;
        width: 70px;
      }

      span {
        display: block;
      }
    }

    .items-img {
      display: block;
    }

    .image {
      height: 50px;
      width: 50px;
    }

    .tag-user {
      width: 120px;
    }
  }
}
</style>
