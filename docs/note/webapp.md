# webapp #



## 样式 ##



### 使用无衬字体 ###

```css
body {
    font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
}
```



### 基础交互 ###

```css
a, img {
    -webkit-touch-callout: none; /*禁止长安链接与图片弹出菜单*/
}
html, body {
    -webkit-user-select: none; /*禁止选中文本*/
    user-select: none;
}
```



### 常用 ###

HTML设置

```css
html {
　　-webkit-text-size-adjust: 100%; /*禁止文本缩放*/
　　-webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*取消touch高亮效果，部分机型仍有高亮效果，讲a标签换成替他标签，模拟跳转*/
}
```

去除 iphone 上的圆角

```css
input, textarea, button {
    -webkit-appearance: none;   /* 去处默认圆角样式 */
}
```

自定义滚动框中，增加弹性滚动

```css
div {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
```







## meta 标签 ##

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
/*最大缩放比例是1.0，禁止缩放*/
<meta name="format-detection" content="telephone=no,email=no"/>
/*忽略识别为电话号码，邮箱*/
<meta name="apple-touch-fullscreen" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
/*全屏模式浏览*/
<meta content="black" name="apple-mobile-web-app-status-bar-style" /> /*在web app应用下状态条（屏幕顶部条）的颜色。默认值为default（白色），可以定为black（黑色）和black-translucent（灰色半透明,覆盖状态栏）*/
<meta http-equiv="Cache-Control" content="no-siteapp" />
/*百度禁止转码*/
<link rel="apple-touch-icon-precomposed" href="iphone_milanoo.png" />
/*这个link是设置web app的放置主屏幕上icon文件路径*/
```





## 性能 ##

- 所有图片压缩转为80%质量的图片、雪碧图
- 初始化请求资源数<4
- 使用CSS3代替js动画
- 少使用高级选择器



## 移动端适配 ##



### vw ###

> [如何在vue项目项目中使用 vw 实现移动端适配](<https://www.w3cplus.com/mobile/vw-layout-in-vue.html>)
>
> 阅读码 944321

### 手淘方案 ###

[使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)



### rem + vw ###

```css
html {
    font-size: 15.625vw;
}
.div {
    width: 0.28rem; /*如果在iphone5上(宽度320)，结果为14px*/
}
```

