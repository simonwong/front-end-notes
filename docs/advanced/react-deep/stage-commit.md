# commit 阶段

进入到 commit 阶段，react 维护了

一棵当前屏幕上呈现的树 *current*

一棵在render阶段构建的备用树，叫做 *workInProgress* 或者 *finishedWork*

还有一个 effectList ，也是在渲染阶段生成的，通过指针指向树的节点。





commit 阶段的入口是 `commitRoot` 方法（`commitRootImpl`），commit 阶段分为三个子阶段，为每个阶段单独传递 effect list：所有的 mutation effects 都比所有的 layout effects 先来，以此类推。



主要关注三个阶段的入口函数：`commitBeforeMutationEffects`、`commitMutationEffects`、`commitLayoutEffects`

## before mutation

第一个阶段是 **before mutation 阶段**，在umtate host tree 之前，我们读取 host tree 的状态，**这里是调用 `getSnapshotBeforeUpdate` 的地方。**

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

这方面的惯用用例是布局，但由于遗留原因，类组件生命周期也在这里触发。



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

返回是否刷新了被动效果（passive effect）

`Scheduler.runWithPriority`，它接受一个函数。但是现在我们跟踪 React 本身的优先级，所以我们可以直接变异变量。



猜想：在 commit 阶段开始的时候，flushPassiveEffects （顺序？）执行所有 useEffect ，直到没有了，继续，后面还是有地方执行 flushPassiveEffects ，直到副作用执行完毕。



> 与 `componentDidMount`、`componentDidUpdate` 不同的是，传给 `useEffect` 的函数会在浏览器完成布局与绘制**之后**，在一个延迟事件中被调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因为绝大多数操作不应阻塞浏览器对屏幕的更新