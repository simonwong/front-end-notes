# ReactFiber架构浅析



## 先看`react@16`以前的版本 ##

> `reconciler`采用自顶向下递归，从根组件或`setState()`后的组件开始，更新他的整个子树



浏览器正常的工作流程：运算 -> 渲染  -> 运算 -> 渲染 ...

缺点：

- 组件树越大，递归遍历成本越高，持续占用主线程 --> 导致主线程上的布局、动画等周期性任务以及交互响应无法立即得到处理，造成卡顿
- 执行时间过长，导致fps降低

![](https://file.wangsijie.top/share/3.png)



使用`fiber reconciler `(调解算法)将要执行的js做拆分，来保证不会阻塞主线程



![](https://file.wangsijie.top/share/4.png)



## Fiber 与 Fiber tree ##

React@15 运行是存在3种实例

```
DOM
	真实DOM节点
----
Instances
	根据Elements创建。React维护的VDOM tree node。包含了组件状态、组件与DOM树的关系
----
Elements
	描述UI长什么样子，type，props
```

这个时候的调度叫做`Stack reconciler`。自顶向下递归`mount / update`。**无法中断**



React@16 Filber架构运行时，将Instances层增加了实例

```
DOM
	真实DOM节点
----------
effect
	每个workInProgress tree节点上都有一个effect list。存放diff结果。节点更新完后向上merge
- - - 
workInProgress
	workInProgress tree是调解过程中的进度快照，用于断点恢复，在这里收集effect list
- - -
fiber
	fiber tree类似vDOM tree
----------
Elements
	描述UI长什么样子，type，props
```





### React@15 ###

`react@15`中，更新分为两个阶段：

1、diff：对比前后（遍历，比较，可拆分，算一半然后接着算，执行阶段主线程一直被占用）

2、patch：将diff后的差异队列更新到真实DOM上，是一连串的DOM操作

diff是一次性计算出所有差异，再一次性执行patch



###   Fiber ###

以一个fiber为单元进行拆分。fiber tree是根据VDOM tree构造出来的，然后在基础之上增加了一些属性

> fiber指的是fiber tree上的节点。
>
> Fiber表示 React Fiber

```javascript
{
    alternate: Fiber|null, // 在fiber更新时克隆出的镜像fiber，对fiber的修改会标记在这个fiber上
    nextEffect: Fiber | null, // 单链表结构，方便遍历 Fiber Tree 上有副作用的节点
    pendingWorkPriority: PriorityLevel, // 标记子树上待更新任务的优先级

	stateNode: any, // 管理 instance 自身的特性
    return: Fiber|null, // 指向 Fiber Tree 中的父节点。处理完后，向谁提交自己的effect list
    child: Fiber|null, // 指向第一个子节点
    sibling: Fiber|null, // 指向兄弟节点
}
```



![](https://file.wangsijie.top/share/5.png)

![](https://file.wangsijie.top/share/7.png)

### 执行顺序 ###

Stack 执行是以一整个tree为单位。且只能同步执行。

Fiber 是以一个fiber为单位执行。对fiber做调度处理。

比如说执行 A -> B -> C

Stack是依次执行，并不可中断

Fiber是，A -> B 发现有更重要的事情，中断，然后回来执行B -> C



时间切片：A-> B切片 B-> C切片。A -> B执行了一半，发现时间用完了，赶紧过去看看有没有紧急任务。发现有。马上去执行重要的任务，然后回来重新A -> B

![ ](https://file.wangsijie.top/share/6.jpg)



两个阶段：

- Reconciliation Phase，找出需要更新的DOM，可以打断

包含了（componentWillMount、componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate）

- Commit Phase，一次性把DOM更新完，绝不会被打断

（componentDidMount、componentDidUpdate、componentWillUnmount）



### render / reconciliation ###

根据fiber tree，把每个fiber作为一个工作单元。自顶向下每个节点构造`workInProgress tree`

1. 当前节点是否需要更新？更新，打tag，到2 ： 不更新，clone子节点 ，到5
2. 更新当前节点状态（props，state，context。。。）
3. 调用`shouldComponentUpdate()`,false的话 到5
4. 调用`render()`获得新的子节点，为子节点创建fiber，过程中尽量复用现有fiber，子节点也会在这里增删
5. 如果没有child fiber，那么当前fiber工作结束，把`effect list`交给`return`，并把当前的节点的sibling作为下一个工作单元。有child的那么child作为下一个工作单元
6. 如果剩余时间不足，那么等下一次主线程空闲了，再进行下一个fiber。否则立刻开始做
7. 如果没有下一个fiber，那么第一阶段结束，进入`pendingCommit`状态



>  1-6循环，7出口。循环过程，做完看要不要休息。
>
> 循环结束时，`workInProgress tree`的根节点上的effect list，就是收集到的所有effect（每次做完一个就向上归并）



> 实际上，构建workInprogress的过程就是diff过程。通过`requestIdleCallback`来调度执行一组任务。
>
> 每次执行完看看有没有紧急任务，把控制权交给主线程，然后等待下一次的`requestIdleCallback`回调继续构建`workInProgress tree`



`requestIdleCallback`



### commit ###

1. 处理effect list，（更新DOM树、调用生命周期、更新ref内部状态）
2. 结束，完成commit到DOM树

> 这里是一口气做完。
>
> 建议不要再后3个生命周期做复杂工作



## 优先级策略 ##

每个工作单元运行时有6种优先级：

- synchronous 与之前的Stack reconciler操作一样，同步执行
- task 在next tick之前执行
- animation 下一帧之前执行
- high 在不久的将来立即执行
- low 稍微延迟（100-200ms）执行也没关系
- offscreen 下一次render时或scroll时才执行

