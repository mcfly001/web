// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './lang'
import SecondLevelTabList from "./components/SecondLevelTabList";
import { Col, DatePicker, TimePicker, Menu, MenuItemGroup, MenuItem, Submenu, Button, Dropdown, DropdownMenu, DropdownItem,
         Select, Option, Breadcrumb, BreadcrumbItem, Form, FormItem, Message, MessageBox,
         Tabs, TabPane, Input, Table, TableColumn, Pagination, Dialog, Radio, RadioGroup, Checkbox, Upload } from 'element-ui'
import './index.scss'

Vue.config.productionTip = false

// 在这里注入需要用到的组件
let componentArr = [
  SecondLevelTabList,
  Col,
  DatePicker,
  TimePicker,
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
  Pagination,
  Dialog,
  Radio,
  RadioGroup,
  Checkbox,
  Upload
]

componentArr.forEach(item => {
  Vue.component(item.name, item)
})

Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
