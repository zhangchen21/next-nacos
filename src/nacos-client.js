import { NacosConfigClient } from 'nacos';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

export async function fetchNacosAndWrite(config) {
  const configClient = new NacosConfigClient({
    ...config,
    requestTimeout: 6000,
  });

  try {
    const data = await configClient.getConfig(config.dataId, config.group);
    const envPath = resolve(process.cwd(), '.env');
    await writeFile(envPath, `NEXT_PUBLIC_NACOS='${data}'\n`, 'utf-8');
    console.log('✅ [next-nacos] .env file has been written');
    process.exit(0);
  } catch (err) {
    console.error('❌ [next-nacos] Failed to get config from Nacos:', err.message);

    process.exit(1);
  }
}