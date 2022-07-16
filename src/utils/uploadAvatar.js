/*
 * 上传文件获取url
 * */
import Vue from 'vue'
export function uploadFileReturnUrl(filePath) {
  return uni.uploadFile({
    url: Vue.$uploadUrl,
    filePath: filePath,
    name: 'file',
    header: {
      'token': Vue.ls.get('KEY_ACCESS_TOKEN'),
    }
  })
}