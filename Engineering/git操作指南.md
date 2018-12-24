# `git`操作指南 #



![](http://on0m38azq.bkt.clouddn.com/18-5-22/91985389.jpg)



## 一些概念 ##

`HEAD` 指向当前分支上最近的一次提交



### 相对引用 ###

`HEAD^`向上移动1个提交记录

`HEAD~3`向上移动多个提交记录



## 常用操作 ##



### 查看 ###

`git log`显示最近的提交历史

`git log --pretty=oneline`简化历史显示

`git reflog`记录了每一次命令



### 分支 ###

`git checkout -b newBranch` 创建并切换新分支 

`git branch -f master HEAD~3` 强制将master分支的提交移动到HEAD的上3个提交

`git push origin --delete branch` 删除线上分支



### 合并 ###

`git merge --no-ff theBranch` 合并分支，并且保留原分支的提交历史

`git rebase theBranch` 线性的合并分支，theBranch变成了当前分支的父提交节点 



### 分离HEAD ###

`git checkout branch^` 相对引用到branch分支的上一个提交



### 撤销变更 ###

`git checkout -- file_name` 撤回更改

`git reset --hard 1094a` 

`git reset HEAD~2`

版本回退指定commit id的分支。或者HEAD的上几个位置。

> 但是reset后前面的变更，依然处于未加入暂缓区状态

`git revert HEAD`向下新增加一个提交，提交的内容为要撤回的提交的内容