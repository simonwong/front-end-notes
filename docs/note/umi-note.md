# umi 使用笔记


## umi 3


```js
export default defineConfig({
  chunks: ['common', 'vendors', 'umi'], // 提取公共依赖
  chainWebpack: function (config, { webpack }) {
    // umi 的 hash 不够定制化
    config
      .output
        .filename('[name].[hash].js')
        .chunkFilename('[name].[hash].js')

    config
      .plugin('extract-css')
      .tap(cfg => {
        cfg[0].filename = '[name].[hash].css'
        cfg[0].chunkFilename = '[name].[hash].css'
        return [...cfg]
      })

    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
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
        },
      },
    })
  },
})
```

