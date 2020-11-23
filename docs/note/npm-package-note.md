# npm-package 笔记



## 本地测试

使用 `npm link` 或者 `yarn link` 

然后在你的项目中 `npm link package]` 或 `yarn link [package]` 来链接包。

就可以在项目是使用这个包了。



可能 link 后忘记了，然后会报

```
If this command was run in another folder with the same name, the other folder is still linked. Please run yarn unlink in the other folder if you want to register this folder.
```

只要去 `~/.config/yarn/link` 删除一下



## [lerna](https://github.com/lerna/lerna) 管理多个包的项目

`lerna bootstrap` 将包安装在根目录



## [np](https://github.com/sindresorhus/np) 优化 npm publish



