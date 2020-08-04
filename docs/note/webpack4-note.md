# webpack 4 笔记

## 环境变量

### cross-env

使用 `cross-env` 带入的环境变量如 `APP_ENV=prod` 也只是用在 webpack 打包的时候。

### DefinePlugin

想要在项目中使用环境变量，可以用 DefinePlugin

```js
new webpack.DefinePlugin({
  APP_ENV: JSON.stringify(process.env.APP_ENV),
  THE_ENV: JSON.stringify('the')
})
```

然后就可以在项目中拿到 `process.env.APP_ENV`





## hash

文件输出时配置哈希有三种方式

`[name].[hash].js` 每次都是一样的

`[name].[chunkhash].js` 会按照依赖，相关依赖的文件改变，hash 都会改变

`[name].[contenthash].js` 按照文件，相关文件改拜年，hash 会改变



比较好的方案是 ， splitChunks 分出不怎么变动的第三方模块，然后使用 chunkhash / contenthash 来持久缓存。

## splitChunks

### chunks

 `all` : 智能处理 异步引入和直接引入

`async` ：只优化异步引入

 `initial`：只优化直接引入



### cacheGroups

最重要的是 cacheGroups

```js
cacheGroups: {
    common: {
        name: 'common',
        test({ resource }) {
            return /[\\/]node_modules[\\/](lodash|bignumber|moment|react|react-dom).*$/.test(resource);
        },
        priority: 15,
    },
    vendors: {
        name: 'vendors',
        test({ resource }) {
            return /[\\/]node_modules[\\/]/.test(resource);
        },
        priority: 10,
    },
},
```

