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

