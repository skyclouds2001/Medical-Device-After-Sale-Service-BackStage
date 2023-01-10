/** 应用名称 */
export const APPLICATION_NAME = 'MedicalDeviceAfterSaleServiceBackstage'

/** 应用版本 */
export const APPLICATION_VERSION = '0.0.0'

/** 网络请求HOST */
export const BASE_URL = 'http://aftersale.divergentcloud.com'

/** 默认网络超时时间 */
export const NETWORK_TIMEOUT = 10000

/** 默认请求无需token接口名单，若修改需同时修改后端 */
export const WHITE_LIST = ['/wizz/aftersale/account/admin/login', '/wizz/aftersale/account/admin/resetPassword']

/** 默认重定向路径 - 登录后默认跳转的路径 */
export const DEFAULT_REDIRECT_PATH = '/product'

/** 默认单页的容量，若修改需同时修改后端 */
export const DEFAULT_PAGE_SIZE = 10

/** 默认登录状态过期时间，若修改需同时修改后端 */
export const SESSION_EXPIRE = 3 * 24 * 60 * 60 * 1000
