# mongodb 操作指令 #



## 数据库备份 ##

```
mongodump -h localhost:27017 -d [库名] -o [保存路径]
# 例子：
mongodump -h localhost:27017 -d ef_manage -o  D:\Mongo\backup
```

## 数据库导入 ##

```
mongorestore -h localhost:27017 -d [库名] [备份文件路径]
# 例子：
mongorestore -h 192.168.1.113:27017 -d ef_manage D:\Mongo\backup\ef_manage
```

## mongodb 放到服务中启动 ##

>- mongdb目录键新建 `log/mongo.log`
>- 管理员启动cmd

```
mongod --logpath D:\mongodb\log\mongo.log --dbpath D:mongoData --serviceName MongoDB --directoryperdb --install

# 启动服务
net start MongoDB

# 删除服务
sc delete MongoDB
```



