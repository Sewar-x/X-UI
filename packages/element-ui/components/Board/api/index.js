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
          "title": "A项目1-1",
          "content":"A项目1-1",
          "project_id": 64,
          "project_name": "重构",
          "type": 1,
          "priority": 3,
          "responsible_uid": 7216,
          "plan_time": "2024-03-04",
          "start_time": 1712489825,
          "complete_time": null,
          "create_uid": 7216,
          "create_time": "2024-04-07",
          "attachment": [],
          "responsible_name": "小人",
          "create_name": "小人",
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
          "title": "A项目。",
          "content": "A项目。",
          "project_id": 58,
          "project_name": "设计开发",
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
              "cn_name": "大人"
            },
            {
              "id": 87889,
              "name": "测试.png",
              "type": "png",
              "create_time": "2024-04-09 09:24",
              "url": "\/srdpm-api\/storage\/temp\/20240409\/c2b68849e9779b034a7ae631d71614a6.png",
              "size": "27.82KB",
              "cn_name": "大人"
            }
          ],
          "responsible_name": "大人",
          "create_name": "大人",
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
          "title": "B项目",
          "content": null,
          "project_id": 62,
          "project_name": "B项目",
          "type": 1,
          "priority": 3,
          "responsible_uid": 7216,
          "plan_time": "2024-03-29",
          "start_time": 1711937053,
          "complete_time": "2024-04-07",
          "create_uid": 7216,
          "create_time": "2024-03-27",
          "attachment": [],
          "responsible_name": "小人",
          "create_name": "小人",
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
          "title": "C项目",
          "content": null,
          "project_id": 62,
          "project_name":"C项目",
          "type": 2,
          "priority": 3,
          "responsible_uid": 7216,
          "plan_time": "2024-03-29",
          "start_time": 1711535832,
          "complete_time": "2024-04-07",
          "create_uid": 7216,
          "create_time": "2024-03-27",
          "attachment": [],
          "responsible_name": "小人",
          "create_name": "小人",
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
          "title": "C项目2",
          "content": "C项目2",
          "project_id": 67,
          "project_name":"C项目2",
          "type": 1,
          "priority": 4,
          "responsible_uid": 173,
          "plan_time": "2024-04-08",
          "start_time": 1712489825,
          "complete_time": "2024-04-08",
          "create_uid": 173,
          "create_time": "2024-04-09",
          "attachment": [],
          "responsible_name": "好名字",
          "create_name": "好名字",
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
          "title":  "C项目3",
          "content": "C项目3",
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
          "responsible_name": "好名字",
          "create_name": "好名字",
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
          "title":  "C项目4",
          "content": "",
          "project_id": 67,
          "project_name":  "C项目4",
          "type": 1,
          "priority": 4,
          "responsible_uid": 173,
          "plan_time": "2024-04-12",
          "start_time": 0,
          "complete_time": null,
          "create_uid": 173,
          "create_time": "2024-04-09",
          "attachment": [],
          "responsible_name": "好名字",
          "create_name": "好名字",
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
          "label": "一个名字"
        },
        {
          "value": 2,
          "label": "好名字"
        },
        {
          "value": 3,
          "label": "烂人"
        },
        {
          "value": 4,
          "label": "好人"
        },
        {
          "value": 5,
          "label": "上帝"
        },
        {
          "value": 6,
          "label": "小人"
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
      "responsible_name": "好名字",
      "create_name": "好名字",
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


export function digitalTaskArchive() {
  return {
    "code": 200,
    "msg": "OK",
    "requestId": "6614e18a3eac8",
    "data": [],
    "time": "2024-04-09 14:34"
  }
}