# Macbook 笔记

## 环境变量 ##

环境变量的加载顺序为

系统级别，启动后就加载

`/etc/profile`（不建议修改）

`/etc/paths`（建议修改）

用户级别，顺序读取，前面存在后忽略

```
~/.bash_profile
~/.bash_login
~/.profile
~/.bashrc
```



## 端口

`lsof -i:8080` // 查看端口进程

`kill -9 716` // 根据pid杀进程



## 文件

`mkdir file` // 新建文件夹

`command shift .` // 隐藏显示隐藏文件



## brew

```
brew search [appName]
brew info [appName]
brew install [appName]
```