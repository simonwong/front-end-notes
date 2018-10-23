# nginx反向代理 #

## mac下的操作 ##

> `brew search nginx` // 查询要安装的软件是否存在 

> `brew info nginx` // 查看软件的配置信息 

>  `brew install nginx` // 安装 

>  `/usr/local/etc/nginx` conf目录 

> `/usr/local/Cellar/nginx` nginx安装目录 



## mac下快捷命令 ##

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

