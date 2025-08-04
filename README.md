# next-nacos

从 Nacos 配置中心同步配置到 Next.js 项目的命令行工具。

## 简介

`next-nacos` 是一个便捷的命令行工具，用于将 Nacos 配置中心的配置同步到 Next.js 项目的 `.env` 文件中，以便同时在客户端组件和服务端组件中便捷地使用这些配置。

## 安装
### 全局安装
npm install -g next-nacos

### 或作为项目依赖安装
npm install next-nacos --save-dev

## 使用方法

1. 在项目根目录创建配置文件 `.nextnacos.js`

2. 执行命令同步配置：
   ```bash
   # 全局安装时
   next-nacos
   
   # 项目依赖安装时
   npx next-nacos
   
   # 或在 package.json 的 scripts 中添加命令后执行
   npm run sync-config
   ```

## 配置文件

在项目根目录创建 `.nextnacos.js` 文件，示例内容：
module.exports = function defineConfig() {
  return {
    // Nacos 服务地址
    serverAddr: 'localhost:8848',
    // 配置 ID
    dataId: 'next-app-config',
    // 配置分组
    group: 'DEFAULT_GROUP',
    // 可选：命名空间
    namespace: 'your-namespace-id',
    // 可选：用户名
    username: 'nacos',
    // 可选：密码
    password: 'nacos'
  };
};

### 配置项说明
有效配置项即是 nacos 配置项：

| 配置项 | 类型 | 说明 | 是否必填 |
|--------|------|------|----------|
| serverAddr | string | Nacos 服务地址，格式为 `host:port` | 是 |
| dataId | string | 要获取的配置 ID | 是 |
| group | string | 配置所属的分组 | 是 |
| namespace | string | 配置所属的命名空间 ID | 否 |
| username | string | 访问 Nacos 的用户名 | 否 |
| password | string | 访问 Nacos 的密码 | 否 |
| requestTimeout | number | 请求超时时间（毫秒），默认 6000 | 否 |

## 在 Next.js 中使用配置

配置同步后，会在项目根目录生成 `.env` 文件，内容格式如下：
NEXT_PUBLIC_NACOS='{"key":"value",...}'
在 Next.js 项目中，可以通过 `process.env.NEXT_PUBLIC_NACOS` 访问配置：
// 在页面或组件中使用
const AppConfig = JSON.parse(process.env.NEXT_PUBLIC_NACOS || '{}');

console.log(AppConfig.apiUrl);

### 集成到项目流程

1. 安装依赖
   ```bash
   npm install next-nacos --save-dev
   ```

2. 创建配置文件 `.nextnacos.js`

3. 在 `package.json` 中添加脚本：
   ```json
   {
     "scripts": {
       "sync-config": "next-nacos",
       "dev": "npm run sync-config && next dev",
       "build": "npm run sync-config && next build"
     }
   }
   ```

4. 运行开发环境：
   ```bash
   npm run dev
   ```

## 测试
### 运行测试
npm test

### 许可证
MIT
