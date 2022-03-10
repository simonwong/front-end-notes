# React Hooks 使用技巧

## 常用 hooks

### 兼容 ssr 的 useEffect

```ts
const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect
```

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

