import type { Ref } from "vue";
import type { UploadFile, UploadFiles } from "element-plus";
interface UploadAttrType {
  action: {
    type: String;
    default: "";
  }
  method: {
    type: String;
    default: "post";
  };
  multiple: {
    type: Boolean;
    default: false;
  };
  withCredentials: {
    type: Boolean;
    default: true;
  };
  showFileList: {
    type: Boolean;
    default: true;
  };
  drag: {
    type: Boolean;
    default: true;
  };
  accept: {
    type: String;
    default: `application/vnd.openxmlformats-officedocument.wordprocessingml.document,
              application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
              application/msword,application/pdf,
              image/gif,image/jpeg,image/jpg,image/png
              aplication/zip、application/x-compressed`;  // *.docx、*.xlsx、*.doc，*.dot、*pdf、*.gif、*.jpg、*.jpeg、*.png、*.zip
  };
  listType: {
    type: "text" | "picture" | "picture-card";
    default: "text";
  };
  autoUpload: {
    type: Boolean;
    default: true;
  };
  disabled: {
    type: Boolean;
    default: false;
  };
  limit: {
    type: Number;
    default: 5;
  };
  onPreview: {
    type: (uploadFile: UploadFile, params: Recordable) => void;
  };

}

export interface UploadType {
  ref?: Ref<T>;
  attr?: UploadAttrType;
  defaultSlotConfig?: CompType;
  defaultSlotName?: String;
  triggerSlotConfig?: CompType;
  triggerSlotName?: String;
  tipSlotConfig?: CompType;
  tipSlotName?: String;
  fileSlotName?: CompType;
}
