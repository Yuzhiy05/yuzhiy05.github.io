import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

/**
 * 配置 单个 note
 */
const test1 = defineNoteConfig({
  dir: '/',
  link: '/test1/',
  sidebar: [
    '/chapter3-4.md',
    '/exception.md',
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
  notes: [test1] 
})