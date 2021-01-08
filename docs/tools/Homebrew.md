# Homebrew

## 常用命令

### 更新

```shell
brew update
```

### 库的查找、安装、更新、删除

```shell
brew search <formulae>
```

```shell
brew info <formulae>
```

安装/卸载
```shell
brew install <formulae>
brew uninstall <formulae>
```

查看哪些库有新版本

```shell
brew outdated
```

指定或一次性更新库

```shell
brew upgrade <formulae>
brew upgrade
```

### 分析

清理无用文件

```shell
brew cleanup
```

自行诊断

```shell
brew doctor
```

### 第三方库

查看已添加的三方库

```shell
brew tap
```

添加第三方库。`tap` 后再 `install`

```shell
brew tap <user/repo>
brew tap <user/repo> <URL>
```

移除

```shell
brew untap <user/repo>
```



## Homebrew Cask

> Homebrew Cask 可以说是 Homebrew 的一个衍生程序，是为了解决 macOS 上非 Mac App Store 的应用程序的管理问题

### 软件的查找、安装、更新、删除

```shell
brew tap caskroom/cask
brew cask search <formulae>
brew cask info <formulae>
brew cask install <formulae>
brew cask uninstall <formulae>
brew cask list
```

