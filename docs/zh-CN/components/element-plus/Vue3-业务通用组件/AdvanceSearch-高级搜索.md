# AdvanceSearch 高级搜索

高级搜索组件主要是提供给表格的条件筛选的组件

该组件筛选项通过对 Form 表单进行二次封装，除了筛选项，还包括基本的搜索输入框和相关按钮组合



## 功能

| 功能           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| 自定义筛选项   | 自定义筛选项由 Form 表单组件二次封装组成，<br />可以通过配置 `items`  字段(格式参考 Form 表单的 `items` 字段) 自定义筛选项 |
| 筛选项联动     | 联动筛选项目                                                 |
| 搜索框         | 默认显示文本搜索框，该搜索框提供模式搜索作用                 |
| 列显示筛选按钮 | 列显示筛选按钮用于筛选显示的表格列                           |
| 列固定筛选按钮 | 列固定筛选按钮用于筛选固定的表格列                           |
| 自定义按钮组   | 自定义按钮组通过传入 `buttons` 配置项，可以自定义按钮列表    |


## 接口
> 高级搜索主要用于接收用户输入数据传输给服务端，因此主要关注传输给服务端接口格式

::: details 高级搜索 默认格式示例
```javascript
 // 根据表单项内容，传入所有筛选项的值
 {
    "keyword": "模糊搜索关键字，该关键字默认为空",
    "name": "张三",
    "age": 18,
    "sex": "男",
    "hobby": ["篮球", "足球", "乒乓球"],
    "address": "北京市朝阳区"
 }
```
:::


## 示例

### 基本示例

> 默认高级搜索项失去焦点时会自动触发 search 事件，如果不需要，请配置 `form.blurSearch` 字段为 false

<xw-demo
    demo-height="200px"
    source-code="element-plus:::search/search-demo"
/>

### 带搜索框和自定义按钮组

> 自定义搜索按钮位于搜索框右侧，使用者可以通过配置 buttons 字段来配置按钮：
>
> 格式参考以上自定义按钮组
>
> * `search` ： 表示是否显示搜索按钮
> * `clear`： 表示是否显示重置按钮
> * `button`： 为自定义按钮组配置

<xw-demo
    demo-height="200px"
    source-code="element-plus:::search/search-input-demo"
/>

### 搜索项联动

<xw-demo
    demo-height="200px"
    source-code="element-plus:::search/search-cascade-demo"
/>