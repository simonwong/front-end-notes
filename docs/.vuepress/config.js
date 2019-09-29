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
            {
                text: '笔记',
                items: [
                    {
                        text: '日常',
                        link: '/note/'
                    },
                    {
                        text: '重学前端',
                        link: '/重学前端/',
                    }
                ],
            },
            { text: '前端进阶', link: '/advanced/模块/' },
            { text: '工具', link: '/tools/' },
            { text: '后端', link: '/backend/node基础/' },
            { text: '计算机基础', link: '/computerbasic/进制/' },
            { text: 'Github', link: 'https://github.com/simonjayw' },
        ],
        sidebar: {
            // 笔记
            '/note/': [
                '',
                '日常笔记',
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
            ],
            // 前端进阶
            '/advanced/': [
                '模块',
                'yarn',
                'nginx配置',
                'git操作指南',
                'gitlab-workflow.md',
                'mac多git账户配置',
            ],
            // 工具
            '/tools/': [
                '',
                'iTerm',
            ],
            // 后端
            '/backend/': [
                'node基础',
                'mongodb',
            ],
            // 计算机基础
            '/computerbasic/': [
                '进制',
                'http',
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