// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './lang'
import { Menu, MenuItemGroup, MenuItem, Submenu, Button, Select, Option } from 'element-ui'
import './index.css'

Vue.config.productionTip = false

// 在这里注入需要用到的组件
let componentArr = [
  Menu,
  MenuItemGroup,
  MenuItem,
  Submenu,
  Button,
  Select,
  Option
]

componentArr.forEach(item => {
  Vue.component(item.name, item)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
