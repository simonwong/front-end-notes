# Zustand 源码解析

## 使用

zustand 的使用方式。通过 create 方法创建一个 useStore hook，

```tsx
import create from 'zustand'

type CountState = {
  count: number
  increase: () => void
  decrease: () => void
}

const useStore = create<CountState>(set => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
  decrease: () => set(state => ({ count: state.count - 1 })),
}))

useStore.subscribe(console.log)

const ZustandStore = () => {
  const store = useStore()

  return (
    <div>
      <p>Count: {store.count}</p>
      <button type="button" onClick={() => store.increase()}>
        increase
      </button>
      <button type="button" onClick={() => store.decrease()}>
        decrease
      </button>
    </div>
  )
}
```



## create

create 方法也是非常简单的，直接看下面的伪代码。分为两部，创建 strore，返回一个 hook useStore

```js
const create = (createState) => {
  const api = createStore(createState)
  
  const useStore = () => {
    
  }
  
  Object.assign(useStore, api)
  
  return useStore
}
```

### createStore

`createStore` 里，见 `setState` 方法，主要是为了更新合并数据。

并使用了发布订阅模式，可以让用户订阅数据更新。

```js
const createStore = (createState) => {
  let state
  const listeners = new Set()
  
  // 更新 state
  const setState = (partial, replace) => {
    // partial 也可以是对象， replace 为 true 可以直接替换 state ...
    const nextState = partial(state)
    state = Object.assign({}, state, nextState)
    listeners.forEach((listener) => listener(state, previousState))
  }
  
  const getState = () => state
  
  const subscribe = (listener, selector, equalityFn) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const api = { setState, getState, subscribe, destroy }
  state = createState(setState, getState, api)

  return api
}
```

到这里，我们知道了 zustand 是如何创建状态，更新状态的，但是他是如何让 react 触发更新的呢，我们看看 useStore 这个 hook

### useStore

一句话总结，就是 通过上面的 api.subscribe 订阅数据更新，一旦更新，触发 `forceUpdate`。

一些细节：

- 通过 useReducer 来强制触发页面更新

- 每次更新都要同步更新 ref.current ，因为订阅只会订阅一次，listener 直接拿 ref.current 来获取最新的 selector

- 源码中还会通过 equalityFn 来让用户自己判断要不要更新

- `useIsomorphicLayoutEffect` 是 SSR 使用 effect hook 的同构方案

   `useIsomorphicLayoutEffect = isSSR ? useEffect: useEffectLayout`

```js
const useStore = (selector = api.getState, equalityFn) => {
  const [, forceUpdate] = useReducer((c) => c + 1, 0)
  
  const state = api.getState()
  // 将 state 、 selector 、 equalityFn 都存到了 ref 上
  const stateRef = useRef(state)
  const selectorRef = useRef(selector)
  
  // 这个是存的 selector 的 state
  const currentSliceRef = useRef()
  if (currentSliceRef.current === undefined) {
    currentSliceRef.current = selector(state)
  }
  
  const newStateSlice = selector(state)
  
  useIsomorphicLayoutEffect(() => {
    stateRef.current = state
    // 同步更新上面的各个 ref ...
  })
  
  useIsomorphicLayoutEffect(() => {
    // 订阅状态更新，并触发更新
    const listener = () => {
      const nextState = api.getState()
      const nextStateSlice = selectorRef.current(nextState)
      stateRef.current = nextState
      currentSliceRef.current = nextStateSlice
      forceUpdate()
    }
    const unsubscribe = api.subscribe(listener)
    return unsubscribe
  }, [])
  
  return newStateSlice
}
```



## 总结

zustand 实现非常简单，主要是两个步骤

- createStore 方法创建了一个闭包环境，保存状态，并提供数据订阅
- useStore 订阅数据，并强制触发更新页面