import { loadUserConfig } from '../src/config-loader.js';
import { fetchNacosAndWrite } from '../src/nacos-client.js';

jest.mock('../src/config-loader.js', () => ({
  loadUserConfig: jest.fn().mockResolvedValue({})
}));
jest.mock('../src/nacos-client.js', () => ({
  fetchNacosAndWrite: jest.fn().mockResolvedValue()
}));

let cliModule;
beforeAll(async () => {
  cliModule = await import('../src/cli.js');
});

describe('cli.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn();
    process.exit = jest.fn();
  });

  test('when loadUserConfig failed, should catch error and print', async () => {
    const mockError = new Error('Config loading failed');
    loadUserConfig.mockRejectedValueOnce(mockError);
    
    await loadUserConfig()
      .then((config) => fetchNacosAndWrite(config))
      .catch((e) => console.error(`❌ [next-nacos] ${e.message}`));

    expect(console.error).toHaveBeenCalledWith(
      `❌ [next-nacos] ${mockError.message}`
    );
    expect(fetchNacosAndWrite).not.toHaveBeenCalled();
  });

  test('when loadUserConfig success, should call fetchNacosAndWrite', async () => {
    const mockConfig = { serverAddr: 'test:8848', dataId: 'test', group: 'DEFAULT_GROUP' };
    loadUserConfig.mockResolvedValueOnce(mockConfig);

    await loadUserConfig()
      .then((config) => fetchNacosAndWrite(config))
      .catch((e) => console.error(`❌[next-nacos] ${e.message}`));

    expect(fetchNacosAndWrite).toHaveBeenCalledWith(mockConfig);
  });
});