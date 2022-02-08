# 深入学习 React

## 概念

[fiber的相关概念](./fiber.md)

[React 名词解释](./react-glossary.md)

## 运行过程

[render 阶段](./stage-render.md)

[commit 阶段](./stage-commit.md)

## 架构/模型

[lane 模型](./lane-model.md)

## 参考

- [React In Depth](https://indepth.dev/react)
- [Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e)
- [React技术揭秘](https://react.iamkasong.com/)
- [React 18 discussions](https://github.com/reactwg/react-18/discussions)

## 当前的疑问点

- useEffect 的执行时机？如何做到异步执行的。
- useState 的 setState 是如何把新的 state 更新到 fiber 上，使得在 beginWork 阶段 diff props 来添加一个更新
