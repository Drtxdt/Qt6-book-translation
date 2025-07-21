import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "以PyQt6构建图形用户界面程序",
  description: "非官方中文翻译",
  base: '/Qt6-book-translation/',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: [
      {
        // text: 'Examples',
        items: [
          { text: '引言', link: '/Introduction' },
          { text: 'PyQt6基本功能', link: '/BasicPyQt6Features' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Drtxdt/Qt6-book-translation' }
    ],

    footer: {
      message: '本翻译采用 CC BY-NC-SA 4.0 协议',
      copyright: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>'
    },

    search: {
      provider: 'local'
    }

  }
})
