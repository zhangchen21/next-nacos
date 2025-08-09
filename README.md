# next-nacos

A command-line tool to sync configurations from [**alibaba/nacos**](https://github.com/alibaba/nacos) configuration center to [**Nextjs**](https://github.com/vercel/next.js) projects.

## Introduction

`next-nacos` is a convenient command-line tool that synchronizes configurations from the Nacos configuration center to the `.env` file of a Next.js project, making it easy to use these configurations in **both client-side and server-side components**.

## Install as a Project Dependency
```bash
npm install next-nacos --save-dev
```

## Configuration File

Create a `.nextnacos.js` file in the root directory of the project. Example content:
```javascript
module.exports = function defineConfig() {
  return {
    // Nacos server address
    serverAddr: 'localhost:8848',
    // Configuration ID
    dataId: 'next-app-config',
    // Configuration group
    group: 'DEFAULT_GROUP',
    // Optional: Namespace
    namespace: 'your-namespace-id',
    // Optional: Username
    username: 'nacos',
    // Optional: Password
    password: 'nacos'
  };
};
```

## Using Configurations in Next.js

After configuration synchronization, a `.env` file will be generated in the root directory of the project with the following content format:
```
NEXT_PUBLIC_NACOS='{"key":"value",...}'
```
In a Next.js project, you can access the configuration via `process.env.NEXT_PUBLIC_NACOS`:
```javascript
// Use in pages or components
const AppConfig = JSON.parse(process.env.NEXT_PUBLIC_NACOS || '{}');

console.log(AppConfig);
```

## Integrating into Project Workflow

1. Install dependencies
   ```bash
   npm install next-nacos --save-dev
   ```

2. Create the configuration file `.nextnacos.js`

3. Add scripts to `package.json`:
   ```json
   {
     "scripts": {
       "sync-config": "next-nacos",
       "dev": "npm run sync-config && next dev",
       "build": "npm run sync-config && next build"
     }
   }
   ```

4. Run the development environment:
   ```bash
   npm run dev
   ```

## Running Tests

We've completed jest tests:

```bash
npm test
```

## License
MIT
