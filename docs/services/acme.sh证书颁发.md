#  acme.sh 证书颁发

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

> 注：以下为 DNS 验证，是通过配置一个随机的 TXT 记录来验证的

为了让 `acme.sh` 有权限自动添加 DNS 解析，需要在阿里云添加一个子用户。

1. **创建用户**：RAM 访问控制-> 人员管理 -> 创建用户（登录名和显示名随便填，自己知道这是哪个用户就行）

2. **添加权限**：添加 `AliyunDNSFullAccess` 该权限，来允许管理 DNS 解析

3. **创建 AccessKey**：在该用户下创建 accesskey，并在下面 `.bashrc` 中添加配置

   （注意，是在该子用户下创建，而不是AccessKey 管理下创建）

```shell
# .bashrc
export Ali_Key="AccessKeyId"
export Ali_Secret="AccessKeySecret"

# shell
source ~./bashrc
```

## DNS 验证

> 注：一下以 baidu.com 为例子，你需要改成你自己的域名

### 生成证书

`*.baidu.com` 表示适用于泛域名，也是说你的所有二级域名 `a.baidu.com` `b.baidu.com` 都用同一个证书，不需要一个一个配。

```shell
acme.sh --issue --dns dns_ali -d baidu.com -d *.baidu.com
```

### zerossl

在某个版本中， acme 默认使用 zerossl 了，跑上面的命令应该会有提示，可以根据提示注册 zerossl

把 `emial@gmail.com` 替换成你自己的邮箱

```shell
# 注册 zerossl
acme.sh --register-account -m emial@gmail.com --server zerossl

# 然后生成证书
acme.sh --server zerossl --issue --dns dns_ali -d baidu.com -d *.baidu.com
```

证书生成目录

`/root/.acme.sh/baidu.com/baidu.com.cer`
`/root/.acme.sh/baidu.com/baidu.com.key`
`/root/.acme.sh/baidu.com/ca.cer`
`/root/.acme.sh/baidu.com/fullchain.cer`



 注意：nginx 不能直接使用上面的目录，因为是动态的，需要继续操作

## 拷贝/安装证书

```shell
acme.sh --installcert \
-d  baidu.com \
--key-file    /usr/local/nginx/ssl/baidu.com.key \
--fullchain-file /usr/local/nginx/ssl/fullchain.cer \
--reloadcmd  "service nginx force-reload"
```

`key-file` 和 `fullchain-file` 表示你需要安装证书的目录

`reloadcmd` 相当于一个重启服务的，当证书更新后，需要通过重启你的 nginx 或者 docker 服务使得证书生效，你需要自己配置对应的命令。

**当 acme.sh 更新证书时，会运行该命令，来使得新证书生效**



## 参考

[acme.sh 中文 wiki](https://github.com/Neilpang/acme.sh/wiki/说明)

