<template>
  <!-- 富文本，tinymce 文档：http://tinymce.ax-z.cn/ -->
  <div class="tinymce-container" :class="{ fullscreen: fullscreen }">
    <editor
      :id="tinymceId"
      v-model="content"
      :init="init"
      :style="{ width: containerWidth }"
    />
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import plugins from "./plugins";
import toolbar from "./toolbar";
import "tinymce/themes/silver/theme";
import "tinymce/icons/default/icons";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
export default {
  name: "XTinymce",
  components: {
    Editor,
  },
  props: {
    host: {
      type: String,
      default: "/",
    },
    id: {
      type: String,
      default: function () {
        return "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "");
      },
    },
    value: {
      type: String,
      default: "",
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    menubar: {
      type: String,
      default: "file edit insert view format table",
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360,
    },
    width: {
      type: [Number, String],
      required: false,
      default: "auto",
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      content: this.value,
    };
  },
  computed: {
    // 初始化配置
    init() {
      return {
        base_url: `${this.host}/tinymce`,
        selector: `#${this.tinymceId}`,
        language_url: `${this.host}/tinymce/langs/zh_CN.js`,
        language: "zh_CN",
        placeholder: this.placeholder,
        skin_url: `${this.host}/tinymce/skins/ui/oxide`,
        content_css: `${this.host}/tinymce/skins/content/document/content.css`,
        height: 400,
        body_class: "panel-body tinymce-body-content", // 自定义内容样式文档：http://tinymce.ax-z.cn/configure/content-appearance.php
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: false, // 隐藏最上方menu
        // Detail plugins list see https://www.tinymce.com/docs/plugins/
        plugins: plugins,
        branding: false, // 去水印
        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        paste_data_images: true, // 允许粘贴图像
        fontsize_formats: "12px 14px 16px 18px 20px 24px 26px 28px 30px 32px 36px", // 字体大小
        code_dialog_height: "100%",
        code_dialog_width: "100%",
        advlist_number_styles: "default",
        default_link_target: "",
        link_title: false,
        auto_focus: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: (editor) => {
          this.hasInit = true;
          editor.on("NodeChange Change KeyUp SetContent", () => {
            this.hasChange = true;
            this.$emit("input", editor.getContent());
          });
        },
        setup(editor) {
          editor.on("FullscreenStateChanged", (e) => {
            this.fullscreen = e.state;
          });
        },
      };
    },
    containerWidth() {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) {
        return `${width}px`;
      }
      return "100%";
    },
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => {
          this.content = val;
          this.$emit("input", val);
        });
      }
    },
  },
  mounted() {
    tinymce.init(this.init);
    this.addPlaceHoldersPlugin();
  },
  methods: {
    clearContent() {
      this.content = null;
      this.$emit("update:value", null);
    },
    setContent(data) {
      this.content = data;
    },
    addPlaceHoldersPlugin() {
      tinymce.PluginManager.add("placeholder", function (editor) {
        editor.on("init", function () {
          const label = new Label();

          onBlur();

          tinymce.DOM.bind(label.el, "click", onFocus);
          editor.on("focus", onFocus);
          editor.on("blur", onBlur);
          editor.on("change", onBlur);
          editor.on("setContent", onBlur);
          editor.on("keydown", onKeydown);

          function onFocus() {
            if (!editor.settings.readonly === true) {
              label.hide();
            }
            editor.execCommand("mceFocus", false);
          }

          function onBlur() {
            if (editor.getContent() === "") {
              label.show();
            } else {
              label.hide();
            }
          }

          function onKeydown() {
            label.hide();
          }
        });

        const Label = function () {
          const placeholder_text =
            editor.getElement().getAttribute("placeholder") ||
            editor.settings.placeholder;
          const placeholder_attrs = editor.settings.placeholder_attrs || {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              color: "#888",
              padding: "15px",
              width: "100%",
              overflow: "hidden",
              "white-space": "pre-wrap",
            },
          };
          const contentAreaContainer = editor.getContentAreaContainer();

          tinymce.DOM.setStyle(contentAreaContainer, "position", "relative");

          // Create label el
          this.el = tinymce.DOM.add(
            contentAreaContainer,
            editor.settings.placeholder_tag || "label",
            placeholder_attrs,
            placeholder_text
          );
        };

        Label.prototype.hide = function () {
          tinymce.DOM.setStyle(this.el, "display", "none");
        };

        Label.prototype.show = function () {
          tinymce.DOM.setStyle(this.el, "display", "");
        };
      });
    },
  },
};
</script>
<style scoped lang="scss">
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
