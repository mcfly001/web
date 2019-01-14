// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './lang'
import { Menu, MenuItemGroup, MenuItem, Submenu, Button, Dropdown, DropdownMenu, DropdownItem,
         Select, Option, Breadcrumb, BreadcrumbItem, Form, FormItem,
         Tabs, TabPane, Input, Table, TableColumn, Pagination } from 'element-ui'
import './index.css'

Vue.config.productionTip = false

// 在这里注入需要用到的组件
let componentArr = [
  Menu,
  MenuItemGroup,
  MenuItem,
  Submenu,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Select,
  Option,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Input,
  Table,
  TableColumn,
  Pagination
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
