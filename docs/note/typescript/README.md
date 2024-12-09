# typescript

## 内置类型

### unknow、any、never 的比较

**参考：**

- [When to use `never` and `unknown` in TypeScript](https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/)
- [The top types `any` and `unknown` in TypeScript](https://2ality.com/2020/06/any-unknown-typescript.html)

![](https://file.simonwong.cn/blog/202203311149674.png)



首先理解类型的层级关系

- top type：任何类型都是它的 subtype
- bottom type: 它是任何类型的 subtype

#### any

any 是 top type，但也是特殊的，可以理解为放弃类型检查。除非确实需要避开类型检查，否则不推荐使用。

#### unknow

unknow 是 top type，（在上图中，表示所有集合的超集）它比 any 更加安全。在有值的地方使用，但他可能是任意类型。

**case：**可以将别的类型分配给 unknow，但不能将 unknown 分配给别的类型（除了 any）。

```ts
let vAny: any = 10
let vUnknown: unknown =  10

vAny = '123' // ok
vUnknown = '123' // ok

let s1: string = vAny // ok
let s2: string = vUnknown // error: 不能将类型“unknown”分配给类型“string”。ts(2322)
let s3: string = typeof vUnknown === 'string' ? vUnknown : null // ok （通过类型收缩使用）

vAny.method() // ok
vUnknown.method() // error: 类型“unknown”上不存在属性“method”。ts(2339)

type Foo = {
  method: () => void
}
(vUnknown as Foo).method() // ok （通过断言使用）
```



**case：**可以使用类型收缩来使用，比如 try-cache 的 error。

```ts
try {
  // error code
} cache (e) {
  // e 是一个 unknow 类型，不应该 as any，而是收缩类型
  if (e instanceof Error) {
    // ...
  } else if (type e === 'string') {
    // ...
  }
}
```

#### never

never 是 bottom type，（在上图中，表示一个空集）。**在没有或不应该有值的地方使用。**

可以使用 never 来修剪条件。

```ts
type Return<T> = T extends (...args: unknow[]) => infer R ? R : never
```

## 范型

