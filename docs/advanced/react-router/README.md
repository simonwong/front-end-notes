# react-router v6 源码解析

## 概要



react-router 依赖 history，了解 history 请看 [history 源码解析](./history.md)

## 使用

### 路由结构

Router > Routes > Route

```jsx
import { Routes , Route , Outlet, BrowserRouter } from 'react-router-dom'

const About = React.lazy(() => import("./pages/About"));

const App = () => (
  <BrowserRouter>
    <h3>Menu</h3>
    <Routes>
      <Route element={<Home />} path="/home" />
      <Route
        element={
        	<React.Suspense fallback={<span>Loading...</span>}>
          	<About />
        	</React.Suspense>
        }
        path="/about"
      />
      <Route element={<Multi />} path="/multi">
				<Route element={<PartOne />} path="/multi/p1" />
        <Route element={<PartTwo />} path="/multi/p2" />
      </Route>
    </Routes>
  </BrowserRouter>
)

const Multi = () => (
	<div>
  	<h3>Multi </h3>
    <Outlet />
  </div>
)
```

### Hooks

`useNavigate()` 路由跳转方法

`useLocation()` 获取当前路由数据

`useParams()` 获取动态路由的参数

`useSearchParams()` 获取 URLSearchParams 对象

## Router（BrowserRouter）

路由组件之间通过 context 通信，而通信的源头 `Provider` 就是 `Router`。以 `BrowserRouter` 为例。

通过监听 history ，路由改变后触发 setState。

`Router` 组件提供了 Navigation 和 Location 的 Context provider，是所有 Routes、hooks 的数据来源。

```jsx
import { createBrowserHistory } from 'history'

function BrowserRouter() {
  let historyRef = React.useRef()
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window })
  }

  let history = historyRef.current
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  })

  React.useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router {/** props... */} />
  )
}

function Router () {
  // 组装 navigation 对象
  // 组装 location 对象
  return (
    <NavigationContext.Provider value={navigation}>
      <LocationContext.Provider children={children} value={{ location, navigationType }} />
    </NavigationContext.Provider>
  )
}
```



## Routes（useRoutes）

### useRoutes

再说 Routes 之前，再了解一种创建路由结构的方式，那就是 `useRoutes`。直接传入这样的路由结构就可以啦，非常直观方便。

```jsx
const routes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/multi",
    element: <Multi />,
    children: [
      { index: true, element: <MultiMain /> },
      { path: "/multi/p1", element: <MultiP1 /> },
      { path: "/multi/p2", element: <MultiP2 /> },
    ],
  },
  { path: "*", element: <NoMatch /> }
]
const App = () => {
  let element = useRoutes(routes)

  return (
    element
  )
}
```

#### Routes

在 `Routes` 组件内部，实际上就是用的 `useRoutes`。通过 `createRoutesFromChildren` 方法收集 children 上的 props 组成类似于上面这样的结构的。

```jsx
function Routes({ children, location }) {
  return useRoutes(createRoutesFromChildren(children), location);
}
```

`createRoutesFromChildren` 就是递归的调用，并收集 props ，没啥好看的，主要看 useRoutes

```jsx
function useRoutes() {
  // ...
  const matches = matcheRoutes() 
  // ...
  return _renderMatches(matches)
}
```

#### matchRoutes

`matchRoutes` 是做了扁平化 routes，返回路由层级比如 / => /multi => /p1

#### _renderMatches

这块代码值得好好品，matches 从右往左的嵌套 outlet，最终形成有层级的路由布局。

`Outlet` 组件将会通过消费者拿到 outlet ，并渲染。

```jsx
function _renderMatches(matches, parentMatches = []) {
  if (matches == null) return null

  return matches.reduceRight((outlet, match, index) => {
    return (
      <RouteContext.Provider
        children={match.route.element !== undefined ? match.route.element : <Outlet />}
        value={{
          outlet,
          matches: parentMatches.concat(matches.slice(0, index + 1)),
        }}
      />
    )
  }, null)
}
```



### Route

从来上面看出来 Route 都没有被使用过，

实际上 Route 就是一个空壳组件，存在的目的是为了开发者编写嵌套的路由结构， `Routes`通过  children 属性收集数据用的。