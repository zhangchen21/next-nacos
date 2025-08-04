import { fetchNacosAndWrite } from '../src/nacos-client.js';
import { NacosConfigClient } from 'nacos';
import { writeFile } from 'fs/promises';

jest.mock('nacos');
jest.mock('fs/promises', () => ({
  writeFile: jest.fn()
}));

describe('nacos-client', () => {
  const mockConfig = {
    serverAddr: 'localhost:8848',
    dataId: 'test',
    group: 'DEFAULT_GROUP'
  };

  test('should fetch and write config successfully', async () => {
    NacosConfigClient.mockImplementation(() => ({
      getConfig: jest.fn().mockResolvedValue('{"test": "value"}')
    }));
    writeFile.mockResolvedValue();

    console.log = jest.fn();
    process.exit = jest.fn();

    await fetchNacosAndWrite(mockConfig);
    
    expect(writeFile).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('✅ [next-nacos] .env file has been written');
  });
});