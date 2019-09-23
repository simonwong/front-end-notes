(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{236:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"提升开发体验"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提升开发体验","aria-hidden":"true"}},[t._v("#")]),t._v(" 提升开发体验")]),t._v(" "),a("h2",{attrs:{id:"npm-yarn-的镜像源配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#npm-yarn-的镜像源配置","aria-hidden":"true"}},[t._v("#")]),t._v(" npm yarn 的镜像源配置")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" config "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("set")]),t._v(" registry https://registry.npm.taobao.org --global\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" config "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("set")]),t._v(" disturl https://npm.taobao.org/dist --global\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" config "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("set")]),t._v(" registry https://registry.npm.taobao.org --global\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" config "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("set")]),t._v(" disturl https://npm.taobao.org/dist --global\n")])])]),a("h2",{attrs:{id:"git-clone-提升速度"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-clone-提升速度","aria-hidden":"true"}},[t._v("#")]),t._v(" git clone 提升速度")]),t._v(" "),a("p",[t._v("git 代理到 代理工具端口")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global http.proxy socks5://127.0.0.1:1080\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global https.proxy socks5://127.0.0.1:1080\n")])])]),a("p",[t._v("配置 hosts 文件")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("vi")]),t._v(" /etc/hosts\n")])])]),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token number"}},[t._v("151.101")]),t._v(".72.249 http://global-ssl.fastly.Net\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("192.30")]),t._v(".253.112 http://github.com\n")])])]),a("h2",{attrs:{id:"editorconfig"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#editorconfig","aria-hidden":"true"}},[t._v("#")]),t._v(" .editorconfig")]),t._v(" "),a("p",[t._v("配合 vscode 插件 EditorConfig 使用")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("# http://editorconfig.org\nroot = true\n\n[*]\nindent_style = space\nindent_size = 4\nend_of_line = lf\ncharset = utf-8\ntrim_trailing_whitespace = true\ninsert_final_newline = true\n\n[*.md]\ntrim_trailing_whitespace = false\n\n[Makefile]\nindent_style = tab\n")])])]),a("h2",{attrs:{id:"jsconfig-json"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jsconfig-json","aria-hidden":"true"}},[t._v("#")]),t._v(" jsconfig.json")]),t._v(" "),a("p",[t._v("当webpack 中设置了")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// webpack.config.js")]),t._v("\nalias"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./src'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])]),a("p",[t._v("为了在 vscode 中自动识别 @ 标示的路径，配置jsconfig.json")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// jsconfig.json / tsconfig.json")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"baseUrl"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"."')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"paths"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@/*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./src/*"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);