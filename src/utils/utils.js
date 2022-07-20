// 获取距今天数
export function getDaysBetween (dateString2) {
  var startDate = Date.parse(Date())
  var endDate = Date.parse(dateString2)
  var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000)
  // alert(days);
  return Math.round(days)
}

// base64格式图片转为file对象
export function dataURLtoFile (dataurl, filename) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// 数字千分制
export function comdify (n) {
  console.log(n)
  var re = /\d{1,3}(?=(\d{3})+$)/g
  var n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) { return s1.replace(re, '$&,') + s2 })
  console.log(n1)
  return n1
}

/*
 * 时间格式化
 * */
function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export function formatterDate (date) {
  const d = date ? new Date(date) : new Date()
  return d.getFullYear() + '年' + formatNumber(d.getMonth() + 1) + '月' + formatNumber(d.getDate()) + '日' + ' ' + formatNumber(d.getHours()) + ':' + formatNumber(d.getMinutes())
}


// 分数变动提示窗口
export function showScore (res,n) {
  uni.showToast({
    icon: 'none',
    title: res >= 0 ? (res == 0 ? '您的身价没有变化' : `恭喜您，身价提升了` + res + '万') : `很遗憾，身价降低了了` + Math.abs(res) + '万',
    duration: n
  })
  return n
}