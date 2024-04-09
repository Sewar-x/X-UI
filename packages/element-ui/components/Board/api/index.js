export function getDiscussionList() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {
      "total": 0,
      "per_page": 15,
      "current_page": 1,
      "last_page": 0,
      "data": []
    },
    "time": "2024-04-09 14:34"
  }
}
export function discussionAdd() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function discussionDel() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskList() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614da38debd2",
    "data": {
      "total": 7,
      "per_page": 2000,
      "current_page": 1,
      "last_page": 1,
      "data": [
        {
          "id": 4,
          "status": 2,
          "title": "RDM后端基础框架搭建",
          "content": "",
          "project_id": 64,
          "project_name": "RDM重构",
          "type": 1,
          "priority": 3,
          "responsible_uid": 7216,
          "plan_time": "2024-03-04",
          "start_time": 1712489825,
          "complete_time": null,
          "create_uid": 7216,
          "create_time": "2024-04-07",
          "attachment": [],
          "responsible_name": "刘潭飞",
          "create_name": "刘潭飞",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 4,
          "check": false,
          "type_text": "新功能",
          "duration": "1天"
        },
        {
          "id": 3,
          "status": 3,
          "title": "梳理数字化看板组件文件结构和使用文档。",
          "content": "梳理数字化看板组件文件结构和使用文档。",
          "project_id": 58,
          "project_name": "前端公共组件库设计开发",
          "type": 2,
          "priority": 3,
          "responsible_uid": 8214,
          "plan_time": "2024-03-28",
          "start_time": 1711607745,
          "complete_time": "2024-04-09",
          "create_uid": 8214,
          "create_time": "2024-03-28",
          "attachment": [
            {
              "id": 87890,
              "name": "各组件之间的嵌套关系.png",
              "type": "png",
              "create_time": "2024-04-09 09:24",
              "url": "\/srdpm-api\/storage\/temp\/20240409\/aa28c4d696f618573b065a27f0f7c0ae.png",
              "size": "31.35KB",
              "cn_name": "陈冰仪"
            },
            {
              "id": 87889,
              "name": "测试.png",
              "type": "png",
              "create_time": "2024-04-09 09:24",
              "url": "\/srdpm-api\/storage\/temp\/20240409\/c2b68849e9779b034a7ae631d71614a6.png",
              "size": "27.82KB",
              "cn_name": "陈冰仪"
            }
          ],
          "responsible_name": "陈冰仪",
          "create_name": "陈冰仪",
          "attachment_num": 2,
          "comment_num": 1,
          "subtask_num": 2,
          "check": true,
          "type_text": "优化",
          "duration": "11天"
        },
        {
          "id": 1,
          "status": 3,
          "title": "对接授权中心接口",
          "content": null,
          "project_id": 62,
          "project_name": "EDMS 支持OA账号登录",
          "type": 1,
          "priority": 3,
          "responsible_uid": 7216,
          "plan_time": "2024-03-29",
          "start_time": 1711937053,
          "complete_time": "2024-04-07",
          "create_uid": 7216,
          "create_time": "2024-03-27",
          "attachment": [],
          "responsible_name": "刘潭飞",
          "create_name": "刘潭飞",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 0,
          "check": true,
          "type_text": "新功能",
          "duration": "6天"
        },
        {
          "id": 2,
          "status": 3,
          "title": "登录界面提示",
          "content": null,
          "project_id": 62,
          "project_name": "EDMS 支持OA账号登录",
          "type": 2,
          "priority": 3,
          "responsible_uid": 7216,
          "plan_time": "2024-03-29",
          "start_time": 1711535832,
          "complete_time": "2024-04-07",
          "create_uid": 7216,
          "create_time": "2024-03-27",
          "attachment": [],
          "responsible_name": "刘潭飞",
          "create_name": "刘潭飞",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 0,
          "check": true,
          "type_text": "优化",
          "duration": "11天"
        },
        {
          "id": 5,
          "status": 3,
          "title": "人员赛道配置模块",
          "content": "需求文档输出、接口开发与对接",
          "project_id": 67,
          "project_name": "项目群工作负荷分析",
          "type": 1,
          "priority": 4,
          "responsible_uid": 173,
          "plan_time": "2024-04-08",
          "start_time": 1712489825,
          "complete_time": "2024-04-08",
          "create_uid": 173,
          "create_time": "2024-04-09",
          "attachment": [],
          "responsible_name": "綦豫",
          "create_name": "綦豫",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 0,
          "check": true,
          "type_text": "新功能",
          "duration": "4小时"
        },
        {
          "id": 6,
          "status": 3,
          "title": "公共项目搜索接口搜不到部分新项目",
          "content": "设置NPI、SRF为一创建立即归档",
          "project_id": 23,
          "project_name": "用户日常反馈以及异常处理",
          "type": 3,
          "priority": 1,
          "responsible_uid": 173,
          "plan_time": "2024-04-08",
          "start_time": 1712489825,
          "complete_time": "2024-04-08",
          "create_uid": 173,
          "create_time": "2024-04-09",
          "attachment": [],
          "responsible_name": "綦豫",
          "create_name": "綦豫",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 0,
          "check": true,
          "type_text": "BUG",
          "duration": "4小时"
        },
        {
          "id": 7,
          "status": 1,
          "title": "项目群工作量图表",
          "content": "",
          "project_id": 67,
          "project_name": "项目群工作负荷分析",
          "type": 1,
          "priority": 4,
          "responsible_uid": 173,
          "plan_time": "2024-04-12",
          "start_time": 0,
          "complete_time": null,
          "create_uid": 173,
          "create_time": "2024-04-09",
          "attachment": [],
          "responsible_name": "綦豫",
          "create_name": "綦豫",
          "attachment_num": 0,
          "comment_num": 0,
          "subtask_num": 0,
          "check": false,
          "type_text": "新功能",
          "duration": "3小时"
        }
      ]
    },
    "time": "2024-04-09 14:03"
  }
}
export function digitalTaskSearch() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614ddb884daa",
    "data": {
      "project_id": [
        {
          "value": 1,
          "label": "基于自研零代码平台的工业数字化转型应用"
        },
        {
          "value": 2,
          "label": "API中间件"
        },
        {
          "value": 3,
          "label": "SRDPM\/RDM - 认证测试进度模块"
        },
        {
          "value": 4,
          "label": "SRDPM\/RDM - 样机申请模块"
        },
        {
          "value": 6,
          "label": "智能研发数字化提升项目"
        },
        {
          "value": 7,
          "label": "极速全文搜索中间件"
        },
        {
          "value": 8,
          "label": "数字化项目二期"
        },
        {
          "value": 9,
          "label": "NPI项目里程碑改善"
        },
        {
          "value": 10,
          "label": "OnlyOffice V7.3应用&培训"
        },
        {
          "value": 11,
          "label": "服务器运维"
        },
        {
          "value": 12,
          "label": "Redis改善-NPI项目"
        },
        {
          "value": 13,
          "label": "美工进度模块升级"
        },
        {
          "value": 14,
          "label": "ODF日报模块速度优化"
        },
        {
          "value": 15,
          "label": "硬件技术平台开发管理"
        },
        {
          "value": 16,
          "label": "产品数据平台"
        },
        {
          "value": 17,
          "label": "NPI数据驾驶舱"
        },
        {
          "value": 18,
          "label": "结构包装算柜"
        },
        {
          "value": 20,
          "label": "研发工作量个人账单"
        },
        {
          "value": 21,
          "label": "ODF订单评审差异表"
        },
        {
          "value": 22,
          "label": "SAP-GD\/SW批次信息对接"
        },
        {
          "value": 23,
          "label": "用户日常反馈以及异常处理"
        },
        {
          "value": 24,
          "label": "供应商资料传递"
        },
        {
          "value": 25,
          "label": "A客户贴纸需求"
        },
        {
          "value": 27,
          "label": "软件认证看板"
        },
        {
          "value": 28,
          "label": "模具开发进度管理"
        },
        {
          "value": 29,
          "label": "研发人效分析"
        },
        {
          "value": 30,
          "label": "工作量申报与透析表"
        },
        {
          "value": 31,
          "label": "A客户交付件管理"
        },
        {
          "value": 32,
          "label": "ODF订单评审"
        },
        {
          "value": 33,
          "label": "样机模块优化"
        },
        {
          "value": 34,
          "label": "新品开发任务池模块优化"
        },
        {
          "value": 35,
          "label": "物料报表方案"
        },
        {
          "value": 36,
          "label": "项目问题点周报"
        },
        {
          "value": 37,
          "label": "RDM-软件版本申请模块需求"
        },
        {
          "value": 38,
          "label": "软件测试策略"
        },
        {
          "value": 40,
          "label": "质量问题点任务池"
        },
        {
          "value": 41,
          "label": "产品管理平台框架完善"
        },
        {
          "value": 42,
          "label": "FDS开发"
        },
        {
          "value": 43,
          "label": "MNT 子库开发"
        },
        {
          "value": 44,
          "label": "物料可视化"
        },
        {
          "value": 45,
          "label": "新版网址大全"
        },
        {
          "value": 46,
          "label": "硬件开发任务II期"
        },
        {
          "value": 47,
          "label": "风险管理"
        },
        {
          "value": 48,
          "label": "订单软件管理模块优化需求"
        },
        {
          "value": 49,
          "label": "美工进度跟踪模块升级 && Av胶片库"
        },
        {
          "value": 50,
          "label": "软件系统数字化改善功能升级"
        },
        {
          "value": 51,
          "label": "整机任务池优化"
        },
        {
          "value": 52,
          "label": "软件释放优化"
        },
        {
          "value": 53,
          "label": "物料齐套记录查询"
        },
        {
          "value": 54,
          "label": "A客户Marketing选项标准化"
        },
        {
          "value": 55,
          "label": "软件订单迁移SRDPM"
        },
        {
          "value": 56,
          "label": "样机样屏优化"
        },
        {
          "value": 57,
          "label": "A客户marketing模块审核功能优化"
        },
        {
          "value": 58,
          "label": "前端公共组件库设计开发"
        },
        {
          "value": 59,
          "label": "数字化任务看板"
        },
        {
          "value": 60,
          "label": "研发人效分析二期"
        },
        {
          "value": 62,
          "label": "EDMS 支持OA账号登录"
        },
        {
          "value": 63,
          "label": "RDM-MSI\/优派客户QSG模块"
        },
        {
          "value": 64,
          "label": "RDM重构"
        },
        {
          "value": 66,
          "label": "智能研发数字化提升项目II期"
        },
        {
          "value": 67,
          "label": "项目群工作负荷分析"
        }
      ],
      "responsible_uid": [
        {
          "value": 147,
          "label": "杨佳"
        },
        {
          "value": 173,
          "label": "綦豫"
        },
        {
          "value": 546,
          "label": "张锦晓"
        },
        {
          "value": 950,
          "label": "陈崇旺"
        },
        {
          "value": 1165,
          "label": "徐稳"
        },
        {
          "value": 7216,
          "label": "刘潭飞"
        },
        {
          "value": 8214,
          "label": "陈冰仪"
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
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskComplete() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskDrag() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskDelete() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskCopy() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": {},
    "time": "2024-04-09 14:34"
  }
}
export function digitalTaskInfo() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a18962",
    "data": {
      "id": 7,
      "status": 1,
      "title": "项目群工作量图表",
      "content": "",
      "project_id": 67,
      "project_name": "项目群工作负荷分析",
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
      "responsible_name": "綦豫",
      "create_name": "綦豫",
      "subtask": [],
      "check": false,
      "type_text": "新功能",
      "duration": "3小时"
    },
    "time": "2024-04-09 14:34"
  }
}
export function digitalizeTask() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": [],
    "time": "2024-04-09 14:34"
  }
}
