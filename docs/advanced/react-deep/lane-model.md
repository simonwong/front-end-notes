# lane 模型

## 介绍

学习 lane 模型前，我们先学习他的前身： Expiration Times 模型

## Expiration Times 模型

在 Expiration Times 模型中，决定在当前的批处理中是否包含指定任务，是通过下面的方式判断的：

```js
const isTaskIncludedInBatch = priorityOfTask >= priorityOfBatch;
```

因为当前施加了一个约束：**除非还有更高优先级的任务，否则不允许做较低优先级任务**。（该约束是在 Suspense 出现前设计的）

但是当你引入  IO-bound （Suspense）的任务时，可能会遇到较高优先级的  IO-bound 任务阻止较低优先级的 CPU-bound 任务完成的情况。

Expiration Times 的一个缺陷就是限制了如何表达一组优先级

## lane 模型

相比旧模型

- lane 将**任务优先级（任务A是否比任务B优先级高）**的概念从**任务批处理（任务A是否是这一组的任务）**中解偶，

- lane 可以用单一的 32 位数据类型表示许多不同的任务线程。

  

表示任务的位掩码类型称为`Lane`

表示批次的位掩码类型称为`Lanes`

```js
export const NoLanes: Lanes = /*       */ 0b0000000000000000000000000000000;
export const InputContinuousLane: Lanes = 0b0000000000000000000000000000100;
export const DefaultLane: Lanes = /*   */ 0b0000000000000000000000000010000;
const TransitionLanes: Lanes = /*      */ 0b0000000001111111111111111000000;
const RetryLanes: Lanes = /*           */ 0b0000111110000000000000000000000;
```



在 lane 模型中，任务组用位掩码表示

```js
const isTaskIncludedInBatch = (task & batchOfTasks) !== 0;
```



## 参考

[react PR#18796: Initial Lanes implementation](https://github.com/facebook/react/pull/18796)