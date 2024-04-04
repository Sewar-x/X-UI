<template>
  <el-upload
    v-model:file-list="fileList"
    :action="options.attr?.action"
    :method="options.attr?.method"
    :multiple="options.attr?.multiple"
    :data="params"
    :with-credentials="options.attr?.withCredentials"
    :show-file-list="options.attr?.showFileList"
    :drag="options.attr?.drag"
    :accept="options.attr?.accept"
    :list-type="options.attr?.listType"
    :auto-upload="options.attr?.autoUpload"
    :disabled="options.attr?.disabled"
    :limit="options.attr?.limit"
  >
    <template #trigger v-if="options.triggerSlotConfig || options.triggerSlotName">
      <BasicComponent
        v-if="options.triggerSlotConfig"
        :options="options.triggerSlotConfig"
      />
      <slot v-if="options.triggerSlotName" :name="options.triggerSlotName"></slot>
    </template>
    <template #default v-if="options.defaultSlotConfig || options.defaultSlotName">
      <BasicComponent
        v-if="options.defaultSlotConfig"
        :options="options.defaultSlotConfig"
      />
      <slot v-if="options.defaultSlotName" :name="options.defaultSlotName"></slot>
    </template>
    <template #tip v-if="options.tipSlotConfig || options.tipSlotName">
      <BasicComponent v-if="options.tipSlotConfig" :options="options.tipSlotConfig" />
      <slot v-if="options.tipSlotName" :name="options.tipSlotName"></slot>
    </template>
    <template v-if="options.fileSlotName" #file="{ file }">
      <slot :name="options.fileSlotName" :file="file"></slot>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import type { UploadType } from "../type";
import type { UploadUserFile, UploadFile, UploadFiles } from "element-plus";

const props = defineProps<{
  params: Recordable;
  options: UploadType;
  getFiles: Function;
}>();

const fileList = ref<UploadUserFile[]>();

onBeforeMount(async () => {
  fileList.value = await getFiles(props.params);
});

/* const onPreview = (uploadFile: UploadFile) => {
    props.options.attr?.onPreview && props.options.attr?.onPreview(uploadFile, props.params)
  } */
</script>

<style scoped lang="less"></style>
