import { loadUserConfig } from './config-loader.js';
import { fetchNacosAndWrite } from './nacos-client.js';

loadUserConfig()
  .then((config) => {
    fetchNacosAndWrite(config);
  })
  .catch((e) => {
    console.error(`❌[next-nacos] ${e.message}`);
  });