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
      },

      {
        text: 'Qt Designer(Qt设计师)',
        items:[
          { text: '11. 下载 Qt Designer', link: '/QtDesigner/11' },
          { text: '12. 开始使用 Qt Designer', link: '/QtDesigner/12' }
          
        ]
      },

      {
        text: '主题设计',
        items:[
          { text: '13. 样式', link: '/Theming/13' },
          { text: '14. 调色板', link: '/Theming/14' },
          { text: '15. 图标', link: '/Theming/15' },
          { text: '16. Qt 样式表 (QSS)', link: '/Theming/16' }
        ]
      },

      {
        text: '模型视图架构',
        items: [
          { text: '17. 模型视图架构 —— 模型视图控制器', link: '/ModelViewArchitecture/17' },
          { text: '18. 一个简单的模型视图——待办事项列表', link: '/ModelViewArchitecture/18' },
          { text: '19. 使用numpy和pandas处理模型视图中的表格数据', link: '/ModelViewArchitecture/19' },
          { text: '20. 使用Qt模型查询SQL数据库', link: '/ModelViewArchitecture/20' }
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
