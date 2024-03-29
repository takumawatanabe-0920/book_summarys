const path = require('path');
const webpack = require('webpack');
const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [path.resolve(__dirname, './src/pages/index.tsx')],
  output: {
    publicPath: '/',
    // 出力先ディレクトリ
    path: path.join(__dirname, 'dist/public'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/react'] },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        use: [{ loader: 'json-loader' }],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'fonts',
            outputPath: 'fonts',
          },
        },
      },
      { test: /\.(gif|png|jpg|svg|)$/, use: 'url-loader' },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        HOST: JSON.stringify(config.get('host')),
        PORT: JSON.stringify(config.get('port')),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'), // パスの指定
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      src: path.resolve(__dirname, '/src'),
    },
  },
  externals: {
    '@material-ui/core': 'MaterialUI',
  },
  stats: {
    errorDetails: true,
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
