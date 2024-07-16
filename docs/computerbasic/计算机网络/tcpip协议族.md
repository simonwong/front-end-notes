# TCP/IP 协议族

**互联网协议套件**（英语：Internet Protocol Suite，缩写IPS）是网络通信模型，以及整个[网络传输协议](https://zh.wikipedia.org/wiki/网络传输协议)家族，为[网际网络](https://zh.wikipedia.org/wiki/网际网络)的基础通信架构。它常通称为**TCP/IP协议族**（英语：TCP/IP Protocol Suite，或TCP/IP Protocols），简称**TCP/IP**

![](https://file.wangsijie.top/blog/20210727095640.jpg)

## IP

![](https://file.wangsijie.top/blog/20210727095657.jpg)


## TCP

![](https://file.wangsijie.top/blog/20210727095717.jpg)

## DNS

![](https://file.wangsijie.top/blog/20210728174657.jpg)

## 整个流程

![](https://file.wangsijie.top/blog/20210728174737.jpg)



## https

http协议中没有加密机制，但可以通过和 SSL （Secure Socket Layer，安全套接层）或 TLS （Transport Layer Security，安全传输层协议）的组合，加密 HTTP 的通信内容。





### https 是身披 SSL/TLS外壳的 HTTP

通常 HTTP 直接和 TCP 通信，当使用 SSL/TLS 时，则变成先和 SSL/TLS 通信，再由 SSL/TLS 和 TCP 通信。

![](https://file.wangsijie.top/blog/202108121953592.jpg)

### https 采用混合加密机制

采用共享密钥加密和公开密钥加密两者并用

![](https://file.wangsijie.top/blog/20210812193025.jpg)

