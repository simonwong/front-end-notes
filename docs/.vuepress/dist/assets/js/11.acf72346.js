(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{220:function(a,o,t){"use strict";t.r(o);var e=t(0),n=Object(e.a)({},(function(){var a=this,o=a.$createElement,t=a._self._c||o;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"mongodb-操作指令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mongodb-操作指令","aria-hidden":"true"}},[a._v("#")]),a._v(" mongodb 操作指令")]),a._v(" "),t("h2",{attrs:{id:"数据库备份"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据库备份","aria-hidden":"true"}},[a._v("#")]),a._v(" 数据库备份")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("mongodump -h localhost:27017 -d [库名] -o [保存路径]\n# 例子：\nmongodump -h localhost:27017 -d ef_manage -o  D:\\Mongo\\backup\n")])])]),t("h2",{attrs:{id:"数据库导入"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据库导入","aria-hidden":"true"}},[a._v("#")]),a._v(" 数据库导入")]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("mongorestore -h localhost:27017 -d [库名] [备份文件路径]\n# 例子：\nmongorestore -h 192.168.1.113:27017 -d ef_manage D:\\Mongo\\backup\\ef_manage\n")])])]),t("h2",{attrs:{id:"mongodb-放到服务中启动"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mongodb-放到服务中启动","aria-hidden":"true"}},[a._v("#")]),a._v(" mongodb 放到服务中启动")]),a._v(" "),t("blockquote",[t("ul",[t("li",[a._v("mongdb目录键新建 "),t("code",[a._v("log/mongo.log")])]),a._v(" "),t("li",[a._v("管理员启动cmd")])])]),a._v(" "),t("p",[a._v("mac下启动mongodb服务")]),a._v(" "),t("blockquote",[t("p",[a._v("data目录（usr/local/Cellar/mongodb/data/db)")]),a._v(" "),t("p",[a._v("log目录（usr/local/Cellar/mongodb/)")]),a._v(" "),t("p",[a._v("conf目录（usr/local/etc/mongod.conf)")])]),a._v(" "),t("p",[t("code",[a._v("sudo mongod --config /usr/local/etc/mongod.conf")])]),a._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("mongod --logpath D:\\mongodb\\log\\mongo.log --dbpath D:mongoData --serviceName MongoDB --directoryperdb --install\n\n# 启动服务\nnet start MongoDB\n\n# 删除服务\nsc delete MongoDB\n")])])])])}),[],!1,null,null,null);o.default=n.exports}}]);