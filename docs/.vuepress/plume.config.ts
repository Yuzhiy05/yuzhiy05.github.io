import { defineThemeConfig, } from 'vuepress-theme-plume'
import notes from './notes.js'
import navbar from './navbar.js'


export default defineThemeConfig({
  logo: '/pro2.png',
  // docsRepo: 'https://github.com/Yuzhiy05/Yuzhiy05.github.io',
  // docsDir: 'docs',
  navbar,
  notes,

  profile: {
    name: 'Yuzhiy',
    description: '我心匪石不可转，我心匪席不可卷',
    avatar: '/pro2.png',//头像
    location: 'anhui',
    //organization: '您的组织',
    //circle: true, // 是否为圆形头像
    layout: 'right', // 个人信息在左侧还是右侧，'left' | 'right'
  },
  social: [
    { icon: 'github', link: 'https://github.com/Yuzhiy05/Yuzhiy05.github.io' },
    // ... more
  ],
  });