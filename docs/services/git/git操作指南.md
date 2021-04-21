# Git 操作指南



![](http://file.wangsijie.top/18-5-22/91985389.jpg)



## 一些概念

`HEAD` 指向当前分支上最近的一次提交


### 相对引用

`HEAD^`向上移动1个提交记录

`HEAD~3`向上移动多个提交记录



## git 问题处理

  - 每次 push 都要输入账号密码 

    1. ` git config --global credential.helper store` 缓存账号密码
    2. `cat ~/.gitconfig` 查看配置结果
    3. 配置 ssh

- 修改了 github 的账号，需要修改本地仓库的配置
    1. `git remote -v` 查看当前连接的远程仓库
    2. `git remote rm origin` 移除 origin
    3. `git remote add origin git@github.com:simonwong/react-universal-template.git` 重新关联
    4. `git push --set-upstream origin master` 设置上游



- 覆盖上一次commit
    1. `git commit --amend`
    2. `git commit --amend --reset-author` 



- fork 后，如何与原仓库同步
  1. `git remove -v` 查看远程仓库的路径，如果没有 `upstream` （上游代码库），继续
  2. `git remote add upstream [git 地址]` 向本地添加上游代码库
  3. 查看本地有没有需改，该 stash stash ，该 push push
  4. `git fetch upstream` 更新上游仓库
  5. 切到你要的分支 master 或者 feature 啥的，然后 `git merge upstream/master` （其实我有点担心会有 merge 节点，试了一次没有，如果有 merge 节点，可以试试 reabse）
  6. `git push`

## 常用操作

### 远程仓库a

`git remote add origin git@server-name:path/repo-name.git` 关联远程仓库

`git push -u origin master` 第一次关联后的推送

`git push -u origin HEAD` 关联分支

`git push origin <分支名> --force` commit 撤回后，推送。用来撤回线上的 commit push

### 查看

`git log`显示最近的提交历史

`git log --pretty=oneline`简化历史显示

`git reflog`记录了每一次命令

```
在命令行输入git reflog，会出现丢失的commit信息列
找到自己需要的commit行， git checkout -b recovery q1dw23d
git checkout master git merge recovery 切回主分支
```

### 分支

`git checkout -b newBranch` 创建并切换新分支 

`git remote update origin -p` 更新本地显示的远程分支

`git push origin --delete branch` 删除线上分支



### 合并

`git merge --no-ff theBranch` 合并分支，并且保留原分支的提交历史

`git rebase theBranch` 线性的合并分支，theBranch变成了当前分支的父提交节点 



### 分离`HEAD` 

> `HEAD`是一个对当前检出记录的符号引用
>
> 分离`HEAD`就是让其指向了某个具体的提交记录而不是分支名

`git checkout commit_id`从分支中分离HEAD并让它指向一个提交记录



- **相对引用**

> 在一个分支或`HEAD`开始计算，
>
> `^`向上移动1个提交记录
>
> `~<num>`向上移动多个提交记录

`git checkout branch^` 相对引用到branch分支的上一个提交

`git branch -f master HEAD~3` 强制将master分支的提交移动到HEAD的上3个提交



### 修改 commit

`git commit --amend`

`git commit --amend --author "name <email@email.com>"` 修改作者



### 撤销变更

`git checkout -- file_name` 撤回更改

`git reset --hard 1094a` 

`git reset HEAD~2`

版本回退指定commit id的分支。或者HEAD的上几个位置。

> 但是reset后前面的变更，依然处于未加入暂缓区状态

`git revert HEAD`向下新增加一个提交，提交的内容为要撤回的提交的内容

`git reset --soft HEAD^` 撤回 commit 且保留更改内容



### 变基

`git rebase -i asdas` asdas 提交之前的都合并

```
pick 97fe73f feat: update
pick 62573b8 feat: add 
```



```
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
```

pick 选择这个 commit 作为最新的代码

squash 将这个 commit 压缩



p

s

s





然后 `git rebase --contine`



### 贮藏

`git stash` 将变更贮藏

`git stash list` 贮藏列表

`git stash apply` 应用贮藏

`git stash drop stash${1}`  移除 



### tag 操作

- `git tag` 查看tag

- `git tag -a v1.1 -m "version1.1"` 创建tag
- `git show v1.1` 查看tag 信息
- `git push origin v1.1` 推送tag

