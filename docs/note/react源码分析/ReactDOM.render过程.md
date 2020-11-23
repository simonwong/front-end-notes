# ReactDOM.render 的过程

## jsx 与虚拟 DOM

就是一个普通的 JavaScript 对象，包含 `tag` 、 `props` 、 `children` 三个属性

```html
<ul id="list">
    <li class="first">aaa</li>
    <li>bbb</li>
</ul>
```

```js
{
    tag: 'ul',
    props: { id: 'list' },
    children: [
        {
            tag: 'li',
            props: { className: 'first' },
            chidren: ['aaa']
        },
        {
            tag: 'li',
            props: {},
            chidren: ['bbb']
        },
    ]
}
```



React 通过 `React.createElement`  ( h 函数 ) 转换。使用 bable 的插件 `@babel/cli` 、 ` @babel/core ` 、`@babel/plugin-transform-react-jsx` 。

h 函数大概长这样

```js
function h(tag, props, ...children) {
  return {
    tag,
    props: props || {},
    children: children.flat()
  }
}
```



虚拟 DOM 的优点，除了 diff 算法，减少真实 dom 的性能消耗，还有一个优点是抽象了渲染过程，实现跨平台能力。



下面是 浏览器环境下的 render 函数实现

```js
function render(vdom) {
  // 如果是字符串或者数字，创建一个文本节点
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  const { tag, props, children } = vdom
  // 创建真实DOM
  const element = document.createElement(tag)
  // 设置属性
  setProps(element, props)
  // 遍历子节点，并获取创建真实DOM，插入到当前节点
  children
    .map(render)
    .forEach(element.appendChild.bind(element))

  // 虚拟 DOM 中缓存真实 DOM 节点
  vdom.dom = element
  
  // 返回 DOM 节点
  return element
}

function setProps (element, props) {
  Object.entries(props).forEach(([key, value]) => {
    setProp(element, key, value)
  })
}

function setProp (element, key, vlaue) {
  element.setAttribute(
    // className使用class代替
    key === 'className' ? 'class' : key,
    vlaue
  )
}
```





## render 流程源码

一些概念：

- Fiber 节点
- Current 树 和 workInProgress 树
- 副作用



render 阶段





```js
function render(element, container, callback) {
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false, // false 表示客户端渲染，true 表示服务端渲染
    callback, // 回调就不看了吧
  );
}
```



```js
// 渲染子树到容器
function legacyRenderSubtreeIntoContainer (parentComponent, children, container) {
  let root = container._reactRootContainer;
  let fiberRoot;
  if (!root) {
    // 初始化挂载节点
    // document.querySelector('#root')._reactRootContainer
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate, // false
    );
    fiberRoot = root._internalRoot;

   	// 最后整个 fiber 树会存在 document.querySelector('#root')._reactRootContainer._internalRoot
      
    // 省略了 callback 处理

    // 首次挂载不分批
    unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent);
    });
  } else {
    fiberRoot = root._internalRoot;

    // 省略了 callback 处理

    // 更新节点
    updateContainer(children, fiberRoot, parentComponent);
  }
  return getPublicRootInstance(fiberRoot);
}
```



```js
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  // 省略了 判断 container 干不干净
  // 省略了 不干净要清除 清除容器节点的子节点

  // React v17 服务端渲染，不能再使用 ReactDOM.render() ， 而是 ReactDOM.hydrate()

  // return createLegacyRoot(
    // container,
     //shouldHydrate ? { hydrate: true } : undefined,
  //);
  // 相当于下面的 return
  // Blocking 是 legacy 到 concurrent 异步化的一个过渡
  return new ReactDOMBlockingRoot(container, LegacyRoot, options);
}
```



```js
function ReactDOMBlockingRoot(container, tag, options) {
  // 省略了亿点点细节
  // createRootImpl => createContainer(container, tag, hydrate, hydrationCallbacks)
  // createContainer => createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks)

  this._internalRoot = createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks)
}
```

**重点来了 **


```js
// 创建 fiber 根节点
function createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks) {
  const root = new FiberRootNode(containerInfo, tag, hydrate);
	
  // 省略了细节
  // createHostRootFiber(tag) => new FiberNode
  const fiber = new FiberNode(tag, pendingProps, key, mode);;
  root.current = fiber;
  fiber.stateNode = root;
  
  // 初始化更新队列
  // initializeUpdateQueue(uninitializedFiber);
  fiber.updateQueue = {
      baseState: fiber.memoizedState, // 这个是之前的存储的状态
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
      },
      effects: null,
  }

  return root;
}
```



**这是一个 fiber 节点**

```js
function FiberNode(tag, pendingProps, key, mode) {
  /* 实例 */
  this.tag = tag;
  // 节点 key，主要用于了优化列表 diff
  this.key = key;
  // 节点类型；FunctionComponent: 0, ClassComponent: 1, HostRoot: 3 ...
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  /* Fiber */
  // 父节点
  this.return = null;
  // 子节点
  this.child = null;
  // 兄弟节点
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 新传入的 props
  this.pendingProps = pendingProps;
  // 之前的 props
  this.memoizedProps = null;
  // 更新队列，用于暂存 setState 的值
  this.updateQueue = null;
  // 之前的 state
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  // 节点更新过期时间，用于时间分片
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;

  // 省略了 feature 内容
  // 省略了 dev 内容
}
```

