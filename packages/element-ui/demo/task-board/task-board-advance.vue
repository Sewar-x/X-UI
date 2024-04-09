<template>
  <div class="app-container">
    <!-- 高级搜索 -->
    <div class="filter-container">
      <advanced-search
        ref="DigitalAdvanceSearch"
        :items="advanceSearchItems"
        :list-query="listQuery"
        @search="advanceSearch"
        @refresh="refresh($event)"
        @fuzzySearch="fuzzySearch"
        @queryChange="queryChange"
        @formChange="advancedSearchFormChange"
      >
        <template slot="append-buttons">
          <div class="buttons-container">
            <el-tooltip effect="dark" content="列表视图" placement="top">
              <el-button
                class="buttons"
                size="mini"
                icon="el-icon-document"
                @click.native="() => viewsChange('table')"
              />
            </el-tooltip>
            <el-tooltip effect="dark" content="看板视图" placement="top">
              <el-button
                class="buttons"
                size="mini"
                icon="el-icon-s-flag"
                @click.native="() => viewsChange('XTaskBoard')"
              />
            </el-tooltip>
          </div>
        </template>
      </advanced-search>
    </div>
    <!-- 看板 -->
    <div class="XTaskBoard-container">
      <XTaskBoard
        ref="digitalBoard"
        :columnData="columnData"
        :columnItems="columnItems"
        :discussionType="8"
        :project="project"
        :dialogTitleEdit="dialogTitleEdit"
        :dialogTitleAdd="dialogTitleAdd"
        :statisticItems="statisticItems"
        :statisticButtons="statisticButtons"
        :addVisible="addVisible"
        :editVisible="editVisible"
        :isRefreshComments="isRefreshComments"
        :getDiscussionList="getDiscussionList"
        @addComments="addComments"
        @deleteComments="deleteComments"
        @showContent="showContent"
        @closeAdd="closeAdd"
        @changeCheck="changeCheck"
        @digitalTaskCopy="digitalTaskCopy"
        @digitalTaskArchive="digitalTaskArchive"
        @digitalTaskDelete="digitalTaskDelete"
        @openApplyDialog="openApplyDialog"
        @change="change"
      >
        <!-------------------------- 新增弹框插槽 -------------------------->
        <template slot="DragContentDialogAdd">
          <DialogAdd
            :dialogAddItems="dialogEditItems"
            :addFormData="formData"
            @submitAdd="submitAdd"
            @closeAdd="closeAdd"
          >
            <template slot="title-slot">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入标题"
                v-model="formData.title"
                resize="none"
                class="textarea-class"
              >
              </el-input>
            </template>
            <template slot="content-slot">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="formData.content"
                resize="none"
                class="textarea-class"
              />
            </template>
            <template slot="childTask-slot">
              <ChildTask
                :taskList="formData.subtask"
                :width="width"
                :showEdit="true"
                @addTask="addTaskAdd"
                @delTask="delTaskAdd"
              />
            </template>
            <template slot="attach-slot">
              <file-upload
                class="attach-class"
                v-bind="filesUploadAttr"
                :fileList="formData.attachment"
                :on-success="
                  (response, file, fileList) =>
                    filesUploadSuccess('attachmentAdd', response, file, fileList)
                "
                :on-remove="
                  (file, fileList) => filesUploadRemove('attachmentAdd', file, fileList)
                "
              />
            </template>
          </DialogAdd>
        </template>

        <!-------------------------- 卡片信息内容插槽 -------------------------->
        <template v-slot:DragContentMsgTop="props">
          <TopContent
            :key="props.element.id"
            :contentItems="contentItems"
            :element="props.element"
          >
            <!-- 1待领取/2进行中/3已完成 -->
            <template slot="type-slot">
              <el-tag
                size="mini"
                class="type-tag"
                :type="
                  props.element.type == 1
                    ? 'warning'
                    : props.element.type == 2
                    ? ''
                    : 'info'
                "
                effect="dark"
              >
                <span>{{ props.element.type_text }}</span>
              </el-tag>
            </template>
            <template slot="priority-slot">
              <el-tag
                size="mini"
                class="type-tag"
                :type="
                  props.element.priority == 1
                    ? ''
                    : props.element.priority == 2
                    ? 'success'
                    : props.element.priority == 3
                    ? 'warning'
                    : 'danger'
                "
                effect="plain"
              >
                <span>{{
                  props.element.priority == 1
                    ? "不紧急不重要 "
                    : props.element.priority == 2
                    ? "紧急不重要 "
                    : props.element.priority == 3
                    ? "重要不紧急 "
                    : "重要紧急"
                }}</span>
              </el-tag>
            </template>
            <template slot="plan-time-slot">
              <span class="card-time">{{ props.element.plan_time }}</span>
            </template>
          </TopContent>
        </template>

        <!-------------------------- 编辑弹框内容插槽 -------------------------->
        <template v-slot:DragContentDialogMsg="props">
          <DialogEdit
            :key="props.element.id"
            :dialogEditItems="dialogEditItems"
            :editFormData="editData"
            @submitEdit="submitEdit"
            @changeEdit="editHandler"
            @changeCheck="changeCheck"
          >
            <template slot="title-slot">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入标题"
                v-model="editData.title"
                resize="none"
                class="textarea-class"
              >
              </el-input>
            </template>
            <template slot="content-slot">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="editData.content"
                :disabled="!editVisible"
                resize="none"
                class="textarea-class"
              >
              </el-input>
            </template>
            <template slot="type-slot">
              <el-tag
                size="mini"
                class="type-tag"
                :type="editData.type == 1 ? 'warning' : editData.type == 2 ? '' : 'info'"
                effect="dark"
              >
                <span>{{ editData.type_text }}</span>
              </el-tag>
            </template>
            <template slot="priority-slot">
              <el-tag
                size="mini"
                class="type-tag"
                :type="
                  editData.priority == 1
                    ? ''
                    : editData.priority == 2
                    ? 'success'
                    : editData.priority == 3
                    ? 'warning'
                    : 'danger'
                "
                effect="plain"
              >
                <span>{{
                  editData.priority == 1
                    ? "不紧急不重要 "
                    : editData.priority == 2
                    ? "紧急不重要 "
                    : editData.priority == 3
                    ? "重要不紧急 "
                    : "重要紧急"
                }}</span>
              </el-tag>
            </template>
            <template slot="project-slot">
              <span>{{ editData.project_name }}</span>
            </template>
            <template slot="responsible-slot">
              <span>{{ editData.responsible_name }}</span>
            </template>
            <template slot="work-slot">
              <span>{{ editData.work_level_text }}</span>
            </template>
            <template slot="plan-time-slot">
              <span class="card-time">{{ editData.plan_time }}</span>
            </template>
            <!-- <template slot="start-time-slot">
                <span class="card-time">{{ editData.start_time }}</span>
              </template>
              <template slot="complete-time-slot">
                <span class="card-time">{{ editData.complete_time }}</span>
              </template> -->
            <template slot="childTask-slot">
              <ChildTask
                :taskList="editData.subtask"
                :width="width"
                :showEdit="editVisible"
                @addTask="addTaskEdit"
                @delTask="delTaskEdit"
              />
            </template>
            <template slot="attach-slot">
              <FileUploadWrap
                class="attach-class"
                :fileList="editData.attachment"
                v-bind="filesUploadAttr"
                :disabled="!editVisible"
                :on-success="
                  (response, file, fileList) =>
                    filesUploadSuccess('attachmentEdit', response, file, fileList)
                "
                :on-remove="
                  (file, fileList) => filesUploadRemove('attachmentEdit', file, fileList)
                "
              />
            </template>
          </DialogEdit>
        </template>
      </XTaskBoard>
    </div>
    <!-- 工作量申报 -->
    <dialog-wrap
      key="digital-workload"
      v-model="dialogformData"
      :destroy-on-close="true"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :items="dialogItems"
      width="400px"
      :modal="false"
      class="upload_wrap"
    />
  </div>
</template>

<script>
import AdvancedSearch from "@/xw-ui/element-ui/components/AdvancedSearchWrap";
import {
  XTaskBoard,
  TopContent,
  DialogEdit,
  ChildTask,
  DialogAdd,
} from "@/xw-ui/element-ui/components/Board/index.js";
import { FileUploadWrap } from "@/xw-ui/element-ui/components/FileUploadWrap";
import { generateRandomString, rangetimePickerOptions } from "@/xw-ui/element-ui/utils";
import DialogWrap from "@/xw-ui/element-ui/components/DialogWrap";

import {
  getDiscussionList,
  discussionAdd,
  discussionDel,
  digitalTaskList,
  digitalTaskSearch,
  digitalTaskModify,
  digitalTaskComplete,
  digitalTaskDrag,
  digitalTaskDelete,
  digitalTaskCopy,
  digitalTaskInfo,
  digitalizeTask,
  digitalTaskArchive,
} from "@/xw-ui/element-ui/components/Board/api/index.js";
const OPERATION = {
  ADD: "add",
  EDIT: "edit",
  DEL: "delete",
};

export default {
  name: "DigitalBoard",
  components: {
    XTaskBoard,
    TopContent,
    DialogEdit,
    FileUploadWrap,
    ChildTask,
    DialogAdd,
    AdvancedSearch,
    DialogWrap,
  },
  props: {
    // 特定项目
    project: {
      type: Number,
      default: null,
    },
    applyPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uid: 1, //当前登录用户
      columnData: {}, //看板数据
      formData: {
        id: null,
        title: null,
        content: null,
        project_id: null,
        type: null,
        priority: null, //优先级
        work_level: null, //工作量
        responsible_uid: null, //责任人
        plan_time: null, //计划时间
        attachment: [], //附件
        subtask: [], //子任务
      },
      editData: {
        id: null,
        title: null,
        content: null,
        project_id: null,
        type: null,
        priority: null, //优先级
        work_level: null, //工作量
        responsible_uid: null, //责任人
        plan_time: null, //计划时间
        attachment: [], //附件
        subtask: [], //子任务
      },
      digitalOptions: {},
      listQuery: {
        project_id: null, //项目*
        responsible_uid: null, //责任人*
        type: null, //任务类型*
        // work_level: null,//标准工作量*
        plan_time: null, //计划时间
        // complete_time:null,//计划时间
        // check:null,
        keyword: null,
        archived: null, //归档
        page: 1,
        page_size: 2000,
      },
      dialogTitleAdd: "新增任务",
      dialogTitleEdit: "编辑任务",
      showType: "icons",
      width: "500px",
      addVisible: false,
      editVisible: false,
      // 优先级选项
      priorityList: [
        { label: "不紧急不重要", value: 1 },
        { label: "紧急不重要", value: 2 },
        { label: "重要不紧急", value: 3 },
        { label: "重要紧急", value: 4 },
      ],
      attachmentAdd: [],
      attachmentEdit: [],
      operateType: OPERATION.ADD,
      isRefreshComments: false, //是否刷新评论区
      dialogTitle: "提交工时单",
      dialogVisible: false,
      dialogformData: {
        id: null,
        work_hours: null,
        content: null,
        submit_time: null,
      },
    };
  },
  created() {
    this.listQuery.responsible_uid = this.uid;
    this.listQuery.project_id = this.project;
  },
  mounted() {
    // 初始化看板数据
    this.getDigitalTaskList();
    this.getDigitalOptions();
    this.$refs.DigitalAdvanceSearch.showAdvanceSearch = false; //默认折叠
  },
  beforeDestroy() {
    this.listQuery = this.$options.data.call(this).listQuery;
  },
  computed: {
    pickerOptions() {
      return rangetimePickerOptions();
    },
    //高级搜索配置
    advanceSearchItems() {
      return [
        [
          {
            prop: "project_id",
            type: "select",
            label: "项目名称",
            tips: "项目名称",
            optionList: this.digitalOptions?.project_id,
            labelWidth: "80px",
            span: 4,
            attrs: {
              size: "mini",
              clearable: true,
            },
          },
          {
            prop: "responsible_uid",
            type: "select",
            label: "责任人",
            tips: "责任人",
            optionList: this.digitalOptions?.responsible_uid,
            labelWidth: "80px",
            span: 4,
            attrs: {
              size: "mini",
              clearable: true,
            },
          },
          {
            prop: "type",
            type: "select",
            label: "任务类型",
            tips: "任务类型",
            optionList: this.digitalOptions?.type,
            labelWidth: "80px",
            span: 4,
            attrs: {
              size: "mini",
              clearable: true,
            },
          },
          {
            prop: "plan_time",
            type: "daterange",
            label: "计划时间",
            tips: "计划时间",
            labelWidth: "80px",
            span: 4,
            attrs: {
              size: "mini",
              clearable: true,
              "picker-options": this.pickerOptions,
            },
          },
          {
            prop: "archived",
            type: "switch",
            label: "查看归档",
            tips: "查看归档",
            labelWidth: "80px",
            span: 4,
            attrs: {
              size: "mini",
              clearable: true,
            },
          },
          {
            type: "buttons",
            align: "right",
            labelWidth: "calc(100%-80px)",
            span: 4,
            buttons: !this.applyPage
              ? [
                  {
                    label: "新增",
                    type: "primary",
                    event: this.addBoard,
                    attrs: {
                      size: "mini",
                      icon: "el-icon-plus",
                    },
                  },
                ]
              : [],
          },
        ],
      ];
    },
    // 卡片内容配置
    contentItems() {
      return [
        [
          {
            label: "需求分类",
            props: "type",
            icon: "el-icon-price-tag",
            slotName: "type-slot",
          },
          {
            label: "优先级",
            props: "priority",
            icon: "el-icon-s-flag",
            slotName: "priority-slot",
          },
        ],
        [
          { label: "时间", props: "", icon: "el-icon-date", slotName: "plan-time-slot" },
          { label: "历时", props: "", icon: "el-icon-time", slotName: "duration-slot" },
        ],
      ];
    },
    // 弹窗配置
    dialogEditItems() {
      return [
        [
          {
            label: "标题",
            props: "title",
            icon: "el-icon-document-checked",
            slotName: "title-slot",
            noShow: true,
          },
        ],
        [
          {
            label: "内容描述",
            props: "content",
            icon: "el-icon-document",
            slotName: "content-slot",
          },
        ],
        [
          {
            label: "所属任务",
            props: "project_id",
            icon: "el-icon-share",
            slotName: "project-slot",
            options: {
              comp: "el-select", // 组件
              attr: {
                placeholder: "请选择项目名称",
              },
              children: this.digitalOptions.project_id
                ? this.digitalOptions.project_id.map((item) => {
                    return {
                      comp: "el-option",
                      data: item.value,
                      attr: {
                        label: item.label,
                        value: item.value,
                        key: item.key,
                      },
                    };
                  })
                : [],
            },
          },
        ],
        [
          {
            label: "需求分类",
            props: "type",
            icon: "el-icon-price-tag",
            slotName: "type-slot",
            options: {
              comp: "el-select", // 组件
              attr: {
                placeholder: "请选择需求分类",
              },
              children: this.digitalOptions.type
                ? this.digitalOptions.type.map((item) => {
                    return {
                      comp: "el-option",
                      data: item.value,
                      attr: {
                        label: item.label,
                        value: item.value,
                        key: item.key,
                      },
                    };
                  })
                : [],
            },
          },
        ],
        [
          {
            label: "优先级",
            props: "priority",
            icon: "el-icon-s-flag",
            slotName: "priority-slot",
            options: {
              comp: "el-select", // 组件
              attr: {
                placeholder: "请选择优先级",
              },
              children: this.priorityList.map((item) => {
                return {
                  comp: "el-option",
                  data: item.value,
                  attr: {
                    label: item.label,
                    value: item.value,
                    key: item.key,
                  },
                };
              }),
            },
          },
        ],
        [
          {
            label: "标准工作量",
            props: "work_level",
            icon: "el-icon-guide",
            slotName: "work-slot",
            options: {
              comp: "el-select", // 组件
              attr: {
                placeholder: "请选择标准工作量",
              },
              children: this.digitalOptions.work_level
                ? this.digitalOptions.work_level.map((item) => {
                    return {
                      comp: "el-option",
                      data: item.value,
                      attr: {
                        label: item.label + "：" + item.hours + "h",
                        value: item.value,
                        key: item.key,
                      },
                      children: [
                        {
                          comp: "span", // 组件
                          content: item.label + "：" + item.hours + "h",
                        },
                        {
                          comp: "span", // 组件
                          content: item.desc,
                          attr: {
                            style: "color:#8896a9;float:right;",
                          },
                        },
                      ],
                    };
                  })
                : [],
            },
          },
        ],
        [
          {
            label: "责任人",
            props: "responsible_uid",
            icon: "el-icon-user",
            slotName: "responsible-slot",
            options: {
              comp: "el-select", // 组件
              attr: {
                placeholder: "请选择责任人",
              },
              children: this.digitalOptions.responsible_uid
                ? this.digitalOptions.responsible_uid.map((item) => {
                    return {
                      comp: "el-option",
                      data: item.value,
                      attr: {
                        label: item.label,
                        value: item.value,
                        key: item.key,
                      },
                    };
                  })
                : [],
            },
          },
        ],
        [
          {
            label: "创建人",
            props: "create_name",
            icon: "el-icon-user-solid",
            noChange: true,
            options: {
              comp: "el-select", // 组件
              attr: {
                placeholder: "请选择创建人",
                disabled: this.editVisible ? true : false,
              },
              children: this.digitalOptions.responsible_uid
                ? this.digitalOptions.responsible_uid.map((item) => {
                    return {
                      comp: "el-option",
                      data: item.value,
                      attr: {
                        label: item.label,
                        value: item.value,
                        key: item.key,
                      },
                    };
                  })
                : [],
            },
          },
        ],
        [
          {
            label: "时间",
            props: "plan_time",
            icon: "el-icon-date",
            slotName: "plan-time-slot",
            options: {
              comp: "el-date-picker", // 组件
              attr: {
                placeholder: "截止日期",
              },
            },
          },
        ],
        // [
        //   {
        //     label:'领取时间',
        //     props:'start_time',
        //     icon:'el-icon-coordinate',
        //     slotName:'start-time-slot',
        //     noChange: true,
        //   }
        // ],
        // [
        //   {
        //     label:'完成时间',
        //     props:'complete_time',
        //     icon:'el-icon-circle-check',
        //     slotName:'complete-time-slot',
        //     noChange: true,
        //   }
        // ],
        [
          {
            label: "历时",
            props: "duration",
            icon: "el-icon-time",
            noChange: true,
          },
        ],
        [
          {
            label: "子任务",
            props: "subtask",
            icon: "el-icon-s-operation",
            slotName: "childTask-slot",
          },
        ],
        [
          {
            label: "附件",
            props: "attachment",
            icon: "el-icon-connection",
            slotName: "attach-slot",
          },
        ],
      ];
    },
    // 卡片统计配置
    statisticItems() {
      return [
        { icon: "el-icon-user", props: "responsible_name" },
        { icon: "el-icon-set-up", props: "subtask_num" },
        { icon: "el-icon-connection", props: "attachment_num" },
        { icon: "el-icon-chat-line-square", props: "comment_num" },
      ];
    },
    // 卡片右下角按钮配置
    statisticButtons() {
      return [
        { icon: "el-icon-document-copy", title: "复制任务", event: "digitalTaskCopy" },
        {
          icon: "el-icon-folder-checked",
          title: "归档任务",
          event: "digitalTaskArchive",
        },
        { icon: "el-icon-delete", title: "删除任务", event: "digitalTaskDelete" },
        { icon: "el-icon-s-check", title: "提交工时单", event: "openApplyDialog" },
      ];
    },
    // 附件上传配置
    filesUploadAttr() {
      return {
        showType: "icons",
        drag: true,
      };
    },
    // 状态列表配置项
    columnItems() {
      return [
        {
          props: "pending", // 数据对应的key
          headerText: "待领取", // 列头部标题内容
          headerWidth: "32.5%", // 列头部标题宽度
          bgColor: "#4A9FF9", // 列头部标题背景颜色
        },
        {
          props: "doing", // 数据对应的key
          headerText: "进行中", // 列头部标题内容
          headerWidth: "32.5%", // 列头部标题宽度
          bgColor: "#f9944a", // 列头部标题背景颜色
        },
        {
          props: "finish", // 数据对应的key
          headerText: "已完成", // 列头部标题内容
          headerWidth: "32.5%", // 列头部标题宽度
          bgColor: "#2ac06d", // 列头部标题背景颜色
        },
      ];
    },
    // 提交工时单
    dialogItems() {
      return [
        [
          {
            prop: "id",
            type: "input",
            label: "任务id",
            tips: "请填写任务id",
            rules: {
              required: true,
              message: "请填写任务id",
            },
            attrs: {
              disabled: true,
            },
          },
        ],
        [
          {
            prop: "work_hours",
            type: "input",
            label: "投入工时",
            tips: "请填写投入工时",
            listeners: {
              input: (v) => (this.dialogformData.work_hours = v.replace(/[^0-9.]/g, "")),
            },
            rules: {
              required: true,
              message: "请填写投入工时",
            },
          },
        ],
        [
          {
            prop: "content",
            type: "textarea",
            label: "工作内容",
            tips: "请填写工作内容",
            rules: {
              message: "请填写工作内容",
            },
          },
        ],
        [
          {
            prop: "submit_time",
            type: "date-picker",
            label: "填报时间",
            tips: "请选择填报时间",
            rules: {
              required: true,
              message: "请选择填报时间",
            },
          },
        ],
        [
          {
            type: "buttons",
            buttons: [
              {
                label: "提交",
                type: "primary",
                event: this.digitalizeTask,
                validate: true, // validate 为 true 表示为验证表单
                reset: false, // reset 为 true 表示点击按钮后重置表单内容
              },
              {
                label: "取消",
                reset: false, // reset 为 true 表示点击按钮后重置表单内容
                event: () => this.resetDialog(),
              },
            ],
          },
        ],
      ];
    },
  },
  methods: {
    getDiscussionList,
    discussionAdd,
    discussionDel,
    // 操作按钮
    operationsButs(rowData) {
      // 无权限公共按钮
      const commonButs = [
        {
          icon: "el-icon-picture",
          text: "新增任务",
          command: {
            title: "新增任务",
            data: rowData,
            showType: "Page",
          },
        },
      ];
      return [...commonButs];
    },
    // 获取选择器选项
    async getDigitalOptions() {
      try {
        const { data } = await digitalTaskSearch();
        this.digitalOptions = data;
      } catch (err) {
        console.log(err);
      }
    },
    // 初始化看板数据
    async getDigitalTaskList() {
      // 请求表格数据
      const res = await digitalTaskList(this.listQuery);
      const tempData = res.data.data;
      // this.columnData = res.data.data
      this.columnData = this.FormatData(tempData);
    },
    // 格式化看板数据
    FormatData(data) {
      let res = {
        // 1待领取pending/2进行中doing/3已完成finish
        pending: [],
        doing: [],
        finish: [],
      };
      data.forEach((item) => {
        // 处理图片地址信息
        const attach = [];
        item.attachment.map((imgItem) => {
          attach.push(imgItem.url);
        });
        item.srcList = attach.length > 0 ? attach : [];
        if (item.status == 1) {
          res.pending.push(item);
        } else if (item.status == 2) {
          res.doing.push(item);
        } else if (item.status == 3) {
          res.finish.push(item);
        }
      });
      return res;
    },
    //点击切换视图
    viewsChange(name) {
      this.$emit("viewsChange", name);
    },
    // -----------------高级搜索相关函数--------------
    advanceSearch() {
      this.listQuery.page = 1;
      this.getDigitalTaskList();
    },
    // 模糊搜索
    fuzzySearch({ keyword }) {
      this.listQuery.keyword = keyword;
      this.listQuery.page = 1;
      this.getDigitalTaskList();
    },
    queryChange(query) {
      Object.assign(this.listQuery, query);
      this.advanceSearch();
    },
    refresh(keyword) {
      this.listQuery.keyword = keyword;
      this.getDigitalTaskList();
    },
    // 高级搜索下拉选中触发事件统一处理函数
    advancedSearchFormChange(params, component, filed = "listQuery") {
      this[filed][params.prop] = params.value;
      if (filed === "listQuery") {
        this.getDigitalTaskList();
        this.listQuery.page = 1; // 高级搜索后重置页码
      }
    },
    // 非空校验
    checkSubtask(subtask) {
      if (subtask.length > 0) {
        let contentFlag = false;
        let timeFlag = false;
        subtask.forEach((item) => {
          if (!item.content) {
            contentFlag = true;
          }
          if (!item.content) {
            timeFlag = true;
          }
        });
        if (contentFlag || timeFlag) {
          this.$message({
            type: "error",
            message: "子任务请填写内容和计划时间！",
          });
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    // 确定提交编辑
    async submitEdit(element) {
      element.attachment = (this.attachmentEdit && this.attachmentEdit) || [];
      let flag = this.checkSubtask(element.subtask);
      if (flag) {
        try {
          const res = await digitalTaskModify({
            ...element,
          });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.editData = this.$options.data.call(this).editData;
            // this.attachmentEdit = this.$options.data.call(this).attachmentEdit
            this.editVisible = false;
            this.getTaskInfo(element);
            await this.getDigitalTaskList();
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    // 确定提交新增
    async submitAdd() {
      this.formData.attachment = (this.attachmentAdd && this.attachmentAdd) || [];
      let flag = this.checkSubtask(this.formData.subtask);
      if (flag) {
        try {
          const res = await digitalTaskModify({
            ...this.formData,
          });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.formData = this.$options.data.call(this).formData;
            this.attachmentAdd = this.$options.data.call(this).attachmentAdd;
            this.addVisible = false;
            this.editVisible = false;
            await this.getDigitalTaskList();
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    // 新增看板元素
    addBoard() {
      this.editVisible = false;
      this.formData.project_id = this.project;
      this.addVisible = true;
    },
    // 取消新增
    closeAdd() {
      this.addVisible = false;
      this.formData = this.$options.data.call(this).formData;
      this.attachmentAdd = this.$options.data.call(this).attachmentAdd;
    },
    // 更改dialog编辑状态
    editHandler(editVisible, element) {
      if (!editVisible) {
        // 取消编辑
        this.editData = this.$options.data.call(this).editData;
        this.attachmentEdit = this.$options.data.call(this).attachmentEdit;
      }
      this.editVisible = editVisible;
      this.getTaskInfo(element);
    },
    // 更改勾选状态
    async changeCheck(element) {
      try {
        const res = await digitalTaskComplete({
          id: element.id,
          check: element.check,
        });
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.getDigitalTaskList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 修改拖拽列
    async change(params) {
      try {
        const res = await digitalTaskDrag({ id: params.data.id, status: params.key + 1 });
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.getDigitalTaskList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    filesUploadSuccess(type, response, file, fileList) {
      this[type] = fileList.map(
        (upfiles) => (upfiles.response && upfiles.response.data.id) || upfiles.id
      );
    },
    filesUploadRemove(type, file, fileList) {
      this[type] = fileList.map(
        (item) => (item.response && item.response.data.id) || item.id
      );
    },
    // 删除任务
    async digitalTaskDelete(element) {
      this.$confirm("确定删除该任务?", "删除任务", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await digitalTaskDelete({
            id: element.id,
          });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.getDigitalTaskList();
          }
        })
        .catch((err) => console.log(err));
    },
    // 复制任务
    async digitalTaskCopy(element) {
      try {
        const res = await digitalTaskCopy({
          id: element.id,
        });
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.getDigitalTaskList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 归档任务
    async digitalTaskArchive(element) {
      this.$confirm("确定归档该任务?", "归档任务", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await digitalTaskArchive({
            id: element.id,
          });
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.getDigitalTaskList();
          }
        })
        .catch((err) => console.log(err));
    },
    // 打开工作量申报弹框
    async openApplyDialog(element) {
      this.dialogVisible = true;
      this.dialogformData.id = element.id;
      this.dialogformData.content = element.content;
      this.dialogformData.submit_time = new Date();
    },
    // 工作量申报
    async digitalizeTask() {
      try {
        const res = await digitalizeTask({
          ...this.dialogformData,
        });
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.resetDialog();
          this.getDigitalTaskList();
        }
      } catch (err) {
        console.log(err);
      }
    },
    resetDialog() {
      this.dialogVisible = false;
      this.dialogformData = this.$options.data.call(this).dialogformData;
    },
    // 新增-添加子任务
    addTaskAdd() {
      let task = {
        id: generateRandomString(), //获取随机id
        content: null,
        check: null,
        plan_time: null,
      };
      this.formData.subtask.push(task);
    },
    // 新增-删除子任务
    delTaskAdd(task) {
      this.$confirm("确定删除该子任务?", "删除子任务", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //先获取这个元素的下标，然后从这个下标开始计算，删除长度为1的元素
          this.formData.subtask.splice(this.formData.subtask.indexOf(task), 1);
        })
        .catch((err) => console.log(err));
    },
    // 编辑-添加子任务
    addTaskEdit(taskList) {
      let task = {
        id: generateRandomString(), //获取随机id
        content: null,
        check: false,
        plan_time: null,
      };
      taskList.push(task);
    },
    // 编辑-删除子任务
    delTaskEdit(task) {
      this.$confirm("确定删除该子任务?", "删除子任务", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //先获取这个元素的下标，然后从这个下标开始计算，删除长度为1的元素
          this.editData.subtask.splice(this.editData.subtask.indexOf(task), 1);
        })
        .catch((err) => console.log(err));
    },
    // 展示内容区域
    showContent(element) {
      this.getTaskInfo(element);
    },
    // 获取单个任务信息
    async getTaskInfo(element) {
      const res = await digitalTaskInfo({
        id: element.id,
      });
      this.editData = res.data;
      if (this.editVisible) {
        // 打开编辑
        this.attachmentEdit =
          this.editData.attachment && this.editData.attachment.map((item) => item.id);
      }
    },
    // 添加评论
    async addComments(commentListParams, comments) {
      const res = await this.discussionAdd({
        ...commentListParams,
        comment: comments,
      });
      if (res.code !== 200) return;
      this.isRefreshComments = true;
      this.$message({
        message: res.msg,
        type: "success",
      });
      this.$nextTick(() => {
        this.isRefreshComments = false;
      });
    },
    // 删除评论
    async deleteComments(id) {
      const res = await this.discussionDel({
        id: id,
      });
      if (res.code !== 200) return;
      this.isRefreshComments = true;
      this.$message({
        message: res.msg,
        type: "success",
      });
      this.$nextTick(() => {
        this.isRefreshComments = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./sass/listing.scss";
.card-time {
  background: #f8f8f8;
  color: #878787;
  padding: 5px;
  border-radius: 10px;
  font-size: 12px;
}
.card-duration {
  color: #878787;
  font-size: 12px;
}
.attach-class {
  width: 500px;
}
.buttons-container {
  display: flex;
  .buttons {
    margin: 0;
  }
}
.deliver-config-table {
  margin-left: 30px;
}
.textarea-class {
  width: 500px;
  &::v-deep .el-textarea__inner {
    border-radius: 18px !important;
  }
}
.XTaskBoard-container {
  padding: 5px 0;
  background: #fff;
}
</style>
