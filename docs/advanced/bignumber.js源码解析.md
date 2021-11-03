# bignumber.js 源码解析

## 导读

https://github.com/MikeMcl/bignumber.js/blob/master/bignumber.js

https://mikemcl.github.io/bignumber.js/#

### 介绍

`bignumber.js` 是一个任意精度的算术库



### `bignumber.js` `big.js` `decimal.js` 区别

[这三者的区别 What is the difference between big.js, bignumber.js and decimal.js?](https://github.com/MikeMcl/big.js/wiki)



- `big.js` 最小最简单，不接受 `NaN` 、`Infinity` 作为合法值，不适用于其他基数。
- `bignumber.js` 更适用于金融应用，除非使用除法运算，否则无需担心精度丢失。
- `decimal.js` 更适用于科学应用，可以有效的处理非常小或非常大的值。



### `Number.prototype.toString([radix])`

**radix** 指定数字到字符串的转换**基数**（从 2 到 36）

2 到 36 表示进制数，从基数转换字母表 `0123456789abcdefghijklmnopqrstuvwxyz`中取，所以最多只能到 36 位。

举个例子：

```js
(1).toString(2) // '1'
(12).toString(13) // 'c'
(15).toString(16) // 'f'
(31).toString(32) // 'v'
(63).toString(32) // '1v'
```

为什么？

```js
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const rmd = 31 % 32 // 31
alphabet[rmd] // 'v'
```

`bignumber.js` 也基于该特性，支持 2 到 36 的转换基数



## 骚操作

在看源码前，先学一些骚操作



### 允许不使用 new 来构造新的实例

```js
if (!(x instanceof BigNumber)) return new BigNumber(v, b);
```



### `~` 非运算符判断是否是整数

使用有条件限制，`n < 2147483648` 即 `2 ** 31`

```js
if (n === ~~n) { }
```


### 数字相关的校验正则

- 判断一个字符串是否是数字类型

```js
const isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i
```

- 判断是否是无穷大或 NaN

```js
const isInfinityOrNaN = /^-?(Infinity|NaN)$/
```





## 解析

### 函数本体

```ts
function clone(configObject): BigNumber
```

`clone` 函数创建并返回了 BigNumber 构造函数



### 重要函数

- `parseNumeric` 处理未通过 `isNumeric` 测试的参数

### 静态方法

- `config` `set` 用来设置配置
- `isBigNumber` 判断是否是一个 `BigNumber` 类





## 彩蛋

**适应多种模式的导出**

```js
BigNumber = clone();
BigNumber['default'] = BigNumber.BigNumber = BigNumber;

// AMD 规范导出
if (typeof define == 'function' && define.amd) {
  define(function () { return BigNumber; });

// commonjs 规范导出
} else if (typeof module != 'undefined' && module.exports) {
  module.exports = BigNumber;

// 浏览器端，挂到 self 或 window 上
} else {
  if (!globalObject) {
    globalObject = typeof self != 'undefined' && self ? self : window;
  }

  globalObject.BigNumber = BigNumber;
}
```

