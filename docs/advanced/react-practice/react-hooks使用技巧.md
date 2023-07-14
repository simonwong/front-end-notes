# React Hooks 使用技巧

## 基础 hooks

### 兼容 ssr 的 useEffect

```ts
const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect
```

### useEvent 近似方案

[useEvent RFC](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md)



```ts
import * as React from 'react';
import useEnhancedEffect from './useEnhancedEffect';

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
export default function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): (...args: Args) => Return {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return React.useCallback(
    (...args: Args) =>
      // @ts-expect-error hide `this`
      // tslint:disable-next-line:ban-comma-operator
      (0, ref.current!)(...args),
    [],
  );
}
```



## hooks 优化

### useSyncExternalStore

参考 [useSyncExternalStore - The underrated React API
](https://thisweekinreact.com/articles/useSyncExternalStore-the-underrated-react-api)

`useSyncExternalStore` 本身是用来处理外部的 store 的。但是像 history、也可以认为是一种外部 store 来优化。

```js
function useHistorySelector(selector) {
  const history = useHistory();
  return useSyncExternalStore(history.listen, () =>
    selector(history)
  );
}
```

```jsx
function CurrentPathname() {
  const pathname = useHistorySelector(
    (history) => history.location.pathname
  );
  return <div>{pathname}</div>;
}

function CurrentHash() {
  const hash = useHistorySelector(
    (history) => history.location.hash
  );
  return <div>{hash}</div>;
}
```







## 功能 hooks

### 存储事件回调

```ts
const useEventCallback = <A extends unknown[], R>(
  fn: (...args: A) => R,
): ((...args: A) => R) => {
  const fnRef = useRef(fn)

  useEnhancedEffect(() => {
    fnRef.current = fn
  })

  return useCallback(
    (...args: A) =>
      // @ts-expect-error
      (0, fnRef.current)(...args),
    [],
  )
}
```



### useEffect 依赖公用函数

```jsx
function UserList () {
    const [index, setIndex] = useState(0)
    const fetchData = useCallback(() => {
        featchMetod(index)
    }, [index])
    
    useEffect(() => {
        fetchData()
    }, [fetchData])
    
    function doSomething () {
        fetchData()
    }
    
    return (
    	//...
    )
}
```



### 双击

```jsx
function useDoubleClick () {
  const [ lastClickTime, setClickTime ] = useState(0)

  return (callback) => (e) => {
    const currentTime = e.timeStamp
    const gap = currentTime - lastClickTime
    if (gap > 0 && gap < 300) {
      callback && callback(e)
    }
    setClickTime(currentTime)
  }
}
```



### 接口请求封装

```js
export function useFetch = (config, deps) => {
  const abortController = new AbortController()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState()

  useEffect(() => {
    setLoading(true)
    fetch({
      ...config,
      signal: abortController.signal
    })
      .then((res) => setResult(res))
      .finally(() => setLoading(false))
  }, deps)

  useEffect(() => {
    return () => abortController.abort()
  }, [])

  return { result, loading }
}
```



### URL 数据仓库

```js
export function useQuery() {
  const history = useHistory();
  const { search, pathname } = useLocation();
  // 保存query状态
  const queryState = useRef(qs.parse(search));
  // 设置query
  const setQuery = handler => {
    const nextQuery = handler(queryState.current);
    queryState.current = nextQuery;
    // replace会使组件重新渲染
    history.replace({
      pathname: pathname,
      search: qs.stringify(nextQuery),
    });
  };
  return [queryState.current, setQuery];
}

const [query, setQuery] = useQuery();

// 接口请求依赖 page 和 size
useEffect(() => {
  api.getUsers();
}, [query.page, query, size]);

// 分页改变 触发接口重新请求
const onPageChange = page => {
  setQuery(prevQuery => ({
    ...prevQuery,
    page,
  }));
};
```

