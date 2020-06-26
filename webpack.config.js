/**
 *
 * webpack.config
 *
 * @description production に設定すると最適化、 development に設定するとソースマップ有効.
 *
 */
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const config = {
  watch: false,
  cache: true,
  mode: 'development',
  entry: {
    bundle: './src/assets/js/main.js'
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  performance: {
    hints: false
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false
                  }
                ]
              ]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
          output: {
            comments: 'all'
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HardSourceWebpackPlugin()
  ]
}

module.exports = config
