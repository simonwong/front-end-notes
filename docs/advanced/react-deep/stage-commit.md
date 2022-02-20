# commit 阶段

进入到 commit 阶段，react 维护了

一棵当前屏幕上呈现的树 *current*

一棵在render阶段构建的备用树，叫做 *workInProgress* 或者 *finishedWork*

还有一个 effectList （在 17.x 版本中已经没有 effectList，而是 dfs 带有 flags 标识的 fiber tree），也是在渲染阶段生成的，通过指针指向树的节点。





commit 阶段的入口是 `commitRoot` 方法（`commitRootImpl`），commit 阶段分为三个子阶段，为每个阶段单独传递 effect list：所有的 mutation effects 都比所有的 layout effects 先来，以此类推。



**在进入子阶段之前，**

```js
do {
  // 我们需要在循环中不断刷新,触发 useEffects 回调，直到不再有 pendingEffects, 因为在回调中可能又会更新状态
  flushPassiveEffects();
} while (rootWithPendingPassiveEffects !== null);
```

然后重置各种状态。

下面这个操作从子阶段提取出来了，见 [issues#16714](https://github.com/facebook/react/pull/16714)

```js
// 如果存在待定的被动效果，请安排回调来处理它们。
// 尽可能早地执行此操作，以便在 commit 阶段安排任何其他操作之前将其排队
if (
  (finishedWork.subtreeFlags & PassiveMask) !== NoFlags ||
  (finishedWork.flags & PassiveMask) !== NoFlags
) {
  if (!rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = true;
    scheduleCallback(NormalSchedulerPriority, () => {
      flushPassiveEffects();
      return null;
    });
  }
}
```



主要关注三个阶段的入口函数：`commitBeforeMutationEffects`、`commitMutationEffects`、`commitLayoutEffects`

## before mutation

第一个阶段是 **before mutation 阶段**，在umtate host tree 之前，我们读取 host tree 的状态，

**类组件：调用 `getSnapshotBeforeUpdate`** 

~~函数组件：异步调度useEffect~~ 被提取出来在子阶段之前执行了

### 过程伪代码

```js
function commitBeforeMutationEffects () {
  commitBeforeMutationEffects_begin()
}

function commitBeforeMutationEffects_begin () {
  while (nextEffect !== null) {
    const deletions = fiber.deletions
    // 处理 deletions

    if (xxx) {
      nextEffect = nextEffect.child
    } else {
      commitBeforeMutationEffects_complete()
    }
  }
}

function commitBeforeMutationEffects_complete () {
  commitBeforeMutationEffectsOnFiber()
}
```

## mutation

第二个阶段是 **mutation 阶段**，我们在这里改变宿主树（mutate the host tree）。

类组件：调用 componentWillUnmount

函数组件：执行 useLayoutEffect 的销毁函数 `commitHookEffectListUnmount(HookLayout | HookHasEffect,finishedWork,finishedWork.return)`

### 过程伪代码

```js
function commitMutationEffects() {
  commitMutationEffects_begin(root)
}

function commitMutationEffects_begin (root) {
  while (nextEffect !== null) {
    const deletions = fiber.deletions
    // 处理 deletions

    if (xxx) {
      nextEffect = nextEffect.child
    } else {
      commitMutationEffects_complete(root)
    }
  }
}

function commitMutationEffects_complete () {
  while (nextEffect !== null) {
    commitMutationEffectsOnFiber(nextEffect, root)

    nextEffect = nextEffect.return
  }
}

function commitMutationEffectsOnFiber(nextEffect, root) {
  // 根据 ContentReset effectTag重置文字节点
  // ContentReset && commitResetTextContent()
  
  // 更新ref
  // Ref && commitDetachRef / commitAttachRef()
  
  // 处理隐藏在屏幕之外的更新？
  // Visibility??
  
  // 添加/更新真实 DOM
  commitWork() // -> commitContainer / commitUpdate -> updateFiberProps、updateProperties
}
```



### 个人理解思考：

更新真实 DOM 有个点，比如 div > p > span 这样一个结构的更新，第一次更新的时候，直接 append 这个新的 div （div 这个 fiber.stateNode）就好了。因为在 completeWork 阶段，就把 p 和 span 向上递归 apend 到父节点去了。



### mutation 阶段结束后

workInProgress tree 现在是 current tree 了（`root.current = finishedWork`），这个必须发生在在 mutation 阶段后，以便在componentWillUnmount 期间上一棵树仍然是当前树。

但在 layout 阶段之前， componentDidMount/Update 期间 finishWork 是 current tree。

## layout

第三个阶段是 layout 阶段，我们称之为 mutated 后读取 host tree 的 effects。

类组件：调用 `componentDidMount` `componentDidUpdate` 调用setState的回调

函数组件：执行 useLayoutEffect 的回调函数 `commitHookEffectListMount(HookLayout | HookHasEffect, finishedWork)`

### 过程伪代码

```js
function commitLayoutEffects () {
  commitLayoutEffects_begin(finishedWork, root, committedLanes)
}

function commitLayoutEffects_begin () {
  while (nextEffect != null) {    
    // 其他的一堆处理
    
    nextEffect = child

    commitLayoutMountEffects_complete()
  }
}

function commitLayoutMountEffects_complete () {
  while (nextEffect != null) {    
    commitLayoutEffectOnFiber(root, current, fiber, committedLanes);
    
    nextEffect = nextEffect.sibling / nextEffect.return
  }
}

function commitLayoutEffectOnFiber () {
  // 执行 useLayoutEffect 的回调函数
  (FunctionComponent || ForwardRef || SimpleMemoComponent) && commitHookEffectListMount()
  
  // 执行类组件的声明周期
  class && instance.componentDidMount() / instance.componentDidUpdate();
}
```





## 关注一些重要方法

### flushPassiveEffects

执行 useEffect 的销毁函数，紧接着执行 useEffect 的回调函数

```js
useEffect(() => {
  // 回调函数
  
  return () => {
    // 销毁函数
  }
})
```