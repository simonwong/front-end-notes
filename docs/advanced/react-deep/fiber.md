# Fiber 的相关概念

## Fiber

React 为每一个元素都创建了一个 Fiber 节点，最终组成一颗 Fiber 树，



![](http://file.wangsijie.top/blog/202201261708798.png)



Fiber 是一个链表结构，child 指向第一个子节点，sibling 指向下一个兄弟节点，return 指向父节点。

```js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 实例
  this.tag = tag;
  this.key = key; // 一组子节点的唯一标识符
  this.elementType = null;
  this.type = null; // 指向组件的函数、构造函数、DOM 节点的 HTML tag
  this.stateNode = null; // 对组件、DOM节点或与光纤节点关联的其他元素类型的类实例的引用

  // Fiber 执政
  this.return = null; // 父节点
  this.child = null; // 第一个子节点
  this.sibling = null; // 下一个兄弟节点
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps; // 根据React元素中的新数据更新的 props，需要应用于子组件或DOM元素。
  this.memoizedProps = null; // 在上一次渲染期间用于创建输出的光纤道具。
  this.updateQueue = null; // 状态更新、回调和DOM更新的队列。
  this.memoizedState = null; // 用于创建输出的光纤的状态。处理更新时，它会反映屏幕上当前呈现的状态。
  this.dependencies = null; // 

  this.mode = mode;

  // 副作用
  this.flags = NoFlags; // 副作用标识，以前叫做 effectTag
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  // 任务批次
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;
}
```

## Fiber tree root

React 为每个容器创建一个 fiber root。源码中一般是 `HostRoot`



## workInProgress

第一次渲染过后，React 最终会生成一颗 Fiber 树。这棵树通常在源码中叫做 `current`（首次渲染中 current 为 `null`）。

当 React 开始处理更新时，React 会生成一颗 `workInProgress` 树。

所用工作都在 workInProgress tree 的 Fiber 上执行，一旦整棵树更新完并在屏幕上呈现，他就变成了 current。



React 总是一次性更新 DOM，不会显示部分结果，workInProgress tree 充当着不可见的中间过程。

## 副作用（side-effect）

在 react 中，所有组件可以视为 `(state, props) => UI`。

执行过数据获取、订阅或手动更改React组件的DOM，我们称之为副作用，简称 `effect`。大多数的 state、props 更新都将导致副作用。

应用副作用可以认为是一个工作（work）。一个 fiber 节点是一个很方便的机制去跟踪更新的 effect。

注：现在使用*flags* 属性标识的（以前这个属性名叫 *effectTag*）

## Effects list

如果在 wip 树上递归找要更新的节点会比较慢，react 提供了一个线性的数据结构 effect list，每一个元素都是需要更新的节点。

如下， effects list 会跳过不需要更新的节点。

![](http://file.wangsijie.top/blog/202201261547305.png)

![](http://file.wangsijie.top/blog/202201261548456.png)