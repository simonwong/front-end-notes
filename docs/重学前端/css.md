# CSS

## @ 规则

- @charset	提示文件使用的字符编码方式
- @import	引入一个css文件，@charset 规则不会被引入
- @media		媒体查询
- @page		分页媒体访问网页时的表现设置
- @counter-style		产生一种数据，用来定义列表项
- @key-frames		产生一种数据，用来定义动画关键帧
- @fontface	定义字体
- @support	 检查环境，类似 @media
- @namespace	给内部的 css 选择器全部带上特定的命名空间



## 普通规则

- 选择器
- 声明列表
  - 属性
  - 值
    - 值的类型
    - 函数



![](http://file.wangsijie.top/share/chongxuefed/56974c0265982b9ac84b067cd623e00.png)



## 选择器的组合





## 选择器优先级

第一优先级是：无连接符号

第二优先级是："空格"、 "~" 、"+" 、">" 、"||"

第三优先级是：","



## 伪元素

- ::first-line
- ::first-letter
- ::after
- ::before



## CSS 排版

> 正常流：依次排列，排不下了换行



## 贝赛尔曲线

### 模拟抛物线

```html

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Simulation</title>
  <style>
    .ball {
      width:10px;
      height:10px;
      background-color:black;
      border-radius:5px;
      position:absolute;
      left:0;
      top:0;
      transform:translateY(180px);
    }
  </style>
</head>
<body>
  <label> 运动时间：<input value="3.6" type="number" id="t" />s</label><br/>
  <label> 初速度：<input value="-21" type="number" id="vy" /> px/s</label><br/>
  <label> 水平速度：<input value="21" type="number" id="vx" /> px/s</label><br/>
  <label> 重力：<input value="10" type="number" id="g" /> px/s²</label><br/>
  <button onclick="createBall()"> 来一个球 </button>
</body>
</html>
```

```javascript

function generateCubicBezier (v, g, t){
    var a = v / g;
    var b = t + v / g;

    return [[(a / 3 + (a + b) / 3 - a) / (b - a), (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)],
        [(b / 3 + (a + b) / 3 - a) / (b - a), (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)]];
}

function createBall() {
  var ball = document.createElement("div");
  var t = Number(document.getElementById("t").value);
  var vx = Number(document.getElementById("vx").value);
  var vy = Number(document.getElementById("vy").value);
  var g = Number(document.getElementById("g").value);
  ball.className = "ball";
  document.body.appendChild(ball)
  ball.style.transition = `left linear ${t}s, top cubic-bezier(${generateCubicBezier(vy, g, t)}) ${t}s`;
  setTimeout(function(){ 
    ball.style.left = `${vx * t}px`; 
    ball.style.top = `${vy * t + 0.5 * g * t * t}px`; 
  }, 100);
  setTimeout(function(){ document.body.removeChild(ball); }, t * 1000);
}

```



## 颜色的原理

### RGB 颜色

> 它符合光谱三原色理论：红、绿、蓝三种颜色的光可以构成所有的颜色

RGBA

Alpha 通道用于透明度。



### CMYK 颜色

颜料显示颜色的原理是它吸收了所有别的颜色的光，只反射一种颜色，所以颜料三原色其实是红、绿、蓝的补色，也就是：品红、黄、青

> 在印刷行业，使用的就是这样的三原色（品红、黄、青）来调配油墨，这种颜色的表示法叫做 CMYK，它用一个四元组来表示颜色

黑色颜料价格最低，会单独指定黑色，而不是三原色调配黑色。

同一种颜色会有多种表示方案，但是我们参考印刷行业的习惯，会尽量优先使用黑色。



### HSL 颜色

> HSL 这样的颜色模型被设计出来了，它用一个值来表示人类认知中的颜色
>
> 我们用专业的术语叫做色相（H）。加上颜色的纯度（S）和明度（L），就构成了一种颜色的表示。

![](http://file.wangsijie.top/blog/20191219154608.png)