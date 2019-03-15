# TCP协议 #



网络协议分层：

```
应用层（HTTP、DNS、DHCP...)
传输层（UDP协议、TCP协议）
网络层（IP协议）
链路层（以太网协议，依靠mac地址）
物理层（网线，光线...010101）
```



![](http://file.wangsijie.top/share/tcp/bg2017060804.png)

- 以太网协议(Ethernet)规定电子信号如何组成数据包，解决子网内部的点对点通信
- IP协议定义了一套地址规则，可以连接多个局域网



但是IP协议并不保证数据包的完整。如果丢包了，就需要TCP协议来发现丢了那个包，重新发送这个包



## 数据包大小 ##

![](http://file.wangsijie.top/share/tcp/bg2012052913.png)



以太网数据包负载是1500字节，TCP数据包的负载在1400字节左右



## 数据包拆分编号 ##

> 一次性发送大量数据，必须拆分成多个包。比如10MB的文件需要发送7100多个包

- 发送的时候，TCP协议给每个包编号
- 第一个包编号是个随机数，假设是1号包，他的负载长度为100字节，那么下一个包的编号为101
- 每一个包都可以得到自身编号，以及自身编号加上自身负载长度得到下一个包的编号



## 数据包组装 ##

> 收到TCP数据包之后，组装还原是**操作系统**完成的。按照上面拆分的顺序去组装
>
> TCP数据包有一个端口参数，用来指定转交给监听该端口的应用程序



 TCP没有机制表示原始文件的大小，这个由应用层的协议来规定。

比如

- HTTP协议的头信息`Content-Type`，用来表示信息的大小。
- 浏览器根据`Content-Type`字段读出一段段的数据。
- 那么，一次TCP通信，可以包含多个HTTP通信



## 慢启动 ##

为了做到效率与可靠性的统一，设计了慢启动的机制。

一开始发送慢，不丢包就加速，丢包就降速.

不论带宽多好，都从10个数据包开始试，然后达到最高速率



## TCP标志位 ##

SYN -- synchronous 建立联机

ACK -- acknowledgment 确认序号有效

PSH -- push 传送，接收方将报文交给应用层

FIN -- finish 结束，释放连接

RST -- reset 重置连接

URG -- urgent 紧急指针

--------------------------

Sequence number -- 顺序号码

Acknowledge number -- 确认号码



## ACK ##

接收方没收到两个TCP数据包，就要发送一个确认（acknowledgement）消息

ACK携带两个信息

> 期待要收到下一个数据包的编号
>
> 接收方的接收窗口的剩余容量

![](http://file.wangsijie.top/share/tcp/bg2017060809.png)



> 实际上TCP的通信是双向的，双方都需要发送ACK

![](http://file.wangsijie.top/share/tcp/bg2017060812.jpg)

> 不要被这个图片误导，双方的第一次给数据包，他们的seq都是随机生成的。



对于单向来说：

第一次: Seq=1; length=100；Ack=1

第二次：Seq=100+1； length= 50；Ack=对方第一次返回的Seq+length

第三次：Seq=101+50； length=200；Ack=对方第二次返回的Seq+length



## 数据包遗失处理 ##

如果下一个数据包没有收到，那么ACK的编号就不会变

如果发送方收到了3个连续的重复ACK，或者超时收到ACK，就会确认这个包丢了，重新发送

![](http://file.wangsijie.top/share/tcp/bg2017060811.png)

这里关于2号包重发后，3、4、5号包是否重发，涉及到TCP的版本。

现阶段的是，3、4、5号包不会重发。接收到2号包后，将会返回5号包后的ack，然后接着发6号包。



## 三次握手 ##

### 目的 ###

> 同步连接双方的序列号和确认号并交换 TCP 窗口大小信息。

### 直白理解 ###

> A > B：我要对你讲话，你能听到么
>
> B > A：我能，我也要对你讲话，你能听到么
>
> A > B：我也能

### 状态 ###

> SYN_SEND
>
> SYN_RECV
>
> ESTABLISHED

### 理解 ###

![](http://file.wangsijie.top/share/tcp/221638042536625.png)

- 第一次握手：主机A发送位码`SYN=1`，随机生成`seq number=x`，将这个数据包发送给主机B
- 第二次握手：主机B收到`SYN=1`，确认了联机信息，发送`ack number = x+1`，`SYN=1`，`ACK=1`，随机生成`seq number=y`。此时主机A进入ESTABLISHED已确认状态
- 第三次握手：主机A收到信息，确认主机B的`ack number =? seq number+1`，且`ACK =? 1`。就在发送`ack number = y+1` `ACK = 1` `seq number = x+1`。此时主机B进入ESTABLISHED状态



### 例子 ###

IP 192.168.1.116.3337 > 192.168.1.123.7788: S 3626544836:3626544836
IP 192.168.1.123.7788 > 192.168.1.116.3337: S 1739326486:1739326486 ack 3626544837
IP 192.168.1.116.3337 > 192.168.1.123.7788: ack 1739326487,ack 1



### DDOS攻击 - SYN Flood攻击 ###

伪造大量不存在的IP，向服务器发送SYN包，服务器回复确认包，进入SYN_RECV状态。（此时TCP连接为半连接状态half-open- connect）

由于源地址不存在，服务器会不断的重发包直到超时。一直占用队列。



## 四次挥手 ##

> 因为TCP连接是双全工的，每一方都要单独关闭。
>
> 一方发送FIN，终止连接，不再传送数据，另一方可以继续发送数据，直到他也发送FIN

### 理解 ###

![](http://file.wangsijie.top/share/tcp/221638047387940.jpg)



- 第一次挥手：主机A发送`FIN=1` `seq number=x`。主机A进入 FIN_WAIT_1状态
- 第二次挥手：主机B收到`FIN=1` ，返回确认包`ACK=1` `ack number = x + 1` `seq number=y` 。主机B进入CLOSE_WAIT状态。主机A进入FIN_WAIT_1状态。
- 第三次挥手：主机B发送`FIN=1` `ACK=1` `seq number = z` `ack number = x + 1`。主机B进入LAST_ACK状态
- 第四次挥手：主机A收到`FIN=1`，发送了`ACK=1` `seq number = x+1` `ack number = z + 1`，立刻进入TIME_WAIT状态，等带2MSL进入CLOSED状态。主机B收到立即进入CLOSED状态。



### 为什么是四次挥手 ##

收到FIN时，表示对方不再发送数据了，但还可以接收数据。自己这边，可能还有部分数据没有给玩。

由于ACK报文，和FIN报文基本都是分开发的

第二次挥手给ACK

第三次挥手给FIN + ACK