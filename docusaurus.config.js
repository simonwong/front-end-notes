const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '王思杰的技术笔记',
  tagline: '分享日常总结，工具框架的使用以及整理',
  url: 'https://simonwong.github.io/',
  baseUrl: '/',
  onBrokenLinks: 'error',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.png',
  organizationName: 'simonwong',
  projectName: 'front-end-notes',
  themeConfig: {
    hideableSidebar: true,
    // algolia: {
    //   apiKey: '',
    //   indexName: 'docusaurus-2',
    //   contextualSearch: true,
    // },
    navbar: {
      hideOnScroll: true,
      title: '王思杰的技术笔记',
      logo: {
        alt: 'logo',
        src: 'img/logo.png',
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
          type: 'search',
          position: 'right',
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
              to: '/docs/',
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
      copyright: `Copyright © 2019-${new Date().getFullYear()} Simon Wong.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
