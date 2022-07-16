import Vue from 'vue'
import App from './App'
import store from './store'
import '@/plugins'
import config from '@/config'
import './directive/directive'
import share from '@/utils/share.js'
import uView from 'uview-ui'
Vue.mixin(share)
Vue.use(uView)

Vue.prototype.$IMAGES_URL = config.imgUrl
Vue.prototype.$OSS_IMAGES_URL = config.ossImgUrl
Vue.prototype.$UploadUrl = config.gatewayUrl + '/sys/oss/upload'
Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
