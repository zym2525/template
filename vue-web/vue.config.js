'use strict'
const path = require('path')
const defaultSettings = require('./config/config.js')
const webpack = require("webpack");

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'hellozerod' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 8000 npm run dev OR npm run dev --port = 8000
const port = process.env.port || process.env.npm_config_port || 8000 // dev port

const isEnvProduction = process.env.NODE_ENV !== 'development'

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,//process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: port,
        open: true,
        proxy: {
            '/api': {
                // 对应自己的接口
                target: 'http://118.178.225.198:6087',
                changeOrigin: true,
                // ws: true,
            }
        },
        overlay: {
            warnings: false,
            errors: true
        }
        // before: require('./mock/mock-server.js')
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            extensions: ['.js', '.vue', '.json', '.css', '.scss'],
            alias: {
                '@': resolve('src'),
                '@config': resolve('config'),
            }
        },
        devtool: 'source-map'
    },
    // transpileDependencies: [/node_modules[/\\\\](element-ui|vuex|js-cookies|js-base64|crypto-js|asn1.js|vue-pdf)[/\\\\]/],// 需要编译的
    chainWebpack(config) {

        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }
        ])

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete('prefetch')

        /**
         * @description 删除 moment 除 zh-cn 中文包外的其它语言包
         */
        config
            .plugin("ignore")
            .use(
                new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
            );

        config
            .when(isEnvProduction,
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // can customize your rules
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true
                                },
                            }
                        })
                    // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
                    config.optimization.runtimeChunk('single')
                }
            )
    },
}
