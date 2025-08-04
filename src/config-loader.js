import { resolve } from 'path';
import { existsSync } from 'fs';

export async function loadUserConfig() {
  const rcPathJs = resolve(process.cwd(), '.nextnacos.js');

  let rcPath = '';
  if (existsSync(rcPathJs)) {
    rcPath = rcPathJs;
  } else {
    throw new Error('❌[next-nacos] .nextnacos.js does not exist in the current directory');
  }

  const fileUrl = new URL(`file://${rcPath}`);
  const configModule = await import(fileUrl.href);
  const defineConfig = configModule.default;

  if (typeof defineConfig !== 'function') {
    throw new Error('❌[next-nacos] defineConfig should be a function');
  }

  const config = defineConfig();
  return config;
}