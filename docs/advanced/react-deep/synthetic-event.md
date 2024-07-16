

# React 合成事件

## 原生事件

了解合成事件前先复习下原生事件的处理，一个事件（如 click）会经历**捕获阶段**和**冒泡阶段**，

**捕获阶段**将会从 html 节点开始一直找到 target 节点，每碰到注册到捕获阶段（useCapture = true）的 click 事件就会执行。

**冒泡阶段**，会从 target 往回找，一直到 html 节点，每碰到注册到冒泡阶段（默认，useCapture = false）的 click 事件处理就会执行。

再看一个**事件委托**，利用捕获冒泡，可以让子节点的事件委托给父节点执行。

```html
<html>
	<ul id="menu">
    <li data-action="save">save</li>
    <li data-action="load">load</li>
    <li data-action="search">search</li>
  </ul>
  <script>
  	const menu = doucment.querySelector('#menu')
    const actionMap = {
      save: () => {},
      load: () => {},
      search: () => {},
    }
    menu.click = (e) => {
      const action = e.target.dataset.action
      actionMap[action]()
    }
  </script>
</html>
```



## 合成事件

在 React 中，事件回调的 `e` 是一个根据 W3C 规范定义的合成事件，

使用 `onClick` 注册冒泡阶段事件，使用 `onClickCapture` 注册捕获阶段事件。



### 事件执行顺序

React 和原生事件互用的执行顺序（不推荐这么使用，会非常乱）

捕获阶段：合成事件 -> 原生事件 ->

冒泡阶段：原生事件 -> 合成事件



为什么合成时间捕获先执行，冒泡后执行？**因为 React 的事件都是委托给 root 节点（以前是 html 节点）执行的。**

![](https://file.wangsijie.top/blog/202203011719336.png)

## 事件机制

事件机制有这些个步骤：

- **事件注册**

- **事件绑定**
- **事件触发**
  - **生成合成事件**
  - **收集事件响应链路**
  - **触发事件回调**



### 事件注册

React 将要注册时事件分为几个入口 `SimpleEventPlugin`、`EnterLeaveEventPlugin`、`ChangeEventPlugin`、`SelectEventPlugin`、`BeforeInputEventPlugin`

统一都暴露了 `registerEvents` 方法，最后将事件都注入到 `allNativeEvents` 集合中

### 事件绑定

在 `ReactDOM.render `或` ReactDOM.createRoot` 中，创建了根节点后，做事件绑定

**入口**为：`listenToAllSupportedEvents(rootContainerElement)`

会根据事件的优先级创建不用的事件。在 React 的事件中，分为三种事件优先级：**[离散事件、连续事件](./react-glossary.md#discrete-events)**、其他事件（默认）。

**优先级作用**：会在事件回调中设置本次更新的优先级。

**对于不冒泡的事件**：直接绑定到元素本身，比如 dialog 的 close 事件，iframe、img 的 load 事件。

### 事件触发

入口在 `dispatchEvent`，在事件回调中，执行 `dispatchEventsForPlugins`。

关注 3 个东西，*dispatchQueue* 、*extractEvents* 、*processDispatchQueue* 

*dispatchQueue* 是一个 `{syntheticEvent, listeners}[]` 这样的结构，通过*extractEvents*收集，通过

*processDispatchQueue* 触发。



#### 生成合成事件并收集事件响应链路

*extractEvents* **用来收集事件的响应链路，并生成对应的合成事件对象**

首先根据不同类型的合成事件，使用工厂方法 `createSyntheticEvent()` 创建 syntheticEvent。

> 合成事件由事件插件调度，通常是为了响应顶级事件委派处理程序。
>
> 这些系统通常应该使用池来减少垃圾收集的频率。系统应检查 `isPersistent`，以确定事件在调度后是否应释放到池中。需要持久化事件的用户应调用 `persist`
>
> 合成事件（和子类）通过规范化浏览器的怪癖来实现 DOM Level 3 events API。子类不一定要实现DOM接口；自定义特定于应用程序的事件也可以将其子类化。

然后使用 `accumulateEventHandleNonManagedNodeListeners` 或 `accumulateSinglePhaseListeners` 方法，

从下往上（`instance = instance.return`）找 listener 回调函数，形成一条链路 listeners。



最后将 syntheticEvent 和 listeners 组成一个对象并添加到 *dispatchQueue* 上。



#### 处理事件队列

*processDispatchQueue* **处理事件队列**，遍历队列，

我们从上面已经收到了某个合成事件的 listener 链路，是这样的 `[child, farther, grandfarther]`。

捕获阶段，从后往前 grandfather -> child 执行；

冒泡阶段，从前往后 child -> grandfather 执行；



## 总结

- 合成事件是原生事件的夸浏览器包装器，来兼容各种浏览器。
- 事件都委托给了根节点，并模拟原生的事件捕获和冒泡。
- 不会冒泡的事件会直接在对应节点上绑定。
