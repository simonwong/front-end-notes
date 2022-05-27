# 函数式编程

## 首先

函数式编程（Functional  Programming 缩写为 FP）是一种编程范式。还有指令式编程、过程式编程、面向对象编程。

5 个特点：

- 函数是一等公民
- 只用表达式，不用语句
- 没有副作用
- 不修改状态
- 引用透明

### 参考

[函数式编程初探 - 阮一峰](https://www.ruanyifeng.com/blog/2012/04/functional_programming.html)

## Currying 柯里化

柯里化是一种函数的转换，它是指将一个函数从可调用的 `f(a, b, c)` 转换为可调用的 `f(a)(b)(c)`。

**柯里化不会调用函数。它只是对函数进行转换。**

### 简单示例

```js
function currying (f) {
  return (a) => {
    return (b) => {
    	return f(a, b)
  	}
  }
}

const sum = (a, b) => {
  return a + b
}

sum(1)(2) // -> 3

const currySum = curry(sum)
currySum(1)(2) // -> 3
```

### 高级柯里化

通过 `fn.length` 判断是否有达到终止条件，来执行 fn，否则就递归的 curried 以及合并 arguments。需要

```js
function currying (fn) {
  return function curried (...args) {
    if (args.length >= fn.length) {
      return fn.apply(null, args)
    } else {
      return (...restArgs) => {
        return curried.apply(null, args.concat(restArgs))
      }
    }
  }
}
```

```js
const sum = (a, b, c) => {
  return a + b + c
}

const curriedSum = currying(sum)
curriedSum(1, 2, 3) // => 6
curriedSum(1, 2)(3) // => 6
curriedSum(1)(2)(3) // => 6
```

值得注意的是，当函数为 `const foo = (...args) => {}`，`foo.length` 为 0。

### 参考

[JAVASCRIPT.INFO 柯里化](https://zh.javascript.info/currying-partials)

[Wiki 柯里化](https://zh.wikipedia.org/wiki/%E6%9F%AF%E9%87%8C%E5%8C%96)