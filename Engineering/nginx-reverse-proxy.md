# nginx反向代理 #

## 原理 ##



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

