// jest.config.js
module.exports = {
  // Diz ao Babel para processar arquivos .js
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  // Padrão para encontrar arquivos de teste.
  // Agora ele só vai rodar arquivos que terminam com .test.js
  testMatch: [
    '**/__tests__/**/*.test.js',
  ],
};