(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{240:function(t,e,r){"use strict";r.r(e);var a=r(0),s=Object(a.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"构建脚手架"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#构建脚手架","aria-hidden":"true"}},[t._v("#")]),t._v(" 构建脚手架")]),t._v(" "),r("h2",{attrs:{id:"脚手架第三方工具"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#脚手架第三方工具","aria-hidden":"true"}},[t._v("#")]),t._v(" 脚手架第三方工具")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://github.com/tj/commander.js",target:"_blank",rel:"noopener noreferrer"}},[t._v("comander"),r("OutboundLink")],1),t._v("： "),r("code",[t._v("tj")]),t._v(" 大神出品的"),r("code",[t._v("nodejs")]),t._v("命令行解决方案，用于捕获控制台输入的命令；")]),t._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/chalk/chalk",target:"_blank",rel:"noopener noreferrer"}},[t._v("chalk"),r("OutboundLink")],1),t._v("：命令行文字配色工具；")]),t._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/moxystudio/node-cross-spawn",target:"_blank",rel:"noopener noreferrer"}},[t._v("cross-spawn"),r("OutboundLink")],1),t._v("：跨平台的 "),r("code",[t._v("node")]),t._v(" spawn/spawnSync 解决方案；")]),t._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/jprichardson/node-fs-extra",target:"_blank",rel:"noopener noreferrer"}},[t._v("fs-extra"),r("OutboundLink")],1),t._v("："),r("code",[t._v("nodejs")]),t._v(" "),r("code",[t._v("fs")]),t._v(" 的加强版，新增了API的同时，也包含了原"),r("code",[t._v("fs")]),t._v("的"),r("code",[t._v("API")]),t._v("；")]),t._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/wycats/handlebars.js/",target:"_blank",rel:"noopener noreferrer"}},[t._v("handlebars"),r("OutboundLink")],1),t._v("：一个字符串模板工具，可以将信息填充到模板的指定位置；")]),t._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/SBoudrias/Inquirer.js/",target:"_blank",rel:"noopener noreferrer"}},[t._v("inquirer"),r("OutboundLink")],1),t._v("：交互式命令行用户界面集合，用于使用者补充信息或是选择操作；")]),t._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/sindresorhus/log-symbols",target:"_blank",rel:"noopener noreferrer"}},[t._v("log-symbols"),r("OutboundLink")],1),t._v("：不同日志级别的彩色符号标志，包含了 "),r("code",[t._v("info")]),t._v("、"),r("code",[t._v("success")]),t._v("、"),r("code",[t._v("warning")]),t._v(" 和 "),r("code",[t._v("error")]),t._v(" 四级；")]),t._v(" "),r("li",[r("a",{attrs:{href:"https://github.com/sindresorhus/ora",target:"_blank",rel:"noopener noreferrer"}},[t._v("ora"),r("OutboundLink")],1),t._v("：动态加载操作符号；")])]),t._v(" "),r("h2",{attrs:{id:"命令-以及注册"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#命令-以及注册","aria-hidden":"true"}},[t._v("#")]),t._v(" 命令 以及注册")]),t._v(" "),r("p",[r("code",[t._v("package.json")]),t._v("中")]),t._v(" "),r("div",{staticClass:"language-json extra-class"},[r("pre",{pre:!0,attrs:{class:"language-json"}},[r("code",[r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"bin"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token property"}},[t._v('"create-react"')]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./main.js"')]),t._v("\n"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),r("p",[r("code",[t._v("main.js")]),t._v("中")]),t._v(" "),r("div",{staticClass:"language-js extra-class"},[r("pre",{pre:!0,attrs:{class:"language-js"}},[r("code",[t._v("#"),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("usr"),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("bin"),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("env node\n\nconsole"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),r("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Hello Bin'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),r("p",[r("code",[t._v("npm link")]),t._v(" 将当前 package 链接到全局执行环境")]),t._v(" "),r("p",[r("code",[t._v("npm unlink")])]),t._v(" "),r("p",[r("code",[t._v("npm install -g")]),t._v(" 将当前 package 全局安装到本地")]),t._v(" "),r("p",[r("code",[t._v("npm uninstall -g")])])])}),[],!1,null,null,null);e.default=s.exports}}]);