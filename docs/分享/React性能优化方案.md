# React性能优化 #

## 调试环境 ##

NetWork:

- [x] Disable cache
- [x] Fast 3G

 Performance:

- [x] Secreenshots



## 首次渲染优化 ##

### 浏览器自带调试器 ###

- 在performance里进行录制。刷新页面，从加载到完全显示的火焰图
- 选取range：Network、User Timing的火焰图。查看summary的饼图。



### 常见的原因分析 ###

- JS Bundle太大，极其消耗时间
- 图片文件的加载



### 优化方案 ###

- JS Bundle -> Gzip
- 图片文件 -> CDN
- 代码分割：使用`React Router4`[code-splitting](https://reacttraining.com/react-router/web/guides/code-splitting)

### 视觉优化方案 ###

- 首页loading、进度条
- 首页骨架占位



## 用户使用过程中优化 ##

### 使用`React Developer Tools` ###

- React Profiler -> 录制 -> 操作页面 -> stop
- 使用Flamegraph、Ranked两种类型的图进行分析
- 在设置里面筛选渲染时间长的操作节点
- 双击火焰图的节点来看重复渲染次数



### 优化方案 ###

- Component / PureComponent

> PureComponent是自动帮助使用了shouldComponentUpdate生命周期，对下一次的props、state进行了浅比较；
>
> 注意：当你的props是复杂的对象，想要复杂对象的内容变化，使得子组件渲染的话，不能使用PureComponent。其他情况尽量多的使用PureComponent来避免重复渲染。

-  手动使用shouldComponentUpdate进行比较，或深比较，来减少渲染
- 拆分复杂页面组件，拆分成一个个小的页面级别组件
- 尽可能多的写无状态组件





## 