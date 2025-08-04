import { loadUserConfig } from '../src/config-loader.js';
import { existsSync } from 'fs';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

describe('config-loader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should throw error when .nextnacos.js not exists', async () => {
    existsSync.mockReturnValue(false);
    
    await expect(loadUserConfig()).rejects.toThrow(
      '❌ [next-nacos] .nextnacos.js does not exist in the current directory'
    );
  });
});