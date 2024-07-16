# Webpack 概念

webpack 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。当 webpack 处理应用程序时，它会递归地构建一个[*依赖关系图(dependency graph)*](https://webpack.js.org/concepts/dependency-graph/)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。



![](https://file.wangsijie.top/share/webpack-controdition.png)



使用 Webpack 作为前端构建工具：

- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。



## 核心概念

### 入口（entry）

指示 webpack 应该使用哪个模块，来作为构建内部依赖图的开始。

也可以有多个入口点，内部会构建多个依赖图。

### 输出（output）

告诉 webpack 在哪里输出它所创建的 bundle， 以及如何命名。

### loader

webpack 只能理解 Javascript 和 Json 。loader 可以让 webpack 去处理其他类型的文件，并转为有效模块，供程序使用，以及被添加到依赖图中。

[writing-a-loader](https://webpack.docschina.org/contribute/writing-a-loader/)

### 插件（plugin）

插件可以用于执行范围更广的任务。如：打包优化、资源管理、注入环境变量。

Webpack 自身也是构建于你在 webpack 配置中用到的 **相同的插件系统** 之上！插件目的在于解决 loader 无法实现的**其他事**。

[writing-a-plugin](https://webpack.docschina.org/contribute/writing-a-plugin/)

### 模块（Modules）

开发者将程序分解为功能离散的 chunk，并称之为 **模块**。

Webpack 天生支持 ES 模块、CommonJS 模块、AMD 模块、Assets、WebAssembly 模块。



**模块解析：**Webpack 使用 [enhanced-resolve](https://www.npmjs.com/package/enhanced-resolve) 支持绝对路径、相对路径、模块路径。

**缓存：**每次文件系统访问文件都会被缓存。watch 模式下只有修改过的文件被移出缓存。



模块被合并成 chunk，chunk 合并成 chunk 组，形成互相连接的图（ModuleGraph）。

**Chunk：**有两种形式：

- initial 入口起点的 main chunk，包含入口起点的所有指定模块和依赖项
- Non-inital 是可以延迟加载的 chunk，出现在 dynmaic imports 或 SplitChunksPlugin 

SplitChunksPlugin 可以拆分多个 chunk



### Module Federation

多个独立的构建可以组成一个应用程序。

[查看官方案例](https://webpack.docschina.org/concepts/module-federation/)

### Compiler

编译管理器

**Compilation**：编辑过程管理器

