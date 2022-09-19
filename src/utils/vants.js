// 按需引入所有用到的vant组件
import {
  Button, NavBar, CellGroup, Cell,
  Image, Dialog, Popup, Form, Field, Tabs, Tabbar,
  TabbarItem, Tab, PullRefresh, List, Divider, Tag, Search, Lazyload
} from 'vant'
const component = [Button, NavBar, CellGroup, Cell,
  Image, Dialog, Popup, Form, Field, Tabs, Tabbar,
  TabbarItem, Tab, PullRefresh, List, Divider, Tag, Search, Lazyload]
const vantPlugin = {
  install (Vue) {
    component.forEach(component => {
      Vue.use(component)
    })
  }
}

export default vantPlugin
