# MedicalDeviceAfterSaleServiceBackstage

## 项目初始化

- 预先下载 node，node 建议版本 `16.x.x` `18.x.x`，npm 建议版本 `9.x.x`
- 项目根目录打开终端执行 `npm install`

## 项目技术栈

React+Vite+TypeScript+Sass

## 项目结构

- public 项目静态资源根目录
- src 项目源代码根目录
  - api/ 接口方法目录
    - admin.ts 管理员接口方法
    - company.ts 公司接口方法
    - customer.ts 客户接口方法
    - file.ts 文件接口方法
    - media.ts 资源接口方法
    - product.ts 产品接口方法
    - service.ts 客服接口方法
    - work-order.ts 工单接口方法
  - asset/ 静态资源目录
  - components/ 自定义组件目录
    - client
    - customer-service
    - file
    - product
    - work-order
  - config/ 配置数据目录
    - index.ts
  - data/ 静态数据目录
    - index.ts
  - model/ 数据模型目录
    - company.ts 公司数据结构
    - customer.ts 客户数据结构
    - department.ts 部门数据结构
    - file.ts 文件数据结构
    - product.ts 产品数据结构
    - service.ts 客服数据结构
    - user.ts 员工数据结构
    - work-order 工单数据结构
  - network 请求方法目录
    - index.ts
  - router 路由配置目录
    - index.ts
  - store 状态管理目录
    - index.ts
  - util/ 工具方法目录
    - crypto.ts 加解密方法
    - file.ts 文件方法
    - storage.ts 存储方法
  - view/ 页面目录
    - 404 默认重定向页
    - ClientManage 客户管理页
    - CustomerServiceManage 客服管理页
    - FileManage 文件管理页
    - LoginPage 登录页
    - ProductManage 产品管理页
    - WorkOrderManage 工单管理页
  - App.css
  - App.tsx
  - index.css
  - main.tsx
- index.html 根 HTML 入口文件
- package.json
- package-lock.json
- tsconfig.json
- vite.config.ts
- .gitattributes
- .gitignore
- LICENSE
- README.md

## 页面路由

```markdown
- 登录页 `/`
- 客户管理 `/client`
- 客服管理 `/service`
- 产品管理 `/product`
- 文件管理 `/file`
- 工单管理 `/order`
```

## 开发文档

- [产品文档](https://wizzstudio.feishu.cn/docx/doxcn3OPMHR2E2UbeU8PWE0EjFh)
- [概念图](https://modao.cc/app/uojxAUBurl46enoCEJNZy)
- [原型图](https://www.figma.com/file/AexzIo733ORZWnnNYJNRVo/%E5%AE%A2%E6%9C%8D%E5%B7%A5%E5%8D%95%E7%B3%BB%E7%BB%9F)
- [接口文档说明](https://wizzstudio.feishu.cn/docx/QYondktQKoDH2vx6n0BcEedCnVh)
- [新模块接口文档](https://www.apifox.cn/apidoc/shared-b274c37a-1f50-414f-97d8-b5ec3975541c?pwd=aftersale1111)

## 测试账号

账户名 `管理员`
账户密码 `aftersale1111`
