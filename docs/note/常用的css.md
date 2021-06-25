# 常用的CSS

##  布局

### 全局使用rem，局部使用em

```css
h2 {
	font-size: 2em;
}
p {
	font-size: 1em;
}
article {
	font-size: 1.25rem;
}
aside .module {
	font-size: .9rem;
}
```

> 注意根节点`html`的`font-size`设置。
>
> 这样每个模块变得分明，更容易维护更灵活。



###  表格的处理-等宽单元格

```css
.calendar {
    table-layout: fixed;
}
```

### 弹性盒外边距-处理列的多余空间

```css
.list {
    display: flex;
    justify-content: space-between;
}
.list .person {
    flex-basis: 23%;
}
```

### 内部比例盒

```css
.container
	height: 0;
	padding-bottom: 20%;
	position: relative;
}
.container div {
	border: 2px dashed #ddd;
	height: 100%;
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
}
```

> 这样父子div会保持 5:1 的比例



### Img 元素在正方形自适应高宽且居中

```css
.wrapper {
    width: 100px;
    height: 100px;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
```





## 技巧

### 继承 `box-sizing`

```css
html {
    box-sizing: border-box;
}
*, *::before, *::after {
    box-sizing: inherit;
}
```

### 重置元素的属性 `unset`

```css
button {
    all: unset;
}
```

> `all`在`IE11`内不支持

### 导航栏的边线 `:not()`

```css
.nav li:not(:last-child) {
    border-right: 1px solid #666;
}
```

### 背景图片的处理

```css
div {
    background-position: center right;
    background-repeat: no-repeat;/* 图片重复 repeat-x,repeat-y */
    background-attachment: fixed;/* 固定背景图片 */
    background-size: cover; /* 规定尺寸 */
}
```

> 在移动端中，`background-attachment： fixed;`会失效。可以这样hack 

```css
.thebox:before {
    content: ' ';
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(path/to/image) center 0 no-repeat;
    background-size: cover;
}
```



### 文本溢出

> 单行文本溢出

```css
.notice{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
```

> 多行文本溢出

```csss
.notice {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2; /* 文本显示行数，需要结合弹性盒子，排列方向两个属性 */
    -webkit-box-orient: vertical;/* 子元素水平或垂直排列 */
    /* word-break: break-all; 超出换行，单词会被截断 */
    /* word-wrap:break-word; 同超出换行，单词不会截断 */
}
```



### 清除浮动

```css
.clearfix:before,
.clearfix:after {
    display: table;
    content: ' ';
}
.clearfix:after {
    clear: both;
}
```

### 垂直居中处理

1. 行高 `line-height`

2. 垂直对其图片。或者table`vertical-align: midel;` 
3. 使用transfrom，居中不定高宽元素 

 ```css
 div {
        postition: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
	 }
 ```

4. 使用flexbox

 ```css
 .parent_div {
        justify-content: center; //子元素水平居中
        align-items: center; // 子元素垂直居中
        display: -webkit-flex;
 }
 ```

### 层击穿

```
pointer-events: none; 可使得层可击穿
pointer-events: auto; 默认
```



### 0.5px 最佳方案

值得之一的是，伪元素的容器，最好不要 `overflow: hidden`， 如果一定要 hidden，且出现了边线丢失的问题，需要适当调整下面的定位位置或者高宽属性。

```css
.border-base() {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  transform: scale(0.5, 0.5);
  transform-origin: 0 0;
  content: '';
  pointer-events: none;
}

.border-bottom-1px {
  position: relative;

  &::after {
    .border-base();

    border-bottom: 1px solid @border-color-base;
  }
}

.border-1px(@radius: 0px) {
  position: relative;

  &::after {
    .border-base();

    border: 1px solid @border-color-base;
    border-radius: @radius;
  }
}
```





##  优化

### 使字体更加清晰
```css
body {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
```

### 为加载失败的图片添加样式

```css
img {
	display: block;
	font-family: Helvetica, Arial, sans-serif;
	font-weight: 300;
	height: auto;
	line-height: 2;
	position: relative;
	text-align: center;
	width: 100%;
}
img::before {
	content: "We're sorry, the image below is broken :(";
	display: block;
	margin-bottom: 10px;
}
img::after {
	content: "(url: " attr(src) ")";
	display: block;
	font-size: 12px;
}
```

### 为了更好的移动端体验，为表单元素使用`font-size`

```css
input[type="text"],
input[type="number"],
select,
textarea {
    font-size: 16px;
}
```



## 兼容

### IOS 的 `input:disabled` 样式

```css
input:disabled {
    -webkit-text-fill-color: @text-color;
    color: @text-color;
    opacity: 1;
}
```



## Sass / Less



### 变量共享的方案

```javascript
// src/styles/variables.js
module.exports = {
  // 主颜色
  'primary-color': '#0C4CFF',
  // 出错颜色
  'error-color': '#F15533',
  // 成功颜色
  'success-color': '#35B34A',
};
```

```javascript
// webpack.config.js
const styleVariables = require('src/styles/variables');

// ...
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?sourceMap&minimize',
          {
            loader: 'sass-loader',
            options: {
              data: Object.keys(styleVariables)
                .map(key => `\$${key}: ${styleVariables[key]};`)
                .join('\n'),
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      }
//...
```



然后就可以在scss文件中，直接引用变量

```
// page.scss
.button {
  background: $primary-color;
}
```

