module.exports = {
  //基本路径
  publicPath: './', //vue-cli3.3+新版本使用
  configureWebpack: {
    devServer: {
      proxy: {
        //名字可以自定义，这里我用的是api
        '/api': {
          target: 'https://www.youdikuaidi.top/youdihoutai/api/index.php', //设置你调用的接口域名和端口号 别忘了加http
          changeOrigin: true, //这里设置是否跨域
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
}
