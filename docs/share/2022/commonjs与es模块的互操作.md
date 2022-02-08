# commonjs与es模块的互操作

## nodejs  ES 与 CJS 的互操作性

### es

为了解决 ESM 和 CJS 的交互性问题，名为 default 的导出名称被赋予了特殊的语法。

```js
import { default as cjs } from 'cjs';

// 下面的导入语句是上面的导入语句中 `{ default as cjsSugar }` 的 "语法糖"
import cjsSugar from 'cjs';
```

### cjs 加载 es

在 nodejs 中，`require()` 命令是不能加载 ES 模块的，只能使用 `import()` 方法加载。

不支持的原因是他是同步加载的，而 ES 模块内部可以在顶层使用 `await` 命令，导致无法被同步加载。

```js
// es
export const a = 1
export default 2

// cjs
const foo = require('foo.ejs')
// foo 打印为： Module { a: 1, default: 2 }
```



### es 加载 cjs


CommonJS 模块的 ECMAScript 模块命名空间表示始终是使用 `default` 导出键指向 CommonJS `module.exports` 值的命名空间。

当使用 `import * as m from 'cjs'` 或动态导入时，可以直接观察到此模块命名空间外来对象。

```js
import * as m from 'cjs';
console.log(m);
console.log(m === await import('cjs'));
// 打印:
//   [Module] { default: <module.exports> }
//   true
```



为了更好地兼容 JS 生态系统中的现有用法，Node.js 还尝试确定每个导入的 CommonJS 模块的 CommonJS 命名导出，以使用静态分析过程将它们作为单独的 ES 模块导出提供。

```js
// cjs.cjs
exports.name = 'exported';

// es
import { name } from './cjs.cjs';
console.log(name);
// 打印: 'exported'

import cjs from './cjs.cjs';
console.log(cjs);
// 打印: { name: 'exported' }

import * as m from './cjs.cjs';
console.log(m);
// 打印: [Module] { default: { name: 'exported' }, name: 'exported' }
```

```js
// cjs.cjs
module.exports = 'exported';

// es
import { name } from './cjs.cjs';
console.log(name);
// 报错: Error

import cjs from './cjs.cjs';
console.log(cjs);
// 打印: 'exported'

import * as m from './cjs.cjs';
console.log(m);
// 打印: [Module] { default: 'exported' }
```

```js
// cjs.cjs
exports.a = 'a'
module.exports = 'exported';

// es
import { a } from './cjs.cjs';
console.log(a);
// 报错: undefined

import cjs from './cjs.cjs';
console.log(cjs);
// 打印: 'exported'

import * as m from './cjs.cjs';
console.log(m);
// 打印: [Module] { default: 'exported', a: undefined }
```



## Babel

### 如何将 ES module 降准对接到 Commonjs

`export default 0` ==> `module.exports.default = 0`

`import foo from 'foo'` ==>  `const foo = require('foo')`

这里产生了不一致的行为，es 的 foo 为 `0` , cjs 的 foo 为 `{ default: 0 }`



babel 为了解决这个问题，增加了 __esModule 属性，为 true 表示 require 了一个 es 模块。

所以 cjs 的 foo 变成了为 `{ default: 0， __esModule: true }`



### 问题来了！！！！

需要注意的是，nodejs 的实现与 babel 编译的实现是**不一样的。**

**对 nodejs 来说，default 导出是等同于 `module.exports` 的！！！** (这句话很重要，但我似乎不是很理解这话是对是错的)



导致了存在两套不同互操作逻辑。





## 参考

更多的互操作例子 [ESM-CJS interop test](https://sokra.github.io/interop-test/)

[ESM 与 CJS 的 Interop 来世今生](https://mp.weixin.qq.com/s/3TKcUeoyzXvH3MGVI6Dj9A)

[esbuild release v0.14.4](https://github.com/evanw/esbuild/releases/tag/v0.14.4)

[Nodejs ECMAScript 模块 与 Commonjs 的互操作性](http://nodejs.cn/api/esm.html#interoperability-with-commonjs)

