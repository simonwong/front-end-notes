# pnpm



## 问题

### 依赖自动被提升至根模块目录

根据 pnpm 的思想，非显式的依赖项不会出现在根模块目录。最近在探索（如何让 `@babel/runtime` 可以提升至根模块目录）时，发现 `@types/*` `eslint*` 等都会被提升。看了一圈依赖自身并没有做任何配置。

最后把目光转移到 pnpm 自身来，发现内置了一个配置 `public-hoist-pattern`，可以配置哪些依赖可以提升到根模块来解决模块缺陷。但是默认时下面这样的配置：

 `['\*types\*', '\*eslint\*', '@prettier/plugin-\*', '\*prettier-plugin-\*']`

因为这些是隐式的，就不太符合 pnpm 的思想（显式的安装根模块依赖，或者显示的配置 `public-hoist-pattern`）。但也不得不说这是一个对当前社区现状的妥协。如果都让用户手动配置，集成复杂度就高了。



#### `@babel/runtime` 的问题解决

不去将 runtime 做提升。

而是在配置使用 `@babel/runtime` 的依赖中配置 `absoluteRuntime: path.dirname(require.resolve("@babel/runtime/package.json"))`。这样就是通过绝对路径找 runtime 了，而不是直接在根模块目录找。

