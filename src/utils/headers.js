import Vue from 'vue'
import { randomUUID } from '@/utils/uuid'

let _headers = {
  requestId: randomUUID(),
  tmpTokenId: randomUUID(),
  terminalVersion: '2.0.0',
  terminalType: 'browser',
  siteId: '15'
}

// #ifdef H5
/* eslint no-useless-escape: "off" */
const UAParser = require('ua-parser-js').UAParser
var alipay = [[/(AlipayClient)\/([\w\.]+)/i], [UAParser.BROWSER.NAME, UAParser.BROWSER.VERSION]]
const uaParser = new UAParser({ browser: alipay })
_headers = Object.assign(_headers, {
  os: `${uaParser.getOS().name} ${uaParser.getOS().version}`,
  device: `${uaParser.getDevice().vendor} ${uaParser.getDevice().model}}`,
  browser: `${uaParser.getBrowser().name} ${uaParser.getBrowser().version}`
})
export {
  uaParser
}
// #endif

export default () => {
  let oppcSessionId = Vue.ss.get('oppcSessionId')
  if (!oppcSessionId) {
    oppcSessionId = randomUUID()
    Vue.ss.set('oppcSessionId', oppcSessionId)
  }
  return Object.assign(_headers, {
    requestId: randomUUID(),
    tmpTokenId: randomUUID(),
    oppcSessionId
  })
}
