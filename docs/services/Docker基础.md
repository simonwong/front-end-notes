# Docker 入门



## 镜像加速

```json
# /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://dockerhub.azk8s.cn",
    "https://reg-mirror.qiniu.com"
  ]
}
```



重启

```powershell
$ systemctl daemon-reload
$ systemctl restart docker
```



## Dockerfile

```dockerfile

# image 文件构建阶段执行，执行结果会被打包进入 image 文件
RUN npm install

# 容器启动后执行
CMD node index.js
```

## 常用命令

```powershell
service docker start                             # 开启docker服务
systemctl start docker                           # 启动 docker 后台服务
systemctl daemon-reload                          # 重启docker守护进程
systemctl restart docker                         # 重启docker服务
docker pull jenkins/jenkins                      # docker拉取镜像
docker images                                    # 查看镜像列表
docker ps -a                                     # 查看容器,不加-a查看正在运行的，加上-a查看所有容器                   
docker stop [container ID/alias]                 # 关闭一个已启动容器 
docker start [container ID/alias]                 # 启动一个关闭的容器 
docker restart [container ID/alias]              # 重启容器 
docker inspect [container ID/alias]              #/ 查看一个容器的详情 
docker exec -it [container ID/alias] /bin/bash    # 进入容器内部
docker logs [container ID/alias]
```



### 资源清理命令

```powershell
docker rm [container id]                         # 删除容器
docker rmi [image id]                            # 删除镜像
docker rmi REPOSITORY/TAR                        # 删除镜像 例：docker rmi button-api/v2     
```

```powershell
docker container prune # 删除所有退出状态的容器
docker volume prune # 删除未被使用的数据卷
docker image prune # 删除 dangling 或所有未被使用的镜像

docker system prune #删除已停止的容器、dangling 镜像、未被容器引用的 network 和构建过程中的 cache
# 安全起见，这个命令默认不会删除那些未被任何容器引用的数据卷，如果需要同时删除这些数据卷，你需要显式的指定 --volumns 参数
docker system prune --all --force --volumns #这次不仅会删除数据卷，而且连确认的过程都没有了！注意，使用 --all 参数后会删除所有未被引用的镜像而不仅仅是 dangling 镜像
```





### image

- `docker image ls`

- `docker image rm [option] <imageid>`



### container

- `docker container start`

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



- `docker container stop`

    终止容器运行，相当于先发起 SIGTERM 信号，过段时间再发出 SIGKILL；；docker container kill 会直接发出 sigkill

```powershell
$ docker container stop [containerID]
```



- `docker container exec`

    进入一个正在运行的 docker 容器

```powershell
$ docker container exec -it [containerID] bash
```

通过 `ctrl + p +q` 可以推出当前容器且不会关闭容器



- `docker container cp`

    从正在运行的 Docker 容器里，将文件拷贝到本机

```powershell
$ docker container cp [containID]:[/path/to/file] .
```



### 其他

```powershell
docker cp mysql:/var/lib/mysql /var/own/mysqldata
```

- 



## docker build

```powershell
$ docker build [OPTIONS] PATH | URL | -
```



exapmle

```powershell
docker build -t my-image -f Dockerfile .
```



## 数据挂载

数据挂载有三种方式

### volume

是由docker默认及推荐的挂载方式，volume由docker直接管理，同一个volume可以共享给多个容器使用，volume和容器的生命周期完全独立，容器删除时volume仍然存在。

缺点：volume 在宿主机上比较难定位，在宿主机上直接操作 volume 比较困难。

### bind mount

是直接将宿主机文件系统上的文件路径映射到容器中，两边双向同步。

优点：可以直接访问，也可以被别的程序使用

缺点：可以把任何文件路径使用bind mount的方式绑定到容器中，这样有可能一些安全问题。

### tmpfs

使用宿主机的内存作为存储，不会写到宿主机的文件系统中，和前两种区别较大。



## docker 网络

### host 网络

将与宿主机共享网络，不需要再使用 -p 指定暴露接口。容器暴露的端口直接暴露的宿主机上。

```powershell
# 使用 host 网络
$ docker run -d \
--network host \
nginx
```

### bridge 网络

默认就是 bridge 网络。docker 在宿主机上创建了 docker0 的网桥

```powershell
# 查看
$ ip addr show docker0
```

可以发现宿主机的IP是`172.17.0.1` 。就可以在nginx 容器中，通过这个ip 反向代理到宿主机



## Alpine 镜像

Alpine 镜像构建的容器，进入用不了bash ，用 sh