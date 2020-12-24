# npm 基础

## 知识点

### 几种依赖类型

- dependencies 项目依赖，会成为线上生产环境中的代码组成部分

- devDependencies 开发依赖，辅助开发的工具包，无须在生产环境使用

- peerDependencies 同版本依赖

- bundledDependencies 捆绑依赖

- optionalDependencies 可选依赖，不建议使用，它大概率会增加项目的不确定性和复杂性。



dependencies 、devDependencies 依赖是否被打包，完全取决于项目里是否被引入了该模块。



peerDependencies 的使用场景：

- 插件不能单独运行

- 插件正确运行的前提是核心依赖库必须先下载安装

- 我们不希望核心依赖库被重复下载

- 插件 API 的设计必须要符合核心依赖库的插件编写规范

- 在项目中，同一插件体系下，核心依赖库版本最好相同



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



### 执行顺序

- 并行任务，使用 &

```shell
npm run a & npm run b
```

- 串行任务，使用 &&

```
npm run a && npm run b
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



## 常见命令

npm 文档 [npm cli](https://docs.npmjs.com/cli/v6/commands)



### 常见命令

`npm run env` 列出所有环境变量



### npm ci

CI 环境使用 npm ci 代替 npm install，一般会获得更加稳定、一致和迅速的安装体验。

- npm ci 完全根据 package-lock.json 安装依赖，这可以保证整个开发团队都使用版本完全一致的依赖；
- 如果 package-lock.json 和 package.json 冲突，那么 npm ci 会直接报错，并非更新 lockfiles
- npm ci 永远不会改变 package.json 和 package-lock.json



### 自定义 npm init

```js
const desc = prompt('请输入项目描述', '项目描述...')

module.exports = {
  key: 'value',
  name: prompt('name?', process.cwd().split('/').pop()),
  version: prompt('version?', '0.0.1'),
  description: desc,
  main: 'index.js',
  repository: prompt('github repository url', '', function (url) {
    if (url) {
      run('touch README.md');
      run('git init');
      run('git add README.md');
      run('git commit -m "first commit"');
      run(`git remote add origin ${url}`);
      run('git push -u origin master');
    }
    return url;
  })
}
```



执行 `npm config set init-module ~\.npm-init.js`

