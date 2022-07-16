'use strict'

import Vue from 'vue'
import axios from 'axios'
// import router from '@/router'
import qs from 'qs'
import { KEY_ACCESS_TOKEN } from '@/constants/common'
import loading from '@/utils/loading'
import getHeaders from '@/utils/headers'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || '',
  timeout: 60 * 1000, // Timeout
  validateStatus: function (status) {
    return status >= 200 && status < 300
  },
  crossDomain: true
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)
_axios.defaults.headers.post['Content-Type'] = 'application/json'

const errorHandler = (error) => {
  loading.hide()
  if (error && error.response) {
    switch (error.response.status) {
      case 400: error.message = '请求错误'; break
      case 401: error.message = '用户认证失败'; break
      case 403: error.message = '拒绝访问'; break
      case 404: error.message = '请求出错'; break
      case 408: error.message = '请求超时'; break
      case 500: error.message = '服务器错误'; break
      case 501: error.message = '服务未实现'; break
      case 502: error.message = '网络错误'; break
      case 503: error.message = '服务不可用'; break
      case 504: error.message = '网络超时'; break
      case 505: error.message = 'HTTP版本不受支持'; break
      default: error.message = `${error.response.status}:连接出错!`
    }
    if (error.response.status === 401) {
      // router.push('/401')
    }
    // eslint-disable-next-line no-undef
    uni.showToast({
      icon: 'none',
      title: `${error.message}`
    })
  }

  return Promise.reject(error)
}

_axios.interceptors.request.use(
  function (config) {
    if (config.www) {
      config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    loading.show()
    const token = Vue.ls.get(KEY_ACCESS_TOKEN)
    // Do something before request is sent
    if (config.method === 'post' && config.www) {
      config.data = qs.stringify(config.data)
    }
    if (token) {
      config.headers.Authorization = token   // config.headers.token = token
      config.headers.site = 'client'  //new add
    }
    config.headers = {
      ...config.headers,
      ...getHeaders()
    }
    return config
  },
  errorHandler
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    loading.hide()
    // Do something with response data
    if (response.data.code === 200 || response.data.code === 0 || response.data.TxnReturnCode === '000000') {
      // 判断data.data是否存在，没有直接返回data
      // eslint-disable-next-line no-prototype-builtins
      if (response.data.hasOwnProperty('data')) {
        return Promise.resolve(response.data.data)
      } else {
        return Promise.resolve(response.data)
      }
    } else if (Object.prototype.toString.call(response.data) === '[object Array]') {
      // 返回字典项
      return Promise.resolve(response.data)
    } else {
      // eslint-disable-next-line no-undef
      uni.showToast({
        icon: 'none',
        title: response.data.code ? `${response.data.msg}` : response.data.TxnReturnCode ? `${response.data.TxnReturnMsg}` : 'error'
      })
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ code: response.data.code, message: response.data.msg })
      // return errorHandler({ code: response.data.code, message: response.data.msg })
    }
  },
  errorHandler
)

const Plugin = {
  install (Vue) {
    Vue.axios = _axios
    // #ifdef H5
    window.axios = _axios
    // #endif
    Object.defineProperties(Vue.prototype, {
      axios: {
        get () {
          return _axios
        }
      },
      $axios: {
        get () {
          return _axios
        }
      }
    })
  }
}

Vue.use(Plugin)

export default Plugin

const post = function (url, data, config) {
  return _axios.post(url, data, config)
}

const get = (url, config = {}) => {
  return _axios.get(url, config)
}

const request = function (config) {
  return _axios.request(config)
}

export {
  _axios as axios,
  request,
  post,
  get
}
