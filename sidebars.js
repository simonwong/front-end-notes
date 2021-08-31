module.exports = {
  /** 日常笔记 */
  note: [
    'note/note',
    'note/日常笔记',
    {
      type: 'category',
      label: 'React',
      items: [
        'note/React/React笔记',
        'note/React/react-hooks使用技巧',
        'note/React/React组件开发5种高级模式',
      ],
    },
    {
      type: 'category',
      label: 'NPM',
      items: [
        'note/NPM/npm基础',
        'note/NPM/npm机制',
        'note/NPM/npm包开发',
        'note/NPM/yarn',
      ],
    },
    {
      type: 'category',
      label: '小程序',
      items: ['note/applet/taro'],
    },
    {
      type: 'category',
      label: 'Just JavaScript',
      items: [
        'note/justjavascript/README',
        'note/justjavascript/mental-models',
        'note/justjavascript/the-javascript-universe',
        'note/justjavascript/values-and-variables',
      ],
    },
    'note/常用的css',
    'note/webapp',
    'note/正则表达式',
    'note/提升开发体验',
    'note/webpack4-note',
    'note/typescript-note',
    'note/umi-note',
    'note/AppleScript-note',
    'note/macbook-note',
    'note/日常笔记2018-2020',
  ],

  /** 前端进阶 */
  advanced: [
    'advanced/advanced',
    {
      type: 'category',
      label: 'React 源码分析',
      items: [
        'advanced/react源码分析/README',
        'advanced/react源码分析/ReactDOM.render过程',
      ],
    },
    {
      type: 'category',
      label: 'Webpack',
      items: [
        'advanced/webpack/README',
        'advanced/webpack/config',
        'advanced/webpack/optimization',
      ],
    },
    'advanced/构建脚手架',
  ],

  /** 后端 */
  backend: [
    'backend/backend',
    'backend/node基础',
    'backend/服务性能调优',
    'backend/mongodb',
  ],

  /** 服务器相关 */
  services: [
    'services/services',
    {
      type: 'category',
      label: 'Git 操作指南',
      items: [
        'services/git/git操作指南',
        'services/git/gitlab-workflow',
        'services/git/mac多git账户配置',
      ],
    },
    'services/linux备忘手册',
    'services/nginx基础',
    'services/nginx配置https',
    'services/Docker基础',
    'services/Docker上各种镜像的使用',
    'services/acme.sh证书颁发',
    'services/mysql使用',
    'services/vim常用命令',
  ],

  /** 计算机基础 */
  computerbasic: [
    'computerbasic/computerbasic',
    {
      type: 'category',
      label: '数据结构与算法分析',
      items: [
        'computerbasic/数据结构与算法分析/README',
        'computerbasic/数据结构与算法分析/复杂度分析',
        'computerbasic/数据结构与算法分析/数据结构',
        'computerbasic/数据结构与算法分析/排序算法',
      ],
    },
    {
      type: 'category',
      label: '设计模式',
      items: [
        'computerbasic/设计模式/README',
        'computerbasic/设计模式/创建型模式',
      ],
    },
    {
      type: 'category',
      label: '计算机网络',
      items: [
        'computerbasic/计算机网络/README',
        'computerbasic/计算机网络/tcpip协议族',
        'computerbasic/计算机网络/http',
      ],
    },
    'computerbasic/二进制与位运算的实用操作',
  ],

  /** 工具 */
  tools: ['tools/tools', 'tools/iTerm', 'tools/Charles', 'tools/Homebrew'],

  /** 杂乱/分享 */
  share: [
    'share/share',
    {
      type: 'category',
      label: '重学前端',
      items: [
        'share/重学前端/README',
        'share/重学前端/html',
        'share/重学前端/css',
        'share/重学前端/javascript',
        'share/重学前端/browser',
        'share/重学前端/engineering-practice',
      ],
    },
    {
      type: 'category',
      label: '浏览器工作原理与实践',
      items: [
        'share/浏览器工作原理与实践/宏观视角下的浏览器',
        'share/浏览器工作原理与实践/浏览器中JS的执行机制',
        'share/浏览器工作原理与实践/v8工作原理',
        'share/浏览器工作原理与实践/浏览器的循环系统',
        'share/浏览器工作原理与实践/浏览器中的页面',
        'share/浏览器工作原理与实践/浏览器中的网络',
        'share/浏览器工作原理与实践/浏览器安全',
      ],
    },
    'share/TypeScript、Rollup搭建工具库',
    'share/从webpack打包看前端模块化',
    'share/ReactFiber架构浅析',
    'share/React性能优化方案',
    'share/TCP协议',
    'share/函数式编程之柯里化',
    'share/多版本包依赖问题探讨',
    'share/常见的函数组合',
    'share/算法分享递归到树到动态规划',
    'share/纯函数',
  ],
}