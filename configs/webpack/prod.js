// production config
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = require('./common');

const paths = [
  '/about',
  '/blogs/page/0',
  '/blogs/page/1',
  '/article/require-context',
  '/article/bundle-size',
  '/article/aws-pipeline',
  '/article/lazy-loading',
];

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: 'js/bundle.[contenthash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 10000,
      cacheGroups: {
        posts: {
          minSize: 0,
          test: /assets[\\/]posts[\\/](.+)\.md/,
          name(module) {
            return `${module.resource
              .match(/(.*)assets[\\/]posts[\\/]([^\\/]+)\.md$/)[2]
              .replace('_', '')}`;
          },
          chunks: 'all',
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            return `npm.${module.context
              .match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              .replace('@', '')}`;
          },
        },
      },
    },
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
  devtool: 'source-map',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new SitemapPlugin({
      base: 'https://eams.dev',
      paths,
      options: {
        filename: 'map.xml',
      },
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /.js$|.css$/,
    }),
    new MiniCssExtractPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
});
