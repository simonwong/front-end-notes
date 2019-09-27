# Gitlab work flow



## 功能驱动

采用“[功能驱动式开发](https://en.wikipedia.org/wiki/Feature-driven_development)”(Feature-drien development)

> 它指的是，需求是开发的起点，先有需求再有功能分支（feature branch）或者补丁分支（hotfix branch）。完成开发后，该分支就合并到主分支，然后被删除。 

## Gitlab flow

> 是 Git flow 与 Github flow 的综合。它吸取了两者的优点，既有适应不同开发环境的弹性，又有单一主分支的简单和便利。

### 上游优先原则

即只存在一个主分支`master`，它是所有其他分支的"上游"。只有上游分支采纳的代码变化，才能应用到其他分支。 

### 持续发布

> 考虑到项目一般是“持续发布“的，不像多数组件项目是”版本发布“，建议使用”持续发布“的策略

建议在`master`主分支以外，再建立不同的环境分支。

项目中将长期存在的，”开发环境“的`master`主分支，”生产环境“的分支是`production`。后期增加测试后，可以在中间增加”预发环境“`pre-production`



![](http://file.wangsijie.top/18-8-16/29456959.jpg)

![](http://file.wangsijie.top/18-8-16/53700696.jpg)

如图

`master`开发分支是`pre-production`预发分支的”上游“，`pre-production`又是`production`的”上游“。必须由上游发展到下游。

`production`生产环境分支的代码始终跟线上同步。

因为git默认都是`master`分支，所以开发环境直接在`master`上将会很方便。

![](http://file.wangsijie.top/18-8-17/35569759.jpg)

### 开发流程

> 1. `master`拉取并开一个分支，建议命名`feature-*`,可以随意带个后缀，并push到线上，这是一个暂存的分支。
> 2. `feature-*`开发完成后`merge --no-ff`到`master`分支，并删除该分支。(另：合并到master的过程，\建议增加`pull request`)
>
> 1. `master`分支测试确认没有问题后，再进入到`pre-production`, 确认没问题后再进入`production`



## 注意事项

### Merge节点

Git有两种合并

> `git merge [branch]` 直进式合并，不生成合并节点。不利于保持commit信息的清晰，也不利于回滚
>
> `git merge [branch] --no-ff`非直进式合并，会生成单独节点。强烈建议使用这一种！！！



![](http://file.wangsijie.top/18-8-17/53775524.jpg)

### pull request

feature分支合并到master分支，通过`pull request`，在这一步可以进行`code review`

### 分支保护

建议给长存的分支增加保护，除了管理员不能随意修改这些分支。也只有管理员可以审批`pull request`

## 参考

> [Introduction to GitLab Flow](https://docs.gitlab.com/ee/workflow/gitlab_flow.html)
>
> [Git工作流程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)

