# 状态更新

## 更新优先级

### UpdateQueue

就像 fibers 一样（双缓存技术 double buffering ，一个 current tree，一个 workInProgress tree），更新队列也是成对出现的。

一个当前表示屏幕可见状态的队列（current queue），一个可以挂在（mutated）可以在 committed 前异步处理的 work-in-progress 队列（work-in-progress queue, 我们简称 WIP queue）。

如果一个 WIP 渲染在完成前被丢弃，我们可以从 current queue 克隆一个新的 WIP queue。



两个队列共享一个持久的单链表结构，为了调度更新，我们把它添加到两个队列后面。每个队列都维护一个指针，指向持久列表中尚未处理的第一次更新。WIP queue 的指针总是有一个位置指向等于或大于当前队列，因为我们总是处理该队列。

current queue 的指针仅在 commit 阶段（从 current queue swap）更新。

```toml
current 指针:           A - B - C - D - E - F
WIP 指针:                           D - E - F
                                   ^
WIP queue 处理的更新比 current 多
```

我们添加两个队列是因为我们可能在删除更新而不进行任何处理。比如，如果我们仅仅向 WIP queue 更新，一些更新可能会丢失，每当 WIP 通过从 current 克隆来重启渲染。类似的，如果我们只向 current tree 添加更新，那么每当 WIP queu 提交并和当前队列交换时，更新就会丢失。

通过向两个队列添加，我们可以保证更新将成为下一个 WIP（而且 WIP queue 一旦 commit，变成为 current queue，他们不会有两次相同的更新危险）

### 优先顺序（Prioritization）

更新不总是按优先级排序，而是按插入的，新的更新总是添加在队尾。

不过这个优先级仍然是重要的，在 render 阶段处理更新队列时，结果中只包含具有足够优先级的更新。

如果我们因为没有足够优先级而跳过一个更新，它将保留在队列中以稍后在低优先级期间处理。

至关重要的是，跳过的更新之后的所有更新也会保留在队列中（不管它们的优先级如何），这意味着高优先级更新有时会以两种不同的优先级处理两次。我们还保持跟踪一个基本状态，他表示应用队列中第一次更新之前的状态。

![](https://file.wangsijie.top/blog/202201241722787.png)

图片自制，内容来自 [Andrew Clark: 不同优先级流程 (in Twitter)](https://twitter.com/acdlite/status/978412930973687808)



举个例子:

给定当前状态为` ''`, 以及下面的更新队列

  `A1 - B2 - C1 - D2`

其中数字表示优先级，插入字符串以更新状态, *React* 将会以两个单独的渲染处理这些更新，每个不同的优先级一个：



1. 第一次渲染，优先级为1：

   初始状态: `''`

   更新队列: `[A1, C1]`

   状态结果: `'AC'`

2. 第二次渲染，优先级为1：

   初始状态: `'A'`（初始状态不包含 C1，因为 B2 被跳过了）

   更新队列: `[B2, C1， D2]` （C1 rebase 在 B2 后面）

   状态结果: `'ABCD'`



因为我们是按插入顺序处理更新的，并在跳过之前的更新时 rebase 高优先级的更新，所以**不论优先级如何，最终结果是确定**。

中间状态可能因为不用优先级而有所不同，但是最终结果是相同的。



参考 [React Reconciler ReactUpdateQueue.new.js](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.new.js)



## 数据结构

我们在状态更新时首先会创建一个 `Update` 对象，表示状态的更新。

由于不同类型组件工作方式不同，所以存在两种不同结构的`Update`，其中`ClassComponent`与`HostRoot`共用一套`Update`结构，`FunctionComponent`单独使用一种`Update`结构。

## ClassComponent / HostRoot

类组件，或者根组件

根组件会在 `updateContainer` 中调用 `createUpdate` `enqueueUpdate`

类组件 `this.setState(xxx)` 会调用   `enqueueSetState` ，然后调用 `createUpdate` `enqueueUpdate`

### createUpdate

createUpdate 会创建并返回如下结构的 Update 对象，是一个链表结构

```typescript
type Update<State> = {
  eventTime: number, // 任务时间，通过 performance.now() 获取的毫秒数
  lane: Lane, // 优先级，当前更新能否被处理取决于他的优先级是否在本次渲染的批次中
  tag: 0 | 1 | 2 | 3, // 更新类型，分别对应 UpdateState ReplaceState ForceUpdate CaptureUpdate
  payload: any, // 携带的状态，class 中是对象或者函数 (prevState, nextProps) => newState；root 中是 rootEl
  callback: (() => mixed) | null, // 回调函数，会在 commit#layout 阶段触发
  next: Update<State> | null, // 下一个 Update
}
```

### enqueueUpdate

在 fiber 节点上有一个 updateQueue 属性，它是下面这样的一个 UpdateQueue 对象。

```typescript
type SharedQueue<State> = {
  pending: Update<State> | null,
  interleaved: Update<State> | null,
  lanes: Lanes,
}

// current 表示已经更新上去的状态 / 上一次更新上去的状态，如上面例子中的第一渲染后的结果。
type UpdateQueue<State> = {
  baseState: State, // current Fiber 的 state (old state) 以他为基础，如例子中的第二次渲染的初始状态
  firstBaseUpdate: Update<State> | null, // current 上 Update 头节点，如例子中的第二次渲染的 B2-C1-D2
  lastBaseUpdate: Update<State> | null, // current 上 Update 尾节点，B2 是 first , D2 是 last
  shared: SharedQueue<State>, // 存储着本次更新的 update 队列，是实际的 updateQueue。shared 的意思是 current 节点与 workInProgress 节点共享一条更新队列。
  effects: Array<Update<State>> | null, // 保存 update.callback !== null 的 Update
}
```

enqueueUpdate 会使得 UpdateQueue （实际上是它上面的 shared.pending）形成一个单向环形链表结构。

```js
function enqueueUpdate (fiber， update， lane) {
  const updateQueue = fiber.updateQueue
  const sharedQueue = updateQueue.shared
  const pending = sharedQueue.pending // pending 总是指向最后一个 Update，pending.next 就是 head
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  sharedQueue.pending = update;
}
```

### processUpdateQueue

在 beginWork 阶段，会进行更新队列的处理。

1. 整理 UpdateQueue ，当进行了一次更新后，有些 Update 可能被跳过了，第二次更新又进来了新的 Update，此时可能存在两条更新队列：1: 上一次被跳过的更新：firstBaseUpdate - lastBaseUpdate， 2: 新来的 Update

2. 断开 pending 环形链表，合并上面两条更新队列，因为当前操作的是 WIP fiber，所以还需要同步到  currrent fiber 上。（两边都同步是因为，如果当前被高优先级任务打断，WIP 就没有了，但是 current 上还保留着，避免丢失 Update。）



3. while 循环
   - 如果优先级不够，那么跳过更新，放到 firstBaseUpdate 上。
   - 如果优先级足够，处理本次更新 `getStateFromUpdate()`，别忘了，本次更新是基于上一次更新的 (baseState / 循环更新的 newState)
     - callback 是 setState 的第二个参数，如果有 callback，就会放到 effects 队列中
     - update = update.next 回到 第三步
4. 根据上面的计算，更新 UpdateQueue 的 firstBaseUpdate、 lastBaseUpdate，workInProgress 的 lanes、memoizedState

## FunctionComponent

见 [React Hooks](./react-hooks.md)



