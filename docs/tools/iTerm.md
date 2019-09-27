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