const path = require("path");
//插件引入
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        type: 'asset',
        generator:{
            filename:"img/[hash:6].[ext]"
        },
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024 
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
//babel配置
function getBabelLoader(){
    let loader={
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                }
            }
        ],
    }
    return loader;
}
module.exports={
    entry:"./src/main.js",
    module:{
        rules:[
            getCSSLoader(),
            getScssLoader(),
            getImgLoader(),
            getHtmlLoader(),
            getBabelLoader()
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"../src/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename:"css/[contenthash:6].css",
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`
        },
    },
    mode:"development",
    devServer:{
        host:'localhost',
        port:8080,
        open:true,
        hot:true,
    }
}