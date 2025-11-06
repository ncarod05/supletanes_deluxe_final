const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // punto de entrada
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // para importar archivos sin escribir la extensión:
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Esto le dice a Babel que traduzca código JavaScript moderno y React
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/, // regla para CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'), // para el reporte, solo instrumenta código fuente
        loader: 'coverage-istanbul-loader',
        options: { esModules: true },
        enforce: 'post',
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
};