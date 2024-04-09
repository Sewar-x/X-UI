<template>
  <el-dialog
    ref="dragContentDialogAdd"
    :close-on-click-modal="false"
    :title="dialogTitleAdd"
    :visible="addVisible"
    top="10vh"
    width="700px"
    @close="$emit('closeAdd')"
    destroy-on-close
  >
    <slot name="DragContentAddItems" />
  </el-dialog>
</template>

<script>
import DialogAdd from "./components/modify/DialogAdd.vue";

export default {
  name: "DragContentAdd",
  components: {
    DialogAdd,
  },
  props: {
    // 是否可见
    addVisible: {
      type: Boolean,
      default: false,
    },
    // 弹框标题
    dialogTitleAdd: {
      type: String,
      default: "新增",
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.content-list-area-dialog {
  display: ruby;
  font-size: 15px;
  line-height: 45px;
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
}
.button-class {
  width: 100%;
  text-align: right;
  padding: 10px 20px;
}
</style>
