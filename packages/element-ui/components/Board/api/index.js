export function getDiscussionList() {
  console.log("🚀 ~ 进度评论列表 ~ :")
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {
      "total": 0,
      "per_page": 15,
      "current_page": 1,
      "last_page": 0,
      "data": [
        {
          "id": 3182,
          "project_id": 0,
          "type": 8,
          "link_id": 24,
          "user_id": 1165,
          "user": "sewen",
          "comment": "<p>目前正在研究amis 低代码框架，考虑使用 amis 的设计模式封装 element plus<\/p>\n<p>&nbsp;<\/p>",
          "time": "2024-04-17 15:51",
          "is_oper": true
        }
      ]
    },
    "time": "2024-04-09 14:34"
  }
}
export function discussionAdd() {
  console.log("🚀 ~ 添加进度评论 ~ :")
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function discussionDel() {
  console.log("🚀 ~ 删除进度评论 ~:")
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskList() {
  console.log("🚀 ~ 任务列表 ~:")
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "661f7dbfb07c9",
    "data": {
      "total": 13,
      "per_page": 2000,
      "current_page": 1,
      "last_page": 1,
      "data": [
        {
          "id": 20,
          "status": 1,
          "title": "组件自动化测试项目搭建",
          "content": "组件自动化测试项目搭建",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 3,
          "responsible_uid": 1165,
          "plan_time": "2024-04-30",
          "start_time": null,
          "complete_time": null,
          "create_uid": 1165,
          "create_time": "2024-04-10",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 2,
          "check": false,
          "type_text": "新功能",
          "duration": "7天"
        },
        {
          "id": 27,
          "status": 1,
          "title": "Ant Design React 组件封装",
          "content": "封装 Ant Design React 基础组件库",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 3,
          "responsible_uid": 1165,
          "plan_time": "2024-05-30",
          "start_time": null,
          "complete_time": null,
          "create_uid": 1165,
          "create_time": "2024-04-10",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 0,
          "check": false,
          "type_text": "新功能",
          "duration": "6天"
        },
        {
          "id": 15,
          "status": 3,
          "title": "文档库搭建",
          "content": "搭建组件文档库",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 4,
          "responsible_uid": 1165,
          "plan_time": null,
          "start_time": "2024-04-10 15:36",
          "complete_time": "2024-04-12 09:57",
          "create_uid": 1165,
          "create_time": "2024-04-10",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 2,
          "check": true,
          "type_text": "新功能",
          "duration": "1天"
        },
        {
          "id": 17,
          "status": 1,
          "title": "文档库编写",
          "content": "组件库开发手册和各项指南编写、组件文档编写",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 3,
          "responsible_uid": 1165,
          "plan_time": null,
          "start_time": null,
          "complete_time": null,
          "create_uid": 1165,
          "create_time": "2024-04-10",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 8,
          "check": false,
          "type_text": "新功能",
          "duration": "7天"
        },
        {
          "id": 18,
          "status": 1,
          "title": "文档库站点搭建",
          "content": "docker + nginx 文档库站点",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 4,
          "responsible_uid": 1165,
          "plan_time": null,
          "start_time": null,
          "complete_time": null,
          "create_uid": 1165,
          "create_time": "2024-04-10",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 0,
          "check": false,
          "type_text": "新功能",
          "duration": "7天"
        },
        {
          "id": 19,
          "status": 3,
          "title": "组件库框架搭建",
          "content": "Element Plus、Element UI、Ant Design  组件库框架搭建",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 4,
          "responsible_uid": 1165,
          "plan_time": null,
          "start_time": "2024-04-10 15:41",
          "complete_time": "2024-04-12 09:58",
          "create_uid": 1165,
          "create_time": "2024-04-10",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 3,
          "check": true,
          "type_text": "新功能",
          "duration": "1天"
        },
        {
          "id": 21,
          "status": 1,
          "title": "CICD持续部署持续集成自动化流程搭建",
          "content": "使用 docker + Jenkins 搭建CICD工具、编写发布分支流程规范代码、编写文档自动构建脚本、编写组件库自动构建脚本、编写npm 自动发布脚本、分支管理 + 文档\/组件自动构建 + 项目\/npm 自动发布脚本联调",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 3,
          "responsible_uid": 1165,
          "plan_time": null,
          "start_time": null,
          "complete_time": null,
          "create_uid": 1165,
          "create_time": "2024-04-10",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 6,
          "check": false,
          "type_text": "新功能",
          "duration": "7天"
        },
        {
          "id": 22,
          "status": 1,
          "title": "NPM私有仓库搭建",
          "content": "使用docker + Verdaccio 搭建 npm私有仓库",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 4,
          "responsible_uid": 1165,
          "plan_time": null,
          "start_time": null,
          "complete_time": null,
          "create_uid": 1165,
          "create_time": "2024-04-10",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 2,
          "check": false,
          "type_text": "新功能",
          "duration": "7天"
        },
        {
          "id": 24,
          "status": 2,
          "title": "ElementPlus 组件库封装",
          "content": "对ElementPlus 基础组件进行封装到组件库",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 4,
          "responsible_uid": 1165,
          "plan_time": null,
          "start_time": "2024-04-12 09:58",
          "complete_time": null,
          "create_uid": 1165,
          "create_time": "2024-04-10",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 13,
          "check": false,
          "type_text": "新功能",
          "duration": "5天"
        },
        {
          "id": 25,
          "status": 1,
          "title": "ElementUI 组件封装",
          "content": "封装 ElementUI 基础组件库",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 4,
          "responsible_uid": 1165,
          "plan_time": null,
          "start_time": null,
          "complete_time": null,
          "create_uid": 1165,
          "create_time": "2024-04-10",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 9,
          "check": false,
          "type_text": "新功能",
          "duration": "7天"
        },
        {
          "id": 26,
          "status": 1,
          "title": "Echarts 封装",
          "content": "Echarts 封装 Vue2、Vue3、React 组件封装",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 3,
          "responsible_uid": 1165,
          "plan_time": null,
          "start_time": null,
          "complete_time": null,
          "create_uid": 1165,
          "create_time": "2024-04-10",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 0,
          "check": false,
          "type_text": "新功能",
          "duration": "6天"
        },
        {
          "id": 41,
          "status": 1,
          "title": "aims 研究和组件库整合",
          "content": "研究aims 原理，整合 aims 到组件库",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 1,
          "priority": 3,
          "responsible_uid": 1165,
          "plan_time": null,
          "start_time": null,
          "complete_time": null,
          "create_uid": 1165,
          "create_time": "2024-04-17",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 0,
          "check": false,
          "type_text": "新功能",
          "duration": "6小时"
        },
        {
          "id": 42,
          "status": 1,
          "title": "甘特图研究",
          "content": "",
          "project_id": 18,
          "project_name": "xxxx",
          "type": 4,
          "priority": 4,
          "responsible_uid": 1165,
          "plan_time": null,
          "start_time": null,
          "complete_time": null,
          "create_uid": 1165,
          "create_time": "2024-04-17",
          "attachment": [],
          "responsible_name": "sewen",
          "create_name": "sewen",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 0,
          "check": false,
          "type_text": "需求",
          "duration": "6小时"
        }
      ]
    },
    "time": "2024-04-17 15:43"
  }
}

export function digitalTaskSearch() {
  console.log("🚀 ~ 高级搜索下拉接口 ~:")

  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614ddb884daa",
    "data": {
      "project_id": [
        {
          "value": 1,
          "label": "A"
        },
        {
          "value": 2,
          "label": "B"
        },
        {
          "value": 3,
          "label": "C"
        },
        {
          "value": 4,
          "label": "D"
        },
        {
          "value": 6,
          "label": "E"
        },
        {
          "value": 7,
          "label": "F"
        },
        {
          "value": 8,
          "label": "G"
        },
        {
          "value": 9,
          "label": "H"
        },
        {
          "value": 10,
          "label": "I"
        },

      ],
      "responsible_uid": [
        {
          "value": 1,
          "label": "用户A"
        },
        {
          "value": 2,
          "label": "sewen"
        },
        {
          "value": 3,
          "label": "用户B"
        },
        {
          "value": 4,
          "label": "用户C"
        },
        {
          "value": 5,
          "label": "用户D"
        },
        {
          "value": 6,
          "label": "用户E"
        },
        {
          "value": 7,
          "label": "大人"
        }
      ],
      "work_level": [
        {
          "value": 728,
          "label": "L1",
          "hours": "2.00",
          "desc": "快速"
        },
        {
          "value": 729,
          "label": "L2",
          "hours": "4.00",
          "desc": "半天"
        },
        {
          "value": 730,
          "label": "L3",
          "hours": "8.00",
          "desc": "1个工作日"
        },
        {
          "value": 731,
          "label": "L4",
          "hours": "16.00",
          "desc": "2个工作日"
        },
        {
          "value": 732,
          "label": "L5",
          "hours": "24.00",
          "desc": "3个工作日"
        },
        {
          "value": 733,
          "label": "L6",
          "hours": "32.00",
          "desc": "4个工作日"
        },
        {
          "value": 734,
          "label": "L7",
          "hours": "40.00",
          "desc": "一周"
        }
      ],
      "type": [
        {
          "value": 1,
          "label": "新功能"
        },
        {
          "value": 2,
          "label": "优化"
        },
        {
          "value": 3,
          "label": "BUG"
        }
      ],
      "status": [
        {
          "value": 1,
          "label": "待领取"
        },
        {
          "value": 2,
          "label": "进行中"
        },
        {
          "value": 3,
          "label": "已完成"
        }
      ]
    },
    "time": "2024-04-09 14:18"
  }
}
export function digitalTaskModify() {
  console.log("🚀 ~ 修改任务 ~:")

  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskComplete() {
  console.log("🚀 ~ 完成任务 ~ :")
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskDrag() {
  console.log("🚀 ~拖动状态修改 ~:")
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskDelete() {
  console.log("🚀 ~ 删除任务 ~:")
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskCopy() {
  console.log("🚀 ~ 复制任务 ~ :")
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskInfo() {
  console.log("🚀 ~ 任务详细信息 ~ :")
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a18962",
    "data": {
      "id": 7,
      "status": 1,
      "title": "项目D",
      "content": "",
      "project_id": 67,
      "project_name": "项目分析",
      "type": 1,
      "priority": 4,
      "work_level": 732,
      "responsible_uid": 173,
      "plan_time": "2024-04-12",
      "start_time": 0,
      "complete_time": null,
      "create_uid": 173,
      "create_time": "2024-04-09",
      "attachment": [],
      "work_level_text": "L5",
      "responsible_name": "sewen",
      "create_name": "sewen",
      "subtask": [],
      "check": false,
      "type_text": "新功能",
      "duration": "3小时"
    },
    "time": "2024-04-09 14:34"
  }
}
export function digitalizeTask() {
  console.log("🚀 ~ 提交工时单 ~:")
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": [],
    "time": "2024-04-09 14:34"
  }
}


export function digitalTaskArchive() {
  console.log("🚀 ~ 归档任务 ~:")
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": [],
    "time": "2024-04-09 14:34"
  }
}