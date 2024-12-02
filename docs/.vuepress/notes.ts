import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

/**
 * 配置 单个 note
 */
const test1 = defineNoteConfig({
  dir: 'test1',
  link: '/test1/',
  sidebar: [
    {
      text: 'test1',
      link:'/test1/',
      items:[
      'chapter3-4.md',
      'exception.md',
      ],
    },
  ],
})
const math = defineNoteConfig({
  dir: 'math',
  link: '/math/',
  sidebar: [
    {
      text: 'math',
      link:'/math/',
      items:[
       'mathformula.md'
      ],
    },
  ]
})

/**
 * 配置 notes
 */
export default defineNotesConfig({
  // 声明所有笔记的目录，(默认配置，通常您不需要声明它)
  dir: '/notes/',
  link: '/',
  // 在这里添加 note 配置
  notes: [test1,math] 
})