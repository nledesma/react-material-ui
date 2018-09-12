var webpack = require('webpack')
var path = require('path')
const Dotenv = require('dotenv-webpack')

var BUILD_DIR = path.resolve(__dirname, './public')
var APP_DIR = path.resolve(__dirname, './src')

var config = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    public: '0.0.0.0:3005'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: APP_DIR,
        query:
          {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.png$/,
        loader: 'file-loader'
      }, {
        test: /\.(woff2|woff|ttf|eot)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000&name=./fonts/[hash].[ext]'
      }, {
        test: /\.(svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000&name=./imgs/[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({multiStep: false}),
    new Dotenv()
  ]
}

module.exports = config
