import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "十分生动有趣的PyQt6中文教程！",
  description: "以PyQt6构建图形用户界面程序的非官方中文翻译",
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
      },

      {
        text: '自定义控件',
        items: [
          { text: '21. Qt 中的位图图形', link: '/CustomWidgets/21' },
          { text: '22. 创建自定义控件', link: '/CustomWidgets/22' },
          { text: '23. 在 Qt Designer 中使用自定义控件', link: '/CustomWidgets/23' }
        ]
      },

      {
        text: '并发执行',
        items:[
          { text: '24. 线程与进程简介', link: '/ConcurrentExecution/24' },
          { text: '25. 使用线程池', link: '/ConcurrentExecution/25' },
          { text: '26. QRunnable 示例', link: '/ConcurrentExecution/26' },
          { text: '27. 长期运行的线程', link: '/ConcurrentExecution/27' },
          { text: '28. 运行外部命令及进程', link: '/ConcurrentExecution/28' }
        ]
      },

      {
        text: '数据可视化',
        items: [
          { text: '29. 使用 PyQtGraph 进行数据可视化', link: '/Plotting/29' },
          { text: '30. 使用 Matplotlib 进行数据可视化', link: '/Plotting/30' },
        ]
      },

      {
        text: 'PyQt6的更多功能',
        items: [
          { text: '31. 计时器', link: '/FurtherPyQt6Features/31' },
          { text: '32. 自定义信号', link: '/FurtherPyQt6Features/32' },
          { text: '33. 使用相对路径', link: '/FurtherPyQt6Features/33' },
          { text: '34. 系统托盘与 macOS 菜单', link: '/FurtherPyQt6Features/34' },
          { text: '35. 枚举与 Qt 命名空间', link: '/FurtherPyQt6Features/35' },
          { text: '36. 使用命令行参数', link: '/FurtherPyQt6Features/36' }
        ]
      },

      {
        text: '打包与分发',
        items:[
          { text: '37. 使用PyInstaller进行打包', link: '/PackagingAndDistribution/37' },
          { text: '38. 使用InstallForge创建Windows安装程序', link: '/PackagingAndDistribution/38' },
          { text: '39. 创建 macOS 磁盘映像安装程序', link: '/PackagingAndDistribution/39' },
          { text: '40. 创建一个Linux软件包', link: '/PackagingAndDistribution/40' }
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
