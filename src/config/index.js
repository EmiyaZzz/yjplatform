// 根据环境引入不同配置 process.env.NODE_ENV
console.log('当前环境：' + process.env.NODE_ENV)
const config = require('./env.' + process.env.NODE_ENV)
module.exports = config
