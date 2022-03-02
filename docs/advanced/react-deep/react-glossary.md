# React 词汇表

详见 [Glossary + Explain Like I'm Five](https://github.com/reactwg/react-18/discussions/46)

## Concurrency 并发

**并发意味着任务可以重叠。**

以打电话为例子：

没有并发，意味着一次只能进行一次电话交谈，先跟 Alice 通话，而 Bob 打电话给我必须先结束 Alice 的通话，才能与 Bob 通话。

![](http://file.wangsijie.top/blog/202202081018443.png)

并发，意味着一次可以进行多个对话，我可以先让 Alice 暂停一会儿，跟 Bob 通话后再恢复 Alice 的通话。

![](http://file.wangsijie.top/blog/202202081019915.png)

注意：并发不一定意味着同时跟两个人交谈，而是在打多个电话时，可以选择跟谁交谈。



在 React 中，所有更新都是紧急的，一旦开始重新渲染无法停止。使用 `startTransition` 可以将非紧急状态做标记。

例如给 Alice 做过渡标记（`startTransition`），Bob 的通话是紧急的（`setState`），可以暂停 Alice 的通话。



## Suspense

组件可以在渲染过程中喊暂停：“暂停，我还没准备好，请不要渲染我 —— 这是一个寻呼机，我准备好后会 ping 你”（在源码中唤醒调用叫 "pings" [attachPingListener](https://github.com/facebook/react/blob/0e100ed00fb52cfd107db1d1081ef18fe4b9167f/packages/react-reconciler/src/ReactFiberThrow.new.js#L161-L190)）

React 会向上查找最近的 Suspense，该 Suspense 包含了用户设置好的 `fallback` 直到接受到 ping。



参考：[Analogies for thinking & teaching Suspense?](https://github.com/reactwg/react-18/discussions/28)



## Batching and Automatic batching

批处理就是，连续 3 次调用 setState ，React 会处理成一次渲染。

但是在 18 之前，异步回调、事件回调等中连续调用，React 会重新渲染 3 次（每次调用都立即渲染）。

React 18 现在会自动批量处理，上面这种情况也只会渲染一次。

## Hydration

SSR 允许你将服务器上的组件渲染为HTML 并发送给用户，可以使得用户在加载 JS 时就看到简单的东西（仅仅简单的展示，由于 JS 尚未加载，按钮点击都不会有效。）

当 JS 都加载完成，告诉 React “ App 组件是在服务器上生成的，将事件处理程序附加到该 HTML 上！”。 React 会在内存中渲染你的组件树，但它不会为它生成 DOM 节点，而是会将所有逻辑附加到现有的 HTML 中。

**这个渲染组件和附加处理事件程序的过程称为 "hydration"**

hydration 后页面可以正常交互。



参考 [New Suspense SSR Architecture in React 18 #What Is SSR?](https://github.com/reactwg/react-18/discussions/37)



## Passie effects

有两种 effect

- `useEffect` = "effects"
- `useLayoutEffect` = "layout effects"

一般来讲 passie effects 就是指 `useEffect` ？？？



## Discrete events

"discrete events" 不是在文档中出现的概念。当解释自动批处理时会用到这个。

比如计数器连续点击两次按钮，如果输入 "h" "e" "l" "l" "o" 意味着输入"hello"，每个事件都是用户指定的，这些事件称之为 "discrete"（离散的）。

与 mousemove 事件不同，用户移动鼠标到 10 个坐标上，不是故意指定到某个坐标的，用户不知道执行了多少次 mousemove 事件，这类事件称为 "continuous"（连续的）。



## Promise tick

"promise tick" 是指恢复等待 promise 的函数的时刻。称为 tick 因为它就是一个计时器。

```js
let food = await cook()
eat(food)
```

你的函数不会一次全部执行，每个 await “拆分”你的功能。有一部分在之前运行（`cook()`给你一个承诺），然后你说当食物完成后恢复，其他代码将能够同时执行。最后，当食物准备好时，你会跳回到这个函数，初始化`food`变量，然后吃掉它。

可以想象成等待餐馆老板打电话给我（食物好了）的一个计时器。



## flush sync

`flushSync` 方法允许你告诉 React 立刻刷新屏幕（同步）



## Debouncing & Throttling

防抖节流原理就不都说了，应用到 React 的 state => UI 看看。以用户打字输入，更新屏幕展示为例，你要么等待用户停止输入（防抖），要么每隔一段时间更新（节流）。

React 18中，[startTransition](https://github.com/reactwg/react-18/discussions/41) 使得这两种策略在许多情况下都是不必要的，看看 React的策略。

你和朋友达成一致，你的朋友说完一句话后，您立即开始回复，无需等待。但是，如果朋友想继续说，那可能会打断你，因此你放弃回复，等待下一次再试。（如果过了一定时间，你都没有机会回复，你可以打断他们，防止你一直没机会回复）

![](http://file.wangsijie.top/blog/202202081356461.png)



查看[在线示例](https://react-beta-seven.vercel.app/)





## Server Components









