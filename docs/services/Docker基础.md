# Docker 入门



## Dockerfile

```dockerfile

# image 文件构建阶段执行，执行结果会被打包进入 image 文件
RUN npm install

# 容器启动后执行
CMD node index.js
```



## 常用命令

- docker container start 

    生成/启动容器，但不会重复生成容器；；； docker container run 会重复生成

```powershell
$ docker container start [containerID]
```

更多参数:

 ```powershell
-d ：在后台运行
-it : 容器的 shell 映射到当前的 shell ， 然后在本机窗口输入命令，会传入容器
-p 80:3000 ：将容器的 3000 端口映射到宿主机的 80 端口
--rm : 容器停止运行后，自动删除容器文件
--name xxx : 容器名字为 xxx
 ```



- docker container stop 

    终止容器运行，相当于先发起 SIGTERM 信号，过段时间再发出 SIGKILL；；docker container kill 会直接发出 sigkill

```powershell
$ docker container stop [containerID]
```



- docker container exec

    进入一个正在运行的 docker 容器

```powershell
$ docker container exec -it [containerID] bash
```

通过 `ctrl + p +q` 可以推出当前容器且不会关闭容器



- docker container cp

    从正在运行的 Docker 容器里，将文件拷贝到本机

```powershell
$ docker container cp [containID]:[/path/to/file] .
```



## docker build

```powershell
$ docker build [OPTIONS] PATH | URL | -
```



