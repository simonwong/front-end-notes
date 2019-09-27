# HTML

## HTML语义

> 对于语义标签，“用对”比“不用”好，“不用”比“用错”好



ruby使用场景

```
      Teleport
不要用「空间移动」突然出现啊
```



- `ruby`、`rt`、`rp`

- `em`表示一句话的重音，必要程度。不用于`strong`
- `hgroup`标题结构，里面`h1`~`h6`
- 整体结构

```
<body>
    <header>
        <nav>
            ……
        </nav>
    </header>
    <aside>
        <nav>
            ……
        </nav>
    </aside>
    <section>……</section>
    <section>……</section>
    <section>……</section>
    <footer>
        <address>……</address>
    </footer>
</body>
```

```
<body>
    <header>……</header>
    <article>
        <header>……</header>
        <section>……</section>
        <section>……</section>
        <section>……</section>
        <footer>……</footer>
    </article>
    <article>
        ……
    </article>
    <article>
        ……
    </article>
    <footer>
        <address></address>
    </footer>
</body>
```



![](http://file.wangsijie.top/share/chongxuefe/2019-02-189684130e423b6734b23652f4f0b6359e.jpg)



## head 标签



- title

  文档的标题，可能会被用在浏览器收藏夹、推送啥的



- base

  给页面的url提供一个基础，历史遗留标签，危险



- meta

  是一组键值对。是一种通用的元信息表示标签

  ```html
  <meta name=application-name content="lsForums">
  ```

  name 是元信息的名， content 是元信息的值



  - charset 属性的 meta

    ```html
    <meta charset="UTF-8">
    ```

    描述了 HTML 文档自身的编码形式

  - http-quiv 属性的 meta

    表示执行了一个命令，就不需要 name 属性了

    ```html
    <meta http-equiv="content-type" content="text/xml; charset=UTF-8">
    ```

    - Content-type 指定了 http 编码方式
    - content-language 指定内容的语言
    - default-style 指定默认样式表
    - refresh 刷新
    - set-cookie 模拟 http 头 set-cookie，设置 cookie
    - x-ua-compatible 模拟 http 头 x-ua-compatible，声明 ua 兼容性
    - Content-security-policy 模拟 http 头 content-security-policy， 声明内容安全策略

  - name 为 viewport 的 meta

    ```html
    <meta name="viewport" content="width=500, initial-scale=1">
    ```

    - width：页面宽度
    - height：页面高度
    - initial-scale：初始缩放比例
    - minimum-scale：最小缩放比例
    - maximun-scale：最大缩放比例
    - user-scalable：是否允许用户缩放

  -  其他预定义的 meta

    - application-name：如果网页是 Web application，用这个标签表示应用名称
    - author：页面作者
    - description：页面描述，SEO等
    - generator：生成页面的所使用的工具，主要用于可视化编辑器
    - keywords：页面关键字，SEO
    - referrer：跳转策略
    - theme-color：页面风格颜色



## 浏览器 DOM



DOM API

- 节点
- 事件
- Range
- 遍历



### 节点

![](http://file.wangsijie.top/share/chongxuefe/6e278e450d8cc7122da3616fd18b9cf6.png)



#### DOM 树关系

- parentNode
- ChildNodes
- firstChild
- lastChild
- nextSibling
- previousSibling



#### 操作 DOM API

- appendChild
- insertBefore
- removeChild
- replaceChild



#### 创建 DOM API

- createElement
- createTextNode
- 。。。



#### 属性操作 API

- getAttribute
- setAttribute
- removeAttribute
- hasAttribute



#### 查找元素

- querySelector
- querySelectorAll
- getElementById
- getElementsByName
- getElementsByTagName
- getElementsByClassName



### 遍历

- NodeIterator
- TreeWalker



### Range

Range API 是一个比较专业的领域，用来做富文本编辑器



## HTML 链接



![](http://file.wangsijie.top/share/chongxuefe/caab7832c425b3af2b3adae747e6f551.png)



























