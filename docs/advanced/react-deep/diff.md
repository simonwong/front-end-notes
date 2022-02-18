# React diff 算法

在 React 中 diff 算法主要体现在 beginWork 阶段，生成 workInProgress tree的过程， diff 后的结果就是WIP tree。



两颗树之间的比较，将会达到 O(n3) 的时间复杂度。所以 React 对 diff 算法做了限制：

1. 只进行同级别比较
2. 元素类型改变时，直接重新构建整棵子树，即使当前节点的子节点没有改变
3. 可以通过 key 来复用节点



diff 算法主要是在 `reconcileChildFibers` 方法中。



对比 `currentFirstChild` 和 `newChild`。

同级别对比（根据 newChild 的类型来判断）分为两种情况：

## 如果是单个节点：

- 根据 `$$typeof` 属性匹配：element 、portal、lazy
- string / number



以普通节点为例 `$$typeof === element`

`reconcileSingleElement()`

1. 判断 key 是否相同（key 可能都是 null，那么认为是相同的）

   相同：判断 type 是否相同

   ​				相同：将 `currentFirstChild` 的兄弟节点标记为删除，返回复用节点

   ​				不相同：将 `currentFirstChild` 及其兄弟节点都标记为删除，break

   不同：标记为删除

2. child = child.sibling 回到 1

3. 如果上述都没成功复用，那么创建一个新的 Fiber

注：为什么删除 currentFirstChild 的兄弟节点？因为有可能是从多个节点变成为单个节点的。



如何复用：直接从 `current.alternate` 复用，修改相关的属性

## 如果是多节点：

可以是 Array ，也可以是 iterater。

主要关注 `reconcileChildrenArray()` 方法。

> 这种算法不能通过两端搜索来优化，因为我们在 fiber 上没有反向指针（fiber 是单向链表，而 newChild 是个数组）。

考虑两个数组元素之间的 diff，从 oldList 更新到 newList 分为以下几种情况：

### 更新情况

**情况1: 某些属性改变了，或者 type 改变了**

```js
const oldList = [
  { key: 1, type: 'li', value: 'a' },
  { key: 2, type: 'li', value: 'b' },
]

const newList = [
  { key: 1, type: 'div', value: 'c' },
  { key: 2, type: 'div', value: 'b' },
]
```

**情况2: 多了一条数据，或者少了**

```js
const oldList = [
  { key: 1, type: 'li', value: 'a' },
  { key: 2, type: 'li', value: 'b' },
]

const newList = [
  { key: 1, type: 'li', value: 'a' },
]
```

**情况3: 位置发生了改变**

```js
const oldList = [
  { key: 1, type: 'li', value: 'a' },
  { key: 2, type: 'li', value: 'b' },
]

const newList = [
  { key: 2, type: 'li', value: 'b' },
  { key: 1, type: 'li', value: 'a' },
]
```

### 源码执行过程

以下 oldList 表示 current.children 链表（旧树），old 表示每一个 fiber节点

 newList 表示 newChildren 数组（新树），new 表示每一个 fiber节点

1. 进行第一轮循环

   1.1. 判断 old new 的 key 是否相同，不相同则，break

   1.2. 判断 old new 的 type 是否相同，不相同则将 old 标记为删除（对应情况1，type 类型变了），continue

   1.3. 如果都相同则继续遍历，continue

   1.4. 遍历结束

2. 如果 newList 遍历完了，剩下的 olds 就不需要了，全部标记为删除（对应情况2，数据变少了）

3. 如果 oldList 遍历完了，将剩下的所有 new 的都创建新的 fiber （对应情况2，数据变多了）

4. 都没遍历完（对应情况3，以及可能更复杂的 3 + 2 + 1 的情况）

   4.1. 创建一个 Map ，key 为 old 的 key / index，value 为 old，方便后续查找

   4.2. 遍历 newList

   ​		4.2.1. `updateFromMap()` 如果通过 `map.get(key)` 能找到 old，判断 type 是否相等，相等则复用，否则创建新的（插入）

   ​		4.2.2. `placeChild()`   `lastPlacedIndex` 表示最后一个可复用节点的索引位置。

   ​					如果 `oldIndex < lastPlacedIndex` 表示进行了移动，给复用的 fiber 标记为 Placement，return lastPlacedIndex

   ​					否则 `lastPlacedIndex = oldIndex`，fiber 留在原地。



**举例**

以 [a, b, c, d] 更新为 [a, c, d, b] 为例 

第一轮循环 a 可以直接复用，随后进入第二轮循环（上述步骤4）

此时 lastPlacedIndex 为 0。

c：找到 oldList 的 oldIndex 为 2，2 > 0，所以 fiber c 原地不动，lastPlacedIndex = 2

d: 找到  oldList 的 oldIndex 为 3,  3 > 2，所以 fiber d 原地不动，lastPlacedIndex = 3

b: 找到 oldList 的 oldIndex 为 1,  1 < 3，所以 fiber b 标记为 Placement，lastPlacedIndex = 3

之后，只要把 fiber b 移到最后面即可。
