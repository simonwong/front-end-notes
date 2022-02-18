# TypeScript 常见问题

## QA

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

