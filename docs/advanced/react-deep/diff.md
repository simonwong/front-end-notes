# React diff 算法

在 React 中 diff 算法主要体现在 beginWork 阶段，生成 workInProgress tree的过程， diff 后的结果就是WIP tree。



两颗树之间的比较，将会达到 O(n3) 的时间复杂度。所以 React 对 diff 算法做了限制：

1. 只进行同级别比较
2. 元素类型改变时，直接重新构建整棵子树，即使当前节点的子节点没有改变
3. 可以通过 key 来复用节点





