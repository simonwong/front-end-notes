# nginx反向代理 #



## 作用 ##

- 解决跨域问题
- 请求过滤
- 配置gzip
- 负载均衡
- 静态资源服务器
- 。。。



## 反向代理 ##

> 为服务端服务的，反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等。
>
> 对服务端是透明的，对我们（客户端）是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。



## 基本结构 ##

![](http://file.wangsijie.top/share/nginx/20190312111900.png)

```
events {
    # 配置影响nginx服务器或与用户的网络连接
}
http {
    # 嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
    
    upstream {
        # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
    }
    
    server {
        # 配置虚拟主机的相关参数，一个http中可以有多个server
        
        location path {
            # 配置请求的路由，以及各种页面的处理情况。
        }
    }
}
```



## 跨域 ##

如：

- 前端服务域名为：fe.server.com
- 后端服务域名为：dev.server.com

```
server {
    listen	80;
    server_name fe.server.com;
    location / {
        proxy_pass dev.server.com;
    }
}
```



## 请求过滤 ##

根据状态码过滤

```
error_page 500 501 502 503 504 506 /50x.html;
location = /50x.html {
    # 将跟路径改编为存放html的路径。
    root /root/static/html;
}

```

根据url名称过滤

```
location / {
    rewrite  ^.*$ /index.html  redirect;
}
```

根据请求类型过滤

```
if ( $request_method !~ ^(GET|POST|HEAD)$ ) {
	return 403;
}
```



## 配置gzip ###

```
gzip                    on;
gzip_http_version       1.1;
gzip_comp_level         5; # 压缩级别，级别越大，压缩时间越长
gzip_min_length         1000; # 允许压缩的最小字节，小于则不压缩
gzip_types text/csv text/xml text/css text/plain text/javascript application/javascript application/x-javascript application/json application/xml;

```

## 负载均衡 ##

- 轮询策略
- 最小连接数策略
- 最快响应时间策略
- 客服端ip绑定



## 静态资源服务器 ##

```
location ~* \.(png|gif|jpg|jpeg)$ {
    root    /root/static/;  
    autoindex on;
    access_log  off;
    expires     10h;# 设置过期时间为10小时          
}
```



## mac 下的操作 ##

`brew search nginx` // 查询要安装的软件是否存在 

`brew info nginx` // 查看软件的配置信息 

`brew install nginx` // 安装 

`/usr/local/etc/nginx` conf目录 

`/usr/local/Cellar/nginx` nginx安装目录 



配置完，记得配hosts文件 

 `/private/etc/hosts` 



## mac 下快捷命令 ##

> `nginx -s reload|reopen|stop|quit` 重新加载配置|重启|停止|退出 



## 使用 ##

1. 下载nginx（[下载](https://nginx.org/en/download.html))，放到c盘
2. 修改conf文件夹下的nginx.conf

```
server {
	listen   80;
	server_name www.znckj.com;
	location / {
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $http_host;
		proxy_set_header X-Nginx-Proxy true;
		proxy_set_header Connection "";
		proxy_pass http://127.0.0.1:8080;
	}
}
```

3. 修改host文件

```
127.0.0.1      www.znckj.com
```

4. 启动nginx服务，就可以通过 www.znckj.com 访问来访问localhost:8080

