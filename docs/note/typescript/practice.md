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

