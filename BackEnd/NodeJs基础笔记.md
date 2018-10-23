

# nodejs基础 

### 模块 ###

#### require、exports、module ####

```javascript
// 模块的js中
function fn () {
	// ...
}
exports.fn = fn;

// 使用module，模块中的js
// 用于替换当前模板的导出对象
module.exports = function () {
	// ...
}

// 引用模块
const fn = require("./util/fn");

fn.fn();
```

### 包(package) ###

```
- lib/
	- cat/
		+ doc/
		- lib/
			head.js
			body.js
			main.js
		+ tests/
		package.json

/* package.json的内容 */

{
	"name": "cat",
	"main": "./lib/main.js"
}
```

### 工程目录 ###

```
- /workspace/node-echo	 # 工程目录
	- bin/               # 存放命令行相关代码
		node-echo
	+ doc/               # 存放文档
	- lib/               # 存放API相关文档
		echo.js
	- node_modules/      # 存放三方包
		+ arbv/
	+ tests              # 存放测试用例
	package.json         # 元数据文件
	README.md            # 说明文件
```

### NPM ###

> 可以用过[npmjs](https://npmjs.org/)搜索包

> 在包名后面加`@<version>`下载指定版本

也可以用package.json管理包
```javascript
{
	"name": "node-echo",
	"main": "./lib/echo.js",
	"dependencies": {
		"arvg": "0.02"
	}
}
```

#### 机灵点 ####

> [npm官方文档](https://npmjs.org/doc/)

- `install` `publish`，使用`npm help`查看所有命令
- `npm install <command>`查看某条命令详细帮助
- `npm update <package>`更新模块
- `npm update <package> -g`全局安装的，更新
- `npm cache clear` 清空NPM本地缓存
- `npm unpublish <pachage>@<version>`
- 。。。。


### 文件操作 ###

```javascript
// 小文件拷贝
var fs = require('fs');

function copy (src, dst) {
	fs.writeFileSync(dst, fs.readFileSync(src));
}

function main (argv) {
	copy(arvg[0], arvg[1]);
}

main(process.argv.slice(2));
```

- `fs.readFileSync`从源路径读取文件内容
- `fs.writeFileSync`讲文件内容写入目标路径

> process是一个全局变量，可以通过`process.argv`获得命令行参数。
> `argv[0]`固定等于Nodejs执行程序的绝对路径
> `argv[1]`固定等于主模块的绝对路径
> 所以第一个命令行参数从`arvg[2]`开始

```javascript
var fs = require('fs');

function copy (src, dst) {
	fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

// ...
```

- `fs.createReadStream`创建源文件的只读流
- `fs.createWriteStream`创建目标文件的只写流
- `pipe`方法连接

#### API概览 ####

#### Buffer（数据块） ###

> [官方文档](http://nodejs.cn/api/buffer.html)

nodejs提供了一个与`String`对等的全局构造函数`Buffer`来提供对二进制数据的操作。
直接构造
```javascript
var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, ox6f]);
```

可以使用.length属性，还可以使用[index]读取指定位置的字节。
可以互相转化
```javascript
var str = bin.toString('utf-8'); // "hello"

var bin = new Buffer('hello', 'utf-8') // <Buffer 68 65 6c 6c 6f>
```

> Buffer与字符串的重要区别是字符串是只读的，修改得到新的字符串。
> Buffer可以用[index]直接修改某个位置的字节

```javascript
// 想要拷贝Buffer

var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;

console.log(bin); // <Buffer 68 65 6c 6c 6f>
console.log(dup); // <Buffer 48 65 6c 6c 6f>
```

#### Stream（数据流） ####

> [官方文档](http://nodejs.cn/api/stream.html)

> 从只读数据流到只写数据流的搬运要注意放爆仓控制。
> 直接使用`.pipe`

#### File System （文件系统） ####

> [官方文档](http://nodejs.cn/api/fs.html)

> `fs`内置模块提供对文件的操作。API基本分为以下三类

- 文件属性读写
  常用的`fs.stat` `fs.chmod` `fs.chown`等

- 文件内容读写
  常用的`fs.readFile` `fs.readdir` `fs.writeFile` `fs.mkdir`等等

- 底层文件操作
  常用的`fs.open` `fs.read` `fs.write` `fs.close` 等等


`fs`模块API的回调参数都用两个。第一个是有错误发生时等于异常。第二个始终是返回API执行结果

所有异步API都有同步版本。方法名末尾多了`Sync`

```javascript
// 异步。两个参数
fs.readFile(pathe, function (err, data) {
	if (err) {
		//...
	} else {
		//...
	}
})

// 同步版本
try {
	var data = fs.readFileSync(pathname);
	//...
} catch (err) {
	// ...
}

```

#### Path （路径） ####

> [官方文档](http://nodejs.cn/api/path.html)

 常用的API

- `path.normalize`

> 传入路径转换为标准路径。可以解析`.` `..`，还嫩去掉多余的斜杠。

```javascript
var cache = [];

function store (key, value) {
	cache[path.normalize(key)}] = value;
}

store('foo/bar', 1);
store('foo//baz//..//bar', 2);

console.log(cache); // { "foo/bar": 2 }
```

> 坑！！！！
> windows系统下路径是`\`，Linux系统下是`/`。如果保证任何系统都用`/`为路径，需要用`.replace(/\\/g, '/')`。再替换一下标准路径

- `path.join`

> 将传入的多个路径拼接为标准化路径。

```javascript
path.join('foo/', 'baz/', '../bar'); // => "foo/bar"
```

- `path.extname`

> 拓展名

```javascript
path.extname('foo/bar.js'); // => ".js"
```

#### 遍历目录 ####

- 递归算法

> 递归算法虽然简洁，但是重复调用函数影响性能。需要时转换成循环算法

- 遍历算法

> 深度优先 + 先序遍历

```
      A
    /   \
   B     C
  / \     \
 D   E     F
A > B > D > E > c > F
```

- 同步遍历

```javascript
function travel (dir, callback) {
	fs.readdirSync(dir).forEach(function (file) {
		var pathname = path.join(dir, file);
		
		if (fs.statSync(pathname).isDirectory()) {
			travel(pathname, callback);
		} else {
			callback(pathname)
		}
	})
}
```

- 异步遍历

```javascript
function travel (dir, callback) {
	fs.readdir(dir, function (err, files) {
		(function next (i) {
			if (i < files.length) {
				var pathname = path.join(dir, files[i]);

				fs.stat(pathname, function (err, stats) {
					if (stats.isDirectory()){
						travel(pathname. callback, function () {
							next(i + 1);
						})
					} else {
						callback(pathname, function () {
							next(i + 1)；
						})
					}
				})；
			} else {
				finish && finish()
			}
		}(0));
	})
}
```

#### 文本编码 ####

- BOM的移除

```javascript
function readText (pathname) {
	var bin = fs.readFileSync(pathname);

	if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xEF) {
		bin = bin.slice(3);
	}
}
```

- GKB转UTF-8

> GBK编码不在nodejs自身支持范围之内用`iconv-lite`转换

```javascript
var iconv = require('iconv-lite');

function readGBKText (pathname) {
	var bin = fs.readFileSync(pathname);

	return iconv.decode(bin, 'gbk');
}
```

- 单字节编码

> 一个文件只包含英文字符，无论是GBK还是UTF-8读取都是没问题。问题在于中文字符
> 除了注释和字符串外，的代码用单字节编码读取。
> 管不管大于0xEF的单字节被解析成什么，保存好后，对应的字节保持不变
> nodejs中自带的`binary`编码来实现这种方法

```javascript
function replace (pathname) {
	var str = fs.readFileSync(pathname, 'binary');

	str = str.replace('foo', 'bar');
	fs.writeFileSync(pathname, str, 'binary');
}
```

#### 总结 ####

- 学号文件操作，编写各种程序都不怕
- 不在意性能的话，fs模块的同步API让生活更美好
- 需要对文件读写到字节级别精准，使用fs模块底层操作
- 路径拼接使用path模块
- 目录遍历和文件编码处理，很实用

### 网络管理 ###

#### HTTP ####

> [官方文档](http://nodejs.cn/api/http.html)
> http模块两种使用方式
> 作为服务端使用，创建一个HTTP服务器，监听HTTP客户端请求并返回响应
> 作为客户端使用，发起一个HTTP客户端请求，获取服务端响应

```javascript
// 服务端
http.createServer(function (requset, response) {
	response.writeHead(200, { 'Content-Type': 'text/plain' });
	
	request.on('data', function (chunk) {
		response.write(chunk);
	});
	request.on('end', function () {
		response.end();
	});
}).listen(8080);
```

```javascript
// 客户端
var options = {
	hostname: 'www.example.com',
	port: '8080',
	path: '/upload',
	method: 'POST',
	header: {
		'COntent-Type': 'application/x-www/form-urlencoded'
	}
};
var requset = http.requset(option, function (response) {});

requset.write('Hello World!');
request.end();
```


#### HTTPS ####

> [官网文档](http://nodejs.cn/api/https.html)
> https模块与http模块极为类似，区别在于https模块需要额外处理SSL证书

```javascript
var options = {
	key: fs.readFileSync('./ssl/default.key'),
	cert: fs.readFileSync('./ssl/default.cer')
};
var server = https.createServer(options, function (request, response) {
	//...
})
```

#### URL ####

> [官方文档](http://nodejs.cn/api/url.html)

#### Query String ####

> [官方文档](http://nodejs.cn/api/querystring.html)

> 用于实现URL参数字符串和参数对象的转换

```javascript
querystring.parse('foo=bar&baz=qux&baz=quux&corge');

//>> { foo: 'bar', baz: ['qux', 'quux'], corge: "" };

querystring.stringify(/*...*/)
```

#### Zlib ####

> [官方文档](http://nodejs.cn/api/zlib.html)

> 提供了数据压缩和解压的功能

```javascript
// zib模块压缩HTTP响应体数据的例子。
http.createServer(function (request, response) {
	var i = 1024;
		data = '';
	
	while (i--) {
		data += '.';
	}
	// 判断客户端是够支持gzip
	if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
		zlib.gzip(data, function (err, data) {
			response.writeHead(200, {
				'Content-Type': 'text/plain',
				'Content-Encoding': 'gzip'
			});
			response.end(data);
		});
	} else {
		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		response.end(data);
	}
}).listen(80)
```

```javascript
// zlib模块解压HTTP响应体数据

var options = {
	hostname: 'www.example.com',
	port: 80,
	path: '/',
	method: 'GET',
	header: {
		'Accept-Encoding': 'gzip, deflate'
	}
}

http.request(options, function (response) {
	var body = [];

	response.on('data', function (chunk) {
		body.push(chunk);
	})

	response.on('end', function () {
		body = Buffer.concat(body);
		// 判断服务端响应是否使用了gzip
		if (response.headers['content-encoding'] === 'gzip') {
			zlib.gunzip(body, function (err, data) {
				console.log(data.toString());
			});
		} else {
			console.log(data.toString());
		}
	})
}).end();
```

#### Net ####

> [官方文档](http://nodejs.cn/api/net.html)

> 用于创建Socket服务器或Socket客户端

```javascript
// 搭建一个不严谨的HTTP服务器。不管收到啥请求，都固定返回相同响应

net.createServer(function (conn) {
	conn.on('data', function (data) {
		conn.write([
			'HTTP/1.1 200 OK',
			'Content-Type: text/plain',
			'Content-length: 11',
			'',
			'Hello World'
		].join('\n'));
	})
}).listen(80);
```

```javascript
// 使用Socket发起HTTP客户端请求

var options = {
	port: 80,
	host: 'www.example.com'
};
var client = net.connect(options, function () {
	client.write([
		'GET / HTTP/1.1',
		'User-Agent: curl/7.26.0',
		'Host: www.example.com',
		'Accept: */*',
		'',
		''
	].join('\n'));
});

client.on('data', function (data) {
	consoel.log(data.toString());
	client.end();
})
```

####机灵一点 ####

> nodejs操作网络，尤其是HTTP请求和响应会遇到一些惊喜

- 为什么通过`headers`对象访问到的HTTP请求头或响应头字段不是驼峰的？
  规范上是驼峰的。现实残酷，所以nodejs同意转为小写，如`headers[content-length]`

- 为什么`http`模块创建的HTTP服务器返回的响应是`chunked`传输方式
  使用`.writeHead`方法写入响应头后，允许使用`.write`方法写入任意长度的响应体数据，并使用`.end`方法结束一个响应。因为响应体长度不确定，所以nodejs自动在响应头里添加了`Transfer-Encoding: chunked`字段，并采用`chunked`传输方式。当长度确定，使用`.writeHead`方法在响应头里加上`Content-Length`字段,这样就不会自动添加。

- 为什么使用`http`模块发起HTTP客户端请求时，有事会发生`socket hang up`错误
  发起客户端请求前需要创建一个客户端。`http`客户端模块提供了全局的客户端`http.globalAgent`，可以让我们使用`.request`和`.get`方法是不用手动创建客户端。但是全局只允许5个并发socket，过多会报这个错。可以`http.globalAgent.maxSockets`属性改大。`https`模块可以通过`https.globalAgent.maxSockets`

#### 小结 ####

- `http`和`htps`模块支持服务端模式和客户端模式两种
- `requset` 和 `response`对象除了用于读写头数据外，都可以当做数据流来操作
- `url.parse`方法加上`requset.url`属性是处理HTTP请求时的固定搭配
- 使用`zlib`模式可以减少使用HTTP协议时的数据传输量
- 通过`net`模块的Socket服务器与客户端对HTTP协议做底层

### 进程管理 ###

> NodeJS可以感知和控制自身进程的运行环境和状态，也可以创建子进程并与其协同工作。

```javascript
var child_process = require('child_process');
var util = require('util');

function copy (source, target, callback) {
	child_process.exec(
		util.format('cp -r %s/* %s', source, target),
		callback
	)
}

copy('a', 'b', function (err) {
 // ...
})
```

#### Process ####

> [官方文档](http://nodejs.cn/api/process.html)

> 任何一个进程都有启动进程时使用的命令行参数，有标准输入标准输出，有运行权限，有运行环境和运行状态。
> 可以通过`Process`感知和控制NodeJS自身进程的方方面面。不是内置模块，而是全局对象

#### Child Process ####

> [官方文档](http://nodejs.cn/api/child_process.html)

> 可以创建和控制子进程。提供的API最核心的是`.spawn`，其他API是语法糖

#### Cluster ####

> [官方文档](http://nodejs.cn/api/cluster.html)

> 是对`child_process`模块的进一步封装，专用语解决单进程NodeJS Web服务器无法充分利用多核CPU

#### 应用场景 ####

- 如何获取命令行参数
   可以通过`process.arvg`获取命令行参数。但是`arvg[0]`为执行程序路径，`arvg[1]`为主模块文件路径。第一个命令行参数从`arvg[2]`开始。可以这样处理

```javascript
function main (arvg) {
	// ...
}
main(process.arvg.slice(2));
```

- 如何退出程序
  通常一个程序做完事，退出状态为`0`。或者一个程序运行时发生了异常挂了，这是退出状态不等于`0`。如果捕获了异常，觉得程序不应该继续运行下去，需要立即退出，并需要把退出状态码设置为指定数字，如`1`

```javascript
try {
	// ...
} catch (err) {
	// ...
	process.exit(1);
}
```

- 如何控制输入输出

> NodeJS程序的标准输入流（stdin），一个标准输出流（stdout），一个标准错误流（stderr）。分别对应`process.stdin`、`process.stdout`和`process.stderr`。前一个是只读流，后边两个是只写流
```javascript
function log () {
	process.stdout.write(
		util.format.apply(util, arguments) + '\n'
	);
}
```

- 如何降权

> Linux系统下，程序运行在root权限下存在安全隐患，最好把权限降下来。

```javascript
http.createServer(callback).listen(80, function () {
	var env = process.env,
		uid = parseInt(env['SUDO_UID'] || process.getuid(), 10),
		gid = parseInt(env['SUDO_GID'] || process.getgid(), 10);

	process.setgid(gid); // 必先
	process.setuid(uid); // 否则就没权限改gid了
})
```

- 如何创建子进程

```javascript
var child = child_process.spawn('node', [ 'xxx.js' ]);

child.stdout.on('data', function (data) {
	console.log('stdout' + data);
})

child.stderr.on('data', function (data) {
	console.log('stderr' = data);
})

child.on('close', function (code) {
	console.log('child process exited width code ' + code);
})
```

> `.spawn(exec, args, options)`。方法，支持三个参数。第一个参数，是执行文件路径，相对绝对或path环境变量中的。第二个参数，数组中的每个成员都按顺序对应的一个命令行参数。第三个参数可选，用于配置子进程的执行环境与行为

- 进程间如何通信

linux系统下。进程之间可以通过信号，互相通信。

```javascript
// parent.js //
var child = child_process.spawn('node', [ 'child.js' ]);

child.kill('SIGTERM'); // kill本质上是用来给进程发送信号的

// child.js //
process.on('SIGTERM', function () {
	clearUp();
	process.exit(0);
})
```

如果父子进程都是NodeJS进程，可以通过IPC（进程间通讯）双向传递数据。

```javascript
// parent.js //
var child = child_process.spawn('node', [ 'child.js' ], [
	stdio: [ 0, 1, 2, 'ipc' ]
])
child.on('message', function (msg) {
	console.log(msg);
})
child.send({ hello: 'hello' });

// child.js //
process.on('message', function () [
	msg.hello = msg.hello.toUpperCase();
	process.send(msg);
])
```

- 如何守护子进程

> 一般用于监控工作进程的运行状态
> 下例，程序非正常退出时。守护进程立即重启工程。

```javascript
// daemon.js //
function spawn (mainModule) {
	var worker = child_process.spawn('node', [ mainModule ]);

	worker.on('exit', function (code) {
		if (code !== 0) {
			spawn(mainModule);
		}
	})
}

spawn('worker.js');
```

#### 小结 ####

- 使用`process`对象管理自身
- 使用`child_process`模块创建和管理子进程

###  异步编程 ###

> NodeJS最大的卖点---事件机制和异步IO

#### 回调 ####

> 异步编程依托于回调来时实现。但不能说使用了回调程序就是异步化了
> JS是单线程运行的。这决定了JS在执行一段代码之前，无法执行包含回调函数在内的别的代码

#### 代码设计模式 ####

- 函数返回值

> 使一个函数的输出作为另一个函数的输入是常见的需求。

```javascript
// 同步
var output = fn_1(fn_2('input'));
// DO...

// 异步
fn_2('input', function (output2) {
	fn_1(output2, function (output) {
		// DO...
	})
})
```

- 遍历数组

> 遍历数组，对数据成员做处理

```javascript
// 同步
var len = arr.length,
	i = 0;

for (; i < len; ++i) {
	arr[i] = sync(arr[i]);
}
// all array items have processed

// 异步
(function next(i, len, callback) {
	if (i < len) {
		async(arr[i], function (value) {
			arr[i] = value;
			next(i + 1, len, callback);
		});
	} else {
		callback();
	}
}(0, arr.length, function () {
	// processed on here
}))
```

- 异常处理

> js自身提供的异常捕获和处理机制。`try..catch..`只能用于同步执行的代码。

```javascript
function sync (fn) {
	return fn();
}

try {
	sync(null);
	// Do Something
} catch (err) {
	console.log("Error: %s", err.message);
}
```

> 异常会沿着代码执行路径一直冒泡。直到遇到`try`语句时被捕获住。
> 由于异步函数会打断代码执行路径。直到被打断没有遇到`try`时，就作为全局异常抛出
> 因为路径被打断， 需要在异常冒泡到断点前用`try`语句把异常捕获，并通过回调函数传递异常

```javascript
function async (fn, callback) {
	setTimeout(function () {
		try {
			callback(null, fn());
		} catch (err) {
			callback(err)
		}
	}, 0)
}

async(null, function (err, data) {
	if (err) {
		console.log('Error %s', err.message);
	} else {
		// Do somethinf...
	}
})
```

> 如果有许多个异步函数调用，就会非常复杂

#### 域（Domain） ####

> [官方文档](http://nodejs.cn/api/domain.html)

> 域模块可以简化异步代码的异常处理。
> 一个域就是一个js运行环境。如果一个异常没有捕获就会作为全局异常抛出。通过process对象提供了捕获全局异常的方法

```javascript
process.on('uncaughtException', function (err) {
	console.log('error %s', err.message);
})

setTimeout(function (fn) {
	fn();
})
```

。
。
。
。

#### 小结 ####

- 不掌握异步编程不算学会NodeJS。
- 异步编程依托回调实现，而使用回调不一定就是异步编程
- 异步编程下的函数间数据传递，数组遍历，和异常处理与同步编程有很大差别
- 使用`domian`模块简化异步代码的异常处理
