# HTTP #

## 概览 ##

> http是由请求与响应组成客户端与服务端的交互协议



- 只关心一个功能：从web服务器到web客户端的超文本文件或其他文件的传输
- 通信角度看：客户端主要负责发送请求给服务端，服务端对请求作出响应



## 请求 ##

> 最简单的HTTP操作包括一个使用web浏览器的HTTP客户端和一个HTTP服务器

TCP连接创建之后：

- 客户端请求：根据HTTP协议标准发送HTTP请求信息，
- 服务端响应：读取并解释请求。对请求作出相应行为并创建HTTP响应信息，发回给客户端



```
<起始行> // 包含消息的类型
<首部字段> // header-name: header-value
<空白行>
[<主体>]
[<尾部>]
```



### 起始行 ###

- 表明客户端想要进行的命令或行为
- 指定行为想要获取的资源
- 告诉客户端使用的http版本

`<METHOD> <request-uri> <HTTP-VERSION>`

`POST /user/getAll HTTP/1.1`



### 请求首部 ###

- 普通报头
- 请求报头
  - Accept 告诉服务器端，接受哪些类型的信息
  - Accept-Encoding 可接受的内容编码
  - Accept-Language 指定一种自然语言
  - Connection 表示是否需要持久连接
  - Cookie 
  - Host 请求的主机和端口号
  - User-Agent 用户代理，一般指浏览器



## 响应 ##

```
<状态行>
<响应首部>
<响应实体>
```



### 状态行 ###

`<HTTP-VERSION> <status-code> <reason-phrase>`

- 版本不能高于客户端发送的版本
- 状态码
  - 1xx 指示信息——表示请求已经接受，继续处理
  - 2xx 成功——表示请求已经被成功接收、理解、接受
  - 3xx 重定向——要完成请求必须进行更进一步的操作
  - 4xx 客户端错误——请求有语法错误或请求无法实现
  - 5xx 服务器端错误——服务器未能实现合法的请求



### 响应首部 ###

- Location 重定向
- Server 包含处理请求的原始服务器的软件信息
- Allow
- Content-Type
- Last-modified
- Accept-Ranges
- Content-Encoding
- Expires
- Refresh

