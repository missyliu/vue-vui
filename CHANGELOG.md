# Changelog

### Version 0.1.0
* 新增 Suggest 组件
=======
# ChangeLog

## v0.2.0 (2016.09.01)
### 新增
* vui-tree 组件
* vui-table 组件

### 变更
* vui-suggest 组件
  * ajaxUrl 更名为 src，表示请求数据源地址
  * key 更名为 ret，表示返回数据源数据属性名
  * 新 key 用于表示列表项显示的属性名

### 修复
* vui-suggest 组件自定义列表项模版失效问题
  * 即组件不再引入 vue，自定义替换由业务方添加处理函数
