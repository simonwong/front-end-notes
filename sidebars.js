// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  /** 日常笔记 */
  note: [
    'note/note',
    {
      type: 'category',
      label: '日常笔记',
      items: ['note/daily/2022', 'note/daily/2021', 'note/daily/2018-2020'],
    },
    {
      type: 'category',
      label: 'TypeScript',
      items: [
        'note/typescript/generics',
        'note/typescript/practice',
        'note/typescript/qa',
      ],
    },
    {
      type: 'category',
      label: 'NPM',
      items: [
        'note/NPM/README',
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
    'note/justjavascript/README',
    'note/常用的css',
    'note/webapp',
    'note/正则表达式',
    'note/提升开发体验',
    'note/webpack4-note',
    'note/umi-note',
    'note/AppleScript-note',
    'note/macbook-note',
  ],

  /** 前端进阶 */
  advanced: [
    'advanced/advanced',
    {
      type: 'category',
      label: 'React 实践',
      items: [
        'advanced/react-practice/最佳实践',
        'advanced/react-practice/react-hooks使用技巧',
        'advanced/react-practice/React组件开发5种高级模式',
      ],
    },
    {
      type: 'category',
      label: '深入 React 系列',
      items: [
        'advanced/react-deep/README',
        'advanced/react-deep/fiber',
        'advanced/react-deep/react-glossary',
        'advanced/react-deep/react-18-feature',
        'advanced/react-deep/stage-render',
        'advanced/react-deep/stage-commit',
        'advanced/react-deep/react-fake',
        'advanced/react-deep/lane-model',
        'advanced/react-deep/diff',
        'advanced/react-deep/state-change',
        'advanced/react-deep/scheduler',
        'advanced/react-deep/synthetic-event',
      ],
    },
    {
      type: 'category',
      label: '深入 React 生态系列',
      items: [
        'advanced/react-ecology/README',
        'advanced/react-ecology/react-router',
        'advanced/react-ecology/react-redux',
        'advanced/react-ecology/zustand',
      ],
    },
    {
      type: 'category',
      label: 'Rollup',
      items: ['advanced/rollup/README', 'advanced/rollup/plugins'],
    },
    {
      type: 'category',
      label: 'Webpack',
      items: [
        'advanced/webpack/README',
        'advanced/webpack/config',
        'advanced/webpack/optimization',
        'advanced/umijs',
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
        'services/git/git-flow',
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
      label: '数据结构与算法',
      items: [
        'computerbasic/数据结构与算法/README',
        'computerbasic/数据结构与算法/复杂度分析',
        'computerbasic/数据结构与算法/数组与链表',
        'computerbasic/数据结构与算法/散列表',
        'computerbasic/数据结构与算法/二叉树',
        'computerbasic/数据结构与算法/二叉堆',
        'computerbasic/数据结构与算法/图/图',
        'computerbasic/数据结构与算法/排序算法',
      ],
    },
    {
      type: 'category',
      label: '设计模式',
      items: ['computerbasic/设计模式/README'],
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
    {
      type: 'category',
      label: 'C++',
      items: ['computerbasic/cpp_primer/README', 'computerbasic/cpp/README'],
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
      label: '2022',
      items: ['share/2022/包管理的坑', 'share/2022/commonjs与es模块的互操作'],
    },
    {
      type: 'category',
      label: '2021',
      items: [
        'share/2021/设计开发业务组件的个人实践',
        'share/2021/react-conf-2021',
      ],
    },
    {
      type: 'category',
      label: '2020',
      items: [
        'share/2020/算法分享递归到树到动态规划',
        'share/2020/TypeScript、Rollup搭建工具库',
        'share/2020/从webpack打包看前端模块化',
      ],
    },
    {
      type: 'category',
      label: '<=2019',
      items: [
        'share/older/ReactFiber架构浅析',
        'share/older/React性能优化方案',
        'share/older/TCP协议',
        'share/older/函数式编程之柯里化',
        'share/older/多版本包依赖问题探讨',
        'share/older/常见的函数组合',
        'share/older/纯函数',
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
  ],
}
