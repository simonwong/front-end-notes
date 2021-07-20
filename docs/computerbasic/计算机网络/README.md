# 计算机网络

## OSI 模型

7 => **应用层（Application Layer）**：提供为应用软件而设计的接口，以设置与另一应用软件之间的通信。

​	如：HTTP、HTTPS、FTP、SSH、SMTP、POP3、DNS

6 => **表示层（Presentation Layer）**：把数据转换为能与接收者的系统格式兼容并适合传输的格式

5 => **会话层（Session Layer）**：负责在数据传输中设置和维护计算机网络中两台计算机之间的通信连接

4 => **传输层（Transport Layer）**：把传输表头（TH）加至数据以形成数据包。

​	如：传输控制协议（TCP）、用户数据报协议（UDP）

3 => **网络层（Network Layer）**：决定数据的路径选择和转寄，将网络表头（NH）加至数据包，以形成分组。

​	如：互联网协议（IP）

2 => **数据链路层（Data Link Layer）**：负责网络寻址、错误侦测和改错。

​	如：以太网、无线局域网（Wi-Fi）

1 => **物理层（Physical Layer）**：在局部局域网上发送数据帧，它负责管理电脑通信设备和网络媒体之间的互通。

​	如：调制解调器、无线电、光纤



## 应用层

每一个应用层协议一般都会使用到两个传输层协议之一

### 运行在 TCP 协议上的协议

- HTTP
- HTTPS
- FTP
- POP3
- SMTP
- LELNET
- SSH

### 运行在 UDP 协议上的协议

- BOOTP
- NTP
- DHCP

### 其他

- DNS
- ECHO
- SNMP
- ARP