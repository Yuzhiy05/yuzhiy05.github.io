import { defineNavbarConfig } from 'vuepress-theme-plume'

export default defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:home' },
  {
    text: '博客',
    link: '/blog/',
    activeMatch: '^/(blog|article)/',
    icon: 'material-symbols:menu-book',
  },
  { text: 'Projects', link: '/projects/', icon: 'ri:open-source-fill' },
  {
    text: '技术文档',
    icon: 'mdi:idea',
    activeMatch: '^/(vuepress-theme-plume|vuepress-plugin)/',
    items: [
      {
        text: 'c++',
        icon: 'vscode-icons:file-type-cpp3',
        items: [
          {
            text: 'cppreference',
            link: 'https://zh.cppreference.com/w/cpp',
            icon: 'vscode-icons:file-type-cpp3',
          },
          {
            text: 'libc++',
            link: 'https://github.com/llvm/llvm-project/blob/main/libcxx/include/__utility/exception_guard.h',
            icon: 'vscode-icons:folder-type-github',
          },
        ],
      },
      {
        text: 'C#',
        icon: 'vscode-icons:file-type-csharp2',
        items: [
          {
            text: 'winui3',
            link: 'https://learn.microsoft.com/zh-cn/windows/apps/how-tos/hello-world-winui3',
            icon: 'fa6-solid:folder-closed',
          },
          {
            text: 'winfrom',
            link: 'https://learn.microsoft.com/zh-cn/dotnet/api/system.windows.forms.richtextbox?view=windowsdesktop-8.0',
            icon: 'duo-icons:airplay'
          }
        ],
      },//留作以后拓展
//       {
//         text: 'Rspack / Rsbuild',
//         icon: 'https://assets.rspack.dev/rspack/rspack-logo.svg',
//         items: [
//           { 
//             text: 'rspack-plugin-mock',
//             link: 'https://github.com/pengzhanbo/rspack-plugin-mock',
//             icon: 'ant-design:api-outlined'
//           },
//         ]
//       },
//       {
//         text: 'CanIUse Embed',
//         link: 'https://caniuse.pengzhanbo.cn',
//         icon: 'https://caniuse.pengzhanbo.cn/favicon-128.png'
//       }
    ],
  },
  {
    text: '笔记',
    icon: 'icon-park-solid:bookshelf',
    items: [
      {
        text: '线性代数',
        link: '/tets1/',
        activeMatch: '^/test1',
        icon: 'emojione:memo',
      },
      {
        text: '微分方程',
        link: '/test2/',
        activeMatch: '^/test2/',
        icon: 'streamline:css-three',
      },
      {
        text: '解析几何',
        link: '/test1/',
        activeMatch: '^/test1/',
        icon: 'codicon:comment-unresolved',
      },
    //   {
    //     text: '4444',
    //     link: '/type-challenges/',
    //     activeMatch: '^/type-challenges/',
    //     icon: 'mdi:language-typescript',
    //   },
    //   {
    //     text: 'Rust学习简记',
    //     link: '/learn-rust/',
    //     activeMatch: '^/learn-rust/',
    //     icon: 'mdi:language-rust',
    //   },
    ],
  },
  {
    text: '更多',
    icon: 'mingcute:more-3-fill',
    items: [
      {
        text: '书籍推荐',
        link: '/ebooks/',
        icon: 'material-symbols:recommend',
        activeMatch: '^/ebooks/',
      },
      {
        text: '站点导航',
        link: '/sites-collect/',
        icon: 'mdi:roadmap',
        activeMatch: '^/sites-collect',
      },
      {
        text: 'Command-Line Interface',
        link: '/cli/',
        icon: 'grommet-icons:cli',
        activeMatch: '^/cli',
      },
    ],
  },
])