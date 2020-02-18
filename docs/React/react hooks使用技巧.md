# React Hooks 使用技巧

## 依赖

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

