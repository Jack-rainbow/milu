import {
  Col,
  Row,
  Input,
  Modal,
  Button,
  Radio,
  Form,
  Menu,
  Table
} from "ant-design-vue"
// 内部组件
import SvgIcon from '@/components/svg-icon.vue'

const ant = {
  install(Vue: any) {
    // component 注册常用组件
    Vue.component(Col.name, Col)
    Vue.component(Row.name, Row)
    Vue.component(Modal.name, Modal)
    Vue.component(Input.name, Input)
    Vue.component(Input.Search.name, Input.Search)
    Vue.component(Input.TextArea.name, Input.TextArea)
    Vue.component(Input.Password.name, Input.Password)

    // 内部组件
    Vue.component(SvgIcon.name, SvgIcon)
    // other 其他组件
    Vue.component(Button.name, Button)
    Vue.component(Table.name, Table)
    Vue.use(Radio)
    Vue.use(Menu)
    Vue.use(Form)
  },
}
export default ant
