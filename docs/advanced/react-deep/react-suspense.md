# React Suspense



Suspend : 挂起



## 使用

Suspense 一般配合 React.lazy 使用。

当 SomePage 没有被加载成功，就会显示 fallback 的 Loading，加载成功后就会渲染 SomePage。

```jsx
const LazyPage = React.lazy(() => import('./SomePage.tsx'))

export default () => {
  return (
    <Suspense
      fallback={<div>Loading...</div>}
    >
      <LazyPage />
    </Suspense>
  )
}
```



## 类型

从 React 导出来看，Suspense 并不是一个 React 内部定义好的组件，而只是一个内部定义的 Symbol `Symbol.for('react.suspense')`，



从 @types/react 导出看，他的类型是 `ExoticComponent<SuspenseProps>` 。直接看 `ExoticComponent` 定义看到上面注释了一些话。 Suspense  类似于 Fragment，他们实际上是一个 symbol，通过 `ExoticComponent` 假装它是一个组件，能够被 jsx 解析起识别。



最终 Suspense 就会被创建成一个类似下面一样的 fiber 节点

```js
{
  elementType: Symbol(react.suspense),
  pendingProps: {
    fallback: FiberNode,
    children: FiberNode,
  },
  return: FiberNode,
  // ...
}
```

## 各阶段的处理



flags

- DidCapture
- NoFlags



### render 阶段

#### beginWork

`updateSuspenseComponent`



判断当前是否是挂起状态（flags = DidCapture）

是的话：

​	showFallback = true

​	返回 CallBack 内容，以 callBack 作为 next 继续走 render 流程

否则：

- 为子节点创建 `Symbol(react.offscreen)` 类型的节点，继续走render

- 返回 `Symbol(react.lazy)` 类型的节点，父子节点链 `suspense -> offscreen -> lazy`
- lazy 方法然后是否能无法立刻返回节点
  - 不能，将 Suspense 的 flags 改为 DidCapture，返回 Suspense 继续 render
  - 能，直接返回节点，走 render



### commit 阶段

