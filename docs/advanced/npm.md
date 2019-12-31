# npm

## version

`npm version patch` 升级补丁 `0.0.1` 变成 `0.0.2`

`npm version minor` 升级补丁 `0.0.1` 变成 `0.1.0`

`npm version major` 升级补丁 `0.0.1` 变成 `1.0.0`



## 常见问题

### npm WARN lifecycle... `--scripts-prepend-node-path`

本地版本与 PATH 变量版本不同。推荐方案2

方案1：

项目创建 `.npmrc` 文件 。内容为 `scripts-prepend-node-path=true`

方案2:

执行 `npm config set scripts-prepend-node-path auto`

