# next-nacos

A command-line tool to sync configurations from Nacos configuration center to Next.js projects.

## Introduction

`next-nacos` is a convenient command-line tool that synchronizes configurations from the Nacos configuration center to the `.env` file of a Next.js project, making it easy to use these configurations in both client-side and server-side components.

# Global Installation
```bash
npm install -g next-nacos
```

# Or Install as a Project Dependency
```bash
npm install next-nacos --save-dev
```

## Usage

1. Create a configuration file `.nextnacos.js` in the root directory of the project.

2. Execute the command to sync configurations:
   ```bash
   # When installed globally
   next-nacos
   
   # When installed as a project dependency
   npx next-nacos
   
   # Or execute after adding the command to the scripts in package.json
   npm run sync-config
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

## Configuration File
### Configuration Item Description
Valid configuration items are Nacos configuration items:

| Configuration Item | Type | Description | Required |
|--------|------|------|----------|
| serverAddr | string | Nacos server address, in the format `host:port` | Yes |
| dataId | string | The configuration ID to obtain | Yes |
| group | string | The group to which the configuration belongs | Yes |
| namespace | string | The namespace ID to which the configuration belongs | No |
| username | string | Username for accessing Nacos | No |
| password | string | Password for accessing Nacos | No |
| requestTimeout | number | Request timeout in milliseconds, default 6000 | No |

## Using Configurations in Next.js

After configuration synchronization, a `.env` file will be generated in the root directory of the project with the following content format:
```
NEXT_PUBLIC_NACOS='{"key":"value",...}'
```
In a Next.js project, you can access the configuration via `process.env.NEXT_PUBLIC_NACOS`:
```javascript
// Use in pages or components
const AppConfig = JSON.parse(process.env.NEXT_PUBLIC_NACOS || '{}');

console.log(AppConfig.apiUrl);
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

# Running Tests
```bash
npm test
```

## License
MIT