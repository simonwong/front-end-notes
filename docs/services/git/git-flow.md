# Git 工作流

## 工具安装

### git-flow-avh

使用 brew 安装 `git-flow-avh`，他是 `git-flow` 的 avh 版本。

就可以使用 git flow 命令了

### zsh plugin git-flow 

配置 `~/.zshrc` 添加一个 git-flow 插件

## 使用

### 初始化

```bash
git flow init

gfli
```

### 开发过程命令

1. **建立 feature 分支**

```bash
git flow feature start [branch-name]

gflfs
```

2. **完成 feature 分支，并且拉出 release**

```bash
git flow feature finish

gflff
```

```bash
git flow release start [branch-name]

gflrs
```

3. **完成 release 分支**

```bash
git flow release finish

gflrf
```

### hotfix 过程命令

1. **建立 hotfix 分支**

```bash
git flow hotfix start

gflhs
```

2. **完成 hotfix**

```bash
git flow hotfix finish

gflhf
```

### 查看信息

**列出存在的 feature 分支**

```bash
git flow feature

gflf
```

**列出存在的 hotfix 分支**

```bash
git flow hotfix

gflh
```

**列出存在的 release 分支**

```bash
git flow release

gflr
```



## 注意事项

### feature finish 自动快进

参考 https://github.com/nvie/gitflow/issues/100#issuecomment-769968

git-flow 在设计上，如果开发分支仅有一个 commit，就会开启快进。

```bash
if [ "$(git rev-list -n2 "$DEVELOP_BRANCH..$BRANCH" | wc -l)" -eq 1 ]; then
    git_do merge --ff "$BRANCH"
```



