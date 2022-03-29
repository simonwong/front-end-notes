## yarn 与 pnpm 共存方案的实践

1. 需要将 `pnpm-lock.yaml` 写入 gitignore 来阻止提交

2. ‼️ **确保 yarn.lock 文件的同步（非常重要‼️）**

   （不同步别人使用或线上发布都会有问题！！）

   不论是安装新的包、更新包、或者新项目 initial ，都必须要生成可用的 `yarn.lock` 文件。

   由于 yarn@v1 没有直接生成 lock 文件的命令，考虑下面的命令（运行速度会很慢很慢，而且不可避免的会产生 yarn cache 文件）

   `npm install --package-lock-only; yarn import; rm package-lock.json`

3. pnpm 运行项目报**依赖缺失**，这是 pnpm 的特性，你的包都**必须显式的依赖。**

   绝大部分情况 pnpm 直接安装缺失的依赖即可（都不需要同步 yarn.lock，因为yarn 能跑成功说明 yarn 本身就有了该依赖），使用 pnpm 会对包的依赖关系处理的更加严格。

## 个人实践

- "script 中应该使用什么命令"

  最好都是使用 `npm run xxx`，（实际上使用 `yarn` `pnpm` 跑命令都是是一样的）。

  但是统一使用 npm 可以减少心智负担。把 `yarn` 和 `pnpm` 只作为是包管理工具。