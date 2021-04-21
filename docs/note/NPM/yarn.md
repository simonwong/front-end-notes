# yarn

## 安装过程

检测（checking）→ 解析包（Resolving Packages） → 获取包（Fetching Packages）→ 链接包（Linking Packages）→ 构建包（Building Packages）



### 获取包

不过 Yarn 默认 prefer-online 模式，即优先使用网络数据。如果网络数据请求失败，再去请求缓存数据。

Yarn 会根据 cacheFolder+slug+node_modules+pkg.name 生成一个 path，判断系统中是否存在该 path，如果存在证明已经有缓存，不用重新下载。这个 path 也就是依赖包缓存的具体路径。





## 解决了哪些 npm 问题 ##

- yarn 缓存了每次你下载的模块
- yarn 可以通过并行的网络请求最大限度利用网络资源
- yarn 在开始安装一个包之前会先用 checksums 来验证，你不用担心本地的缓存的包被破坏了导致安装失败
- ...


## 常用命令 ##

```shell
yarn init # npm init
yarn # npm install
yarn install --frozen-lockfile # npm ci
yarn add react # npm i -S react
yarn add -D webpack # npm i -D webpack
yarn global add babel # npm i -g babel
yarn remove vue # 删除依赖包 npm uninstall vue
yarn upgrade # 升级 package.json 指定的所有依赖包(在package.json指定的版本范围内)
yarn upgrade --latest # 升级package.json指定的所有依赖包,但忽略package.json指定的版本范围,同时package.json中指定的版本将被重写
yarn outdated # 列出包的所有依赖项的版本信息。此信息包括当前安装的版本、基于语义版本所需的版本和最新的可用版本
yarn run # 列出包里所有可运行的脚本
yarn run dev # 运行package.json中scripts定义的脚本命令,等同于 npm runx
yarn upgrade-interactive --latest # 交互式升级

yarn global list --depth=0 # 查看全局安装的包
```

### global

- **查看全局安装包**

```shell
yarn global list --depth=0
```

- **移除全局安装包**

```shell
yarn global remove xxx
```

### config

```shell
yarn config list # 查看config
yarn config list # 查看当前目录相关config
yarn config get registry # 查看当前下载源,初始为https://registry.yarnpkg.com

yarn config set registry https://registry.npm.taobao.org -g # 更改为淘宝
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```



### create

```shell
yarn create react-app my-app
```

相当于执行了

```powershell
yarn global add create-react-app
create-react-app my-app
```

