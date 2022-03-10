# react-redux 源码解析

## 使用

现在 redux 都会推荐使用 [redux toolkit](https://github.com/reduxjs/redux-toolkit) 来辅助编写 store 模版代码。我们暂时先抛开这个库（因为它只是简化 store reducer 的创建，本质还是 redux 和 react-redux）。

### 创建 reducer

这里包一个对象上写了，正常应该是分开写的，问题不大。重点是需要

- initialState 初始化状态
- actionTypes 动作触发标识 map
- actions 动作触发器
- reducer 动作触发过程

（个人认为，这些其实都是 redux 定的 flux 范式，需要比较标准的写法。因为麻烦的都在外面写了，所以里面的逻辑就会比较简单）

```js
export const counterSlice = {
  name: 'counter',
  initialState: {
    count: 0,
  },
  actionTypes: {
    INCREASE: 'INCREASE',
  },
  actions: {
    increase: payload => ({
      type: counterSlice.actionTypes.INCREASE,
      payload,
    }),
  },
  reducer: (state = counterSlice.initialState, action = {}) => {
    switch (action.type) {
      case counterSlice.actionTypes.INCREASE:
        return {
          ...state,
          count: state.count + 1,
        }
      default:
        return state
    }
  },
}

export const { increase } = counterSlice.actions

export default counterSlice.reducer
```

### 创建 store

**store/index.js**

```jsx
import { createStore, combineReducers } from 'redux'

import counterReducer from './counterReducer'

const rootReducer = combineReducers({
  counter: counterReducer,
})

const store = createStore(rootReducer, {})

export default store
```

**index.jsx**

这一步是为了将 store 对象放到最顶层 context，所有的子节点都可以拿到 store

```jsx
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './app'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
```

### 页面使用

`useSelector` 获取数据，`useDispatch` 返回 dispatch 方法，触发 actions 动作

```jsx
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increase } from '../store/counter'
import useEventCallback from '../hooks/useEventCallback'

const Counter = () => {
  const counter = useSelector(state => state.counter)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(increase(inputValue))
  }

  // counter.count

  return // ...
}

export default Counter
```

### 吐槽

跟 zustand 形成鲜明的对比，用起来真的太麻烦了，抛开创建 reducer 可以使用 toolkit 辅助不谈，想要触发 action 都要 `dispatch(action())` ，过于麻烦。

## 实现

### redux

redux 库只要是为了创建一个 store，跟 react 无关，我们主要关心两点：

- 一个核心就是观察者，可以用来订阅更新。
- 另外一个是 reducer 可以用 middleware 增强，使用了一个 compose 函数组合 middleware。

### react-redux

***Provider***

其实就是一个顶层的 context Provider，保存了由 redux 创建的 store。

***useDispatch***

其实就是拿了 store 的 dispatch 方法，去触发 action

***useSelector***

这是我们重点关注的 hooks，这里的实现跟 [zustand 的 useStore](./zustand#usestore) 很像（应该说zustand 像 react-redux，毕竟 zustand 是后出的，但是我是先写了 zustand 的源码解析）。

向 store 订阅数据更新，当数据更新后，通过 `const [, forceUpdate] = useReducer((c) => c + 1, 0)` 触发页面的强制更新。

PS：在 react 18，需要使用 `useSyncExternalStore`。
