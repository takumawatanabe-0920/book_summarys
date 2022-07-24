const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/src/pages/index.tsx'),
  output: {
    publicPath: '/',
    // 出力先ディレクトリ
    path: path.join(__dirname, 'dist/public'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        // ts-loaderの設定
        test: /\.(js|ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: 'css-loader',
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
  //plugins: [new BundleAnalyzerPlugin()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {},
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    firebase: 'firebase',
    '@material-ui/core': 'MaterialUI',
  },
  //plugins: [new BundleAnalyzerPlugin()],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '/public'),
    host: '0.0.0.0',
    port: 3016,
    // hot: true,
    // inline: true,
    // stats: 'errors-only',
    // proxy: {
    //   '**': {
    //     target: `http://0.0.0.0:${config.get('port')}'}`,
    //     changeOrigin: true,
    //   },
    // },
  },
  devtool: 'source-map',
};
