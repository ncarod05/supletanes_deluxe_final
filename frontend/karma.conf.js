const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    //excluir el app test js
    exclude: [
      'src/App.test.js'
    ],
    // Framework Jasmine y webpack
    frameworks: ['jasmine', 'webpack'],

    //cargamos los archivos
    files: [
      { pattern: 'public/assets/img/**/*', watched: false, included: false, served: true, nocache: false }, // para las imagenes
      { pattern: 'src/tests/**/*.spec.jsx', watched: false }           // Pruebas unitarias
    ],

    preprocessors: {
      'src/tests/**/*.spec.jsx': ['webpack']
    },

    // usar nuestra config
    webpack: webpackConfig,

    // Navegador sin cabeza (Headless)
    browsers: ['ChromeHeadless'],

    // Ejecutar una sola vez
    singleRun: true,

    // para tener una cobertura/reportes de las pruebas
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },
  });
};