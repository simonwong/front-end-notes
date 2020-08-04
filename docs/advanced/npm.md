# npm

## 常见命令

`npm run env` 列出所有环境变量



## 知识点

### 执行顺序

- 并行任务，使用 &

```shell
npm run a & npm run b
```

- 串行任务，使用 &&

```
npm run a && npm run b
```



### 脚本传入参数

```json
"scripts":{
  "serve": "vue-cli-service serve --mode=dev --mobile -config build/example.js"
}
```

体现到 `process.env`

```
[ '/usr/local/Cellar/node/12.14.1/bin/node',
  '/Users/mac/Vue-projects/hao-cli/node_modules/.bin/vue-cli-service',
  'serve',
  '--mode=dev',
  '--mobile',
  '-config',
  'build/example.js']
```



```shell
npm run serve --params  # 参数params将转化成process.env.npm_config_params = true
npm run serve --params=123 # 参数params将转化成process.env.npm_config_params = 123
npm run serve -params  # 等同于--params参数

npm run serve -- --params  # 将--params参数添加到process.env.argv数组中
npm run serve params  # 将params参数添加到process.env.argv数组中
npm run serve -- params  # 将params参数添加到process.env.argv数组中
```



### env 环境变量

如果`env`环境变量中存在以`npm_config_`为前缀的环境变量，则会被识别为`npm`的配置属性。npm 会从环境变量读到这个配置

```
export npm_config_package_lock=false # 修改的是内存中的变量，只对当前终端有效
```

- 查看某个环境变量：`echo $NODE_ENV `
- 删除某个环境变量：`unset NODE_ENV`



### npmrc 文件

 `npmrc` 文件优先级由高到低包括：

- 工程内配置文件: `/path/to/my/project/.npmrc`
- 用户级配置文件: `~/.npmrc`
- 全局配置文件: `$PREFIX/etc/npmrc` (即`npm config get globalconfig` 输出的路径)
- npm内置配置文件:`/path/to/npm/npmrc`



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



## 常见问题

### npm WARN lifecycle... `--scripts-prepend-node-path`

本地版本与 PATH 变量版本不同。推荐方案2

方案1：

项目创建 `.npmrc` 文件 。内容为 `scripts-prepend-node-path=true`

方案2:

执行 `npm config set scripts-prepend-node-path auto`

