// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

const currentYear = new Date().getFullYear()

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: '王思杰的技术笔记',
  tagline: '分享日常总结，工具框架的使用以及整理',
  url: 'https://simonwong.github.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.png',
  organizationName: 'simonwong',
  projectName: 'front-end-notes',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // algolia: {
      //   apiKey: '8397d833388be61b549778bf99f16cdf',
      //   indexName: 'technical_notes',
      //   contextualSearch: true,
      // },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        hideOnScroll: true,
        title: '王思杰的技术笔记',
        logo: {
          alt: 'logo',
          src: 'img/logo.png',
          width: 32,
          height: 32,
        },
        items: [
          {
            type: 'doc',
            docId: 'note/note',
            position: 'left',
            label: '日常笔记',
          },
          {
            type: 'doc',
            docId: 'advanced/advanced',
            position: 'left',
            label: '前端进阶',
          },
          {
            type: 'doc',
            docId: 'backend/backend',
            position: 'left',
            label: '后端',
          },
          {
            type: 'doc',
            docId: 'services/services',
            position: 'left',
            label: '服务器',
          },
          {
            type: 'doc',
            docId: 'computerbasic/computerbasic',
            position: 'left',
            label: '计算机基础',
          },
          {
            type: 'doc',
            docId: 'tools/tools',
            position: 'left',
            label: '工具',
          },
          {
            type: 'doc',
            docId: 'share/share',
            position: 'left',
            label: '分享',
          },
          {
            href: 'https://github.com/simonwong',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: '日常笔记',
                to: `/docs/note/daily/${currentYear}`,
              },
              {
                label: '前端进阶',
                to: '/docs/advanced',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/wsj_simonwong',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: '哎呦，你来啦',
                href: 'https://www.wangsijie.top/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/simonwong',
              },
            ],
          },
        ],
        copyright: `Copyright © 2019-${currentYear} Simon Wong.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}
