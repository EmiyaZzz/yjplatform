import CryptoJS from 'crypto-js/crypto-js'
/**
  // 密钥 (需要前端和后端保持一致)
  private static final String KEY = "shenjiarenrencha";
  // 算法
  private static final String ALGORITHMSTR = "AES/ECB/PKCS5Padding";
 */

// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse('shenjiarenrencha')// KEY
const IV = CryptoJS.enc.Utf8.parse('c@m.rencaIyoUjia')// IV

/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt (word) {
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, KEY, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  console.log(encrypted)
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
  // let key = KEY
  // let iv = IV

  // if (keyStr) {
  //   key = CryptoJS.enc.Utf8.parse(keyStr)
  //   iv = CryptoJS.enc.Utf8.parse(ivStr)
  // }

  // const srcs = CryptoJS.enc.Utf8.parse(word)
  // var encrypted = CryptoJS.AES.encrypt(srcs, key, {
  //   iv: iv,
  //   mode: CryptoJS.mode.CBC,
  //   padding: CryptoJS.pad.Pkcs7
  // })
  // // console.log("-=-=-=-", encrypted.ciphertext)
  // return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function Decrypt (word, keyStr, ivStr) {
  let key = KEY
  let iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }

  const base64 = CryptoJS.enc.Base64.parse(word)
  const src = CryptoJS.enc.Base64.stringify(base64)

  var decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
