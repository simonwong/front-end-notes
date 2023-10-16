

## 入门资料网站



[Java 架构师笔记](https://zq99299.github.io/note-architect/)



[Java开发手册(黄山版)](https://github.com/alibaba/p3c/blob/master/Java%E5%BC%80%E5%8F%91%E6%89%8B%E5%86%8C(%E9%BB%84%E5%B1%B1%E7%89%88).pdf)



- 开放 API 层：可直接封装 Service 接口暴露成 RPC 接口；通过 Web 封装成 http 接口；网关控制层等。

- 终端显示层：各个端的模板渲染并执行显示的层。当前主要是 velocity 渲染，JS 渲染，JSP 渲染，移动端展示等。

- Web 层：主要是对访问控制进行转发，各类基本参数校验，或者不复用的业务简单处理等。

- Service 层：相对具体的业务逻辑服务层。

- Manager 层：通用业务处理层，它有如下特征
  - 对第三方平台封装的层，预处理返回结果及转化异常信息，适配上层接口。
  - 对 Service 层通用能力的下沉，如缓存方案、中间件通用处理。
  - 与 DAO 层交互，对多个 DAO 的组合复用。

- DAO 层：数据访问层，与底层 MySQL、Oracle、Hbase、OceanBase 等进行数据交互。

- 第三方服务：包括其它部门 RPC 服务接口，基础平台，其它公司的 HTTP 接口，如淘宝开放平台、支付宝付款服务、

高德地图服务等。

- 外部数据接口：外部（应用）数据存储服务提供的接口，多见于数据迁移场景中。





分层领域模型规约：

- DO（Data Object）：此对象与数据库表结构一一对应，通过 DAO 层向上传输数据源对象。

- DTO（Data Transfer Object）：数据传输对象，Service 或 Manager 向外传输的对象。
- BO（Business Object）：业务对象，可以由 Service 层输出的封装业务逻辑的对象。
- Query：数据查询对象，各层接收上层的查询请求。注意超过 2 个参数的查询封装，禁止使用 Map 类来传输。
- VO（View Object）：显示层对象，通常是 Web 向模板渲染引擎层传输的对象。