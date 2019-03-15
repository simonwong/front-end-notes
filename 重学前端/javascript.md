# JavaScript #

## 类型 ##

>Undefined、Null、Boolean、String、Number、Symbol、Object

### undefined、null ###

undefined是一个变量。并非关键字。建议使用void 0类获取undfined值。

null是关键字：“定义了但是为空”



### Boolean ###

`true` `false`



### String ###

字符串的最大长度是2^53-1

字符串是`UTF-16`编码，常用的`chartAt` `charCodeAt` `length`都是针对的UTF-16编码

> 0-65536（U+0000 - U+FFFF）的码点被称为基本字符区域（BMP）

处理非BMP的字符，要小心。如`喆`



### Number ###

有18437736874454810627(即 2^64-2^53+3) 个值

- NaN，占用了9007199254740990
- Infinity，无穷大
- -Infinity，负无穷大

`0.1 + 0.2 == 0.3`的比较方法`Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON`



### Symbol ###

是一切非字符串的对象 key 的集合



### Object ###

是一切有形和无形物体的总称。

是“属性的集合” key-value



基本类型和他们的对象类型：

Number、String、Boolean、Symbol

3 与 `new Number(3)`是完全不同的值。一个是Number类型，一个是对象类型。

前三个构造器是两用的。跟`new`搭配，产生对象，直接调用表示强制类型转换



### 类型转换 ###

![](http://file.wangsijie.top/share/chongxuefe/2019-02-1871bafbd2404dc3ffa5ccf5d0ba077720.jpg)



### StringToNumber ###

`parseInt`建议都穿入第二个参数

`parseFloat`直接吧原字符串作为十进制来解析

Number是比上面俩个更好的选择



### NumberToString ###

基本是符合直觉的十进制转换



### 装箱转换 ###

> 把基本类型转换为对应的对象

`Object(Symbol('a')) //=> Symbol {Symbol(a)}description: "a"__proto__: Symbol[[PrimitiveValue]]: Symbol(a)`



`Object.prototype.toString.call`可以准确识别对象的基本类型。

但是call本身会进行装箱操作，所以要typeof区分是基本类型，还是对象类型

```javascript
typeof 1 // => "Number"
typeof Object(1) // => "Object"

Object.prototype.toString.call(1) // => "[object Number]"
Object.prototype.toString.call(Object(1)) // => "[object Number]"
```



### 拆箱转换 ###

> 把对象类型转换为基本类型
>
> 遵循“先拆箱再转换”



>  拆箱转换会尝试调用`valueOf` `toString`，如果都不存在，或者没有返回基本类型，就会抛出`TypeError`



当做一些类型强制转换时，会进行拆箱转换。会有不同的顺序

```javascript
obj * 2 // => valueOf --> toString --> TypeError
obj + '' // => toString --> valueOf --> TypeError
```



### 规范类型 ###

除了七种语言类型，还有规范类型

- List 和 Record：用于描述函数传参过程
- Set：主要用于结束字符集等
- Completion Record：用于描述异常、跳出等语句执行过程
- Reference：用于描述对象属性访问、delete等
- Lexical Environment 和 Environment Record：用于描述变量和作用域
- Data Block：用于描述二进制数据



## 对象 ##

对象的特点

- 对象具有唯一标识性：具有唯一标识的内存地址
- 对象有状态：同一对象处于不同的状态
- 对象具有行为：对象的状态可能因为他的行为产生变迁



> 对象独有的特色：**对象具有高度的动态性，这是因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力**



## 类与原型 ##

> 基于类的编程语言 C++ 、 Java 等
>
> 基于原型 JavaScript 等

原型系统的“复制操作”思路：

- 新对象持有一个原型的引用：JavaScript
- 切实地复制对象，且无关联



### JavaScript的原型 ###

> 如果所有对象都有私有字段 [[prototype]] ，就是对象的原型
>
> 读取一个属性，如果对象本身没有，就会继续访问对象的原型，知道原型为空或找到



ES6 访问操作原型

- `Object.create` 根据指定的原型创建新对象，原型可以是 null
- `Object.getPrototypeOf` 获得一个对象的原型
- `Object.setPrototypeOf` 设置一个对象的原型



### 早期的原型和类 ###

模拟类

```javascript

function c1(){
    this.p1 = 1;
    this.p2 = function(){
        console.log(this.p1);
    }
} 
var o1 = new c1;
o1.p2();
// 这种方式的p1、p2属性将被暴露在o1中


function c2(){
}
c2.prototype.p1 = 1;
c2.prototype.p2 = function(){
    console.log(this.p1);
}

var o2 = new c2;
o2.p2();
// 这种方式的p1、p2属性不会暴露
```

### ES6中的类 ###



## 对象的分类 ##

- 宿主对象
- 内置对象
  - 固有对象
  - 原生对象
  - 普通对象



### 宿主对象 ###

比如浏览器环境中的宿主。

window上的属性一部分来自 JavaScript 语言，一部分来自浏览器。

又分为固有的和用户创建的。`document.createElement` 可以创建一些 dom 对象。

还会提供一些构造器，比如 `new Image`



### 内置对象·固有对象 ###

由标准规定，随着 JavaScript 运行时创建而自动创建的实例



### 内置对象·原生对象 ###

![](http://file.wangsijie.top/share/chongxuefe/07f7826ffeb895e2e8a59dd186cf7758.png)

> 几乎所有这些构造器的能力都是无法用纯js代码实现的，也无法用 class/extend 继承



### 内置对象·普通对象 ###



### 用对象来模拟函数与构造器：函数对象和构造器对象 ###

> 函数对象：具有 [[call]] 私有字段的对象
>
> 构造器对象：具有 [[construct]] 的对象



## JavaScript 的执行 ##













