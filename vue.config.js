var webpack = require('webpack')
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                plupload: "plupload"
            })
        ]
    },
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    // 打包时不生成.map文件
    productionSourceMap: false,

}