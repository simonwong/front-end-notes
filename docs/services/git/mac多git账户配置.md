# Mac 多 git 账户配置

## 多账户

git 2.13.0 以后有一个叫 [conditional includes](https://git-scm.com/docs/git-config#_includes) 的功能，可以实现不同目录自动使用不同的 gitconfig。具体做法如下：

第一步：删掉 ~/.gitconfig 里的 user 章节，也就是不使用全局配置了

第二步：增加 includeIf 配置，意思是这两个目录下分别读不同的配置文件（**注意，路径后面一定要带`/`**）

```bash
[includeIf "gitdir:~/Code/Personal/"]
path = .gitconfig-personal
[includeIf "gitdir:~/Code/Work/"]
path = .gitconfig-work
```

```base
# .gitconfig-personal

[user]
name = My GitHub username
email = name@mail.com
```



## 多 git ssh

<https://segmentfault.com/a/1190000016269686>

<https://deepzz.com/post/how-to-setup-ssh-config.html>