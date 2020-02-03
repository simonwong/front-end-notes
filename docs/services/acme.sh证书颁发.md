#  acme.sh 证书颁发

[acme.sh 中文 wiki]([https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E](https://github.com/Neilpang/acme.sh/wiki/说明))

[使用 acme.sh 部署 Let's Encrypt 通过阿里云 DNS 验证方式实现泛域名 HTTPS](https://f-e-d.club/topic/use-acme-sh-deployment-let-s-encrypt-by-ali-cloud-dns-generic-domain-https-authentication.article)

## 安装acme.sh

```shell
curl  https://get.acme.sh | sh

# 重载 bashrc
source ~/.bashrc
```



## 常用命令

- `acme.sh --upgrade` 更新
- `acme.sh  --upgrade  --auto-upgrade` 自动更新
- `acme.sh --upgrade  --auto-upgrade  0` 关闭自动更新



## 添加配置

```
# .bashrc
export Ali_Key="AccessKeyId"
export Ali_Secret="AccessKeySecret"

# shell
source ~./bashrc
```





## DNS 验证

### 生成证书

```shell
acme.sh --issue --dns dns_ali -d wangsijie.top -d *.wangsijie.top
```

证书生成目录

`/root/.acme.sh/wangsijie.top/wangsijie.top.cer`
`/root/.acme.sh/wangsijie.top/wangsijie.top.key`
`/root/.acme.sh/wangsijie.top/ca.cer`
`/root/.acme.sh/wangsijie.top/fullchain.cer`

Ps: nginx 不能使用上面的目录，因为是动态的



## 拷贝/安装证书

```shell
acme.sh  --installcert  -d  <domain>.com
	--key-file   /etc/nginx/ssl/<domain>.key
	--fullchain-file /etc/nginx/ssl/fullchain.cer
	--reloadcmd  "service nginx force-reload"
```

```shell
acme.sh  --installcert  -d  wangsijie.top --key-file   /usr/local/nginx/conf/ssl/wangsijie.top.key --fullchain-file /usr/local/nginx/conf/ssl/fullchain.cer --reloadcmd  "service nginx force-reload"
```



## 参考

[acme.sh 中文 wiki]([https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E](https://github.com/Neilpang/acme.sh/wiki/说明))

[使用 acme.sh 部署 Let's Encrypt 通过阿里云 DNS 验证方式实现泛域名 HTTPS](https://f-e-d.club/topic/use-acme-sh-deployment-let-s-encrypt-by-ali-cloud-dns-generic-domain-https-authentication.article)

