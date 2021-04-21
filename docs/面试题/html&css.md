## CSS

- 对 bfc （块级格式上下文）的理解。

  - 上下两个 div，margin 重叠
  - 清除浮动
  - 阻止被浮动元素覆盖
  - `overflow:hidden`

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

- 如何实现 0.5 px 的线

  

