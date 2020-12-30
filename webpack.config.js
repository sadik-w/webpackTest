const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//html插件引入
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//单独提取css的插件的引入
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//压缩css文件
module.exports = {
  entry: './src/main.js',
  // 输出目录
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  // 插件加载
  plugins: [
    new HtmlWebpackPlugin({//模板加载
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({//对输出的 css 文件进行重命名，放在css文件夹里面
      filename: 'css/built.css'
    }),
    // new OptimizeCssAssetsWebpackPlugin()//压缩css文件
  ],
  module: {
    // 匹配规则
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [  // 预设：指示 babel 做怎么样的兼容性处理
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',// 按需加载
                corejs: {  // 指定 core-js 版本
                  version: 3
                },
                targets: {  // 指定兼容性做到哪个版本浏览器
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      },
      {
        // 处理 css 资源
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 关闭 es6 模块化
          esModule: false,
          outputPath: 'imgs'
        }
      },
      {
        // 处理 html 中 img 资源
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // 处理其他资源
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'other'
        }
      }
    ]
  },
  // mode: 'development',//开发模式
  mode: 'production',// 生产环境下会自动压缩 js 代码
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),// 项目构建后路径
    compress: true,// 启动 gzip 压缩
    port: 3000,// 端口号
    open: true// 自动打开浏览器
  }
}