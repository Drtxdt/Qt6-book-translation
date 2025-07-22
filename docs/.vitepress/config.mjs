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
        text: '引言',
        items: [
          { text: '1. 图形用户界面（GUI）简史', link: '/Introduction/1' },
          { text: '2. 关于Qt的一点小知识', link: '/Introduction/2' }
        ]
      },

      {
        text: 'PyQt6 基本功能',
        items: [
          { text: '3. 我的第一个应用程序', link: '/BasicPyQt6Features/3' },
          { text: '4. 信号与槽', link: '/BasicPyQt6Features/4' },
          { text: '5. 控件', link: '/BasicPyQt6Features/5' },
          { text: '6. 布局', link: '/BasicPyQt6Features/6' },
          { text: '7. 操作、工具栏与菜单', link: '/BasicPyQt6Features/7' },
          { text: '8. 对话框', link: '/BasicPyQt6Features/8' },
          { text: '9. 窗口', link: '/BasicPyQt6Features/9' },
          { text: '10. 事件', link: '/BasicPyQt6Features/10' }
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
