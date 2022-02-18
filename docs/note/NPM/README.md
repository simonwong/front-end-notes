# Node 包管理

- 2010：npm 发布，支持 Node.js。
- 2016：yarn 发布。它显示出比 npm 更好的性能。它还生成一个`yarn.lock`文件，使 repos 的共享和精确复制变得更加容易和可预测。
- 2017：npm 5 发布。它提供自动生成`package-lock.json`文件对标 `yarn.lock`.
- 2018 年：npm 6 发布，提高了安全性。现在 npm 在安装依赖项之前检查安全漏洞。
- 2020：Yarn 2 和 npm 7 发布。这两个软件包都具有出色的新功能，我们将在本教程后面看到。
- 2021：[Yarn 3 发布](https://github.com/yarnpkg/berry/blob/master/CHANGELOG.md#300)并进行了各种改进

## yarn vs npm

写于 2022-02

### 安装包管理器

- npm 是 Node 自带的，通过 `nvm` 管理 node 版本来间接管理 npm 版本
- yarn 需要手动安装，通过 `yarn set version` 管理版本

### 安装依赖

- npm 是按顺序一个一个安装依赖的。输出信息多，难以阅读。
- yarn 是并行安装的，速度要比 npm 快。输出信息简洁。

他们都有缓存机制，随着 npm 的迭代，速度差不多跟 yarn 相当了。

### 安全性

npm 6 以前存在严重的安全漏洞，6 开始提高了安全性，会在依赖安装前检查。

他们都是用哈希加密算法来保证包的完整性。



## pnpm vs yarn vs npm

写于 2022-02



[pnpm 功能比较](https://pnpm.io/zh/feature-comparison)

| 功能                     | pnpm                 | Yarn                 | npm                     |
| ------------------------ | -------------------- | -------------------- | ----------------------- |
| 工作空间支持（monorepo） | ✔️                    | ✔️                    | ✔️                       |
| 隔离的 `node_modules`    | ✔️ - 默认             | ✔️                    | ✔️                       |
| 提升的 `node_modules`    | ✔️                    | ✔️                    | ✔️ - 默认                |
| Plug'n'Play              | ✔️                    | ✔️ - 默认             | ❌                       |
| 零安装                   | ❌                    | ✔️                    | ❌                       |
| 修补依赖项               | ❌                    | ✔️                    | ❌                       |
| 管理 Node.js 版本        | ✔️                    | ❌                    | ❌                       |
| 有锁文件                 | ✔️ - `pnpm-lock.yaml` | ✔️ - `yarn.lock`      | ✔️ - `package-lock.json` |
| 支持覆盖                 | ✔️                    | ✔️ - 通过 resolutions | ✔️                       |
| 内容可寻址存储           | ✔️                    | ❌                    | ❌                       |
| 动态包执行               | ✔️ - 通过 `pnpm dlx`  | ✔️ - 通过 `yarn dlx`  | ✔️ - 通过 `npx`          |



pnpm 相比于另外两个更大的区别在于：



### 依赖树

pnpm 通过硬链接和符号链接（软链接、Symbolic link）链接到全局硬盘来管理 `node_modules`。可以大大减少磁盘的空间使用量，同时保持 node_modules 的整洁。



[pnpm's strictness helps to avoid silly bugs](https://www.kochan.io/nodejs/pnpms-strictness-helps-to-avoid-silly-bugs.html)

**使用 npm 和 yarn 时**

安装的包，以 express 为例子，会把 express  以其所有子包全部安装到 node_modules 层级（依赖是平铺的），因此你可以使用这些所有包，尽管你没有显示的依赖它。

```
# npm / yarn 的 node_modules 依赖结构
- .bin
- express
- accepts
- body-parser
- ...
```

然而当去使用这些没有显示依赖的包时就可能会出现问题，你不知道这个包的版本，无法知道什么时被 express 升级或废弃。



**在使用 pnpm 时**

次级依赖是不会安装到 express 同级的，而是作为 express 的依赖，放在 .pnpm 文件夹下，如下

```
# pnpm 的 node_modules 依赖结构
- .pnpm
- express
- .modules.yaml
```

![](http://file.wangsijie.top/blog/202202172118271.jpeg)



### 安装

pnpm 不允许安装 `package.json` 中没有包含的包



## 参考

- [JavaScript package managers compared: npm, Yarn, or pnpm?](https://blog.logrocket.com/javascript-package-managers-compared/)
- [pnpm: Feature Comparison](https://pnpm.io/feature-comparison)

- [Yarn 3.0 🚀🤖 Performances, ESBuild, Better Patches, ...](https://dev.to/arcanis/yarn-3-0-performances-esbuild-better-patches-e07)
- [Yarn vs npm: Everything You Need to Know](https://www.sitepoint.com/yarn-vs-npm/)