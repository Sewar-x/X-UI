# 任务看板

## 目录结构

![img](../../../../public/docsImages/taskbord.png) 

## 各组件之间的嵌套关系

![img](../../../../public/docsImages/taskbord1.png)



## 使用说明

了解各个组件之间的嵌套关系对于有效地使用组件并正确绑定参数和方法至关重要。明白了它们的嵌套关系后，我们能够更清晰地确定什么样的参数和方法需要绑定在谁的身上。

组件的对外接口主要包括属性、方法和插槽，它们定义了组件与外部世界交互的方式，使得组件可以被其他组件或系统所调用和使用。因此，我们需要知道各个组件里面都提供了哪些对外的接口。

## 看板组件入口

入口文件为： `index.vue`

### **Attributes**

| 参数        | 配置用途       | 类型   |
| ----------- | -------------- | ------ |
| columnItems | 状态列表配置项 | Array  |
| columnData  | 状态列表数据   | Object |

### **Slot**

| 名称                 | 说明             |
| -------------------- | ---------------- |
| DragContentDialogAdd | 新增弹窗内容插槽 |
| DragContentMsgTop    | 卡片信息内容插槽 |
| DragContentDialogMsg | 编辑弹窗内容插槽 |

### **数据结构**



::: details columnItems 结构



```js
// 状态列表配置项
columnItems(){
  return[
    {
      props:'pending',// 数据对应的key
      headerText: '待领取',// 列头部标题内容
      headerWidth:  '32%',// 列头部标题宽度
      bgColor:  '#4A9FF9',// 列头部标题背景颜色
    },
    {
      props:'doing',
      headerText: '进行中', 
      headerWidth:  '32%', 
      bgColor:  '#f9944a', 
    },
    {
      props:'finish',
      headerText: '已完成', 
      headerWidth:  '32%',
      bgColor:  '#2ac06d', 
    },
  ]
}
// 状态列表数据
columnData:{
  pending: [{...}],
  doing: [{...},{...}],
  finish: [{...},{...}]
}, 
// 注意：columnItems中所配置到的props，必须与columnData中的key一一对应。  
```

:::

## **任务卡片列表**

文件入口：`DragContentColumn.vue`

### **Attributes**

| 参数        | 配置用途           | 类型   |
| ----------- | ------------------ | ------ |
| headerText  | 列头部标题内容     | String |
| headerWidth | 列头部标题宽度     | String |
| bgColor     | 列头部标题背景颜色 | String |
| list        | 每一列的数据       | Array  |
| columnKey   | 列key              | Number |

### **Events**

| 事件名      | 说明                       | 传递参数 |
| ----------- | -------------------------- | -------- |
| change      | 修改任务卡片所属拖拽列     | params   |
| showContent | 打开编辑弹窗，展示任务信息 | element  |

## 卡片

文件入口：`DragContent.vue`

### **Attributes**

| 参数    | 配置用途 | 类型   |
| ------- | -------- | ------ |
| element | 卡片信息 | Object |

### **Events**

| 事件名      | 说明                   | 传递参数 |
| ----------- | ---------------------- | -------- |
| changeCheck | 更改任务卡片的勾选状态 | element  |

## 任务卡片上部

文件：`TopContent.vue`

### **Attributes**

| 参数         | 配置用途             | 类型    |
| ------------ | -------------------- | ------- |
| contentItems | 卡片上部信息配置项   | Array   |
| element      | 卡片上部内容数据     | Object  |
| showNumber   | 是否显示头部编号(id) | Boolean |

> 内含自定义插槽，可在contentItems中，通过给某些item配置slotName来预留具名插槽位置，`<slot v-if="item.slotName" :name="item.slotName"/>`之后在使用到改组件的地方，用相同的名字插入自定义内容。`<template slot="配置过的slotName"> ……</template>`

### **数据结构**

::: details contentItems 结构



```js
// 卡片上部信息配置项
contentItems(){ 
  return [
    [// 有插槽时props可配可不配
      {label:'分类',props: '',icon:'el-icon-price-tag',slotName:'type-slot'},
      {label:'优先级',props: '',icon:'el-icon-s-flag',slotName:'priority-slot'}
    ],
    [
      {label:'时间',props:'',icon:'el-icon-date',slotName:'time-slot'},
      {label:'历时',props:'',icon:'el-icon-time',slotName:'duration-slot'}
    ],
  ]
},
// 卡片上部内容数据
element: {
  type: 1,
  priority: 2,
  plan_time: "2024-02-09",
  duration: "19天"
}
// 注意：contentItems中所配置到的props(如有配)，必须与element中的key一一对应。
```

:::

## 任务卡片下部

文件：`BottomContent.vue`

### **Attributes**

| 参数             | 配置用途               | 类型   |
| ---------------- | ---------------------- | ------ |
| statisticItems   | 卡片下部统计列表配置项 | Array  |
| messages         | 卡片下部统计列表数据   | Object |
| statisticButtons | 卡片右下角按钮配置项   | Array  |

### **Events**

| 事件名         | 说明                       | 传递参数 |
| -------------- | -------------------------- | -------- |
| handleButClick | 点击调用按钮配置的相应事件 | element  |

> 点击按钮时，使用$emit通知父组件调用相应方法，并传递将此任务卡片的信息。  
>
> 点击调用的方法: `handleButClick(event,element){   this.$emit(event,element)  },`
>
> **注意**：
>
> * `statisticButtons` 中所配置的事件名称 event 必须与 methods 中声明的方法名一致，并且记得在父组件中，对使用的index组件进行事件绑定。

### **数据结构**

::: details statisticItems 结构



```js
/ 卡片下部统计列表配置项
statisticItems(){
  return [
    {icon:'el-icon-user',props:'responsible_name'},
    {icon:'el-icon-set-up',props:'subtask_num'},
    {icon:'el-icon-connection',props:'attachment_num'},
    {icon:'el-icon-chat-line-square',props:'comment_num'}
  ]
},
// 卡片下部统计列表数据
messages: {
  responsible_name: '小陈',
  subtask_num: 5,
  attachment_num: 6,
  comment_num: 8,
}
// 注意：statisticItems中所配置到的props，必须与messages中的key一一对应。
// 卡片右下角按钮配置项
statisticButtons(){
  return [
    {icon:'el-icon-document-copy',title:'复制任务',event:'digitalTaskCopy'},
{icon:'el-icon-delete',title:'删除任务',event:'digitalTaskDelete'},
{icon:'el-icon-s-check',title:'提交工时单',event:'openApplyDialog'},
  ]
},
```

:::

## **新增弹窗**

文件： `DragContentAdd.vue`

### **Attributes**

| 参数           | 配置用途     | 类型    |
| -------------- | ------------ | ------- |
| addVisible     | 弹窗是否可见 | Boolean |
| dialogTitleAdd | 弹窗标题     | String  |

## **新增表单**

文件：`DialogAdd.vue`

### **Attributes**

| 参数           | 配置用途       | 类型   |
| -------------- | -------------- | ------ |
| dialogAddItems | 新增表单配置项 | Array  |
| addFormData    | 新增表单数据   | Object |

> 内含自定义插槽，可在contentItems中，通过给某些item配置slotName来预留具名插槽位置，`<slot v-if="item.slotName" :name="item.slotName"/>`之后在使用到改组件的地方，用相同的名字插入自定义内容。`<template slot="配置过的slotName"> ……</template>`

### **Events**

| 事件名    | 说明     | 传递参数    |
| --------- | -------- | ----------- |
| submitAdd | 提交新增 | addFormData |
| closeAdd  | 取消新增 | 无          |

### **数据结构**

::: details dialogAddItems 结构



```js
/ 新增表单配置项
dialogAddItems (){ 
  return [
    [
      {
        label:'标题',
        props:'title',
        icon:'el-icon-document-checked',
        slotName:'title-slot',
        noShow: true,
      },
    ],
    [
      {
        label:'内容描述',
        props:'content',
        icon:'el-icon-document',
        slotName:'content-slot',
      },
    ],
    [
      {
        label:'所属任务',
        props:'project_id',
        icon:'el-icon-share',
        slotName:'project-slot',
        options:{
          comp: 'el-select', // 组件
          attr: {
            placeholder:'请选择项目名称',
          },
          children: this.digitalOptions.project_id ? 
          this.digitalOptions.project_id.map((item) => {
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
          :[]
        },
      }
    ],
    [
      {
        label:'需求分类',
        props:'type',
        icon:'el-icon-price-tag',
        slotName:'type-slot',
        options:{
          comp: 'el-select', // 组件
          attr:{
            placeholder:'请选择需求分类',
          },
          children: this.digitalOptions.type ? 
          this.digitalOptions.type.map((item) => {
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
          :[]
        }
      }
    ],
    [
      {
        label:'优先级',
        props:'priority',
        icon:'el-icon-s-flag',
        slotName:'priority-slot',
        options:{
          comp: 'el-select', // 组件
          attr:{
            placeholder:'请选择优先级',
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
          })
        },
      }
    ],
    [
      {
        label:'标准工作量',
        props:'work_level',
        icon:'el-icon-guide',
        slotName:'work-slot',
        options:{
          comp: 'el-select', // 组件
          attr:{
            placeholder:'请选择标准工作量',
          },
          children: this.digitalOptions.work_level ? 
          this.digitalOptions.work_level.map((item) => {
            return {
              comp: "el-option",
              data: item.value,
              attr: {
                label: item.label +"："+ item.hours + "h",
                value: item.value,  
                key: item.key,    
              },
            };
          })
          :[],
        }
      }
    ],
    [
      {
        label:'责任人',
        props:'responsible_uid',
        icon:'el-icon-user',
        slotName:'responsible-slot',
        options:{
          comp: 'el-select', // 组件
          attr:{
            placeholder:'请选择责任人',
          },
          children: this.digitalOptions.responsible_uid ? 
          this.digitalOptions.responsible_uid.map((item) => {
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
          :[]
        }
      }
    ],
    [
      {
        label:'创建人',
        props:'create_name',
        icon:'el-icon-user-solid',
        noChange: true,
        options:{
          comp: 'el-select', // 组件
          attr:{
            placeholder:'请选择创建人',
            disabled:this.editVisible ? true : false, 
          },
          children: this.digitalOptions.responsible_uid ? 
          this.digitalOptions.responsible_uid.map((item) => {
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
          :[]
        }
      }
    ],
    [
      {
        label:'时间',
        props:'plan_time',
        icon:'el-icon-date',
        slotName:'time-slot',
        options:{
          comp: 'el-date-picker', // 组件
          attr:{
            placeholder:"开始日期",
          }
        }
      }
    ],
    [
      {
        label:'历时',
        props:'duration',
        icon:'el-icon-time',
        noChange: true,
      }
    ],
    [
      {
        label:'子任务',
        props:'subtask',
        icon:'el-icon-s-operation',
        slotName:'childTask-slot',
      }
    ],
    [
      {
        label:'附件',
        props:'attachment',
        icon:'el-icon-connection',
        slotName:'attach-slot',
      }
    ],
  ]
},
// 新增表单数据
addFormData: {
  id: null,
  title: null,
  content: null,
  project_id: null,
  type: null,
  priority: null,//优先级
  work_level: null,//工作量
  responsible_uid: null,//责任人 
  plan_time: null,//计划时间    
  attachment: [],//附件
  subtask: []//子任务
},
// 注意：dialogAddItems中所配置到的props，必须与addFormData中的key一一对应。
```

:::

## **编辑弹窗**

文件：`DragContentDialog.vue`

### **Attributes**

| 参数              | 配置用途       | 类型     |
| ----------------- | -------------- | -------- |
| element           | 卡片信息       | Object   |
| dialogVisible     | 弹窗是否可见   | Boolean  |
| dialogTitleEdit   | 弹窗标题       | String   |
| isRefreshComments | 是否刷新评论区 | Boolean  |
| discussionType    | 评论区模块类型 | Number   |
| getDiscussionList | 获取评论列表   | Function |

### **Events**

| 事件名         | 说明     | 传递参数                    |
| -------------- | -------- | --------------------------- |
| addComments    | 新增评论 | commentListParams，comments |
| deleteComments | 删除评论 | id                          |



## **编辑表单**

文件：`DialogEdit.vue`

### **Attributes**

| 参数            | 配置用途       | 类型     |
| --------------- | -------------- | -------- |
| dialogEditItems | 编辑表单配置项 | Array    |
| editFormData    | 编辑表单数据   | Object   |
| editVisible     | 编辑区是否可见 | >Boolean |

> 内含自定义插槽，可在contentItems中，通过给某些item配置slotName来预留具名插槽位置
>
> `<slot v-if="item.slotName" :name="item.slotName"/>`之后在使用到改组件的地方，用相同的名字插入自定义内容。
>
> `<template slot="配置过的slotName"> ……</template>`

### **Events**

| 事件名       | 说明         | 传递参数                   |
| ------------ | ------------ | -------------------------- |
| submitEdit   | 提交编辑     | editFormData               |
| closeEdit    | 取消编辑     | showEditArea，editFormData |
| openEditArea | 显示编辑区域 | showEditArea，editFormData |

### 数据结构

::: details dialogEditItems 结构



```js
/ 编辑表单配置项
dialogEditItems (){ 
  return [
    [
      {
        label:'标题',
        props:'title',
        icon:'el-icon-document-checked',
        slotName:'title-slot',
        noShow: true,
      },
    ],
    [
      {
        label:'内容描述',
        props:'content',
        icon:'el-icon-document',
        slotName:'content-slot',
      },
    ],
    [
      {
        label:'所属任务',
        props:'project_id',
        icon:'el-icon-share',
        slotName:'project-slot',
        options:{
          comp: 'el-select', // 组件
          attr: {
            placeholder:'请选择项目名称',
          },
          children: this.digitalOptions.project_id ? 
          this.digitalOptions.project_id.map((item) => {
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
          :[]
        },
      }
    ],
    [
      {
        label:'需求分类',
        props:'type',
        icon:'el-icon-price-tag',
        slotName:'type-slot',
        options:{
          comp: 'el-select', // 组件
          attr:{
            placeholder:'请选择需求分类',
          },
          children: this.digitalOptions.type ? 
          this.digitalOptions.type.map((item) => {
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
          :[]
        }
      }
    ],
    [
      {
        label:'优先级',
        props:'priority',
        icon:'el-icon-s-flag',
        slotName:'priority-slot',
        options:{
          comp: 'el-select', // 组件
          attr:{
            placeholder:'请选择优先级',
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
          })
        },
      }
    ],
    [
      {
        label:'标准工作量',
        props:'work_level',
        icon:'el-icon-guide',
        slotName:'work-slot',
        options:{
          comp: 'el-select', // 组件
          attr:{
            placeholder:'请选择标准工作量',
          },
          children: this.digitalOptions.work_level ? 
          this.digitalOptions.work_level.map((item) => {
            return {
              comp: "el-option",
              data: item.value,
              attr: {
                label: item.label +"："+ item.hours + "h",
                value: item.value,  
                key: item.key,    
              },
            };
          })
          :[],
        }
      }
    ],
    [
      {
        label:'责任人',
        props:'responsible_uid',
        icon:'el-icon-user',
        slotName:'responsible-slot',
        options:{
          comp: 'el-select', // 组件
          attr:{
            placeholder:'请选择责任人',
          },
          children: this.digitalOptions.responsible_uid ? 
          this.digitalOptions.responsible_uid.map((item) => {
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
          :[]
        }
      }
    ],
    [
      {
        label:'创建人',
        props:'create_name',
        icon:'el-icon-user-solid',
        noChange: true,
        options:{
          comp: 'el-select', // 组件
          attr:{
            placeholder:'请选择创建人',
            disabled:this.editVisible ? true : false, 
          },
          children: this.digitalOptions.responsible_uid ? 
          this.digitalOptions.responsible_uid.map((item) => {
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
          :[]
        }
      }
    ],
    [
      {
        label:'时间',
        props:'plan_time',
        icon:'el-icon-date',
        slotName:'time-slot',
        options:{
          comp: 'el-date-picker', // 组件
          attr:{
            placeholder:"开始日期",
          }
        }
      }
    ],
    [
      {
        label:'历时',
        props:'duration',
        icon:'el-icon-time',
        noChange: true,
      }
    ],
    [
      {
        label:'子任务',
        props:'subtask',
        icon:'el-icon-s-operation',
        slotName:'childTask-slot',
      }
    ],
    [
      {
        label:'附件',
        props:'attachment',
        icon:'el-icon-connection',
        slotName:'attach-slot',
      }
    ],
  ]
},
// 编辑表单数据
editFormData: {
  id: null,
  title: null,
  content: null,
  project_id: null,
  type: null,
  priority: null,//优先级
  work_level: null,//工作量
  responsible_uid: null,//责任人 
  plan_time: null,//计划时间    
  attachment: [],//附件
  subtask: []//子任务
},
// 注意：dialogEditItems中所配置到的props，必须与editFormData中的key一一对应。
```

:::



## **评论区列表**

文件：`InfiniteScrollWrap.vue`

### **Attributes**

| 参数        | 配置用途             | 类型     |
| ----------- | -------------------- | -------- |
| height      | 评论区高度           | String   |
| itemKey     | 评论key值            | String   |
| size        | 每页展示数量         | Number   |
| params      | 除了分页数据外的参数 | Object   |
| loadingText | 加载时显示的文本     | String   |
| noMoreText  | 无数据时显示的文本   | String   |
| listMethod  | 获取列表数据方法     | Function |



## **一条评论**

文件：`Comments.vue`

### **Attributes**

| 参数       | 配置用途               | 类型    |
| ---------- | ---------------------- | ------- |
| data       | 评论信息               | Object  |
| width      | 宽度                   | String  |
| height     | 高度                   | String  |
| openEvent  | 是否接收富文本内容事件 | Boolean |
| showDelete | 是否显示删除按钮       | Boolean |
| showEdit   | 是否显示编辑按钮       | Boolean |

## **富文本编辑器**

文件：`Tinymce.vue`

### **Attributes**

| 参数        | 配置用途       | 类型           |
| ----------- | -------------- | -------------- |
| id          | 编辑器id       | String         |
| value       | 文本内容       | String         |
| toolbar     | 工具栏         | Array          |
| menubar     | 隐藏最上方menu | String         |
| height      | 高度           | Number, String |
| width       | 宽度           | Number, String |
| placeholder | 提示信息       | String         |

## **子任务列表**

文件：`ChildTask.vue`

### **Attributes**

| 参数         | 配置用途       | 类型    |
| ------------ | -------------- | ------- |
| taskList     | 子任务列表数据 | Array   |
| width        | 宽度           | String  |
| addMoreTitle | 添加按钮文案   | String  |
| showEdit     | 是否放开编辑   | Boolean |

### **Events**

| 事件名  | 说明       | 传递参数 |
| ------- | ---------- | -------- |
| addTask | 添加子任务 | taskList |
| delTask | 删除子任务 | task     |

## **基础组件**

文件：`BasicComponent.vue`

### **Attributes**

| 参数    | 配置用途               | 类型           |
| ------- | ---------------------- | -------------- |
| options | 传入组件或原生html元素 | Object, String |

### **数据结构**

::: details Options 结构



```js
Options: {
  comp: null, // 组件标签
  ref: null, // 组件引用对象
  data: null, // 组件数据
  attr: null, // 组件属性
  listeners: null, // 组件监听事件
  content: null, // 组件内容
  children: [
    {
      comp: null, // 组件标签
      ref: null, // 组件引用对象
      data: null, // 组件数据
      attr: null, // 组件属性
      listeners: null, // 组件监听事件
      children: []
    }
  ]
}
```

:::

## 接口

在看板组件中，接口数据采用 mock 形式返回固定对象，没有接口服务，因此部分功能无法 demo 组件中查看；

在 demo看板组件涉及以下接口：

| 接口功能     | 接口demo函数        |
| ------------ | ------------------- |
| 高级搜索下拉 | digitalTaskSearch   |
| 任务列表     | digitalTaskList     |
| 修改任务     | digitalTaskModify   |
| 完成任务     | digitalTaskComplete |
| 拖动状态修改 | digitalTaskDrag     |
| 删除任务     | digitalTaskDelete   |
| 复制任务     | digitalTaskCopy     |
| 任务详细信息 | digitalTaskInfo     |
| 归档任务     | digitalTaskArchive  |
| 提交工时单   | digitalizeTask      |
| 进度评论列表 | getDiscussionList   |
| 添加进度评论 | discussionAdd       |
| 删除进度评论 | discussionDel       |

### 高级搜索下拉

::: details 高级搜索下拉接收格式



```json
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
```

::: 



### 任务列表

::: details 任务列表接口接收格式

```json
export function digitalTaskList() {
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
```

:::



### 修改任务

::: details 修改任务发送格式

```js
// 修改任务主要需要了解 发送给服务端数据格式
{
    "id": 24,
    "status": 2,
    "title": "ElementPlus 组件库封装",
    "content": "对ElementPlus 基础组件进行封装到组件库",
    "project_id": 58,
    "project_name": "前端公共组件库设计开发",
    "type": 1,
    "priority": 4,
    "work_level": 734,
    "responsible_uid": 1165,
    "plan_time": null,
    "start_time": "2024-04-12 09:58",
    "complete_time": null,
    "create_uid": 1165,
    "create_time": "2024-04-10",
    "attachment": [],
    "work_level_text": "L7",
    "responsible_name": "sewen",
    "create_name": "sewen",
    "subtask": [
        {
            "sub_id": 1,
            "content": "BasicComponents ——通用组件",
            "plan_time": "2024-04-30",
            "complete_time": 1712887102,
            "check": true
        },
        {
            "sub_id": 2,
            "content": "Form ——通用组件",
            "plan_time": "2024-04-30",
            "complete_time": 1713316563,
            "check": false
        },
        {
            "sub_id": 3,
            "content": "Table ——通用组件",
            "plan_time": "2024-04-30",
            "complete_time": 0,
            "check": false
        },
        {
            "sub_id": 4,
            "content": "Dialog ——通用组件",
            "plan_time": "2024-04-30",
            "complete_time": 0,
            "check": false
        },
        {
            "sub_id": 5,
            "content": "Descriptions ——通用组件",
            "plan_time": "2024-04-30",
            "complete_time": 0,
            "check": false
        },
        {
            "sub_id": 6,
            "content": "Upload ——通用组件",
            "plan_time": "2024-04-30",
            "complete_time": 0,
            "check": false
        },
        {
            "sub_id": 7,
            "content": "Search ——通用组件",
            "plan_time": "2024-04-30",
            "complete_time": 0,
            "check": false
        },
        {
            "sub_id": 8,
            "content": "Menu ——通用组件",
            "plan_time": "2024-04-30",
            "complete_time": 0,
            "check": false
        },
        {
            "sub_id": 9,
            "content": "Popover ——通用组件",
            "plan_time": "2024-04-30",
            "complete_time": 0,
            "check": false
        },
        {
            "sub_id": 10,
            "content": "Swiper ——通用组件",
            "plan_time": "2024-04-30",
            "complete_time": 0,
            "check": false
        },
        {
            "sub_id": 11,
            "content": "Icon、SvgIcon ——通用组件",
            "plan_time": "2024-04-30",
            "complete_time": 0,
            "check": false
        },
        {
            "sub_id": 12,
            "content": "Task Board 任务看板 ——通用业务组件",
            "plan_time": "2024-04-30",
            "complete_time": 0,
            "check": false
        },
        {
            "sub_id": 13,
            "content": "Vue3 Hooks",
            "plan_time": "2024-04-30",
            "complete_time": 0,
            "check": false
        }
    ],
    "check": false,
    "type_text": "新功能",
    "duration": "5天"
}
```

:::



### 新增任务

::: details 新增任务发送格式

```js
{
  "id": null,
  "title": "测试",
  "content": "测试",
  "project_id": 58,
  "type": 1,
  "priority": 1,
  "work_level": 728,
  "responsible_uid": 1165,
  "plan_time": "2024-03-31T16:00:00.000Z",
  "attachment": [],
  "subtask": [
    {
      "id": "7adbc7c0fc9311eea322bdcd4b4c6c0f",
      "content": "测试",
      "check": null,
      "plan_time": "2024-04-01"
    }
  ]
}
```

:::



### 完成任务

::: details 完成任务发送格式

```js
{
  "id": 15,
  "check": false
}
```

:::

### 拖动状态修改

::: details 拖动状态修改发送格式

```js
{
  "id": 15,
  "status": 3
}
```

:::

### 删除任务

::: details 删除任务发送格式

```js
{
  "id": 43
}
```

:::

### 复制任务

::: details 复制任务发送格式

```js
{
  "id": 43
}
```

:::

### 任务详细信息

::: details 任务详细信息接收格式

```js
发送格式：
{
  "id": 24
}
返回格式：
{
  "code": 200,
  "msg": "OK",
  "requestId": "661f877222e8b",
  "data": {
    "id": 24,
    "status": 2,
    "title": "ElementPlus 组件库封装",
    "content": "对ElementPlus 基础组件进行封装到组件库",
    "project_id": 58,
    "project_name": "前端公共组件库设计开发",
    "type": 1,
    "priority": 4,
    "work_level": 734,
    "responsible_uid": 1165,
    "plan_time": null,
    "start_time": "2024-04-12 09:58",
    "complete_time": null,
    "create_uid": 1165,
    "create_time": "2024-04-10",
    "attachment": [],
    "work_level_text": "L7",
    "responsible_name": "sewen",
    "create_name": "sewen",
    "subtask": [
      {
        "sub_id": 1,
        "content": "BasicComponents ——通用组件",
        "plan_time": "2024-04-30",
        "complete_time": 1712887102,
        "check": true
      },
      {
        "sub_id": 2,
        "content": "Form ——通用组件",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      },
      {
        "sub_id": 3,
        "content": "Table ——通用组件",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      },
      {
        "sub_id": 4,
        "content": "Dialog ——通用组件",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      },
      {
        "sub_id": 5,
        "content": "Descriptions ——通用组件",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      },
      {
        "sub_id": 6,
        "content": "Upload ——通用组件",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      },
      {
        "sub_id": 7,
        "content": "Search ——通用组件",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      },
      {
        "sub_id": 8,
        "content": "Menu ——通用组件",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      },
      {
        "sub_id": 9,
        "content": "Popover ——通用组件",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      },
      {
        "sub_id": 10,
        "content": "Swiper ——通用组件",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      },
      {
        "sub_id": 11,
        "content": "Icon、SvgIcon ——通用组件",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      },
      {
        "sub_id": 12,
        "content": "Task Board 任务看板 ——通用业务组件",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      },
      {
        "sub_id": 13,
        "content": "Vue3 Hooks",
        "plan_time": "2024-04-30",
        "complete_time": 0,
        "check": false
      }
    ],
    "check": false,
    "type_text": "新功能",
    "duration": "5天"
  },
  "time": "2024-04-17 16:25"
}
```

:::



### 归档任务

::: details 归档任务发送格式

```js
{
  "id": 44
}
```

:::



### 提交工时单

::: details 提交工时单发送格式

```js
{
  "id": 24,
  "work_hours": "8",
  "content": "对ElementPlus 基础组件进行封装到组件库",
  "submit_time": "2024-04-15T16:00:00.000Z"
}
```

:::



### 进度评论列表

::: details 进度评论列表接收格式

```js
{
  "code": 200,
  "msg": "OK",
  "requestId": "661f87722a88e",
  "data": {
    "total": 1,
    "per_page": 15,
    "current_page": 1,
    "last_page": 1,
    "data": [
      {
        "id": 3182,
        "project_id": 0,
        "type": 8,
        "link_id": 24,
        "user_id": 1165,
        "user": "sewen",
        "comment": "<p>目前正在研究amis 低代码框架，考虑使用 amis 的设计模式封装 element plus</p>\n<p>&nbsp;</p>",
        "time": "2024-04-17 15:51",
        "is_oper": true
      }
    ]
  },
  "time": "2024-04-17 16:25"
}
```

:::



### 添加进度评论

::: details 添加进度评论发送格式

```js
{
  "link_id": 24,
  "page_size": 15,
  "type": 8,
  "comment": "<p>测试</p>"
}
```

:::



### 删除进度评论

::: details 删除进度评论发送格式

```js
{
  "id": 3182
}
```

:::





## **示例**

### **纯看板组件**

>  纯看板组件不包含搜索框，新增看板弹窗，需要另外开发新增弹窗


<xw-demo
    demo-height="1000px"
    source-code="element-ui:::task-board/task-use-demo"
/>


----


### 带搜索看板

> 带搜索看板自带看板内容筛选框，可以新增看板内容



<xw-demo
    demo-height="1100px"
    source-code="element-ui:::task-board/task-board-advance"
/>

## **问题**



为什么编辑表单的关闭事件不叫closeEdit而要叫changeEdit呢？

> 答：因为编辑弹窗中，左侧是一个动态组件，包含①内容展示和②编辑表单，此时的editVisible代表的是编辑区是否可见，并非表示弹窗的关闭与否，可以true变成false，也可以false变成true。



为什么新增表单需要在Board也绑定closeAdd事件？而编辑表单却不需要在Board上也绑定上changeEdit呢？

> 答：因为取消新增弹窗时，需要手动清空父组件的表单；而且新增操作是在父组件里的“新增”按钮来触发，需要通过Board来打开里面的弹窗。
>
> 编辑表单的每一次弹出，都是通过接口获取最新的一条对应数据并初始化编辑表单，不需要手动清空表单；而且弹窗的开闭整合在了组件内部，编辑区域和内容展示区域的切换逻辑写在dialogEdit中，在父组件中引入时可以直接对其进行事件绑定，不需要通过Board来传递这个事件。

## 贡献者

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/95331757?v=4',
    name: 'Vivien',
    title: 'Staff Frontend Engineer',
    links: [
      { icon: 'github', link: 'https://github.com/yoguoer' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      组件贡献者
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>