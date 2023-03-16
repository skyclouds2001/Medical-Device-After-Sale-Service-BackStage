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

type FileType = 'unknown' | 'DOCX' | 'XLSX' | 'PPTX' | 'PDF' | 'ZIP'

/**
 * 根据文件URL返回文件类型方法
 *
 * @param url 文件URL
 * @returns 文件类型
 */
export const getFileType = (url: string): FileType => {
  let type: FileType = 'unknown'
  if (url.includes('.docx')) {
    type = 'DOCX'
  } else if (url.includes('.xlsx')) {
    type = 'XLSX'
  } else if (url.includes('.pptx')) {
    type = 'PPTX'
  } else if (url.includes('.pdf')) {
    type = 'PDF'
  } else if (url.includes('.zip')) {
    type = 'ZIP'
  }
  return type
}
