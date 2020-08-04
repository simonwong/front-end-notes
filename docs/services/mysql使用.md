# MySql 使用

- 登陆 mysql : `mysql -u root -p`



## 创建数据库

### 字符

`utf8` 支持范围广。 `utf8mb4` 一个字符最多能存4个字节，能支持更多的字符集，可以存放 emoji。



### 排序规则

`_ci` 结尾表示大小写不敏感（caseinsensitive）

`_cs` 表示大小写敏感（case sensitive）

`_bin` 表示二进制的比较（binary）



`_ai` 重音不敏感

`_as` 重音敏感



`_unicode` 基于标准的Unicode来排序和比较，能够在各种语言之间精确排序。实现了略复杂的算法

`_general` 在遇到某些特殊语言或者字符集，排序结果可能不一致。速度更快

`_0900` 是 Unicode 排序算法版本。（8.0 后更快了）



我的选择：`utf8mb4`  `utf8mb4_0900_ci_ai`



