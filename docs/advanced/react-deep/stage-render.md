# render 流程

![](http://file.wangsijie.top/blog/202201261126536.png)





`renderRootSync` `renderRootConcurrent` 区别是后者多了一个 `shouldYield` 的判断，Sheduler 要求中断时就要中断。



![](http://file.wangsijie.top/blog/202201261810754.gif)



从根节点递归执行工作单元的过程可以认为是**深度优先遍历**

## 执行工作单元

 `performUnitOfWork(workInProgress)`

实质是从父节点开始一直递归执行 `beginWork()`直到结束。（递归的找 `fiber.children`）

结束后，从最后一个节点开始向上递归执行 `compeletWork()`。（找 `fiber.sibling`，或 `fiber.return`）

## beginWork

`beginWork(current, workInProgress, renderlanes)`



分两种情况：

### 首次挂载组件时（即 current == null 时）

通过不同的 `workInProgress.tag`创建子 fiber 节点，挂在 `workInProgress.child` 上

### 更新组件时（即 current != null 时）

判断 `newProps === oldProps` 且 `current.tag === workIProgress.tag` 时，表示可以直接复用前一次更新的子 Fiber 节点。



如何 current 没有 pending work（没有变更），那么 `workInProgress.child` 可以直接从 `current.children` clone

`bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)`

## completeWork

`completeWork()`

也是分两种情况：

### 首次挂载组件时（即 current == null 时）

- `createInstance()` 通过当前的 Fiber 节点创建真实的 DOM 节点
- `appendAllChildren()`将所有子节点都 append 到当前 DOM 上（因为是自底向上执行的，子节点的 DOM 先生成的）
- 为 DOM 节点设置 props

### 更新组件时（即 current != null 时）

重点关注 `updateHostComponent()` 方法。

给 `workInProgress.updateQueue` 添加一个更新。



给 WIP 添加需要更新的标识 `workInProgress.flags |= Update`





## 需要关注的东西

### 不同优先级的流程

![](http://file.wangsijie.top/blog/202201241722787.png)

图片自制，内容来自 [Andrew Clark: 不同优先级流程 (in Twitter)](https://twitter.com/acdlite/status/978412930973687808)



举个例子:

给定当前状态为` ''`, 以及下面的更新队列

  `A1 - B2 - C1 - D2`

其中数字表示优先级，插入字符串以更新状态, *React* 将会以两个单独的渲染处理这些更新，每个不同的优先级一个：



1. 第一次渲染，优先级为1：

   初始状态: `''`

   更新队列: `[A1, C1]`

   状态结果: `'AC'`

2. 第一次渲染，优先级为1：

   初始状态: `'A'`（初始状态不包含 C1，因为 B2 被跳过了）

   更新队列: `[B2, C1， D2]` （C1 rebase 在 B2 后面）

   状态结果: `'ABCD'`



因为我们是按插曲顺序处理更新的，并在跳过之前的更新时 rebase 高优先级的更新，所以**不论优先级如何，最终结果是确定**。

中间状态可能因为不用优先级而有所不同，但是最终结果是相同的。



参考 [React Reconciler ReactUpdateQueue.new.js](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.new.js)



### effectList

注：在 v17 正式版开始，就没有 effectList 的概念了，最早什么时候改的不清楚

![](http://file.wangsijie.top/blog/202201261547305.png)

![](http://file.wangsijie.top/blog/202201261548456.png)







上述一些列操作完后进入到下一个阶段 `commitRoot()`





