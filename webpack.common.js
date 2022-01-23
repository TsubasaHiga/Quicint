const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    bundle: './src/assets/scripts/main.ts',
  },
  output: {
    path: path.join(__dirname, '/dist/assets/scripts/'),
    filename: '[name].js',
  },
  cache: {
    // 1. Set cache type to filesystem
    type: 'filesystem',

    buildDependencies: {
      // 2. Add your config as buildDependency to get cache invalidation on config change
      config: [__filename],

      // 3. If you have other things the build depends on you can add them here
      // Note that webpack, loaders and all modules referenced from your config are automatically added
    },
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        // exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'auto-bind'),
          path.resolve(__dirname, 'node_modules', 'query-string'),
          path.resolve(__dirname, 'node_modules', 'split-on-first'),
          path.resolve(__dirname, 'node_modules', 'strict-uri-encode'),
        ],
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: 'tsconfig.json',
          },
        },
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}
