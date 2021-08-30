# TypeScript 笔记

## 范型

```ts
type User = {
  name: string;
  age: number;
}
```

### 关键字

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

### 工具类型

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

## 技巧

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



## 常见问题

### ESNext 编译成 CommonJS

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2015"
  },
}
```

### ts 检测三方库 types 报错

```json
// tsconfig.json
{
  "compilerOptions": {
    "skipLibCheck": true
  },
}
```



## 配置文件解释

```json
{
    "compilerOptions": {
        /* 基本设置 */
        "target": "es2017", /* 制定 es 版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
        "module": "commonjs", /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
        "lib": [], /* Specify library files to be included in the compilation. */
        "allowJs": true, /* 允许编译js代码 */
        "checkJs": true, /* 报告 js 中的错误 */
        "jsx": "react", /* 指定 jsx 代码生成: 'preserve', 'react-native', or 'react'. */
        "declaration": true, /* 生成相应的 '.d.ts' 文件 */
        "declarationMap": true, /* 为每个 '.d.ts' 文件生成 sourcemap. */
        "sourceMap": true, /* 生成相应的 '.map' 文件. */
        "outFile": "./", /* Concatenate and emit output to single file. */
        "outDir": "./", /* Redirect output structure to the directory. */
        "rootDir": "./", /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
        "composite": true, /* Enable project compilation */
        "incremental": true, /* Enable incremental compilation */
        "tsBuildInfoFile": "./", /* Specify file to store incremental compilation information */
        "removeComments": true, /* Do not emit comments to output. */
        "noEmit": true, /* Do not emit outputs. */
        "importHelpers": true,  /* Import emit helpers from 'tslib'. */
        "downlevelIteration": true, /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
        "isolatedModules": true, /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

        /* 严格类型检查选项 */
        "strict": true, /* 启用严格类型检查 */
        "noImplicitAny": true, /* 报出 所有隐含的 any 类型 */
        "strictNullChecks": true, /* Enable strict null checks. */
        "strictFunctionTypes": true, /* Enable strict checking of function types. */
        "strictBindCallApply": true, /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
        "strictPropertyInitialization": true, /* Enable strict checking of property initialization in classes. */
        "noImplicitThis": true, /* Raise error on 'this' expressions with an implied 'any' type. */
        "alwaysStrict": true, /* Parse in strict mode and emit "use strict" for each source file. */

        /* 额外的检查 */
        "noUnusedLocals": true, /* Report errors on unused locals. */
        "noUnusedParameters": true, /* Report errors on unused parameters. */
        "noImplicitReturns": true, /* Report error when not all code paths in function return a value. */
        "noFallthroughCasesInSwitch": true, /* Report errors for fallthrough cases in switch statement. */

        /* 模块解析配置 */
        "moduleResolution": "node", /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
        "baseUrl": ".", /* Base directory to resolve non-absolute module names. */
        "paths": {
            "@/*": ["./app/*"]
        }, /* 将重新映射，相对于 'baseUrl' 查找位置. */
        "rootDirs": [], /* List of root folders whose combined content represents the structure of the project at runtime. */
        "typeRoots": [], /* List of folders to include type definitions from. */
        "types": [], /* Type declaration files to be included in compilation. */
        "allowSyntheticDefaultImports": true, /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
        "esModuleInterop": true, /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
        "preserveSymlinks": true, /* Do not resolve the real path of symlinks. */

        /* Source Map 配置 */
        "sourceRoot": "", /* Specify the location where debugger should locate TypeScript files instead of source locations. */
        "mapRoot": "", /* Specify the location where debugger should locate map files instead of generated locations. */
        "inlineSourceMap": true, /* Emit a single file with source maps instead of having a separate file. */
        "inlineSources": true, /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

        /* 试验的配置 */
        "experimentalDecorators": true, /* Enables experimental support for ES7 decorators. */
        "emitDecoratorMetadata": true, /* Enables experimental support for emitting type metadata for decorators. */
    },
    "include": [
        "src",
        "typings"
    ],
    "exclude": []
}

```
