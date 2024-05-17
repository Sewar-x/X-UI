<template>
  <div class="container">
    <div v-if="!pdfURL" :id="id" class="onlyoffice-viewer" />
    <!--如果查看的是 pdf 文件，直接使用 iframe 打开 pdf 文件-->
    <div v-else class="pdf-viewers">
      <iframe id="pdfReview" :src="pdfURL" frameborder="0" height="100%" width="100%" />
    </div>
  </div>
</template>
<script>
import { onlyofficeGlobalvar } from "./settings.js";
import { parallelLoadScripts } from "./utils.js";
import { getFileType } from "./utils";
import configure from "./config.js";
const OnlyOfficeSetting = onlyofficeGlobalvar.setting;
export default {
  name: "OnlyOffice",
  props: {
    // 文件配置选项
    fileOption: {
      type: Object,
      default: () => {
        return {
          url: null, // 文件url
          title: null, // 文档标题
          callbackUrl: null, // 编辑word后保存时回调的地址
          attachment_id: null, // 文档id, 必填
        };
      },
    },
    // 转换格式： pdf、xls
    convertTo: {
      type: String,
      default: null,
    },
    uid: {
      type: [String, Number],
      defalut: null,
      required: true,
    },
    userName: {
      type: String,
      defalut: null,
      required: true,
    },
  },
  data() {
    return {
      id: "onlyofficeViewer",
      pdfURL: null,
    };
  },
  computed: {
    // 当前用户信息
    user() {
      return {
        id: this.uid,
        name: this.userName,
      };
    },
  },
  watch: {
    // 监听路由参数变化，通过路由参数获取 onlyoffice 参数
    $route: {
      handler(newVal) {
        const { attachment_id } = newVal.query;
        if (!attachment_id) return;
        this.init(newVal.query);
      },
      // 深度观察监听
      deep: true,
      immediate: true,
    },
    // 监听参数变化
    fileOption: {
      handler: function (val) {
        const { attachment_id = null, id = null } = val;
        if (!attachment_id || !id) return;
        this.init(val);
      },
      immediate: true,
      deep: true,
    },
  },
  created() {},
  mounted() {},
  destroyed() {
    // this.setReferrerPolicy(2)
  },
  methods: {
    async init(fileOption) {
      const fileType = getFileType(fileOption.url);
      // pdf 类型文件直接使用 iframe 文件预览
      if (fileType === "pdf") {
        this.pdfURL = `${OnlyOfficeSetting.SITE_URL}${fileOption.url}`;
        return false;
      }
      const that = this;
      // 将 Referrer Policy 设置为 no-referrer，表示不发送 Referer 头部字段
      // this.setReferrerPolicy(1)
      // 并行加载脚本
      parallelLoadScripts([configure.DOCUMENT_SERVER_API], { removeTag: false }, () => {
        that.initConfigure(fileOption);
      });
    },

    // 初始化 onlyoffice 配置
    async initConfigure(fileOption) {
      const that = this;
      const config = await configure.getEditorConfigure(
        Object.assign({}, fileOption, {
          user: this.user,
        })
      );
      if (!config.token) return;
      window.docEditor = new window.DocsAPI.DocEditor(that.id, config);
    },

    // 设置 http 头部 Referrer Policy
    setReferrerPolicy(type = 2) {
      const typeMap = {
        1: "no-referrer", // 表示不发送 Referer 头部字段
        2: "strict-origin-when-cross-origin",
      };
      // 设置 Referrer Policy,表示不发送 Referer 头部字段
      document.referrerPolicy = typeMap[type];
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .pdf-viewers {
    height: 100vh;
  }
}
.onlyofficeV-vewer {
  height: 700px;
}
.forbid-model {
  width: calc(100vw - 100px);
  height: calc(100vh - 130px);
  position: fixed;
  top: 110px;
  bottom: 30px;
  left: 50px;
  right: 50px;
}
.nondisplay-model {
  display: none;
}
</style>
