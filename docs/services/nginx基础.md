# nginx 配置

## 作用 ##

- 解决跨域问题
- 请求过滤
- 配置 gzip
- 负载均衡
- 静态资源服务器
- 。。。



## 基本结构

![](https://file.wangsijie.top/share/nginx/20190312111900.png)



```
# 工作进程的数量
worker_processes 1;

# 配置影响nginx服务器或与用户的网络连接
events {
    worker_connections  1024; # 每个工作进程连接数
}

# 嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
http {
    include       mime.types;
    default_type  application/octet-stream;

    # 日志格式
    log_format  access  '$remote_addr - $remote_user [$time_local] $host "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for" "$clientip"';
    access_log  /srv/log/nginx/access.log  access; # 日志输出目录
    gzip  on;
    sendfile  on;

    # 链接超时时间，自动断开
    keepalive_timeout  60;
	
	# 配置后端服务器具体地址，负载均衡配置不可或缺的部分
    upstream {
        
    }
    
    # 配置虚拟主机的相关参数，一个http中可以有多个server
    server {
        listen       8080;
        server_name  localhost; # 浏览器访问域名

        charset utf-8;
        access_log  logs/localhost.access.log  access;

        
        # 路由
        location / {
            root   www; # 访问根目录
            index  index.html index.htm; # 入口文件
        }
    }
    
    # 引入其他的配置文件
    include servers/*;
}
```



## 反向代理 ##

> 为服务端服务的，反向代理可以帮助服务器接收来自客户端的请求，帮助服务器做请求转发，负载均衡等。
>
> 对服务端是透明的，对我们（客户端）是非透明的，即我们并不知道自己访问的是代理服务器，而服务器知道反向代理在为他服务。



## 搭建站点 ##

```nginx
# 虚拟主机
server {
    listen       8080;
    server_name  xx_domian; # 浏览器访问域名

    charset utf-8;
    access_log  logs/xx_domian.access.log  access;

    # 路由
    location / {
        root   www; # 访问根目录
        index  index.html index.htm; # 入口文件
    }
}
```





## 跨域 ##

如：

- 前端服务域名为：fe.server.com
- 后端服务域名为：dev.server.com

```nginx
server {
    listen	80;
    server_name fe.server.com;
    
    ## 1. 用户访问 fe.server.com，则反向代理到 dev.server.com
    location / {
        proxy_pass dev.server.com;
        proxy_redirect     off;
        proxy_set_header   Host             $host;        # 传递域名
        proxy_set_header   X-Real-IP        $remote_addr; # 传递ip
        proxy_set_header   X-Scheme         $scheme;      # 传递协议
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
    
    
    location /README.md {
        proxy_set_header  X-Real-IP  $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass https://github.com/zibinli/blog/blob/master/README.md;
	}
}
```



## 请求过滤 ##

根据状态码过滤

```nginx
error_page 500 501 502 503 504 506 /50x.html;
location = /50x.html {
    # 将跟路径改编为存放html的路径。
    root /root/static/html;
}

```

根据url名称过滤

```nginx
location / {
    rewrite  ^.*$ /index.html  redirect;
}
```

根据请求类型过滤

```nginx
if ( $request_method !~ ^(GET|POST|HEAD)$ ) {
	return 403;
}
```



## 配置gzip ###



> 默认情况下，Nginx的gzip压缩是关闭的， gzip压缩功能就是可以让你节省不
> 少带宽，但是会增加服务器CPU的开销哦，Nginx默认只对text/html进行压缩 ，
> 如果要对html之外的内容进行压缩传输，我们需要手动来设置。



```nginx
server {
    gzip on; # 开启gzip 压缩
    gzip_http_version 1.1; # 设置gzip所需的http协议最低版本 （HTTP/1.1, HTTP/1.0）
    gzip_comp_level 4; # 设置压缩级别，压缩级别越高压缩时间越长  （1-9）
    gzip_min_length 1000; # 设置压缩的最小字节数， 页面Content-Length获取
    gzip_types text/plain application/javascript text/css; # 设置压缩文件的类型  （text/html)
}
```

## 负载均衡 ##

- 轮询策略
- 最小连接数策略
- 最快响应时间策略
- 客服端ip绑定



```nginx
http {
    upstream test.net {
        ip_hash;
        server 192.168.10.13:80;
        server 192.168.10.14:80  down;
        server 192.168.10.15:8009  max_fails=3  fail_timeout=20s;
        server 192.168.10.16:8080;
    }
    server {
        location / {
            proxy_pass  http://test.net;
        }
    }
}
```





## 静态资源服务器 ##

```nginx

http {
    # 这个将为打开文件指定缓存，默认是没有启用的，max 指定缓存数量，
    # 建议和打开文件数一致，inactive 是指经过多长时间文件没被请求后删除缓存。
    open_file_cache max=204800 inactive=20s;

    # open_file_cache 指令中的inactive 参数时间内文件的最少使用次数，
    # 如果超过这个数字，文件描述符一直是在缓存中打开的，如上例，如果有一个
    # 文件在inactive 时间内一次没被使用，它将被移除。
    open_file_cache_min_uses 1;

    # 这个是指多长时间检查一次缓存的有效信息
    open_file_cache_valid 30s;

    # 


    server {
        listen       80;
        server_name www.test.com;
        charset utf-8;
        root   /data/www.test.com;
        index  index.html index.htm;
        
        location ~* \.(png|gif|jpg|jpeg)$ {
            root    /root/static/;  
            autoindex on;
            access_log  off;
            expires     10h;# 设置过期时间为10小时          
        }
    }
}
```



```nginx
location ~.*\.css$ {
    expires 1d;
    break;
}
location ~.*\.js$ {
    expires 1d;
    break;
}

location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
    access_log off;
    expires 15d;    #保存15天
    break;
}
```



## 禁止文件缓存 ##

```nginx
location ~* \.(js|css|png|jpg|gif)$ {
    add_header Cache-Control no-store;
}
```



## 防盗链 ##

```nginx
location ~* \.(gif|jpg|png)$ {
    # 只允许 192.168.0.1 请求资源
    valid_referers none blocked 192.168.0.1;
    if ($invalid_referer) {
       rewrite ^/ http://$host/logo.png;
    }
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



## 快捷命令 ##

> `nginx -s reload|reopen|stop|quit` 重新加载配置|重启|停止|退出 



