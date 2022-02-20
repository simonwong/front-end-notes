# React hooks

## Hook 链表

下面是 Hook 类型，Hook 是一个单向链表结构

```ts
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

type Hook = {
  memoizedState: any, // 上一次更新存的 state
  baseState: any, // 本次更新将基于该 state
  baseQueue: Update<any, any> | null, // 上一次剩下的 Update head
  queue: UpdateQueue<any, any> | null, // 存储本次 UpdateQueue
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



 Hooks 作为链表存储在 fiber 的 memoizedState 字段中。

`currentHook`  currenHook list 属于 current fiber

`workInProgressHook` list 是新的 list ，会添加到 work-in-progress fiber





## hooks 执行流程

在 render#beginWork 阶段，如果 `workInProgress.tag === FunctionComponent` 那么会通过 `renderWithHooks` 方法执行 function，如下

```js
function renderWithHooks (current, workInProgress, Component, props, secondArg, nextRenderLanes) {
  // 重置 workInProgress memoizedState, updateQueue, lanes ...
  
  let children = Component(props, secondArg);
  
  // 检查是否有渲染阶段更新
  // 只要继续计划渲染阶段更新，就保持循环渲染。使用计数器防止无限循环。
  if (didScheduleRenderPhaseUpdateDuringThisPass) {
		do {
      didScheduleRenderPhaseUpdateDuringThisPass = false
      
      children = Component(props, secondArg) // 所以一个组件会 rerender 很多次
    } while (didScheduleRenderPhaseUpdateDuringThisPass)
  }
  
  // 首次挂载调用 mount ，更新调用 update
  ReactCurrentDispatcher.current = current === null || current.memoizedState === null
    ? HooksDispatcherOnMount
  	: HooksDispatcherOnUpdate;
}
```

```js
const HooksDispatcherOnMount = {
	// rest hooks ...
  useEffect: mountEffect,
  useState: mountState,
};

const HooksDispatcherOnUpdate = {
  // rest hooks ...
  useEffect: updateEffect,
  useState: updateState,
}

const HooksDispatcherOnRerender = {
  // rest hooks ...
  useEffect: updateEffect,
  useState: rerenderState,
}
```

## useState

### mountState

```js
function mountState(initialState) {
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    pending: null,
    interleaved: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState,
  });
  const dispatch = (queue.dispatch = dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ));
  return [hook.memoizedState, dispatch];
}
```

**mountWorkInProgressHook**

创建一个 Hook，并将 hook 同步到 workInProgress fiber 的 memoizedState 上。（currentlyRenderingFiber 是 workInProgressFiber）

```js
function mountWorkInProgressHook() {
  const hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };

  if (workInProgressHook === null) {
    // hook 链表的头节点
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // 向后面添加节点
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}
```



**dispatchAction** 

类似于类组件或者根组件调用`createUpdate` `enqueueUpdate`，然后进入 render 阶段

```js
function dispatchAction (fiber， queue， action) {
  const update = {/** 创建一个 Update 对象 */}
  
  if (pending === null) {
    // 如果是第一个 Update，创建环形链表
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;
  
  // 队列当前为空，这意味着我们可以在进入渲染阶段之前急切地计算下一个状态。
  if (
    fiber.lanes === NoLanes &&
    (alternate === null || alternate.lanes === NoLanes)
  ) {
    // 将迫切需要计算的状态以及用于计算它的 reducer 暂存到 update 对象上。
    // 如果我们在进入 render 阶段时 reducer 还没有改变，那么可以使用 eager state,
    // 无需再次调用 reducer。
    const eagerState = lastRenderedReducer()
    update.eagerReducer = lastRenderedReducer
    update.eagerState = eagerState;
  }
  
  // 准备进入 render 阶段
  const root = scheduleUpdateOnFiber(fiber, lane, eventTime);
}
```



### updateState

```js
function updateState(initialState) {
  return updateReducer(basicStateReducer, (initialState: any));
}
```



参考 [React 状态更新#processUpdateQueue](./state-change.md#processupdatequeue) 大致逻辑差不多的，合并 baseQueue 和 pending，基于 baseState 更新 Update 的 state，然后更新 hook.memoizedState (计算后的 newState)，baseState，baseQueue

```js
function updateReducer (reducer, initialArg, init) {
  const hook = updateWorkInProgressHook()
  const queue = hook.queue
  queue.lastRenderedReducer = reducer
  
  // 。。。
  
  return [hook.memoizedState, queue.dispatch]
}
```



