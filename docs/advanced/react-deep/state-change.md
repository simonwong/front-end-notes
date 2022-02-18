# 状态更新

## 预备

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



因为我们是按插入顺序处理更新的，并在跳过之前的更新时 rebase 高优先级的更新，所以**不论优先级如何，最终结果是确定**。

中间状态可能因为不用优先级而有所不同，但是最终结果是相同的。



参考 [React Reconciler ReactUpdateQueue.new.js](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactUpdateQueue.new.js)



## 数据结构

我们在状态更新时首先会创建一个 `Update` 对象。

由于不同类型组件工作方式不同，所以存在两种不同结构的`Update`，其中`ClassComponent`与`HostRoot`共用一套`Update`结构，`FunctionComponent`单独使用一种`Update`结构，我们叫 `Hook`。

### UpdateQueue

```typescript
type Update<State> = {
  eventTime: number, // 任务时间，通过 performance.now() 获取的毫秒数
  lane: Lane, // 优先级
  tag: 0 | 1 | 2 | 3, // 更新类型，分别对应 UpdateState ReplaceState ForceUpdate CaptureUpdate
  payload: any, // 是更新挂载的数据
  callback: (() => mixed) | null, // 回到函数，会在 commit#layout 阶段触发
  next: Update<State> | null, // 下一个 Update
}
```

```typescript
type UpdateQueue<State> = {
  baseState: State, // current Fiber 的 state (old state)
  firstBaseUpdate: Update<State> | null, // current 上 Update 头节点（可能优先级低被跳过了，如上的 B2-C1-D2）
  lastBaseUpdate: Update<State> | null, // current 上 Update 尾节点
  shared: SharedQueue<State>,
  effects: Array<Update<State>> | null,
}
```

### Hook

```typescript
type Update<S, A> = {
  lane: Lane, // 优先级
  action: A,
  eagerReducer: ((S, A) => S) | null,
  eagerState: S | null,
  next: Update<S, A>,
}

type UpdateQueue<S, A> = {
  pending: Update<S, A> | null,
  interleaved: Update<S, A> | null,
  lanes: Lanes, // 任务批次
  dispatch: (A => mixed) | null,
  lastRenderedReducer: ((S, A) => S) | null,
  lastRenderedState: S | null,
}
```

```typescript
type Hook = {
  memoizedState: any, // 表示 hook 存的数据
  baseState: any,
  baseQueue: Update<any, any> | null,
  queue: UpdateQueue<any, any> | null,
  next: Hook | null,
}

type Effect = {
  tag: HookFlags,
  create: () => (() => void) | void,
  destroy: (() => void) | void,
  deps: Array<mixed> | null,
  next: Effect,
}

type FunctionComponentUpdateQueue = { lastEffect: Effect | null }
```

