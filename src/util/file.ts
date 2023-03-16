import docx from '@/asset/file/word.svg'
import xlsx from '@/asset/file/xlsx.svg'
import pptx from '@/asset/file/ppt.svg'
import pdf from '@/asset/file/pdf.svg'
import zip from '@/asset/file/zip.svg'
import unknown from '@/asset/file/unknown.svg'

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

/**
 * 根据文件URL返回文件图标方法
 *
 * @param url 文件URL
 * @returns 文件图标URL
 */
export const getFileIcon = (url: string): string => {
  const type = getFileType(url)
  let icon: string
  switch (type) {
    case 'DOCX':
      icon = docx
      break
    case 'XLSX':
      icon = xlsx
      break
    case 'PPTX':
      icon = pptx
      break
    case 'PDF':
      icon = pdf
      break
    case 'ZIP':
      icon = zip
      break
    case 'unknown':
      icon = unknown
      break
    default:
      icon = unknown
      break
  }
  return icon
}
