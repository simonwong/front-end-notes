# React Conf

## Part1

主要讲 React18 的新特性

### Suspense

react query / swr

```jsx
<Suspense fallback={<Spinner />}>
	<List  />
</Suspense>
```

CLient: Code splitting `React.lazy`  16-17；like Relay

Server: Streaming server rendering 16-18

(Suspense 缓存?)

Suspense on server

在 Suspense  loading 时，server 可以直先加载部分

**Suspense demo**

https://codesandbox.io/s/kind-sammet-j56ro?file=/src/App.js

**New Suspense SSR Architecture in React 18**

https://github.com/reactwg/react-18/discussions/37



### Concurrent features 

Concurrent rendering并发渲染

### Server Components

- 只在服务器渲染

- 0 bundle

![](https://file.wangsijie.top/blog/202112091457531.png)



### React Native

React 18 in React Native

### feature

- Automatic batching 自动批处理，（在异步函数中、原生事件中的） 多个setState 合并为 一次 rerender，可以使用 flushSync 禁止批处理
- new apis

  - startTransition
  - useTransition
  - useDeferredValue() 延迟不怎么要紧的组件
  - useId
  - useSyncExternalStore

### upgrate

1. `add react@beta react-dom@beta`
2. ~~`ReactDOM.render()`~~ `ReactDOM.creaetRoot().render()`



**Upgrade demo**

https://github.com/oldboyxx/jira_clone



### React Developer tooling

- State 会通过map文件解析到命名
- 新增 timeline

### React without memo

react forget

我想这应该是一个编译工具，帮助处理 react memo，避免人工去写大量的 useMemo、useCallback 这样的代码。

思路很棒，但感觉问题会很多，很难很快的 RC



## Part2

主要讲 React 的新文档网站[beta.reactjs.org](https://beta.reactjs.org/)

### The ROI of Designing with React

Figma 的设计思路对应 React 组件开发思路的借鉴。

Component（组件） -> Composition （组合）

https://learnreact.design/



### Interactive playgrounds with React

Mdx 



## Part3

relay、RN 桌面端、机器学习

### Relay

### React Native Desktop

### On-device Machine Learning for React Native



### Part4

### React 18 for External Store Libraries

![](https://file.wangsijie.top/blog/202112121154013.png)

external stores 在 React 18 的 concurrent render 中可能会存在问题，同一个东西在不同组件

查看这个用例https://codesandbox.io/s/mousepositionx-ov7px

使用新的 api `useSyncExternalStore` 来解决

https://codesandbox.io/s/easy-exteral-state-in-react-18-hy3w8







https://github.com/Shopify/hydrogen
