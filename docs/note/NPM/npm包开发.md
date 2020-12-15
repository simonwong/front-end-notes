# npm包开发

## npm 包规范

### 目录

- bin：存放可执行二进制文件的目录
- lib：存放js代码的目录
- doc：存放文档的目录
- test：存放单元测试用例代码的目录



### 命令

`npm version patch` 升级补丁 `0.0.1` 变成 `0.0.2`

`npm version minor` 升级补丁 `0.0.1` 变成 `0.1.0`

`npm version major` 升级补丁 `0.0.1` 变成 `1.0.0`



### 本地调试开发

使用 `npm link` 调试

- 假如我的项目是 `koalaNpmStudy`，假如我的 npm 模块包名称是 `npm-ikoala`
- 进入到 模块包 `npm-ikoala` 目录中，执行 `npm link`
- 在自己的项目 `koalaNpmStudy` 中创建连接执行 `npm link npm-ikoala`
- 在自己项目的 `node_module` 中会看到链接过来的模块包，然后就可以像使用其他的模块包一样使用它了。
- 调试结束后可以使用 `npm unlink` 取消关联



`npm link` 主要做了两件事：

1. 为目标 `npm` 模块创建软链接，将其链接到全局 `node` 模块安装路径 `/usr/local/lib/node_modules/`。
2. 为目标 `npm` 模块的可执行 `bin` 文件创建软链接，将其链接到全局 `node` 命令安装路径 `/usr/local/bin/`。


npm link 的本质就是软链接



- 为目标 npm 模块（npm-package-1）创建软链接，将其链接到全局 node 模块安装路径 /usr/local/lib/node_modules/ 中；
- 为目标 npm 模块（npm-package-1）的可执行 bin 文件创建软链接，将其链接到全局 node 命令安装路径 /usr/local/bin/ 中。



使用 `npm link` 或者 `yarn link` 

然后在你的项目中 `npm link package]` 或 `yarn link [package]` 来链接包。

就可以在项目是使用这个包了。



可能 link 后忘记了，然后会报

```
If this command was run in another folder with the same name, the other folder is still linked. Please run yarn unlink in the other folder if you want to register this folder.
```

只要去 `~/.config/yarn/link` 删除一下





## [lerna](https://github.com/lerna/lerna) 管理多个包的项目

`lerna bootstrap` 将包安装在根目录



## [np](https://github.com/sindresorhus/np) 优化 npm publish

