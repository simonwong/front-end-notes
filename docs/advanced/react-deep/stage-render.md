# render 流程

![](https://file.wangsijie.top/blog/202202201216897.png)



`renderRootSync` `renderRootConcurrent` 区别是后者多了一个 `shouldYield` 的判断，Sheduler 要求中断时就要中断。



![](https://file.wangsijie.top/blog/202201261810754.gif)



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









上述一些列操作完后进入到下一个阶段 `commitRoot()`





## 需要关注的重要方法

### ensureRootIsScheduled

![](https://file.wangsijie.top/blog/202203071117141.png)

该方法是在 scheduleUpdateOnFiber 中被调用的。

- `scheduleSyncCallback()` 将任务放到 *syncQueue* 中

- `scheduleMicrotask()` 将任务放到微任务中调度
- `scheduleCallback()` 将任务放到一个优先级队列（最小堆）中，立即执行



得益于微任务，可以进行批处理。

为什么 17 也是用了微任务，但没有批处理，因为在 scheduleUpdateOnFiber 中，判断了如果用的是旧版本的使用方式（为了兼容，避免问题），会调用 `scheduleCallback` 立即执行。



在以前的版本中，React 接管了事件，会在事件开始时 isBatchingEventUpdates = true， 事件结束后 isBatchingEventUpdates = false，来开启批量处理。而 setTimeout 等的回调会脱离这个控制。
