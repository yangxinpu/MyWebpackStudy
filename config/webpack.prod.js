const path = require("path");
//插件引入
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//各个loader配置
//css相关loader
function getCSSLoader(){
    let loader = {
        test:/\.css$/,
        use:[
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
                loader:"postcss-loader",
                options:{
                    postcssOptions:{
                        plugins:["postcss-preset-env"],
                    }
                }
            },
        ]
    };
    return loader;
}
//scss或sass相关loader
function getScssLoader(){
    let loader={
        test:/\.s[ac]ss$/,
        use:[            
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: ["postcss-preset-env"]
                    }
                }
            },
            "sass-loader"
        ],
    };
    return loader;
}
//图片相关loader
function getImgLoader(){
    let loader={
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|webp)$/,
        type: 'asset/resource',
        generator:{
            filename:"img/[name][hash:6].[ext]"
        },
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024 // 小于10kb的图片会被base64处理，优点：减少请求次数，缺点：体积更大;
            }
        }
    };
    return loader;
}
//html相关loader
function getHtmlLoader(){
    let loader={
        test: /\.html$/i,
        use: 'html-loader',
    }
    return loader;
}
//字体图标相关,
function getFontIconLoader(){
    let loader={
        test:/\.ttf|woff|woff2|svg$/,
        type: 'asset/resource',
        generator: {
            filename: 'font/[hash:6][ext]',
        }
    }
    return loader; 
}
// Babel loader (更新后的配置)
function getBabelLoader() {
  return {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        cacheCompression: false,
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: { version: 3, proposals: true },
              targets: {
                chrome: '58',
                ie: '11'
              }
            }
          ]
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: 3,
              helpers: true,
              regenerator: true
            }
          ]
        ]
      }
    }
  };
}
module.exports={
    entry:{
        main:"./src/main.js",
    },
    output:{
        path:path.resolve(__dirname,"../dist"),
        filename:"[name].js",  
        clean:true,
    },
    module:{
        rules:[
            getCSSLoader(),
            getScssLoader(),
            getImgLoader(),
            getHtmlLoader(),
            getFontIconLoader(),
            getBabelLoader(),
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"../src/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename:"css/[contenthash:6].css",
        }),
        new CssMinimizerPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk:"single",
    },
    mode:"production",
}