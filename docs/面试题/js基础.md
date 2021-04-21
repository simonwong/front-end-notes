## 基础点 ##

### 原始类型有哪几种；null 是对象吗；原始类型与复杂数据类型存储有什么区别

###  闭包

绑定了执行环境的一个函数

### 如何使 promise 取消

### 对于类而言，箭头函数和类普通函数、constructor 里 bind 的函数有什么区别

class 会把用 = 号声明的方法、变量作为实例的属性

非 = 号声明的，则是放在原型链上。

### `Object.is` 和 `===` 有什么区别

```js
-0 === +0 // true
NaN === NaN // false

Object.is(-0, +0) // false
Object.is(NaN, NaN) // true

Object.is(0, -0) // false
Object.is(0, +0) // true
```

## 方案实现 ##

###  apply 、 call 、bind 内部是如何实现的？

### 使用 ES5 写一个继承

### 防抖、节流的区别？实现？

### 深拷贝的实现

- `JSON.stringify()` 有什么缺点(引用类型、函数、循环引用、undefined)
- 如何解决深拷贝中的【循环引用】文件

### setTimeout 、setInterval 计时不准（如何实现精准倒计时）

递归执行 setTimeout ，每个下一次的 setTimeout 执行时机应该通过 当前时间不断修正，来达到尽量的精准性。

4. 深拷贝和浅拷贝

5. 什么是函数柯里化？用它实现 `sum(1)(2)(3)(4)`

6. 如何实现 `Promise.all` 、 `Promise.finally`

7. 使用 ES5 写一个继承

## 浏览器相关 ##



1. 怎么解决跨域？对应其原理？



2. 什么是事件代理？



3. 浏览器环境下的 event loop



4. 浏览器从输入网址到呈现页面的过程



5. 哪些情况会导致内存泄漏

