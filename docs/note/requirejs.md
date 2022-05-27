# RequireJS

## 概要

RequireJS 是一个 JS 文件和模块的加载器



### AMD（Asynchronous Module Definition）

AMD 顾名思义，异步模块定义，采用异步方式加载模块



`AMD` 是`RequireJS` 在推广过程中对模块定义的规范化产出。

### AMD 与 CJS 的对比

**相同点：**

都是运行时加载的

**不同点：**

- CJS 是服务器模块的规范，AMD 是浏览器端模块规范
- CJS 加载模块是同步的，require 完某个模块后才执行代码；AMD 是异步的，所有依赖加载完后以回调形式执行。



### 为什么要异步加载

AMD 强调异步加载模块，可以避免 CSS、HTML 的阻塞。

在浏览器中同步加载脚本会降低性能。







他对于浏览器环境的使用做了优化，也适用于其他 JS 环境。



它实现了异步模块 API。



通过 `define()` api 定义模块。



对传统CommonJS模块的改进，以及在一个页面中加载一个模块的多个版本。





RequireJS还有一个插件系统，支持i18n字符串包和文本文件依赖项等功能。





RequireJS 不依赖于任何 JS 框架。







RequireJS 解决了以下问题

- 通过调用 `define()` 来注册工厂函数，而不是立即执行它
- 将依赖项作为字符串值数组传递，不要获取全局变量。
- 仅在加载并执行了所有依赖项后，才执行工厂函数。
- 将相关模块作为参数传递给工厂函数。



```js
// 使用依赖数组和工厂函数调用 define
define(['dep1', 'dep2'], function (dep1, dep2) {

    // 通过返回值定义模块值。
    return function () {}
})
```



异步加载

