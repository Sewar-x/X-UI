<!-- 弹框 -->
<template>
  <div>
    <el-dialog
      ref="dragContentDialogWrap"
      :close-on-click-modal="false"
      :title="dialogTitleEdit"
      :visible="dialogVisible"
      top="10vh"
      width="1250px"
      @close="$emit('close')"
      destroy-on-close
    >
      <div class="board-item">
        <!-------------------------左边------------------------->
        <div class="board-left">
          <!-- 内容展示区域 -->
          <slot name="DragContentDialogMsg" />
        </div>

        <!-------------------------右边------------------------->
        <div class="board-right">
          <!-- 展示已有评论 -->
          <infinite-scroll
            ref="digitalCommentScroll"
            :list-method="getDiscussionList"
            :params="commentListParams"
            :height="height"
            item-key="id"
            class="comment-list"
          >
            <template slot="item" slot-scope="scrop">
              <div class="comment-container">
                <comments
                  :show-delete="scrop.data.is_oper"
                  :data="scrop.data"
                  width="550px"
                  @delete="deleteComments(scrop.data)"
                />
              </div>
            </template>
          </infinite-scroll>
          <!-- 添加评论 -->
          <div class="comments-input-wrapper">
            <!-- 富文本编辑器 -->
            <Tinymce id="digitalEditor" ref="editor" v-model="comments" height="100px" />
            <div class="submit-button-wrapper">
              <el-button
                class="submit-button"
                size="mini"
                type="primary"
                @click.native="addComments"
                >提交</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TopContent from "./components/card/TopContent.vue";
import Comments from "./components/comments/Comments.vue";
import InfiniteScroll from "./components/comments/InfiniteScrollWrap.vue";
import Tinymce from "@/xw-ui/element-ui/components/Tinymce";

export default {
  name: "DragContentDialog",
  components: {
    TopContent,
    Comments,
    InfiniteScroll,
    Tinymce,
  },
  props: {
    // 元素信息
    element: {
      type: Object,
      default: null,
    },
    // 是否可见
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    // 弹框标题
    dialogTitleEdit: {
      type: String,
      default: "反馈内容",
    },
    // 评论区模块类型
    // 1：项目计划、2：项目任务、3：项目子任务、4：软件测试、5：、6：意见箱、7：问题点、8：数字化任务、9：数字化项目、10：硬件开发任务
    discussionType: {
      type: Number,
      default: null,
    },
    getDiscussionList: {
      type: Function,
      default: null,
    },
    // 是否刷新评论区
    isRefreshComments: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogformData: {},
      commentListParams: {
        link_id: null,
        page_size: 15,
        type: this.discussionType,
        comment: null,
      },
      comments: null,
      height: "500px",
    };
  },
  computed: {
    dialogItems() {
      return [];
    },
  },
  watch: {
    element: {
      handler(value) {
        this.commentListParams.link_id = value.id;
        this.refreshComment(true);
      },
      deep: true,
    },
    isRefreshComments: {
      handler(value) {
        if (value == true) {
          this.refreshComment();
        }
      },
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 清空评论框
    clearContent() {
      this.comments = null;
      this.$refs.editor.clearContent();
    },
    // 刷新评论
    async refreshComment(value) {
      if (value === null) {
        this.commentListParams.link_id = null;
      }
      this.$refs.digitalCommentScroll && this.$refs.digitalCommentScroll.load(true);
    },
    // 添加评论
    async addComments() {
      this.$emit("addComments", this.commentListParams, this.comments);
      this.clearContent();
    },
    // 删除评论
    async deleteComments(data) {
      this.$emit("deleteComments", data.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.board-left,
.board-right {
  padding: 10px;
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }
  /*正常情况下滑块的样式*/
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    box-shadow: inset1px1px0rgba(0, 0, 0, 0.1);
  }
  /*鼠标悬浮在该类指向的控件上时滑块的样式*/
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-shadow: inset1px1px0rgba(0, 0, 0, 0.1);
  }
  /*鼠标悬浮在滑块上时滑块的样式*/
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: inset1px1px0rgba(0, 0, 0, 0.1);
  }
  /*正常时候的主干部分*/
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset006pxrgba(0, 0, 0, 0);
    background-color: white;
  }
  /*鼠标悬浮在滚动条上的主干部分*/
  &::-webkit-scrollbar-track:hover {
    box-shadow: inset006pxrgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.01);
  }
}
.board-item {
  display: flex;
  flex: 1;
  width: 100%;
  height: 700px;
  background-color: #fff;
  text-align: left;
  line-height: 24px;
  padding: 5px 10px;
  box-sizing: border-box;
  .type-tag {
    display: block;
    width: 70px;
  }
  span {
    display: block;
  }
  &::v-deep .number {
    display: inline-block;
    margin-right: 5px;
  }
  &::v-deep .type-tag {
    display: inline-block;
  }
  &::v-deep .content {
    display: block;
  }
  &::v-deep .image {
    height: 50px;
    width: 50px;
  }
  &::v-deep .list {
    padding: 0;
  }
  &::v-deep .tag-user {
    margin: 5px 0;
  }
  &::v-deep .project-name {
    color: #7c7a7a;
  }
  &::v-deep .button-class {
    display: flex;
    float: inline-end;
  }
  .submit-button-wrapper {
    margin: 5px 0;
    display: flex;
    justify-content: flex-end;
  }
  .comment-list {
    display: block;
    width: 100%;
  }
  .comment-container {
    margin: 10px 0px;
  }
  .delete-class {
    width: 100%;
  }
  .comments-input-wrapper {
    margin-top: 10px;
  }
}
</style>
