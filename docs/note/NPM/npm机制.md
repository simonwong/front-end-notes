# npm 机制



## npm 安装机制

![](https://file.simonwong.cn/blog/20201223092723.png)

## npm 缓存机制

对于一个依赖包的同一版本进行本地化缓存，是当代依赖包管理工具的一个常见设计。

```shell
npm config get cache
```

会返回缓存路径 `/Users/cehou/.npm`

缓存数据均放在 `_cacache` 中

content-v2 是一些二进制文件，其实就是包资源

index-v5 是 content-v2 的文件索引



## npm 依赖管理

现在的 npm 依赖会使用**扁平化安装模式**

![](https://file.simonwong.cn/blog/20201223092938.png)



### 为什么 v1 出现在顶层

这取决于安装顺序，模块的安装顺序可能影响 node_modules 内的文件结构。

即使后续再安装 D@v1.0 依赖 B@v2.0，v2.0 也会跟 C 一样。



这时可以执行 `npm dedupe` 命令来优化结构，达到这样的效果。Yarn 在安装依赖时会自动执行 dedupe 命令

![](https://file.simonwong.cn/blog/20201223092901.png)





## npm 多源镜像和企业级部署私服原理

**npm 中的源（registry），其实就是一个查询服务**。以 npmjs.org 为例，它的查询服务网址是 https://registry.npmjs.org/ 。这个网址后面跟上模块名，就会得到一个 JSON 对象，里面是该模块所有版本的信息。比如，访问 https://registry.npmjs.org/react ，就会看到 react 模块所有版本的信息。



现在社区上主要有 3 种工具来搭建 npm 私服：nexus、verdaccio 以及 cnpm。



![](https://file.simonwong.cn/blog/20201223093031.png)







