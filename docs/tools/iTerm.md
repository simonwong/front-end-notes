# iTerm

## 常用命令

### 分屏

- 垂直分屏 `commond + d`
- 水平分屏 `commond + shift + d`

### 操作

- 清除当前行 `ctrl + u`
- 到行首 `ctrl + a`
- 到行尾 `ctrl + e`
- 清屏 `commond + r` 、 `clear`

### 无敌好用

- 剪贴板历史 `commond + shift + h`



## 初始化

### 终端

- 使用 zsh

```bash
chsh -s /bin/zsh
```

- 使用默认的 dash

```bash
chsh -s /bin/bash
```



### oh my zsh

- 安装 oh my zsh

```shell
# curl 安装方式
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# wget 安装方式
sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```



### powerline

- 安装 powerline

```shell
pip install powerline-status --user
```

- 没有 pip，安装pip

```shell
sudo easy_install pip
```



### 字体 PowerFonts

```shell
# git clone
git clone https://github.com/powerline/fonts.git --depth=1
# cd to folder
cd fonts
# run install shell
./install.sh
```

设置： iTerm2 -> Preferences -> Profiles -> Text -> Change Font -> Meslo LG有L、M、S可选



### 配色方案

```shell
git clone https://github.com/altercation/solarized
cd solarized/iterm2-colors-solarized/
open .
```

设置：iTerm2 -> Preferences -> Profiles -> Colors -> Color Presets



### 参考

https://segmentfault.com/a/1190000014992947#articleHeader0



## zsh 插件/主题

### Powerlevel10k

> Zsh 的主题，它强调速度，灵活，开箱即用

[他的文档](https://github.com/romkatv/powerlevel10k#readme)



搭配 oh my zsh 使用：

1. 下载安装

```shell
$ git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

2. 配置 zsh 主题

   在 `~/.zshrc`里设置 `ZSH_THEME="powerlevel10k/powerlevel10k"`

3. 重启 iterm 会自动提示 p10k 的设置导航，根据提示一步一步设置

4. 输入 `p10k configure` 可以再次重新配置。



他的常见问题，

当前工作目录路径过长，他本身也会帮助自适应简写前部分的路径，你也可以手动配置，

在 `~/.p10k.zsh` 找到 `POWERLEVEL9K_SHORTEN_DIR_LENGTH`  `POWERLEVEL9K_DIR_MAX_LENGTH` 等配置去配置他



## 一些好用的配置

### 像输入文本一样输入命令行

- 解决 fn + 方向键显示特殊符号的问题
- 解决 command + delete 等快速删除的问题

Preferences > Profiles > Keys 选择 Natural Text Editing

