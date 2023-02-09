// shared config (dev and prod)
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Mode = require('frontmatter-markdown-loader/mode');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [Mode.BODY],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html.ejs', favicon: './assets/favicon.ico' }),
    new CopyPlugin({
      patterns: [
        { from: '../src/assets/post-img', to: 'post-img' },
        '../src/assets/robots.txt',
        '../src/assets/img/profilePhoto.webp',
      ],
    }),
  ],
};
