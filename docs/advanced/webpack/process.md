参考：https://segmentfault.com/a/1190000039956437



主要分为三个阶段

**初始化阶段**

- 初始化参数：将配置文件、shell 参数、默认参数合并成最终的配置参数
- 创建 compiler（编译器对象）：new Compiler(config)
- 初始化编译环境（*hooks.environment*）：注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件
- 开始编译（*hooks.run*）：compiler.run()；创建 compilation = new Compilation()，
- 确定入口（*hooks.addEntry*）：compilation.addEntry()

**构建阶段**

- 编译模块（*hooks.make*）：创建 module 对象，根据 module 配置规则，调用各种 loader 编译为 js，将 js 编译为 AST 对象，递归依赖
- 完成编译（*hooks.finishMake*）：上一步完成递归后，可以形成一幅**依赖关系图**

**生成阶段**

- 输出资源（*hooks.seal*）：从 moduleGraph 转为 chunkGraph
- 写入资源（*hooks.emitAssets*）：将 assets 写入文件系统



