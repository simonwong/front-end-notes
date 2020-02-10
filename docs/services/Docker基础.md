# Docker 入门



## Dockerfile

```dockerfile

# image 文件构建阶段执行，执行结果会被打包进入 image 文件
RUN npm install

# 容器启动后执行
CMD node index.js
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





## 常用命令

```powershell
service docker start                             // 开启docker服务
systemctl start docker                           // 启动 docker 后台服务
systemctl daemon-reload                          // 重启docker守护进程
systemctl restart docker                         // 重启docker服务
docker pull jenkins/jenkins                      // docker拉取镜像
docker images                                    // 查看镜像列表
docker ps -a                                     // 查看容器,不加-a查看正在运行的，加上-a查看所有容器
docker rm 容器id                                  // 删除容器
docker rmi 镜像id                                 // 删除镜像
docker rmi REPOSITORY/TAR                        // 删除镜像 例：docker rmi button-api/v2                        
docker stop 容器ID/容器别名                        // 关闭一个已启动容器 
docker start 容器ID/容器别名                       // 启动一个关闭的容器 
docker inspect 容器ID/容器别名                     // 查看一个容器的详情 
docker exec -it 容器ID/容器别名 /bin/bash          // 进入容器内部
```



### image

- docker image ls

- docker image rm [option] <imageid>



### container

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



### 其他

```powershell
docker cp mysql:/var/lib/mysql /var/own/mysqldata
```

- 



## docker build

```powershell
$ docker build [OPTIONS] PATH | URL | -
```





## MySql

```powershell
$ docker run --name mysql -e MYSQL_ROOT_PASSWORD=123456 -d -p 3306:3306 -v /usr/local/mysql/conf:/etc/mysql/conf.d -v /usr/local/mysql/data:/var/lib/mysql --restart=always mysql
```

`-e MYSQL_ROOT_PASSWORD=123456` 设置 root 用户密码

`-d` 后台运行

`-p 3306:3306` 指定端口

`--restart=always` docker 重启后，容器自动启动

`--privileged=true` 容器内的root拥有真正root权限，否则容器内root只是外部普通用户权限

`-v ` 挂在目录



mysql 的默认配置文件`/etc/mysql/my.cnf`  `/etc/mysql/conf.d`  后者是个文件夹，权限大于前者。文件夹中可以命名任意 `xxx.cnf` 来覆盖 `my.cnf`

Mysql 的数据默认存放在 `/var/lib/mysql` 中



进入

```powershell
# 进入容器
$ docker exec -it mysql bash

# 登陆输入上面的密码
$ mysql -u root -p
```



远程访问权限

这里需要有个用户的概念。root 用户没有开放远程访问权限。而是另外创建了一个 simon 用户，授予远程访问。

```powershell
# 添加进入到mysql容器内部才能执行命令设置远程登陆账号密码
$ CREATE USER 'simon'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

# 开启远程访问权限
$ GRANT ALL PRIVILEGES ON *.* TO 'simon'@'%';

# 刷新权限
$ flush privileges;    
```



