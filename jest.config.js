module.exports = {
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
    '^.+\\.(js)$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(d3.*|internmap)/)'],
  moduleNameMapper: {
    '^canvas$': 'nothing',
  },
  globals: {
    navigator: { userAgent: 'node.js' },
  },
};
