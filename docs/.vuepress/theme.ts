import { plumeTheme } from 'vuepress-theme-plume'

export default plumeTheme({
  hostname: 'https://github.com/Yuzhiy05/Yuzhiy05.github.io',
  //blog: false,开启这个博客页面不显示
  plugins: {
    shiki: {
      twoslash: true,
      lineNumbers: 10,
      languages: ["cpp", "powershell", "bash", "cmd"],
    },
    markdownEnhance: { demo: true },
    markdownPower: { caniuse: true, jsfiddle: true, },
  },
  autoFrontmatter: {
    permalink: true, // 是否生成永久链接
    createTime: true, // 是否生成创建时间
  },

locales: {
  "/zh/": {
  
  },
  "/en/": {
    
  },
},

})