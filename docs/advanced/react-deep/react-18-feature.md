# React 18 的新特性

## 自动批处理

### 什么是批处理

**批处理是将多个状态更新分组到一个重新渲染中以获得更好的性能。**

在 React 17 版本中，何时做批处理是不一致的。

如下代码，每次点击，虽然 set 了两个状态，但是只会触发一次 rerender。

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount(c => c + 1); // 还没有重新渲染
    setFlag(f => !f); // 还没有重新渲染
    // React 将只会重新渲染一次（这是批处理）
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
```

但是下面这种情况，不会批处理。Promise、setTimeout、原生事件或其他事件内部的更新都不会触发批处理。

```jsx
function handleClick() {
  fetchSomething().then(() => {
    // React 17 和更早版本不会批处理这些，因为它们在回调事件之后运行，而不是在回调期间运行
    setCount(c => c + 1); // 导致重新渲染
    setFlag(f => !f); // 导致重新渲染
  });
}
```

PS: 可以通过 `ReactDOM.unstable_batchedUpdates` 这个方法来实现批处理。该方法在 18 中仍会保留。

### 什么是自动批处理

在 React 18 中，使用 `createRoot` ，所有的更新都会自动批处理。无论是在 setTimeout 还是哪里都会保持一致的行为。

### 如果不想批处理

使用 `ReactDOM.flushSync()` 退出批处理。

```jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1);
  });
  // React 已经更新了 DOM
  flushSync(() => {
    setFlag(f => !f);
  });
  // React 已经更新了 DOM
}
```



详见 [Automatic batching for fewer renders in React 18](https://github.com/reactwg/react-18/discussions/21)



## startTransition

让您在昂贵的状态转换期间保持UI的响应性

[New feature: startTransition](https://github.com/reactwg/react-18/discussions/41)

## useDeferredValue

允许您延迟更新屏幕中不太重要的部分

## Suspense SSR

详见 [New Suspense SSR Architecture in React 18](https://github.com/reactwg/react-18/discussions/37)

