# TypeScript 范型

## 关键字

以下面 User 类型为例子

```ts
type User = {
  name: string;
  age: number;
}
```

#### keyof

得到 object 类型的所有属性名构成的联合类型

```ts
type UserAttr = keyof User; // 'name' | 'age'
```

#### typeof

推导某实例的类型

```ts
const foo = () => ({ name: 'Simon', age: 18 });
type Foo = typeof foo; // () => { name: string, age: number }
```

#### extends

在类型运算中，不是继承或扩展，而是判断一个类型是否可以被赋予另一个类型。

```ts
type MustFunc =  Foo extends Function ? Foo : () => { a: 1 }
```

也可以用来**类型约束**

```ts
function logLength<T>(arg: T) {
  console.log(arg.length); // 类型“T”上不存在属性“length”
}

// 改造成如下

interface LengthObj {
  length: number
}
function logLength<T extends LengthObj>(arg: T) {
  console.log(arg.length);
}
```

#### infer

类型提取

```ts
type UserPromise = Promise<User>;

type UnPromisify<T> = T extends Promise<infer V> ? V : never;
type InferedUser = UnPromisify<T>; // { name: string, age: number }
```

## 工具类型

#### `Partial<T>`、`Required<T>`、`Readonly<T>`、`Mutable<T>`

`Partial<T>` 使得 object 类型的所有属性可选；

```ts
type MyPartial<T> = {
  [k in keyof T]?: T[K];
}
```

`Required<T>` 使得 object 类型的所有属性必填；

```ts
type MyRequired<T> = {
  [k in keyof T]-?: T[K];
}
```

`Readonly<T>` 使得 object 类型的所有属性只读；

```ts
type MyReadonly<T> = {
  readonly [k in keyof T]: T[K];
}
```

`Mutable<T>` 使得  object 类型的所有属性可变；

```ts
type MyMutable<T> = {
  -readonly [k in keyof T]: T[K];
}
```

#### `Record<K, T>` 、 `Pick<T, K>`

`Record<K, T>` K 是任意联合类型、T 为任意类型，最后组合成一个 object 类型

```ts
type MyRecord<K extends keyof any, T> = {
  [P in K]: T
}

type ABCObj = MyRecord<'a' | 'b' | 'c', number> // { a: number, b: number, c: number }
```

`Pick<T, K>` 是从 object 类型中，选取一些属性（属性的联合类型），组合成一个新的 object 类型

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
}

type NameObj = MyPick<User, 'name'>; // { name: string }
```

#### `Exclude<T, U>`、`Extract<T, U>`、`NonNullable<T>`

```ts
type MyExclude<T, U> = T extends U ? never : T;
type MyExtract<T, U> = T extends U ? T : never;
type MyNonNullable<T> = T extends null | undefined ? never : T;
```

#### `Omit<T, K>`

与 Pick 相反，用于排除某些键

```ts
type MyOmit<T, K> = Pick<T, Exclude<keyof T, K>>;

type MyOmit2<T, K> = {
  [P in Exclude<keyof T, K>]: T[P];
};
```
