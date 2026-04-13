import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',
  title: "Chips",
  description: "PickingChip's Knowledge base",
  cleanUrls:true,/* 开启纯净链接 */
  lang: 'zh-CN',
  ignoreDeadLinks: false, /* 关闭忽略死链 */
  vite: {
    assetsInclude: ['**/*.PNG'],
  },
  
  head: [
    ['link',{ rel: 'icon', href: '/logo.png'}],
  ],
  // 站点地图
  sitemap: {
    hostname: 'https://github.com/PickingChip',
  },
  /* 更新显示 */
  lastUpdated: true, 

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    /* 站点标题 */
    siteTitle: 'Chips', 

    /* 导航栏 */
    nav: [
      { text: 'Home', link: '/' },
      { text: 'ES', link: '/ES/index'},
      { text: 'OS', link: '/OS/index'},
      { text: 'CS', link: '/CS/index'},
      { text: 'Other', link: '/Other/index'},
    ],

    /* 侧边栏 */
    sidebar: {
      '/ES/': [
        {
          text: 'ES',
          items: [
            { text: 'Stm32', link: '/ES/Stm32/Stm32开发/Stm32简介' },
            { text: '工具链', link: '/ES/工具链/编译器' },
            { text: '51单片机', link: '/ES/8051/51单片机' },
          ]
        }
      ],
      '/ES/Stm32/': [
        {
          text: 'Stm32',
          items: [
            {
              text: 'Stm32开发',
              items: [
                { text: 'Stm32简介', link: '/ES/Stm32/Stm32开发/Stm32简介' },
                { text: '开发环境', link: '/ES/Stm32/Stm32开发/开发环境' },
                { text: '启动过程', link: '/ES/Stm32/Stm32开发/启动过程' },
                { text: '系统架构', link: '/ES/Stm32/Stm32开发/系统架构' },
                { text: '项目组成', link: '/ES/Stm32/Stm32开发/项目组成' },
                { text: '调试工具', link: '/ES/Stm32/Stm32开发/调试工具' },
              ]
            },
            {
              text: 'Stm32外设',
              items: [
                { text: 'CAN', link: '/ES/Stm32/Stm32外设/CAN' },
                { text: 'IIC', link: '/ES/Stm32/Stm32外设/IIC' },
                { text: 'SPI', link: '/ES/Stm32/Stm32外设/SPI' },
                { text: 'TIM', link: '/ES/Stm32/Stm32外设/TIM' },
                { text: 'USART', link: '/ES/Stm32/Stm32外设/USART' },
              ]
            },
          ]
        }
      ],
      '/ES/工具链/': [
        {
          text: '工具链',
          items: [
            { text: '编译器', link: '/ES/工具链/编译器' },
            { text: '调试器', link: '/ES/工具链/调试器' },
            { text: '编辑器', link: '/ES/工具链/编辑器' },
            { text: '构建工具', link: '/ES/工具链/构建工具' },
          ]
        }
      ],
      '/ES/8051/': [
        {
          text: '8051',
          items: [
            { text: '51单片机', link: '/ES/8051/51单片机' },
          ]
        }
      ],

      '/OS/': [
        {
          text: 'OS',
          items: [
            { text: 'Linux', link: '/OS/Linux/Linux基础概念' },
            { text: 'FreeRTOS', link: '/OS/FreeRTOS/FreeRTOS' },
          ]
        }
      ],
      '/OS/Linux/': [
        {
          text: 'Linux',
          items: [
            { text: 'Linux', link: '/OS/Linux/Linux基础概念' },
          ]
        }
      ],
      '/OS/FreeRTOS/': [
        {
          text: 'FreeRTOS',
          items: [
            { text: 'FreeRTOS', link: '/OS/FreeRTOS/FreeRTOS' },
          ]
        }
      ],

      '/CS/': [
        {
          text: 'CS',
          items: [
            { text: '计算机基础知识', link: '/CS/计算机基础知识' },
            { text: '计算机网络', link: '/CS/计网' },
            { text: '计算机组成原理', link: '/CS/计组' },
          ]
        }
      ],
      '/Other/': [
        {
          text: 'Other',
          items: [
            { text: 'WSL', link: '/Other/WSL' },
            { text: '树莓派', link: '/Other/树莓派' },
            { text: 'μros', link: '/Other/μros' },
          ]
        }
      ]
    },
    

    /* 社交链接 */
    socialLinks: [
      { icon: 'github', link: 'https://github.com/PickingChip' }
    ],

    /* 搜索设置 */
    search: { 
      provider: 'local'
    }, 
        
    returnToTopLabel:'Top', /* 返回顶部文字修改 */

    /* 大纲设置 */
    outline: { 
      level: [2,3], 
      // level: 'deep', // 显示2-6级标题
      label: '大纲' // 文字显示
    },

    /* 更新时间设置 */
    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },
    /* 文档页脚设置 */
    docFooter: { 
      prev: '上一页', 
      next: '下一页', 
    }, 
  },
})
