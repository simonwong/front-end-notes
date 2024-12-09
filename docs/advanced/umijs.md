# umijs 原理

## 包分析

umi 的微内核架构本质是配置收集器和插件管理器。

![](https://file.simonwong.cn/blog/202111241754810.png)

### umi

cli 理用户命令。export 运行时用的方法、组件



### @umi/core

`Service`

核心服务类

注册 plugin 和 presets。生成 config 实例。

`Config`

初始化用户 config 配置，merge config，watch config（watch 依赖了第三方库 `chokidar`）

`Route`

处理约定式路由

### @umi/runtime

- 从第三方库 `history-with-query` 暴露了 History 相关方法

- 从第三方库 `react-router-dom` 暴露了 react-router 的路由组件和路由 hooks

- 复制了 `react-loadable` 代码，封装了 `Loadable` ，然后暴露了 `dynamic` 方法来做 react code splitting
- 暴露了 `Plugin` 类 和 `isBrowser` 方法



## 运行时

### `import { xxx } from 'umi'`

index.ts 文件 export 了 `@umijs/runtime` 运行时的组件方法，如 `Link` `useHistory` 等。

通过 `export * from '@@/core/umiExports'` 暴露出所有 umi 的插件暴露的东西。（`@@` 指向项目目录的 `src/.umi`）



### .umi 文件

- umi.ts —— 直接看源码

  polifile、render、hotreload

- core —— 内部插件生成

  - routes.ts —— 动态生成了路由
  - plugins.ts —— 插件列表
  - history.ts —— 动态暴露 `history`
  - ...

- pluginA..B..C.. —— 外部插件生成



## 构建时



![](https://file.simonwong.cn/blog/202111241755577.png)

