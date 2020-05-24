module.exports = {
  base: '/',
  title: '书房',
  description: '内容不明',
  plugins: [
    [
      '@vuepress/active-header-links',
      {
        sidebarLinkSelector: '.sidebar-link',
      },
      'vuepress-plugin-mathjax',
    ]
  ],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    nav: [
      { text: 'Home', link: '/' }
    ],
  }
}