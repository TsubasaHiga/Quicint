/**
 *
 * webpack.config
 *
 * @description production に設定すると最適化、 development に設定するとソースマップ有効.
 *
 */
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

const config = {
  watch: false,
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  mode: 'production',
  entry: {
    bundle: './src/assets/js/main.ts'
  },
  output: {
    path: path.join(__dirname, '/dist/assets/js/'),
    filename: '[name].js'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/auto'
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
  resolve: {
    // 拡張子を配列で指定
    extensions: [
      '.ts', '.js'
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}

module.exports = config
