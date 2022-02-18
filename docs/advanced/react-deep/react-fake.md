# React 流程伪码

React 流程伪码，列出来 React 各个过程中的主要函数，及其内部简略描述



注释含义：

`// xxx ...` 表示 xxx 内容省略了

## render 阶段的入口

 进入 render 阶段有很多种方式，但最终都会调用 `performSyncWorkOnRoot` 或 `performConcurrentWorkOnRoot` 方法进入。

组件分类

- `ReactDOM.render `—— HostRoot
- `this.setState` —— ClassComponent
- `this.forceUpdate` —— ClassComponent
- `useState` —— FunctionComponent
- `useReducer` —— FunctionComponent

一共三种组件（`HostRoot` | `ClassComponent` | `FunctionComponent`）可以触发更新。

### ReactDOM.render()

```js
function render () {
  // 创建 FiberRoot ...
  updateContainer()
}
```

```js
function updateContainer () {
  performSyncWorkOnRoot()
}
```

### useState

dispatch

```js
function scheduleUpdateOnFiber (fiber, lane) {
  const root = markUpdateLaneFromFiberToRoot(fiber, lane);
  // ...
  
  ensureRootIsScheduled(root, eventTime)
  return root;
}
```

```js
// 从下往上寻找 RootFiber
// 标记从 Fiber 到 Root 的 更新优先级
function markUpdateLaneFromFiberToRoot (sourceFiber， lane) {
  let node = sourceFiber
  let parent = sourceFiber.return
  while (parent !== null) {
    // parent.childLanes = mergelane(parent.childLanes, lane) ... 
    // alternate.childLanes = mergeLanes(alternate.childLanes, lane) ...
    node = parent
    parent = parent.return
  }
}
```

```js
// 使用该方法为 root 调度一个任务。每个 root 只有一个任务。
// 如果已经安排了任务，我们将进行检查，以确保现有任务的优先级与 root 所处理的下一级任务的优先级相同
// 在每次更新时，以及在退出任务之前，都会调用此函数。
function ensureRootIsScheduled () {
  // 任务开始前检查 ...
  
  if (newCallbackPriority === SyncLane) {
    if (root.tag === LegacyRoot) {
      scheduleLegacySyncCallback(performSyncWorkOnRoot.bind(null, root))
    } else {
      scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
    }
    
    // 在 Microtasks 中刷新队列（或者Immediate task）
  } else {
    scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot.bind(null, root),
    )
  }
}
```

```js
function scheduleSyncCallback(callback) {
  // 是直接push 的
  syncQueue.push(callback)
}

function scheduleCallback (callback, deprecated_options) {
  // ...
  // 将新回调插入列表，先按过期时间排序，然后按插入顺序排序。
  // 因此，new callback 被插入到任何相同过期时间的回调中。
}
```

## render 阶段

```js
// 所有并发任务的入口
function performConcurrentWorkOnRoot () {
  // 在某些情况下，我们会禁用时间切片：
  // 如果工作被CPU绑定的时间太长（"expired" work, 来防止 starvation），
  // 或者默认情况下我们处于同步更新模式。
  shouldTimeSlice(root, lanes) && (disableSchedulerTimeoutInWorkLoop || !didTimeout)
  	? renderRootConcurrent(root, lanes)
    : renderRootSync(root, lanes)
  
  // ...
}

// 这是不经过调度程序的同步任务的入口
function performSyncWorkOnRoot () {
  // ...
  renderRootSync()
  // ...
}
```

```js
function renderRootSync () {
  while (workInProgress == null) {
    performUnitOfWork(workInProgress)
  }
}

function renderRootConcurrent () {
  while (workInProgress == null && !shouldYeild()) {
    performUnitOfWork(workInProgress)
  }
}
```

### performUnitOfWork

```js
// 执行在上面的 while 循环中
function performUnitOfWork (workInProgress) {
  const current = workInProgress.altnate
  const next = beginWork(current, workInProgress);
  
  if (next) {
    workInProgress = next
  } else {
    completeUnitOfWork()
  }
}

function completeUnitOfWork (completedWork) {
  do {
    const current = completedWork.alternate
    const next = completeWork(current, completedWork)
    
    // completeWork 是在递归的归阶段，从下往上的
    completedWork = next || completedWork.sibling || completedWork.return  // fake
  } while (completedWork !== null)
}
```

### beginWork

```js
function beginWork (current, workInProgress) {
  // 表示更新（不是首次挂载）
  if (current !== null) {
    // oldProps 与 newProps 的比较
    if (current.memoizedProps !== workInProgress.pendingProps) {
      didReceiveUpdate = true
      
    } else if (!includesSomeLane(renderLanes, updateLanes)) {
      // 表示当前 fiber 没有 pending work，
      didReceiveUpdate = false
      // 做一些 bookkeeping 的工作，主要是推到堆栈上去
      // bailoutOnAlreadyFinishedWork() ...
    } else {
      // 计划对该fiber进行更新，先设为 flase
      // 如果有 update queue 或 context consumer 更改值，则会设为 true。
      // 否则就假定 children 都没有更改，并退出
      didReceiveUpdate = false
    }
  } else {
    didReceiveUpdate = false
  }
  // 在进入 begin 阶段之前，清除挂起的更新优先级。
  workInProgress.lanes = NoLanes
  // 正式进入 begin 阶段
  
  switch (workInProgress.tag) {
  	// case ...
    case FunctionComponent: {
      // return updateFunctionComponent() ...
    }
      
    case HostComponent: {
      return updateHostComponent(current, workInProgress, renderLanes)
    }
      
    // case ...
  }
}
```

```js
function updateHostComponent (current, workInProgress, renderLanes) {
	// nextChildren = workInProgress.pendingProps.children
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child
}

function reconcileChildren () {
  if (current === null) {
    // 如果是尚未渲染的新组件，我们不会通过应用 minimal side-effects 来更新 child
    // 我们将在渲染钱将他们全部添加到 child ，意味着我们不需要跟踪 side-effects
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes,
    )
  } else {
    // 进入 diff 算法
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes,
    );
  }
}
// 区别在于是否跟踪副作用。实际上都是进入 ChildReconciler 中的 reconcileChildFibers 方法
const reconcileChildFibers = ChildReconciler(true);
const mountChildFibers = ChildReconciler(false);
```

**diff 算法 reconcileChildFibers**

```js
function ChildReconciler (shouldTrackSideEffects) {
  // function deleteChild ...
  // function deleteRemainingChildren ...
  // function ...
  
  function placeSingleChild () {}
  
  function reconcileSingleElement () {}

  function reconcileChildrenArray () {}
  
  // 最终通过 diff 算法返回新的（也可能是复用的） fiber 对象
  function reconcileChildFibers (returnFiber, currentFirstChild, newChild, lanes) {
    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          return placeSingleChild(
            reconcileSingleElement(returnFiber, currentFirstChild, newChild, lanes),
          )
        }
          // case REACT_PORTAL_TYPE REACT_LAZY_TYPE ...
      }
      
      if (isArray(newChild)) {
        return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes)
      }
    }
    
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(
        reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, lanes),
      );
    }
  }
  return reconcileChildFibers
}
```

### completeWork

```js
function completeWork (current， workInProgress) {
  swutch (workInProgress.tag) {
    case FunctionComponent:
    // case ...
    	return null
    // case
    case HostComponent: {
      // 创建真实节点
			const instance = createInstance()
      // 将 workInProgress 的所有子节点的真实节点都 apend 到 instanse 上
			appendAllChildren(instance, workInProgress, false, false);
      return null
    }
    	
  }
}
```



## commit 阶段

```js
// commitRootImpl
function commitRoot(root) {
  do {
    // `flushPassiveEffects'最后将调用'flushSyncUpdateQueue'，
    // 这意味着'flushPassiveEffects'有时会导致额外的 passive effects，
    // 因此，我们需要在循环中不断刷新，直到不再有 pendding effects
    flushPassiveEffects();
  } while (rootWithPendingPassiveEffects !== null);

  const finishedWork = root.finishedWork;
  const lanes = root.finishedLanes;
  
  
  /**
    * commit 阶段的入口是 `commitRoot` 方法（`commitRootImpl`），
    * commit 阶段分为三个子阶段，为每个阶段单独传递 effect list：
    * 所有的 mutation effects 都比所有的 layout effects 先来，以此类推。
    */
  /**
    * 第一个阶段是 before mutation 阶段，在umtate host tree 之前，
    * 我们读取 host tree 的状态，这里是调用 `getSnapshotBeforeUpdate` 的地方。
    */
  const shouldFireAfterActiveInstanceBlur = commitBeforeMutationEffects(
    root,
    finishedWork,
  );
  
  // 下一个阶段是 mutation phase, 我们将挂载 host tree
  commitMutationEffects(root, finishedWork, lanes);
  
  // 下一个阶段是布局阶段，我们称之为在 挂载 host tree 后读 hst tree effects
  // 这方面的惯用用例是布局，但由于遗留原因，类组件生命周期也在这里触发。
  commitLayoutEffects(finishedWork, root, lanes);
}
```

### beforeMuatation

```js
function commitBeforeMutationEffects (root, firstChild) {
  nextEffect = firstChild
  commitBeforeMutationEffects_begin()
}

function commitBeforeMutationEffects_begin () {
  while (nextEffect !== null) {
    const deletions = fiber.deletions;
    // for of
    // commitBeforeMutationEffectsDeletion(deletion) ... 处理 deletions
    
    const child = fiber.child;
    if (
      (fiber.subtreeFlags & BeforeMutationMask) !== NoFlags &&
      child !== null
    ) {
      ensureCorrectReturnPointer(child, fiber);
      nextEffect = child;
    } else {
      commitBeforeMutationEffects_complete();
    }
  }
}


function commitBeforeMutationEffects_complete () {
  while (nextEffect !== null) {
    commitBeforeMutationEffectsOnFiber(nextEffect)
    nextEffect = nextEffect.sibling || nextEffect.return // fake
  }
}

function commitBeforeMutationEffectsOnFiber (finishedWork) {
  // 处理一些失焦逻辑？
}
```

### mutation

```js
function commitMutationEffects (root, firstChild) {
  nextEffect = firstChild
  commitMutationEffects_begin(root)
}

function commitBeforeMutationEffects_begin (root) {
  while (nextEffect !== null) {
    const deletions = fiber.deletions;
    // for of
    // commitBeforeMutationEffectsDeletion(deletion) ... 处理 deletions
    
    const child = fiber.child;
    if (
      (fiber.subtreeFlags & MutationMask) !== NoFlags &&
      child !== null
    ) {
      ensureCorrectReturnPointer(child, fiber);
      nextEffect = child;
    } else {
      commitMutationEffects_complete(root);
    }
  }
}


function commitMutationEffects_complete (root) {
  while (nextEffect !== null) {
    commitMutationEffectsOnFiber(nextEffect, root)
    nextEffect = nextEffect.sibling || nextEffect.return // fake
  }
}

function commitBeforeMutationEffectsOnFiber (finishedWork) {
  // ContentReset && commitResetTextContent ...
  // Ref && commitAttachRef ...
  // Visibility ...
  
  // 处理 placement 、updates、deletions
  
  switch (flags & (Placement | Update | Hydrating)) {
    case: Placement {
      // Placement
      commitPlacement(finishedWork)
      break
  	}
  	case: PlacementAndUpdate {
  		// Placement
      commitPlacement(finishedWork)
      
      // Update
      const current = finishedWork.alternate;
      commitWork(current, finishedWork);
  		break
  	}
		/// case: ...
    case: Update {
      const current = finishedWork.alternate;
      commitWork(current, finishedWork);
			break
  	}
  }
}
```

```js
function commitPlacement(finishedWork) {
  // ...
  // 我们只有插入的顶层光纤，但我们需要向下递归它的子节点，以找到所有的终端节点。
  if (isContainer) {
    insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
  } else {
    insertOrAppendPlacementNode(finishedWork, before, parent);
  }
}

function commitWork(current, finishedWork) {
  
}
```



### layout

```js
function commitLayoutEffects (finishedWork, root) {
  nextEffect = finishedWork
  commitLayoutEffects_begin()
}

function commitBeforeMutationEffects_begin () {
  while (nextEffect !== null) {
    const deletions = fiber.deletions;
    // 处理各种情况，如 The Offscreen tree is hidden. Skip over its layout effects.
    
    const child = fiber.child;
    if ((fiber.subtreeFlags & LayoutMask) !== NoFlags && child !== null) {
      ensureCorrectReturnPointer(child, fiber);
      nextEffect = child;
    } else {
      commitLayoutMountEffects_complete();
    }
  }
}


function commitLayoutMountEffects_complete () {
  while (nextEffect !== null) {
    commitLayoutEffectOnFiber(root, current, fiber, committedLanes)
    nextEffect = nextEffect.sibling || nextEffect.return // fake
  }
}

function commitLayoutEffectOnFiber (finishedWork) {
  if （finishedWork.flags === LayoutMask） {
    switch (finishedWork.tag) {
      // case ...
      case FunctionComponent: {
        // commitHookEffectListMount ...
    	}
      case ClassComponent: {
        // 处理一些类组件的生命周期，如 didMount
        
        // commitUpdateQueue ...
      }
      case HostRoot: {
        // commitUpdateQueue ... 遍历调用 finishedWork.updateQueue.effects 的 callback
      }
      case HostComponent: {
        // 渲染器可以在挂在host component 后安排要完成的工作（例如可以安排输入和表单控件的自动聚焦）
        // 只有在首次挂在时才会处理
        if (current === null && finishedWork.flags & Update) {
          // commitMount ... focus 处理
        }
      }
    }
  }
}
```



