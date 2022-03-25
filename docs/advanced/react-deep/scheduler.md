# React 调度器

React 的调度器我们重点关注一下几个方法

- unstable_scheduleCallback 请求即时回调
- shouldYieldToHost 是否让出主线程

## unstable_scheduleCallback

**请求即时回调**

在别的地方一般都叫做 Scheduler_scheduleCallback，或者 scheduleCallback

### 函数签名

传入优先等级，回调，以及一个配置对象

```js
function unstable_scheduleCallback(priorityLevel, callback, options)
```

### 执行步骤

- 计算 *startTime*，`currentTime + options.delay || 0`

- 根据优先等级，确定 timeout 超时时间，由此可得过期时间 *expirationTime*  为  `startTime + timeout`

- 创建一个任务对象 *task* ，包含起始时间，过期时间，调度等级，回调，id 等

- 接下来是一个分支：

  如果 startTime > currentTime （即配置了 delay）

  - 将 *task* 放入 *timerQueue* 超时优先队列（sortIndex 是 startTime）
  - 设置一个 setTimeout 计时执行任务

  否则

  - 将 *task* 放入 *taskQueue* 任务优先队列（sortIndex 是*expirationTime*）
  - 设置一个请求回调。这里使用了三种异步方式处理
    - *setImmediate*（适用于 Node.js and old IE，它运行的更早，是 React 想要的）
    - *MessageChannel* （适用于浏览器和 Worker 环境，没有 setTimeout 的 4ms 延迟）
    - *setTimeout*（最后的兼容）

### 一句话总价

创建任务放到优先级队列中，等待异步执行。

优先级队列是一个小顶堆。根据 sortIndex  来排序。



### 常见被使用的位置

- ensureRootIsScheduled

  当不支持微任务时，就会放到这里以一个 Immediate task 调用 flushSyncCallbacks，处理合并更新

- commit 阶段的前置处理

  以一个 Normal task 调用 flushPassiveEffects，处理 useEffect