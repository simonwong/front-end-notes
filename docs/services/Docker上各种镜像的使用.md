

# Docker 上各种镜像的使用

## Jenkins

Jenkins 官方推荐的镜像  `jenkinsci/blueocean ` 里面捆绑了所有的blueocean 

```powershell
$ docker run -d \
-u root \
-p 8999:8080 \
-p 50000:50000 \
-v /usr/local/jenkins_home:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
--name jenkins \
--restart=always \
jenkinsci/blueocean
```



`-v` 除了分配 jenkins 的工作目录，还分配了 docker 提供给 容器使用



访问容器

```powershell
$ docker exec -it jenkins bash
```



### 初始化配置

拿到初始密码

```powershell
$ docker logs jenkins
# 或者
$ cat /usr/local/jenkins_home/secrets/initialAdminPassword
```

到你的外网 `x.x.x.x:8999` （可能需要配置你云服务器的防火墙）输入初始密码，配置管理员用户，安装插件



### SSH 配置

进入到容器后

1. 生成 ssh 

```powershell
$ ssh-keygen -t rsa -C "wsj_simon@163.com"
```

2. 复制到宿主机

```powershell
$ docker cp jenkins:/root/.ssh/id_rsa.pub ~/.ssh/

$ cd ~/.ssh

$ cat id_rsa.pub >> authorized_keys
```

3. 重启 ssh 服务

```powershell
$ systemctl restart sshd.service
```

4. GitHub ssh 配置

settings/SSH and GPG keys/New SSH key 新增一个 ssh key



PS :  配置了 ssh 之后也许还是不行，`jenkins The authenticity of host 'github.com (13.250.177.223)' can't be established.` 或者 `Authentication failed` 等等



有三种解决方法：

1. ~/.ssh/known_hosts 文件添加公钥 ，如下

    ```
    github.com,13.250.177.223 ssh-rsa AAAxxxxx....
    ```

2. 进入到容器中，使用 `git clone xxxx`时会显示 `Are you sure you want to continue connecting (yes/no)?` yes ，就可以会自动添加了

3. 全局凭据配置，范围（scope）选择:`全局 (Jenkins, nodes, items, all child items, etc)` ,类型（kind）选择：`SSH Username with private key` 。填写 username（随便填），private key 从 `~/.ssh/id_rsa` 的内容复制。然后配置 Credentials 时，选择 这个凭据。



### 使用域名访问

可以用nginx 反向代理到 jk 的端口

```nginx
server {
	listen                  8998;
    server_name             myjenkins.com;

	location / {
    	proxy_pass http://127.0.0.1:8999;
    }
}
```



### 其他问题

- 时间不对

    【系统管理】=> 【脚本命令运行】

    ```
    System.setProperty('org.apache.commons.jelly.tags.fmt.timeZone', 'Asia/Shanghai')
    ```

    



## MySql

```powershell
$ docker run --name mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
-d \
-p 3306:3306 \
-v /usr/local/mysql/conf:/etc/mysql/conf.d \
-v /usr/local/mysql/data:/var/lib/mysql \
--restart=always \
mysql
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



### 远程访问权限

这里需要有个用户的概念。root 用户没有开放远程访问权限。而是另外创建了一个 simon 用户，授予远程访问。

```powershell
# 添加进入到mysql容器内部才能执行命令设置远程登陆账号密码
$ CREATE USER 'simon'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

# 开启远程访问权限
$ GRANT ALL PRIVILEGES ON *.* TO 'simon'@'%';

# 刷新权限
$ flush privileges;    
```



配置 conf 文件使得外部可以连接，记得开放防火墙

```
[mysqld]

bind-address = 0.0.0.0
```



## MongoDB

### 运行

```powershell
$ docker run --name mongo -d -p 27017:27017 -v /usr/local/mongo/conf:/etc/mongo -v /usr/local/mongo/data:/data/db --restart=always mongo --auth --config /etc/mongo/mongod.conf
```

docker run --name mongo -d -p 27017:27017 mongo --auth

mongo 配置

`--auth` 需要密码才能访问容器服务



Mongoldb 的默认配置文件`/etc/mongo/mongod.conf`

Mongoldb 的数据默认存放在 `/data/db` 中



### 进入与用户

```powershell
docker exec -it mongo mongo admin
```

以admin 的身份登陆 mongo

创建 admin

```powershell
db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'root', db: 'admin'}]});
```

使用用户登陆

```powershell
db.auth('admin', '123456')
```



指定某个数据库的用户权限

```powershell
use test
db.createUser({
	user: 'testUser',
	pwd: 'testPwd',
	roles: ['readWrited']
})
```



### 远程连接

配置 conf 文件使得外部可以连接。好像不配置也可以，但是记得配置防火墙

```conf
net:
   bindIp: 0.0.0.0
   port: 27017
```

## Redis

```powershell
$ docker run --name redis -d -p 6379:6379 -v /usr/local/redis/conf/redis.conf:/usr/local/etc/redis/redis.conf -v /usr/local/redis/data:/data --restart=always redis redis-server /usr/local/etc/redis/redis.conf --appendonly yes
```

` redis-server xx.conf --appendonly yes`

启动 redis 服务器，

 xx.conf 指定配置文件，

appendonly 打开Redis持久化配置。



Redis 默认配置文件下载 http://download.redis.io/releases/

Redis 的默认配置文件 `/usr/local/etc/redis/redis.conf`

Redis 的数据默认存放在 `/data`



设置 conf 文件下的 `requirepass yourpassword`



### 进入容器

```powershell
# 使用 redis-cli
$ docker exec -it redis redis-cli

# 获取权限操作
$ auth yourpassword
```



### 远程连接

可以下载客户端 [AnotherRedisDesktopManager](https://github.com/qishibo/AnotherRedisDesktopManager) 

远程连接需要修改conf文件。我这里只修改了 bind 就可以，如果不可以再添加 protected-mode

```
daemonize no
bind 0.0.0.0
protected-mode no
```

`daemonize no` 在Docker中后台启动一个镜像，当前台无响应时会自动退出。Redis 进程被后台化后， 启动Redis的那个进程，也就是Docker执行进程无事可做，因此Docker执行进程退出。当然如果你的Redis的配置文件中没有后台运行，就不会出现这种状况。将Redis的后台运行改为`no`，这样就完成了。



## nginx

`nginx:alpine` 版本

```powershell
$ docker run --name nginx_center \
-d \
-p 80:80 \
-p 443:443 \
-v /usr/local/nginx/conf.d:/etc/nginx/conf.d \
-v /usr/local/nginx/nginx.conf:/etc/nginx/nginx.conf \
-v /usr/local/nginx/ssl:/etc/nginx/ssl \
--restart=always \
nginx:alpine
```



html 默认位置在 `/usr/share/nginx/html`

Log 默认位置在 `/var/log/nginx`

默认使用 `/etc/nginx/conf.d/default.conf`



## Elasticsearch 集群

修改系统设置 `/etc/sysctl.conf`

```conf
vm.max_map_count=262144
#...
```

执行 `sysctl -p` 来使得配置生效



参考 https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-docker.html



配置文件 es/docker-compose.yml

```yaml
version: '3'
services:
  es01:
    image: elasticsearch:7.9.1
    container_name: yueqing_es01
    environment:
      - node.name=es01
      - cluster.name=es-docker-cluster
      - network.bind_host=0.0.0.0
      - discovery.seed_hosts=es02
      - cluster.initial_master_nodes=es01,es02
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data01:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
    networks:
      - elastic
  es02:
    image: elasticsearch:7.9.1
    container_name: yueqing_es02
    environment:
      - node.name=es02
      - cluster.name=es-docker-cluster
      - network.bind_host=0.0.0.0
      - discovery.seed_hosts=es01
      - cluster.initial_master_nodes=es01,es02
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data02:/usr/share/elasticsearch/data
    networks:
      - elastic
  kibana:
    image: kibana:7.9.1
    container_name: yueqing_kibana
    restart: always
    ports:
      - 5601:5601
    environment:
      I18N_LOCALE: zh-CN
      ELASTICSEARCH_URL: http://es01:9200
      ELASTICSEARCH_HOSTS: http://es01:9200
    # volumes:
      # - ./kibana.yml:/usr/share/kibana/config/kibana.yml
    networks:
      - elastic
volumes:
  data01:
    driver: local
  data02:
    driver: local
networks:
  elastic:
    external: true
    driver: bridge

```



执行 `docker-compose up -d` 启动集群