# TLS 1.3 连接过程

原文[The New Illustrated TLS Connection](https://tls13.ulfheim.net/)

[Illustrated-tls1.3](https://github.com/syncsynchalt/illustrated-tls13)

TLS 1.3 加密协议

> 在本演示中，客户端连接服务端，协商一个 TLS1.3 会话，发送 "ping"，接收 "pong"。然后结束会话。



💚➗客户端 key 交换生成器

💚🔜客户端说 Hello

💙➗服务端 key 交换生成器

💙🔙服务端说 Hello

💙➗服务端**握手**密钥计算

💚➗客户端**握手**密钥计算

💙🔙服务端变更密码规范 

💙🔙服务端 Wrapper

 	⇢服务端加密扩展
 	
 	⇢服务端证书
 	
 	⇢服务端证书验证
 	
 	⇢服务端握手完成

💙➗服务端应用 key 计算

💚➗客户端应用 key 计算

💚🔜客户端变更密码规范

💚🔜客户端 Wrapper

 	⇢客户端握手完成

💚🔜客户端 Wrapper

 	⇢客户端发送应用数据 "ping"

💙🔙服务端 Wrapper

 	⇢服务端回话票据1
 	
 	⇢服务端回话票据2

💙🔙服务端 Wrapper

 	⇢服务端发送应用数据 "pong"

