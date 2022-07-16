
export default {
  show () {
    // eslint-disable-next-line no-undef
    uni.showLoading({
      mask: true,
      title: '加载中'
    })
  },
  hide () {
    // eslint-disable-next-line no-undef
    uni.hideLoading()
  }
}
