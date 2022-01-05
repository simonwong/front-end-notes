# 从 webpack 打包看前端模块化

## 模块大作战

### CommonJS 同步加载模块

[CommonJS wiki](https://zh.wikipedia.org/wiki/CommonJS)

#### 用法

```js
const text = require('./text.js')

console.log(text)

// 等同于 exports.a = 'a'
module.exports = {
    a: 'a'
}
```

#### 实现

Nodejs、npm 、Browserify（浏览器端的，但是编译打包后文件体积可能很大）



### AMD 异步模块定义

[AMD 中文版 wiki](https://github.com/amdjs/amdjs-api/wiki/AMD-(中文版))

#### 实现

RequireJS 、 curl.js



### CMD 通用模块定义

[CMD 模块定义规范](https://github.com/seajs/seajs/issues/242)

> 玉伯开发 SeaJS 的时候提出来的

#### 与 AMD 区别 [官方 issus](https://github.com/seajs/seajs/issues/277)

- 依赖的模块，CMD 延迟执行，AMD 提前执行
- CMD 依赖就近，AMD 依赖前置

#### 实现

SeaJS



### UMD

> 是 AMD 和 CommonJS 的结合

先判断是否支持 CommonJS 。支持就用 CommonJS。

再判断是否支持 AMD。支持就用 AMD。

缺点：代码量很大，且每个文件都要引用



### ES Modules

- 2015年6月，ES2015（ES6）正式发布

> ES6 模块的设计思想是尽量的静态化，**使得编译时就能确定模块的依赖关系，以及输入和输出的变量**。



### 区别

| 区别                                         | ES Module                                    | CommonJS                        |
| -------------------------------------------- | -------------------------------------------- | ------------------------------- |
| 环境                                         | 服务端、浏览器                               | 服务端                          |
| 依赖关系确定                                 | 编译时加载，遇到 import 时生成一个只读的引用 | 运行时才把模块挂载在 exports 上 |
| 是否整体加载                                 | 不是                                         | 是                              |
| 模块输出                                     | 输出值的引用                                 | 输出值的浅拷贝                  |
| 是否动态更新（通过接口取到模块内部实时的值） | 是。因为引用                                 | 不是，因为拷贝                  |
| 模块变量是否只读                             | 是的。对它重新赋值会报错                     | 不是                            |



## 从 webpack 打包分析模块化

下面代码的仓库 -> [webpack-bundle-analyze](https://github.com/simonjayw/note-example-code/tree/master/webpack-bundle-analyze)

最简单的打包结果

```javascript
// webpack 辅助程序
(function (modules) {
    // 模块缓存对象
    var installedModules = {};

    // require 方法
    function __webpack_require__(moduleId) {

        // 检查模块是否在缓存中
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // 创建模块并放入缓存
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        // 执行模块方法
        // 这里就可以看出 commonjs 使用的 exports.a = 1 和 module.exports = { a: 1 } 是一样的
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // 设置 l 表示模块已经加载
        module.l = true;

        // 返回模块的导出对象
        return module.exports;
    }


    // 暴露所有模块
    __webpack_require__.m = modules;

    // 暴露模块缓存
    __webpack_require__.c = installedModules;

    // 为 harmony 导出定义的 getter 方法
    __webpack_require__.d = function (exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter
            });
        }
    };

    // 在导出对象上定义 __esModule
    __webpack_require__.r = function (exports) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module'
            });
        }
        Object.defineProperty(exports, '__esModule', {
            value: true
        });
    };

    // 创建一个模拟的命名空间对象
    // mode & 1: value 是模块 id, 直接 __webpack_require__ 加载
    // mode & 2: 合并所有的属性到命名空间 ns 上
    // mode & 4: 当已经是 ns 对象的时候可以直接返回值
    // mode & 8|1: 行为类似于 require
    __webpack_require__.t = function (value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        // 创建一个空的对象，并用 r 方法定义为 __esModule
        var ns = Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, 'default', {
            enumerable: true,
            value: value
        });
        if (mode & 2 && typeof value != 'string')
            for (var key in value) {
                __webpack_require__.d(ns, key, function (key) {
                    return value[key];
                }.bind(null, key));
            }
        return ns;
    };

    // getDefaultExport 方法为了兼容 non-harmony 模块
    __webpack_require__.n = function (module) {
        var getter = module && module.__esModule ?
            function getDefault() {
                return module['default'];
            } :
            function getModuleExports() {
                return module;
            };
        __webpack_require__.d(getter, 'a', getter);
        return getter;
    };

    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };

    // 公共路径
    __webpack_require__.p = "";


    // 加载入口模块并返回导出对象
    return __webpack_require__(__webpack_require__.s = "./src/index.js");
})({
    "./src/index.js": (function (module, exports, __webpack_require__) {
        var logText = __webpack_require__( /*! ./test */ "./src/test.js");
        console.log(logText);
    }),
    "./src/test.js": (function (module, exports) {
        var logText = '麻麻已经三天没打我了';
        module.exports = logText;
    })
});
```



### CommonJS 使用时的 入参

```js
{
    "./src/index.js": (function (module, exports, __webpack_require__) {
        var _require = __webpack_require__(/*! ./test */ "./src-b/test.js"),
        logText = _require.logText;

    	console.log(logText);
    }),
    "./src/test.js": (function (module, exports) {
        var logText = '麻麻已经三天没打我了';
        module.exports = {
            logText: logText
        }
    })
}
```



### ES Module 使用时的入参

```javascript
"./src-b/index.js":(function (module, __webpack_exports__, __webpack_require__) {
    "use strict";

    // 定义导出对象为 esModule 类型
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */
    var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./test */ "./src-b/test.js");
    // 拿到倒入对象的 default 上的值
    console.log(_test__WEBPACK_IMPORTED_MODULE_0__["default"].logText);
    Object(_test__WEBPACK_IMPORTED_MODULE_0__["foo"])();
}),
"./src-b/test.js": (function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    // 定义导出对象为 esModule 类型
    __webpack_require__.r(__webpack_exports__);
    // 导出对象上 定义 foo 属性
    // 早期的写法 __webpack_exports__['foo'] = ***
    __webpack_require__.d(__webpack_exports__, "foo", function () {
        return foo;
    });
    var foo = function foo() {
        console.log('foo');
    };
    // 导出 default 
    __webpack_exports__["default"] = ({
        logText: '麻麻已经三天没打我了'
    });
})
```



### commons 到 esmodule 的参数

```javascript
"./src-b/index.js": (function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    // 定义导出对象为 esModule 类型
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */
    var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./test */ "./src-b/test.js");
    
    // __webpack_require__.n 是兼容了两种倒入结果
    var _test__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(_test__WEBPACK_IMPORTED_MODULE_0__);

    /************** es module 混合 commonjs **************/
    console.log(_test__WEBPACK_IMPORTED_MODULE_0__["logText"]);
}),
"./src-b/test.js": (function (module, exports) {
    /************** es module 混合 commonjs **************/
    var logText = '麻麻已经三天没打我了';
    module.exports = {
        logText: logText
    };
})
```



### 结论

Webpack 对 commonjs 规范 使用了自己的 `__webpack_require__` `__webpack_exports__` 来实现的

es module 规范也是基于上面的方法实现，包装了一下

混合使用时用了 `__webpack_require__.n` 包装一下



### 异步的模块处理

核心代码

```javascript
// 存储加载中和已经加载的对象
// undefined = 模块未加载
// null = 模块预加载
// Promise = 模块加载中
// 0 = 模块已加载
var installedChunks = {
    "main": 0
};

// 通过 jsonp 加载模块
function webpackJsonpCallback(data) {
    var chunkIds = data[0]; // 代码块的 id
    var moreModules = data[1]; // 额外的模块


    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId, chunkId, i = 0,
        resolves = [];
    for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
            resolves.push(installedChunks[chunkId][0]);
        }
        installedChunks[chunkId] = 0;
    }
    for (moduleId in moreModules) {
        if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
            modules[moduleId] = moreModules[moduleId];
        }
    }
    if (parentJsonpFunction) parentJsonpFunction(data);

    while (resolves.length) {
        resolves.shift()();
    }

};
```

iife 入口

```javascript
{
  "./src-c/index.js":
    (function (module, exports, __webpack_require__) {
      var buttonEl = document.createElement('button');
      buttonEl.innerText = '点我下班';

      buttonEl.onclick = function () {
        // 去加载模块
        __webpack_require__.e( /*! import() */ 0).then(
          // 用来取值的，根据不用的 mode 参数来返回
          __webpack_require__.t.bind(null, /*! ./test */ "./src-c/test.js", 7)).then(function (res) {
          console.log(res["default"]);
        });
      };
      document.querySelector('body').appendChild(buttonEl);
    })
}
```



## 从 rollup 打包角度看前端模块化

Rollup 支持的模块 amd、cjs、es、iife、umd ...

也是最推荐 es 标准的打包工具



## 延伸

1. tree-shaking 是基于es  modules 静态分析实现
2. sideEffects
3. webpack 不支持 commonjs 模块来完成 tree-shaking
4. Babel 配置，为了让编译出来的包的 import 支持 es6 模块，配置 '@babel/preset-env' 的 module: false
5. 特定库的优化

- momentjs ，剔除它的语言包

```javascript
// 用 IgnorePlugin 移除多语言包
const { IgnorePlugin } from 'webpack'
const config = {
 plugins: [
  new IgnorePlugin(/^\.\/locale$/, /moment/)
 ]
}
```

- lodash 、react-bootstrap

使用 [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports)



