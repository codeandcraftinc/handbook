import { argv } from 'yargs'


var argv = require('yargs').argv
var CleanWebpackPlugin = require('clean-webpack-plugin')
var CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin')
var dev = argv.dev

module.exports = {
  devServer: {
    contentBase: './public'
  },
  entry: {
    'scripts/index': './public/assets/scripts/index.js',
    'scripts/vendor': ['bluebird', 'react', 'react-dom', 'react-router', 'superagent'],
    'styles/index': './public/assets/styles/index.scss'
  },
  output: {
    filename: `[name]${dev ? '' : '-[hash]'}.js`,
    path: './public/dist',
    publicPath: `${dev ? 'http://localhost:8080' : ''}/dist/`
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
        include: [`${__dirname}/public/assets/scripts`]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass']),
        include: [`${__dirname}/public/assets/styles`]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: [`url?limit=10000&name=images/[name]${dev ? '' : '-[hash]'}.[ext]`, 'img']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
      }

    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public/dist']),
    new CommonsChunkPlugin('scripts/common', `scripts/common${dev ? '' : '-[hash]'}.js`),
    new ExtractTextPlugin(`[name]${dev ? '' : '-[hash]'}.css`),
    new ManifestPlugin({ basePath: '/dist/' })
  ],
  postcss: function () {
    return [
      require('autoprefixer')
    ];
  }
};
