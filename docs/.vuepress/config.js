const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

module.exports = {
    base: '/',
    title: '王思杰的前端笔记',
    description: '分享日常总结，工具框架的使用以及整理',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['meta', { ['http-equiv']: 'cache-control', content: 'no-cache' }],
    ],
    themeConfig: {
        nav: [
            { text: '日常笔记', link: '/note/' },
            { text: '前端进阶', link: '/advanced/' },
            { text: '后端', link: '/backend/' },
            { text: '服务器', link: '/services/' },
            { text: '计算机基础', link: '/computerbasic/' },
            { text: '工具', link: '/tools/' },
            { text: '杂乱/分享', link: '/share/' },
            { text: 'Github', link: 'https://github.com/simonwong' },
        ],
        sidebar: {
            // 笔记
            '/note/': [
                '',
                '日常笔记',
                {
                    title: 'React',
                    children: [
                        'React/React笔记',
                        'React/react-hooks使用技巧',
                    ],
                },
                {
                    title: 'NPM',
                    children: [
                        'NPM/npm基础',
                        'NPM/npm机制',
                        'NPM/npm包开发',
                        'NPM/yarn',
                    ],
                },
                {
                    title: '小程序',
                    children: [
                        'applet/taro',
                    ],
                },
                {
                    title: 'Just JavaScript',
                    children: [
                        'justjavascript/',
                        'justjavascript/01.mental-models',
                        'justjavascript/02.the-javascript-universe',
                        'justjavascript/03.values-and-variables',
                    ],
                },
                '常用的css',
                'webapp',
                'js语言精粹',
                '提升开发体验',
                'webpack4-note',
                'typescript-note',
                'umi-note',
                'AppleScript-note',
                'macbook-note',
                '日常笔记2018-2020',
            ],
            // 前端进阶
            '/advanced/': [
                '',
                {
                    title: 'React 源码分析',
                    children: [
                        'react源码分析/',
                        'react源码分析/ReactDOM.render过程',
                    ],
                },
                {
                    title: 'Webpack',
                    children: [
                        'webpack/',
                        'webpack/config',
                        'webpack/optimization',
                    ],
                },
                '构建脚手架',
            ],
            // 后端
            '/backend/': [
                '',
                'node基础',
                '服务性能调优',
                'mongodb',
            ],
            // 服务器相关
            '/services/': [
                '',
                {
                    title: 'Git 操作指南',
                    children: [
                        'git/git操作指南',
                        'git/gitlab-workflow.md',
                        'git/mac多git账户配置',
                    ],
                },
                'linux备忘手册',
                'nginx基础',
                'nginx配置https',
                'Docker基础',
                'Docker上各种镜像的使用',
                'acme.sh证书颁发',
                'mysql使用',
                'vim常用命令',
            ],
            // 计算机基础
            '/computerbasic/': [
                '',
                {
                    title: '数据结构与算法分析',
                    children: [
                        '数据结构与算法分析/',
                        '数据结构与算法分析/复杂度分析',
                        '数据结构与算法分析/数据结构',
                        '数据结构与算法分析/排序算法',
                    ],
                },
                '进制',
                'http',
            ],
            // 工具
            '/tools/': [
                '',
                'iTerm',
                'Charles',
                'Homebrew',
            ],
            // 杂乱/分享
            '/share/': [
                '',
                {
                    title: '重学前端',
                    children: [
                        '重学前端/',
                        '重学前端/html',
                        '重学前端/css',
                        '重学前端/javascript',
                        '重学前端/browser',
                        '重学前端/engineering-practice',
                    ],
                },
                {
                    title: '浏览器工作原理与实践',
                    children: [
                        '浏览器工作原理与实践/1.宏观视角下的浏览器',
                        '浏览器工作原理与实践/2.浏览器中JS的执行机制',
                        '浏览器工作原理与实践/3.v8工作原理',
                        '浏览器工作原理与实践/4.浏览器的循环系统',
                        '浏览器工作原理与实践/5.浏览器中的页面',
                        '浏览器工作原理与实践/6.浏览器中的网络',
                        '浏览器工作原理与实践/7.浏览器安全',
                    ],
                },
                'TypeScript、Rollup搭建工具库',
                '从webpack打包看前端模块化',
                'ReactFiber架构浅析',
                'React性能优化方案',
                'TCP协议',
                '函数式编程之柯里化',
                '多版本包依赖问题探讨',
                '常见的函数组合',
                '算法分享递归到树到动态规划',
                '纯函数',
                '规范',
                '调用堆栈',
            ],
        }
    },
    locales: {
        '/': {
            lang: 'zh-CN',
        },
    },
    plugins: [
        ['@vuepress/back-to-top', true],
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }],
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    return dayjs(timestamp).fromNow()
                }
            }
        ],
        ['@vuepress/google-analytics', {
            ga: 'UA-148904867-1'
        }],
    ],
}