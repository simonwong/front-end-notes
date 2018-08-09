

# js语言精粹笔记 #

---

## 语法 ##

### 语句 ###

- for in 遍历对象属性

```js
for (item in obj) {
    if (obj.hasOwnProperty(item)) {
        //...
    }
}
```

---

## 对象 ##

### 更新 ###

```js
stooge.name = 'Jerome';
// 如果已经存在，替换
// 没有就扩充到对象中
```

### 引用 ###

> 对象通过引用来传递。他们永远不会复制


```js
var x = stooge;
x.name = 'Curly';
var nick = stooge.name; // 'Curly'
// x 和 stooge 指向同一个对象的引用

var a = {}, b = {}, c = {};
// 引用不同的空对象
var a = b = c = {};
// 引用同一个空对象
```

### 原型 ###

> 所有对象字面量创建的对象都连接到`Object.prototype`

创建一个使用原对象使用其原型的新对象

```js
if (typeof Object.beget !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}
var another_stooge = Object.create(stooge);
```
### 反射 ###

> 原型链中的任何属性都会有产生值

```js
typeof flight.toString // 'function'
typeof flight.constructor // 'function'
```

### 枚举 ###

```js
var name;
for (name in another_stooge) {
    if (typeof another_stooge[name] !== 'function') {
        // ...
    }
}
```
### 删除 ###

delete运算符可以来删除对象的属性。不会触及原型链中的任何对象

### 减少全局变量 ###

最小化使用全局变量，只创建一个唯一的全局变量

```js
var MYAPP = {};
MYAPP.stoog = {
    // ...
}
```

---

## 函数 ##

### 调用模式及this指向 ###

- 方法调用模式

```js
var myObject = {
    value: 0,
    increment: function () {
        console.log(this.value); // 0
    }
}
```

- 函数调用模式

> 以这种模式调用函数，this绑定到全局对象

```js
var sum = add(3, 4);
```

解决方法:增加一个方法，并给this赋值

```js
myObject.double = function () {
    var that = this; // 赋值

    var helper = function () {
        that.value = add(that.value, that.value);
    };

    helper(); // 以函数形式调用
};
myObject.double(); // 以方法的现实调用
```

- 构造器调用模式

> 如果在一个函数前带上new调用，背地里会创建一个连接到该函数的prototype成员的新对象，同时this会绑定到新对象上

```js
// 创建构造器函数式。一个带有status属性的对象
var Quo = function (string) {
    this.status = string;
};
// 给Quo的所有实例提供公用方法
Quo.prototype.get_status = function () {
    return this.status;
}
// 构造一个Quo实例
var myQuo = new Quo("confused");
console.log(myQuo.get_status()); // "confused"
```

- Apply调用模式

> apply方法让我们构建一个参数数组传递给调用函数。
> 参数1：绑定给this的值。参数2：参数数组

### 参数 ###

> arguments数组。拥有length属性，但没有数组方法

### 返回 ###

> 一个函数总是会返回一个值。如果没有指定返回值，则返回undefined
> 如果加了new,则返回this(该新对象)

### 作用域 ###

```js
var foo = function () {
    var a = 3, b = 5;

    var bar = function () {
        var b = 7, c = 11;
        // a:3, b:7, c: 11
        a += b + c
        // a:21, b:7, c: 11
    };
    // a: 3, b:5, c未定义
    bar();
    // a:21, b:5
}
```
### 闭包 ###

```js
// 糟糕的例子。再循环中创建函数
var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1)  {
        nodes[i].onlick = function (e) {
            alert(i);
        };
    }
}
```

```js
// 改良后
var add_the_handlers = function (nodes) {
    var helper = function (i) {
        return function (e) {
            alert(i);
        };
    };
    var i;
    for (i = 0; i < nodes.length; i++) {
        nodes[i].onclick = helper(i);
    }
}
```

### 回调 ###

### 模块 ###

### 级联 ###

> 如果我们让这些方法返回this而不是undefined，就可以启动级联

### 记忆 ###

```js
var memoizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = formula (recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};

// fibonacci函数
var fibonacci = memoizer([0, 1], function (recur, n) {
    return recur(n - 1) + recur(n - 2);
});
// 阶乘
var factorial = memoizer([1, 1], function (recur, n) {
    return n * recur(n - 1);
});
```

---

## 继承 ##

### 伪类 ###

```js
// 1.定义构造器并扩充原型
var Mammal = function (name) {
    this.name = name;
};
Mammal.prototype.get_name = function () {
    return this.name;
};
Mammal.prototype.says = function () {
    return this.saying || '';
};
// 2.构造一个实例
var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name();
console.log(name);
// 构造一个伪类继承Mammal
var Cat = function (name) {
    this.name = name;
    this.saying = 'meow';
};
// 替换Cat.prototype为一个新的Mammal实例
Cat.prototype = new Mammal();
// 扩充
Cat.prototype.purr = function (n) {
    var i, s = '';
    for (var i = 0; i < n; i++) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
Cat.prototype.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henrietta');

console.log(myCat.says());
console.log(myCat.purr(5));
console.log(myCat.get_name());
```

```js
Function.method('inherits', function (Parent) {
    this.prototype = new Parent ();
    return this;
})
```

### 原型 ###

> 用对象字面量构建对象
> 这是一种“差异化继承”

```js
var myMammal = {
    name: 'Herb the Mammal',
    get_name: function () {
        return this.name;
    },
    says: function () {
        return this.saying || '';
    }
};

if (typeof Object.beget !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    }
}
var myCat = Object.create(myMammal);
// var Cat = function () {};
// Cat.prototype = myMammal;
// var myCat = new Cat();

myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
    var i, s = '';
    for (var i = 0; i < n; i++) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
};
console.log(myCat.says());
console.log(myCat.purr(5));
console.log(myCat.get_name());
```

### 函数化 ###

```js
var constructor = function (spec, my) {
    var that,其他私有变量;
    my = my || {};

    把共享的变量和函数添加到my中

    that = 一个新对象

    添加给that的特权方法

    return that;
}
```

### 部件 ###

```js
var eventuality = function (that) {
    var registry = {};

    that.fire = function (event) {
        var array,
            func,
            handler,
            i,
            type = typeof event === 'string' ? event : event.type;

        if (registry.hasOwnProperty(type)) {
            array = registry[type];
            for (i = 0; i < array.length; i++) {
                handler = array[i];

                func = handler.method;
                if (typeof func === 'string') {
                    func = this[func]
                }

                func.apply(this, handler.parameters || [event]);
            }
        }
        return this;
    };

    that.on = function (type, method, parameters) {
        var handler = {
            method: method,
            parameters: parameters
        };
        if (registry.hasOwnProperty(type)) {
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    };
    return that;
};
```

---

## 数组 ##

### 判断数组 ###

> js对于数组和对象的区别是混乱的。typeof运算符报告数组的类型是'object'

```js
// 判断数组
var is_array = function (value) {
    return Object.prototype.toString.apply(value) === '[Object Array]';
};
```

---

## 正则表达式 ##

### 例子--匹配URL ###

```js
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var url = "http://www.ora.com:80/goodparts?q#fragment";
var result = parse_url.exec(url);

var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
var blanks = ' ';
var i;

for (i = 0; i < names.length; i++) {
    console.log(names[i] + ':' + blanks.substring(names[i].length), result[i]);
}
```

### 结构 ###

| 标志 | 含义               |
| ---- | ------------------ |
| g    | 全局的（匹配多次） |
| i    | 忽略大小写         |
| m    | 多行               |

| 标识     | 含义                                     |
| -------- | ---------------------------------------- |
| \d       | 数字0-9                                  |
| \D       | 非\d                                     |
| \w       | 数字0-9/a=z/A-z/下划线                   |
| \W       | 非\w                                     |
| \s       | 空格符，tab，换页，换行                  |
| \S       | 非\s                                     |
|          |                                          |
| [...]    | 字符范围[a-zA-Z]                         |
| ...      | 除...外的                                |
| ^...\$   | ^首......尾$                             |
| (...)    | 捕获型分组。任何匹配这个分组的都会被捕获 |
| (?:...)  | 非捕获型分组。这个分组是可选的           |
| (...)?   | ? 标识匹配0次或1次                       |
|          |                                          |
| x*       | 贪恋。匹配>=0次                          |
| x+       | 贪婪。匹配>0次                           |
| x\{n\}   | 重复n次                                  |
| x\{n,\}  | 重复>=n次                                |
| x\{n,m\} | 重复n到m次                               |



---

## 方法 ##

### Array ###

- array.**concat**(item)
  浅复制

- array.**join**(separator)
  字符串拼接

- array.**pop**()
  移除最后一个元素；改

- array.**push**(item)
  后面添加；改

- array.**shift**()
  移除第一个元素；改

- array.**unshift**(item)
  前面添加；改

- array.**splice**(start, deleteCount, item...)
  移除1个或多个元素，新的item替换。
  start为index，deleteCount个数，

- array.**slice**(start, end)
  浅复制，start为index，0起数，end为1起数

- array.**reverse**()
  反转顺序；改

- array.**sort**(comparefn)
  排序
  相等返回0，负数，a排前面，正数b排前面

```js
n.sort(function (a, b) {
    return a - b; // 正序
})
```

### Function ###

- func.**apply**(this.Arg, argArray)
  调用function，传一个被绑定到this上的对象，和一个可选数组

### Number ###

- num.**toString**(radix)
  转换为字符串。radix可选，控制进制数

- num.**toExponential**(fractionDigis)
  转换为指数形式的字符串。fractionDigis可选，控制小数点后位数必须0-20

- num.**toFixed**(fractionDigits)
  转为十进制数形式的字符串

- num.**toPrecision**(precision)
  转为十进制数形式的字符串.precision可选。控制精度。必须0-21

### Object ###

- obj.**hasOwnProperty**(name)
  判断是否包含name属性，不检查原型链

### RegExp ###

- regexp.**exec**(string)

> 最强大（和最慢）
> 如果成功匹配返回数组

- regexp.**test**(string)

> 最简单（和最快）
> 匹配返回true
> 不要对这个方法使用g标识

### String ###

- str.**charAt**(pos)
  返回pos位置的字符

- str.**charCodeAt**(pos)
  返回pos位置的字符的字符码位

- str.**indexOf**(searchString, position)
  str中找searchString，返回位置 || -1
  position可选，指定位置查找
  倒着查
  str.lastIndexOf(searchString, position)

- str.**localeCompare**(that)
  比较字符串，相等返回0

- str.**match**(regexp)
  和一个正则匹配
  如果有g，那么生成一个包含所有（除捕获分组之外）的数组
  没有，那就跟`regexp.exec(str)`一样

- str.**replace**(searchValue, replaceVaule)
  查找替换，返回新字符串
    - searchValue是字符串，那么只替换第一次出现的地方
      如果是正则并带有g，那么全部替换。
    - replaceVaule是字符串，\$特别含义
      $$ （替换$
      $& （整个匹配文本
      $` （匹配之前的文本
      $' （匹配之后的文本
      replaceVaule如果是函数，每次匹配到都会被调用，返回的字符串会用作替换文本

- str.**search**(regexp)
  只接受正则，忽略g。返回首字符位置 || -1

- str.**slice**(start, end)
  返回对应位置的字符串
  substring跟slice一样，但不能用负数，用slice代替使用它

- str.**split**(separator, limit)
  分隔字符串

- str.**toLowerCase**()
  转为小写

- str.**toUpperCase**()
  转为大写

- str.**fromCharCode**(shar...)
  根据数字编码返回一个字符串

## 毒瘤 ##

- 全局变量

- 作用域

> 最好的方式是在每个函数的开头部分声明所有变量

- 自动插入分号

> 尤其是return语句。必须在同一行

- 保留字

- unicode

- typeof

> typeof不能辨别出null与对象

```js
// 可以这样，因为null为假
if (my_value && typeof my_value === 'object') {
    // my_value是一个对象或数组
}
```

- parseInt

> 字符串转换为整数的函数。
> 遇到非数字会停止解析。
> 数字前面有0也会有问题。默认8进制求值。可以加上基数为参数`parseInt("08", 10)`

- +

> 如果两个运算数都是数字，返回和。否则返回字符串拼接

- 浮点数

> 0.1 + 0.2 的不等于0.3。可以通过指定精度避免

- NaN

> 使用isNaN辨别数字与NaN。如果为数字返回false，但是如果是字符串型数字，也会返回false

```js
// 最佳办法
var isNumber = function isNumber (value) {
    return typeof value === 'number' && isFinite(value);
}
```

- 伪数组

arguments数组不是一个数组

```js
if (Object.prototype.toString.apply(my_value) === '[object Array]') {
    // 确实是一个数组
}
```

- 假值

`0` `Nan` `''` `false` `null` `undefined`

-hasOwnProperty

> hasOwnProperty是一个方法，不是运算符。
> 可能会被一个不同函数甚至非函数的值替换

## 糟粕 ##

- ==

> 建议永远不要使用`==` `!=`。始终使用`===` `!==`

- with语句

> 快捷访问对象属性。但是结果可能有时不可预料。避免使用它。

- eval

> 减弱安全性，降低语言能力。避免使用它

- continue语句

> 跳到循环的顶部。我发现一段代码**移除continue**后，性能得到了改善

- switch 穿越

> 除非明确终端流程

- 缺少块的语句

> If、while、do、for可以接受单行语句，避免使用

- ++ --

> 作者觉得使用++ -- 代码变得过于拥挤复杂隐晦

- 位运算符

& | ^ ~ >> >>> <<

- function语句对比function表达式

`function foo () {}`

`var foo = function foo () {}`

> function语句在解析时会发生被提升的情况
> 建议使用第二种形式，明确表示foo是一个包含一个函数值的变量。要理解，函数就是数值

一个语句不能以一个函数表达式开头。
解决办法，把函数调用在圆括号中
```js
(function () {
    
}())
```

- 类型的包装对象

> 避免使用`new Object` `new Array`。可用`{}` `[]`代替

- new

> 与new结合使用的函数应该首字母大写。并且这些首字母大写的形式只用来命名构造器函数
> 最好不去使用new。

- void

> 避免使用它

