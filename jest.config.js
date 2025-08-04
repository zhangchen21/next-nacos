export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.js$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json' // 将 ts-jest 配置移到这里
      }
    ]
  },
  collectCoverage: true,
  coverageDirectory: 'coverage'
  // 移除原来的 globals 配置
};