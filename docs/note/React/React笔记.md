# React笔记

## React工作原理 ##

![](http://file.wangsijie.top/18-6-7/39311438.jpg)



### `UI = f(data)` ###

data就是props和state

Virtual DOM

diff算法
`O(n^2)`的时间复杂度
![](http://file.wangsijie.top/17-12-5/7884015.jpg)

`react`是`O(n)`的时间复杂度
A挂到B，不是移动，而是`unmount` A，然后再B上`mount`


下面这种情况，动态产生子组件，插入一个X，react会认为B被删除，加入了X。会造成浪费。
这个时候需要有一个key的props，来表示插了一个。
key在兄弟节点必须唯一的，稳定的
![](http://file.wangsijie.top/17-12-5/48778188.jpg)

### 一切都是组件 ###



### 声明式编程(Declarative Programming) ###


## jsx优缺点 ##

## 使用props还是state ##

![](http://file.wangsijie.top/17-12-5/98686630.jpg)

## React 生命周期 ##

### mount ###

- getDefaultProps
- getInitialState
- componentWillMount
- render
- componentDidMount

### update ###

如果state change ：
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

如果父组件想要重画子组件 ：
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

### unmount ###

## 为什么纯函数无状态组件 ##

还有一种组件，返回空，但是要处理逻辑

例子： 什么都不画，但是每隔5秒向服务器发送一次请求
```
import React from 'react';

export default class HeartBeat extends React.Component {
  render() {
    return null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      fetch('/api/v1/heartbeat');
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}
```

## 创建高阶组件（HoC，Higher-Order Component) ##

组件类共享

有一些重复的功能，就创建高阶组件

```
const HoC = (WrappedComponent) => {
    class WrappingComponent extends WrappendComponent {
        render() (
            const {user, ...otherProps} = this.props;
            this.props = otherProps;
            return super.render();
        }
    }
    return WrappingComponent;
};
```

```
const HoC = (WrappedComponent, LoginView) => {
    const WrappingComponent = () => {
         const {user} = this.props;  
         if (user) {
            return <WrappedComponent {...this.props} />
         } else {
            return <LoginView {...this.props} />
         }
    };
    return WrappingComponent;
};
```


## 组件通讯 ##

> props传递
> ![](http://file.wangsijie.top/17-12-5/24094491.jpg)

> 通过父级
> ![](http://file.wangsijie.top/17-12-5/27569226.jpg)

> 方法一：全局变量
> 方法二：context，差不多是全局变量
> ![](http://file.wangsijie.top/17-12-5/57846296.jpg)

