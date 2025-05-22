const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const ImageWebpackLoader = require('image-webpack-loader');

const smp = new SpeedMeasurePlugin();
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const isdev = process.env.NODE_ENV == "development";
const { htmlTemplate, entry } = require('./webpack.pages');
const defaultTemplate = process.env.npm_package_config_project;
require("./src/components/bar-title/mock");
// if (isdev) {
//   require(`./serves/ajax`)
// }
const commonPostcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        'postcss-preset-env'
      ]
    }
  }
};

const moduleConfig = {
  entry,
  output: {
    filename: "js/[name].js?t=[contenthash:8]",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  cache: {
    type: "filesystem",
  },
  module: {
    rules: [{
      test: /\.(less)$/i,
      use: [isdev ? "style-loader" : MiniCssExtractPlugin.loader, {
        loader: "css-loader",
        options: {
          modules: false
        }
      }, commonPostcssLoader, "less-loader"]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [isdev ? "style-loader" : MiniCssExtractPlugin.loader, {
        loader: "css-loader",
        options: {
          modules: false,
          sassOptions: {
            quietDeps: true, // 抑制弃用警告
          },
        }
      }, commonPostcssLoader, "sass-loader"]
    },
    {
      test: /\.(png|gif|jpe?g|svg)$/i,
      type: "asset/resource",
      // use: [
      //   'file-loader',
      //   {
      //     loader: 'image-webpack-loader',
      //     options: {
      //       mozjpeg: {
      //         progressive: true,
      //         quality: 75 // 调整JPEG图片的质量
      //       },
      //       optipng: {
      //         enabled: false // 是否启用optipng压缩
      //       },
      //       pngquant: {
      //         quality: [0.65, 0.90], // PNG图片的质量范围
      //         speed: 4
      //       },
      //       gifsicle: {
      //         interlaced: false // 是否启用对GIF图片的交错处理
      //       },
      //       webp: {
      //         quality: 75 // 转换为webp格式的图片质量
      //       }
      //     }
      //   }
      // ],
      generator: {
        filename: 'images/[contenthash:8][ext]'
      }
    },
    {
      test: /\.html$/,
      loader: "html-loader",
      options: {
        esModule: true
      }
    },
    {
      test: /\.ejs$/,
      loader: "ejs-loader",
      options: {
        esModule: false,
        attrs: [':data-src', ":src"]
      }
    },
    {
      test: /\.tsx?$/,
      loader: "ts-loader"
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, "src"),
      use: {
        loader: 'babel-loader',
        options: {
          sourceMap: "inline",
          retainLines: true,
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'usage',
              corejs: {
                version: 3
              },
              targets: {
                chrome: '60',
                firefox: '60',
                ie: '9',
                safari: '10',
                edge: '17',
                node: 'current'
              }
            }]
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
            ["@babel/plugin-proposal-private-methods", { "loose": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ["@babel/transform-for-of"]
          ],
          cacheDirectory: false
        }
      }
    }]
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        terserOptions: {},
      })
    ],
    concatenateModules: true,
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量如果超出会单独生成一个模块
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      // 修改配置
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      }
    }
  },
  mode: process.env.NODE_ENV,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@images': path.resolve(__dirname, `./src/images`),
      '@cs': path.resolve(__dirname, `./src/components`),
      '@data': path.resolve(__dirname, `./src/data`),
      '@plugins': path.resolve(__dirname, `./src/plugins`),
      '@common': path.resolve(__dirname, `./src/common`)
    }
  },
  performance: {
    maxEntrypointSize: 10000000,
    maxAssetSize: 30000000
  },
  devServer: {
    watchFiles: ['src/**/*'],
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 80,
    hot: true,
    open: true,
    allowedHosts: 'all',
    bonjour: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    client: {
      progress: true,
    },
    historyApiFallback: {
      rewrites: [
        { from: /.html$/, to: '' } // 将.html后缀去掉
      ]
    },
    proxy: {
      '/index.php': {
        target: 'https://project-iprj6690df5f8b4f9220a3b89e71-1235.preview.node01.inscode.run/',
        changeOrigin: true,
        pathRewrite: {
          "^/index.php": ""
        }
      }
    }
  },
  watchOptions: {
    poll: 1000, // 每1000毫秒检查一次文件变化
    ignored: /node_modules/
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css?t=[contenthash:8]"
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.ProvidePlugin({
    //     $: "jquery",
    //     "jQuery": "jquery",
    //     "window.jQuery": "jquery"
    // })
  ],
  target: "web"
}
if (isdev) {
  moduleConfig.plugins.push(new BundleAnalyzerPlugin())
  module.exports = smp.wrap(moduleConfig)
} else {
  module.exports = moduleConfig
}
moduleConfig.plugins.push(...htmlTemplate);
// if (!defaultTemplate) {
//   moduleConfig.plugins.push(new CopyPlugin({
//     patterns: [
// {
//   from: path.resolve(__dirname, `./src/plugins/s2t.js`),
//   to: path.resolve(__dirname, `./dist/js`)
// },
// {
//     from: path.resolve(__dirname, `./src/plugins/jquery-3.6.0.min.js`),
//     to: path.resolve(__dirname, `./dist/js`)
// },
// {
//     from: path.resolve(__dirname, `./src/plugins/swiper.min.js`),
//     to: path.resolve(__dirname, `./dist/js`)
// },
// {
//     from: path.resolve(__dirname, `./src/plugins/swiper.min.css`),
//     to: path.resolve(__dirname, `./dist/css`)
// },
// {
//     from: path.resolve(__dirname, `./src/plugins/city.js`),
//     to: path.resolve(__dirname, `./dist/js`)
// },
// {
//     from: path.resolve(__dirname, `./src/plugins/tinymce`),
//     to: path.resolve(__dirname, `./dist/js`)
// },
// {
//     from: path.resolve(__dirname, `./src/skin`),
//     to: path.resolve(__dirname, `./dist/skin/`)
// }
//     ]
//   }))
// }
