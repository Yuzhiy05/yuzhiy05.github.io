import { viteBundler } from '@vuepress/bundler-vite'
import theme from './theme.js'
import { defineUserConfig } from 'vuepress'


export default defineUserConfig({
  
  //theme: defaultTheme(),
   lang: 'zh-CN',
  //  locales: {
  //   '/': { lang: 'zh-CN', title: 'Yuzhiy', description: 'Yuzhiy blog' },
  // },
  head: [['link', { rel: 'icon', href: '/jager.ico' }]],
  theme,
  bundler: viteBundler(),
  
})