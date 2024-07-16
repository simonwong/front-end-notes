# rollup 原理解析

## 使用

我们以 node api 的形式使用 rollup。

首先是配置 `rollup.config.ts`

```ts
import path from 'path'
import { RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { DEFAULT_EXTENSIONS } from '@babel/core'

import pkg from './package.json'

const paths = {
  input: path.join(__dirname, '/src/index.ts'),
  output: path.join(__dirname, '/lib'),
}

// rollup 配置项
const rollupConfig: RollupOptions = {
  input: paths.input,
  output: [
    {
      file: path.join(paths.output, 'index.js'),
      format: 'cjs', // 输出 commonjs 规范的代码
      name: pkg.name,
    },
    {
      file: path.join(paths.output, 'index.esm.js'),
      format: 'es', // 输出 es 规范的代码
      name: pkg.name,
    },
  ],
  external: [
    // ...Object.keys(pkg.dependencies),
    /@babel\/runtime/,
  ], // 指出应将哪些模块视为外部模块，如 Peer dependencies 中的依赖
  plugins: [
    // ts 的功能只在于类型检查和编译出声明文件，编译交给 babel 来做
    typescript({
      tsconfig: './tsconfig.json',
    }),
    // 配合 commnjs 解析第三方模块
    resolve(),
    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      // 只转换源代码，不运行外部依赖
      exclude: 'node_modules/**',
      // babel 默认不支持 ts 需要手动添加
      extensions: [...DEFAULT_EXTENSIONS, '.ts'],
    }),
  ],
}

export default rollupConfig
```

使用 node api 打包

```ts
import { rollup } from 'rollup'
import rollupConfig from './rollup.config'

const build = async () => {
  const inputOptions = {
    input: rollupConfig.input,
    external: rollupConfig.external,
    plugins: rollupConfig.plugins,
  }
  const outOptions = rollupConfig.output
  let bundle

  try {
    bundle = await rollup(inputOptions)

    // 写入需要遍历输出配置
    if (Array.isArray(outOptions)) {
      outOptions.forEach(async outOption => {
        await bundle.write(outOption)
      })
    }
  } catch (e) {
    if (e instanceof Error) {
      log.error(e.message)
    }
  }

  if (bundle !== null) {
    // closes the bundle
    await bundle.close()
    log.progress('Rollup built successfully')
  }
}
```

我们重点关注两个内容，以及详细步骤：

- rollup 方法（使用 input、plugins 等参数）创建了一个 bundle 对象
  - bundle 对象是个什么，是个编译对象么？
  - plugins 在整个编译过程的生命周期是什么样的
- bundle.write 方法（使用 output 参数，包括输出格式、名称等）将最终资源写入到系统中
  - 通过 format（*cjs* / *es*），是如何输出对应的格式规范的

### 打包效果

源码部分：

```js
// index.js
import { name } from './bar'

const main = () => {
  console.log('first', name)
}
const data = {
  barName: name
}
export { data, main }
```

```js
// bar.js
const name = 'bar'
const noop = () => {}
export { name }
```

打包后结果（es 格式）：

- 两个文件合并成了一个文件
- 去掉依赖之间的  import export ，变成直接使用
- 去掉了没有被使用的代码（bar.js 中的 noop）

```js
// index.esm.js
const name = 'bar';

const main = () => {
  console.log('first', name);
};

const data = {
  barName: name
};

export { data, main };
```

## 源码解析

入口在 `src/rollup/rollup.ts`，看一看它做了哪些事情（指 `rollupInternal`）

- ***getInputOptions*** 方法将用户配置改成内部用的数据格式
- ***new Graph()*** 实例化了一个图数据结构
- ***catchUnfinishedHookActions***
- 返回一个对象（bundle），包含 write、close 等方法

### getInputOptions

内部最终会生成这样的一个 option

```ts
	const options: NormalizedInputOptions & InputOptions = {
		acorn: getAcorn(config), // acorn 配置
		acornInjectPlugins: getAcornInjectPlugins(config), // 注入 acorn 插件，比如 acorn-jsx
		cache: getCache(config), // cache 缓存配置
		context, // 上下文，比如 windows
		experimentalCacheExpiry: config.experimentalCacheExpiry ?? 10,
		external: getIdMatcher(config.external), // 将 external 组装成方法，方便使用
		inlineDynamicImports: getInlineDynamicImports(config, onwarn, strictDeprecations),// 废弃了不关注，改到 output 中
		input: getInput(config), // 将 input 组成一个数组
		makeAbsoluteExternalsRelative: config.makeAbsoluteExternalsRelative ?? true, // 是否将绝对路径转为相对路径
		manualChunks: getManualChunks(config, onwarn, strictDeprecations), // 废弃了，不关注，改到 output 中
		maxParallelFileReads: getMaxParallelFileReads(config), // 文件读取最大并发数，默认 20
		moduleContext: getModuleContext(config, context), // 更 context 差不多
		onwarn, // 警告监听
		perf: config.perf || false, // 是否收集性能数据
		plugins: ensureArray(config.plugins), // 插件
		preserveEntrySignatures: getPreserveEntrySignatures(config, unsetOptions), // strict 时，将导出名跟导入时的命名一样，只导出必要的
		preserveModules: getPreserveModules(config, onwarn, strictDeprecations), // 废弃了，不关注，改到 output 中
		preserveSymlinks: config.preserveSymlinks || false, // false 时，解析文件时遵循符号链接。
		shimMissingExports: config.shimMissingExports || false,
		strictDeprecations： config.strictDeprecations || false, // 使用了标记为弃用的方法，true 直接 error，false 报 warning，默认 false
		treeshake: getTreeshake(config, onwarn, strictDeprecations) // treeshake 配置，默认为 true，相当于未指定，会使用默认的 treeshake 配置， 还可以使用三个内置配置： “smallest” “recommended” “safest”
	}
```

这里内部使用的配置还是比较复杂的，但也可以了解到一些不常用的配置。

我们仍旧只看一些重点配置**关注它们的走向**：input，plugins。



### new Graph()

(生成图实例，那猜测将会从入口开始的解析依赖关系组成一幅有向图。)

关注构造函数（忽略 cache 和 watch 相关的代码）：

- `pluginDriver = new PluginDriver` 生成一个 插件驱动实例，插件驱动器中 实例化了一个 FileEmitter ，为插件提供文件输出能力。
  - hookParallel 钩子触发器，调用有所有插件的钩子
- `acornParser = acorn.Parser...` 一个 acorn 解析器实例
- `moduleLoader = new ModuleLoader` 生成一个模块加载器实例，初始化了一个读取队列。



类之间的关系如下图

![](https://file.wangsijie.top/blog/202203221738992.png)



至此就结束了，没有生成有向图？在后面呢

### catchUnfinishedHookActions  /  graph.build()

这个方法很有意思，直译为“捕获未完成的钩子动作”。

`emptyEventLoopPromise` 注册了一个 *beforeExit* 事件，一旦触发，就会 reject。（会在插件返回的 promise 一直没有被 resolve 时发生）。

emptyEventLoopPromise 会跟 callback 竞争（race），如果 beforeExit 先触发了，说明 callback 没有执行完，有些问题，就会抛出异常。

```ts
async function catchUnfinishedHookActions (pluginDriver, callback) {
	let handleEmptyEventLoop
	const emptyEventLoopPromise = new Promise((_, reject) => {
		handleEmptyEventLoop = () => {
			const unfulfilledActions = pluginDriver.getUnfulfilledHookActions();
			reject(
				new Error(`Unexpected early exit...`)
			)
		}
		process.once('beforeExit', handleEmptyEventLoop)
	})
	const result = await Promise.race([callback(), emptyEventLoopPromise])
	process.off('beforeExit', handleEmptyEventLoop)
	return result
}
```

跑远了，我们重点关注 callback 做了哪些事情（不关注异常问题）：`graph.build()`

这里分别在 build 前后触发了插件的 buildStart、buildEnd 钩子。我们重点看 build 方法。

- *generateModuleGraph()*
  - 从入口模块 ast 解析，并根据依赖关系生成一幅模块图
  
  - 从 modulesById 中向 modules 添加 module
  
- *sortModules()*
  - 分析模块，输出循环依赖、和排序好的依赖（是*后序*排序的，而非*逆后序*排序，逆后序会在后面步骤进行）
  - 模块绑定来源（`bindReferences()`）
  
- *includeStatements()*

  - 判断是否有 sideEffect（从 Program 递归调用各个节点的 hasSideEffect，各个节点中，rollup 内置了 ast node type 的类，并描述了如何查找 sideEffect，如何 render 等等，值得一题的是 render 中使用了 MagicString 来处理编译后的代码）
  - treeshaking

### return

最后返回一个对象

```js
bundle =  {
  close () {},
  write () {
    // ...
    handleGenerateWrite(...)
  },
  // ...
}
```

## bundle.write()

实际上调用了 handleGenerateWrite 方法，里面分 3 个步骤

核心步骤是 bundle.generate()

### getOutputOptionsAndPluginDriver

添加了一个 outputPluginDriver，来做编译后的资源输出

### bundle.generate()

新建了一个 bundle 实例，并调用 bundle.generate()。看看 generate 里面做了哪些事情：

- 创建了一个 `outputBundle` 空对象，最后输出

- generateChunks()

  创建了一个 chunk 实例

- createAddons()

  在预渲染之前创建额外添加的内容：banner、 footer、 intro、 outro

- getGenerateCodeSnippets()

  生成代码片段，处理一些细节，比如是否是否加 封号，使用 let 还是 var 等等

- prerenderChunks()； addFinalizedChunksToBundle()

  预渲染块，以及最终渲染的内容添加到 bundle 上。这里的逻辑比较复杂，直接关注一些点：

  1. generateExports 去掉原先代码的 exports，改为 直接声明（因为是要把代码合并的，如最开始的示例）
  2. modules 会被 reverse()，在上面 build 阶段是图的后序排序，这里 reverse 后就是拓扑排序（逆后序）了
  3. es 格式的，可以省去了 exports 等等代码的添加
  4. 使用了 MagicString  来处理字符串的拼接删除等操作
  5. 定义了 AST node 类型对应的类，并使用他们的 render 方法

- 输出 `outputBundle` 对象，包含了编译后的字符串

```js
{
  code: "use strict;..."，
  fileName: "index.js",
  modules: [] // 前面排序好的 modules
  type: "chunk"，
  // ...
}
```

### writeOutputFile

将资源写入到系统中



## 总结

施工中...
