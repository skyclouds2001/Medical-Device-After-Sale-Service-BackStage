/**
 * 读取图片文件为base64
 *
 * @param img 图片文件
 * @returns 图片Base64URL
 */
// eslint-disable-next-line @typescript-eslint/promise-function-async
export const getImageBase64 = (img: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.addEventListener('load', () => {
      if (reader.result != null) {
        resolve(reader.result as string)
      } else {
        reject(new Error('Reading Image as BASE64 failed.'))
      }
    })
    reader.addEventListener('error', () => {
      reject(reader.error)
    })
  })
}
