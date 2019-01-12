import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './en.js'
import zh from './zh.js'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    en: Object.assign(en, enLocale),
    zh: Object.assign(zh, zhLocale)
  }
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n