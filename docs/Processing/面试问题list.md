# Question List



## CSS

- 对 bfc （块级格式上下文）的理解。
    - 上下两个 div 。margin 重叠
    - 清除浮动
    - 阻止被浮动元素覆盖

- 实现，正方形在页面中自适应展示，一行只展示三个，多了自动换行

    ```css
    .outter {
        display: flex;
        flex-wrap: wrap;
    }
    .inner {
        flex: 0 0 33%;
        padding-bottom: 33%;
    }
    ```

    

## JS

- 闭包
    - 绑定了执行环境的一个函数
- promise 取消
- async await
- setTimeout 、setInterval 计时不准
    - 递归执行 setTimeout ，每个下一次的 setTimeout 执行时机应该通过 当前时间不断修正，来达到尽量的精准性。
- 防抖、节流
- 深拷贝的实现
    - `JSON.stringify()` 有什么缺点(引用类型、函数、循环引用、undefined)
- 对于类而言，箭头函数和类普通函数、constructor 里 bind 的函数有什么区别
    - class 会把用 = 号声明的方法、变量作为实例的属性
    - 非 = 号声明的，则是放在原型链上。

## 浏览器

- 跨域方案
    - JSONP（只能 get）
    - 跨域资源共享 （CORS `Access-Control-Allow-Origin`。如果需要带 cookie 前后端都要设置
    - nginx 反向代理接口跨域
    - Postmessage 
    - Domain
    
- 跨域，为什么会有 options 请求
    - 预检请求，获知服务器是否允许跨域
    - 简单请求：get、post、head。仅仅包含 `accept`、`content-language` 等，`content-type` 只限三个值
    - 复杂请求：put、delete 。不仅包含上述头信息，`content-type='application/json'` 等超出限制
    
- 如何避免 options 请求
  
  - 服务端带上 Access-Control-Max-Age 来缓存 options 请求
  
- 后端响应头部设置 `Access-Control-Max-Age` 缓存起来
  
- 事件循环

    - 微任务优先宏任务执行

    - 宏任务：script、setTimeout、setInterval 由宿主发起的

        微任务：Promise、process.nextTick 由 JS 引擎发起的

    - JavaScript 引擎等待宿主环境分配宏观任务，通常等待的行为都是一个事件循环

    - 每次执行过程，其实就是一个宏观任务，所以**宏观任务的列队**就相当于事件循环

    - 每个宏观任务又包含一个微观任务列队

    

- 缓存
    - 强缓存：优先级 `Expires` http1.0  <  `Cache-control` http1.1
    - 协商缓存：`Last-Modified` 本地文件最后修改日期 < `ETag` 文件指纹
    - 策略：
        - 不需要缓存：`Cache-control: no-store`
        - 频繁变动资源：`Cache-control: no-store` 配合 `ETag` 。资源被缓存，但是每次都会发送请求询问是否更新
        - 使用 `Cache-Control: max-age=31536000` 配合策略缓存使用，然后对文件进行指纹处理。一旦变动立即下载。

- 浏览器解析过程
  
    - 解析 html dom 树 =>  解析 css dom 树 => 合成 render 树 => 布局render树 => 绘制render树
    
- 回流重绘？怎么优化？



- Fetch 和 ajax 有什么区别
    - 

## 网络协议

- http 、https 区别
    - https 在 TLS 协议进行了加密。使用对称加密和非对称加密。
    - TLS 握手阶段使用非对称加密，正式传输两端使用对称加密。

## React

- 为什么文件顶部必须要 import React 呢
    - 因为 `React.createElement`

- react 组件之间有哪些通信方式
- setState 什么时候同步什么时候异步

    - 由 React 引发事件处理函数（合成事件、钩子函数等），会调用 bathedUpdated ，isBatchingUpdateds -> true 异步

    - 默认 false ，同步，在 setTimeout 、原生事件中

- React 事件处理和原生的事件处理有什么区别

    - React 并不是直接把事件绑定在元素上，而是在 document 上监听，当事件冒泡到 document 上，react 会把事件封装并交给处理函数处理。
    - 如果使用原生事件绑定，原生会先执行。
    - 如果原生阻止冒泡，React 的就不会执行

- react hooks
    - useEffect 闭包陷阱。
        - 函数式组件每次渲染都会重新执行，从而产生一个闭包环境
        - useEffect 重复调用了已经改变的 state ，但都是之前的值。（设置 依赖）
- Diff 算法



### router

- Hash 模式和 history 模式区别
    - History 模式的坑





### redux

- dispatch 做了什么



### 优化

- React 项目有哪些可以优化的点，实际项目中你是怎么处理的



## Vue

- 双向绑定的原理
    - definedProperty



## 库的实现

- antd Modal 弹窗



## 其他

- 前端项目部署
    - docker、jenkins