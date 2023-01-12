import CryptoJS from 'crypto-js'

const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e6e143439161')
const SECRET_IV = CryptoJS.enc.Utf8.parse('e3bbe7e3ba84431a')

export const encrypt = (data: string): string => {
  return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).ciphertext.toString()
}

export const decrypt = (data: string): string => {
  return CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(data)), SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
    .toString(CryptoJS.enc.Utf8)
    .toString()
}
