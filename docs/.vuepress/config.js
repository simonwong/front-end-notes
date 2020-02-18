const moment = require('moment')

module.exports = {
    base: '/',
    title: '王思杰的前端笔记',
    description: '分享日常总结，工具框架的使用以及整理',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    themeConfig: {
        nav: [
            { text: '日常笔记', link: '/note/' },
            { text: '前端进阶', link: '/advanced/webpack/' },
            { text: '后端', link: '/backend/node基础/' },
            { text: '服务器', link: '/services/nginx基础/' },
            { text: '计算机基础', link: '/computerbasic/进制/' },
            { text: '工具', link: '/tools/' },
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
                        '/React/React笔记',
                        '/React/react hooks使用技巧',
                    ],
                },
                '常用的css',
                '构建脚手架',
                'webapp',
                '基础算法',
                'js语言精粹',
                '提升开发体验',
            ],
            '/重学前端/': [
                '',
                'html',
                'css',
                'javascript',
                'browser',
                'engineering-practice',
            ],
            // 前端进阶
            '/advanced/': [
                {
                    title: 'Webpack',
                    children: [
                        'webpack/',
                        'webpack/config',
                        'webpack/optimization',
                    ],
                },
                {
                    title: 'Git 操作指南',
                    children: [
                        'git/git操作指南',
                        'git/gitlab-workflow.md',
                        'git/mac多git账户配置',
                    ],
                },
                'npm',
                'yarn',
                'TypeScript',
                'TypeScript、Rollup 搭建工具库',
                '从 webpack 打包看前端模块化',
            ],
            // 后端
            '/backend/': [
                'node基础',
                'mongodb',
            ],
            // 服务器相关
            '/services/': [
                'nginx基础',
                'nginx配置https',
                'Docker基础',
                'Docker上各种镜像的使用',
                'acme.sh证书颁发',
            ],
            // 计算机基础
            '/computerbasic/': [
                '进制',
                'http',
            ],
            // 工具
            '/tools/': [
                '',
                'iTerm',
                'Charles',
            ],
        }
    },
    plugins: [
        ['@vuepress/back-to-top', true],
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    return moment(timestamp).fromNow()
                }
            }
        ],
        ['@vuepress/google-analytics', {
            ga: 'UA-148904867-1'
        }],
    ],
}