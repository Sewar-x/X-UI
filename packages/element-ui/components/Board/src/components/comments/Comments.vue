<template>
  <div class="comments-container" :style="{ width: width, minHeight: height }">
    <div class="info-container">
      <slot name="avater">
        <avatar
          class="avater"
          :username="data.user"
          :size="18"
          background-color="#409EFF"
          color="#fff"
        />
      </slot>
      <slot name="info">
        <span class="user">{{ data.user }}</span>
        <span class="time">{{ data.time }}</span>
      </slot>
      <el-tag
        v-if="data.major"
        :color="data.color"
        :class="{ 'border-hidden': !!data.color }"
        class="tag major"
        effect="dark"
        type="warning"
        size="mini"
      >
        {{ data.major }}
      </el-tag>
      <el-tag
        v-if="data.status && data.status !== 0"
        class="tag status border-hidden"
        effect="dark"
        :type="getStatusTag(data.status, 'type')"
        size="mini"
      >
        {{ getStatusTag(data.status, "label") }}
      </el-tag>
      <slot name="tag-append" />
      <slot name="header-append">
        <div class="header-append">
          <i v-if="showEdit" class="el-icon-edit" @click.stop="$emit('edit')" />
        </div>
        <div class="header-append">
          <i v-if="showDelete" class="el-icon-delete" @click.stop="$emit('delete')" />
        </div>
      </slot>
    </div>

    <div class="comments-wrap">
      <slot name="content-prefix" :data="data" />
      <slot name="content" :data="data">
        <div @click="richTextHandlerCallBack" v-html="data.comment" />
      </slot>
      <slot name="content-append" :data="data" />
    </div>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
import { getValueByPath } from "@/sewen-ui/element-ui/utils/index.js";
export default {
  name: "Components",
  components: {
    Avatar,
  },
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          user: "user",
          time: "time",
          major: "major",
          comment: "comment",
        };
      },
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "80px",
    },
    // 是否接收富文本内容事件
    openEvent: {
      type: Boolean,
      default: false,
    },
    showDelete: {
      type: Boolean,
      default: false,
    },
    // 是否显示编辑按钮
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    richTextHandlerCallBack(event) {
      if (!this.openEvent) return;
      // 获取富文本中 <a project_id="项目id"> 标签中自定义的 project_id 属性，通过点击事件传出id参数
      const { innerText } = event.target;
      const { project_id } = getValueByPath(event, "target.attributes");
      const id = project_id && project_id.value;
      this.$emit("projectLinkHandler", {
        id,
        number: innerText,
      });
    },
    getStatusTag(status, key) {
      const statusMap = {
        1: {
          label: "正常",
          value: 1,
          type: "primary",
        },
        2: {
          label: "预警",
          value: 2,
          type: "warning",
        },
        3: {
          label: "延误",
          value: 3,
          type: "danger",
        },
        4: {
          label: "完成",
          value: 4,
          type: "success",
        },
      };
      return statusMap[status][key];
    },
  },
};
</script>

<style lang="scss" scoped>
.comments-container {
  background-color: #f5f5f569;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  padding: 5px;
  margin-bottom: 5px;
  .info-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    .user {
      font-size: 12px;
      margin: 0 5px;
      font-weight: 600;
    }
    .time {
      font-size: 12px;
      margin: 0 5px;
      color: #e6a23c;
    }

    .status {
      margin-left: 5px;
    }
  }
  .comments-wrap {
    padding: 1px 0px 0px 22px;
    &::v-deep p {
      font-size: 16px;
      margin: 2px 0;
      font-weight: 500;
    }
  }
}
.tag {
  padding: 0px 1px;
  height: 18px;
  line-height: 18px;
  max-width: 60%;
}
.border-hidden {
  border: none;
}
.header-append {
  cursor: pointer;
  margin-left: 15px;
  .el-icon-delete .el-icon-edit {
    font-size: 16px;
    &:hover {
      color: #409eff;
    }
  }
}
.el-icon-delete {
  position: relative;
  left: 360px;
}
</style>
