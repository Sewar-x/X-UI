<template>
  <el-upload
    ref="uploadComponent"
    :data="formData"
    :action="doUpload"
    :headers="headerFiles"
    :multiple="multiple"
    :before-upload="beforeUpload"
    v-bind="$attrs"
    :accept="acceptType"
    :class="{ 'file-upload-container': showType === 'icons' }"
    v-on="$listeners"
  >
    <slot name="pre-content" />
    <div v-if="showType === 'icons' && showUpload" class="file-upload-icons-container">
      <i class="el-icon-upload" :style="styles" />
      <div class="el-upload__text">
        <span v-if="$attrs.drag">拖拽</span>
        <em>上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">支持扩展名:{{ acceptType }}</div>
    </div>
    <el-button v-if="showType === 'buttons' && showUpload" :size="size" type="primary"
      >上传</el-button
    >
    <slot name="after-content" />
  </el-upload>
</template>

<script>
export default {
  name: "FileUploadWrap",
  props: {
    baseApi: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    // 是否显示上传按钮
    showUpload: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    catalog: {
      type: String,
      default: "temp",
    },
    acceptType: {
      // 注意：需要将接受文件类型列出，拖拽上传才有效；否则拖拽上传无效
      type: String,
      default: "*",
    },
    // 内容显示类型: buttons(按钮上传)、icons (图标拖拽)
    showType: {
      type: String,
      default: "buttons",
    },
    styles: {
      type: Object,
      default: () => {},
    },
    size: {
      type: String,
      default: "small",
    },
  },
  data() {
    return {
      headerFiles: {
        accessToken: this.token,
      },
      doUpload: this.baseApi + "/api/uploads",
      formData: {
        type: "",
        catalog: this.$props.catalog,
      },
    };
  },

  beforeDestroy() {
    this.$refs.uploadComponent.clearFiles();
  },
  methods: {
    beforeUpload(file) {
      const isIMG =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png";
      const fileName = file.name;
      const fileType = fileName.substring(fileName.lastIndexOf("."));
      const acceptArr = this.acceptType.split(",");
      if (this.acceptType !== "*" && acceptArr.indexOf(fileType) === -1) {
        this.$message({
          message: this.$t("systemMessage.fileAccept"),
          type: "warning",
        });
      }
      if (isIMG) {
        this.formData.type = "image";
      } else {
        this.formData.type = "file";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.file-upload-container {
  width: 100%;

  &:hover {
    border-color: #409eff;
  }

  padding: 5px;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::v-deep .el-icon-upload {
    font-size: 75px;
  }

  &::v-deep .el-upload-dragger {
    width: 100%;
    border: none;
  }
}
</style>
