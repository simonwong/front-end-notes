# MUI 源码学习

[MUI](https://mui.com/)



## Hooks 学习

### useEventCallback

可以用于事件绑定函数的存储

```tsx
/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): (...args: Args) => Return {
  const ref = React.useRef(fn);
  useEffectLayout(() => {
    ref.current = fn;
  });

  return React.useCallback((...args: Args) => (0, ref.current!)(...args), []);
}
```



## 设计思想



mui 的很多的组件设计都是**复合组件模式**，如 Dialog 组件。用非常大的灵活性，但是用起来就感觉不太方便。

```jsx
<Dialog>
  <DialogTitle>Title</DialogTitle>
  <DialogContent>Content</DialogContent>
  <DialogActions>Buttons</DialogActions>
</Dialog>
```

