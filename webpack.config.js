import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },
    plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};
