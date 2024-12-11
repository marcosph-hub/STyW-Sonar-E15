module.exports = {
    plugins: ["istanbul"], // Instrumenta el código para cobertura
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
    ],
  };
  