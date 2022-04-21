# TypeScript 实践

## 常见案例

### 以对象的 key 作为联合类型

```typescript
const typeMap = {
    1: 'a',
    2: 'c',
    3: 'g',
}

type Typekey = keyof typeof typeMap
```

### 以对象的 value 作为联合类型

```ts
type ValueOf<T> = T[keyof T]

const typeMap = {
    1: 'a',
    2: 'c',
    3: 'g',
}

type TypeValue = ValueOf<typeof typeMap>
```

### 以对象的 value 值最为类型

```tsx
// ts 会默认推导类型 `white` 的类型为 `string`
const color = {
  white: '#fff',
  black: '#000'
}
```

改成

```ts
// 此时 white 的类型为 ‘#fff’
const color = {
  white: '#fff',
  black: '#000'
} as const
```

### 以数组的每项元素作为联合类型

```ts
const arr = ['a', 'b', 'c'] as const
type Abc = typeof asd[number]
```

### 遍历联合类型

联合类型进行 extends 会进行分发，即一个接一个的判断是否 extends。

```ts
type LoopUnion<T extends string> = T extends T ? `loop ${T}` : never;

type AA = LoopUnion<'A' | 'B' | 'C'> // -> "loop A" | "loop B" | "loop C"

// 相当于是
type ABC = 'A' | 'B' | 'C'
('A' extends ABC ? 'loop A' : never) |
('B' extends ABC ? 'loop B' : never) |
('C' extends ABC ? 'loop C' : never)
```

### 判断

#### 严格判断两个类型是否相当

```ts
type Equal<X, Y> =
	(<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

MyEqual<any, unknown> // false
MyEqual<any, unknown> // false
MyEqual<1, 1 | 2> // false
MyEqual<{}, { a: 1 }> // false
MyEqual<{ readonly a: 1 }, { a: 1 }> // false
MyEqual<boolean, true> // false
  
MyEqual<{}, {}> // true
MyEqual<2 | 1, 1 | 2> // true
```

#### 检查是否是 never

[Conditional Types - Checking `extends never` only works sometimes #23182](https://github.com/microsoft/TypeScript/issues/23182)

在 ts 中，`T extends U ? X : Y` ，如果 T 是一个联合类型 `'A' | 'B'`，将会“分发”（distributed），可以视作为 

```ts
T = 'A' | 'B'
T extends U ? X : Y
// 将会视作为：
('A' extends U ? X : Y) | ('B' extends U ? X : Y)
```

在条件分发时，never 将会视为空联合类型（an empty union），意味着 `'A' | never` 被当作了 `'A'`。



所以当 T 是 `never` 时，将不会分发，进而得到的结果是 `never`

```ts
type isNever<T> = T extends never ? true : false
type Res = isNever<never> // => never
```

所以我们需要强制让 TS 分发 T，让  T 不会被视为空联合类型。

```ts
type isNever<T> = [T] extends [never] ? true : false
```

#### 在 K in S 中通过断言筛选

[1367 - Remove Index Signature - Template literal alternative](https://github.com/type-challenges/type-challenges/issues/3542)

```ts
type Foo = {
  [key: string]: any
  foo(): void
}

type RemoveIndexSignature<T> = {
  [K in keyof T as K extends `${infer Str}` ? Str : never]: T[K]
}
```



## 骚操作

重点在于使用 infer 提取，使用三元表达式递归。

**字符串的提取** 

```ts
type StrShift = T extends `${infer Head}${U}` ? U : Never
```

**数组的提取**

```ts
type ArrShift = T extends [infer Head, ...infer Tail] ? Tail : Never
```

### 字符串 split

```ts
type Split<T, U extends string> = T extends `${infer Head}${U}${infer Tail}` ? [Head, ...Split<Tail, U>] : [T]
```

### 字符串 trim

```ts
type Whitespace = '\n' | ' ';

type Trim<T> = T extends `${Whitespace}${infer U}` ? Trim<U> : T extends `${infer U}${Whitespace}` ? Trim<U> : T;

type LeftTrim<T> = T extends `${WhiteSpace}${infer V}` ? LeftTrim<V> : T
```

### 数组 join

```ts
type Join<T extends unknown[], U extends string> = T extends [infer Head, ...infer Tail]
    ? [] extends Tail
        ? Head
        : `${Head & string}${U}${Join<Tail, U>}`
    : ''
```

### 数组转对象

`[[k1, v1], [k2, v2]]` 转成 `{ k1: v1, k2: v2 }`

```ts
type MapArray = readonly (readonly [string, string])[]
type MapRecord = Record<string, string>
type ArrayToObject<Arr extends MapArray, Result extends MapRecord = {}> =
	Arr extends []
		? Result
		: Arr extends readonly [infer Head, ...infer Tail]
      ? Head extends readonly [infer Key, infer Value]
        ? Tail extends MapArray
          ? Key extends string
            ? ArrayToObject<Tail, Result & Record<Key, Value>>
            : never
          : never
        : never
      : never
```

