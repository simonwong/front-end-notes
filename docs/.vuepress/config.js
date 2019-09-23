const moment = require('moment')

module.exports = {
    base: '/front-end-notes/',
    title: '王思杰的前端笔记',
    description: '王思杰的前端笔记，日常总结，工具使用，分享记录，框架使用等等',
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
            { text: '前端基础', link: '/basic/' },
            { text: '前端工程', link: '/engineering/' },
            { text: '后端', link: '/backend/' },
            { text: '计算机基础', link: '/computerbasic/' },
            { text: 'Github', link: 'https://github.com/simonjayw' },
        ],
        sidebar: {
            // 笔记
            '/note/': [
                '常用的css',
                '日常笔记',
                '构建脚手架',
                'webapp',
            ],
            '/重学前端/': [
                '',
                'html',
                'css',
                'javascript',
                'browser',
            ],
            // 前端基础
            '/basic/': [
                '基础算法',
                'js语言精粹',
            ],
            // 前端工程
            '/engineering/': [
                '模块',
                'yarn',
                'nginx配置',
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
        '@vuepress/back-to-top',
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    return moment(timestamp).fromNow()
                }
            }
        ]
    ],
}