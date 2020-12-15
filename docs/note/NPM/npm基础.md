# npm 基础



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



## 常见命令

npm 文档 [npm cli](https://docs.npmjs.com/cli/v6/commands)



`npm run env` 列出所有环境变量





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