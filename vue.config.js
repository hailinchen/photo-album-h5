const path = require('path');
const PostCompilePlugin = require('webpack-post-compile-plugin');
const TransformModulesPlugin = require('webpack-transform-modules-plugin');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  // 不同的环境打不同包名
  outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist',
  // 使用运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  // 开启生产环境SourceMap，设为false打包时不生成.map文件
  productionSourceMap: false,

  // 关闭ESLint，如果你需要使用ESLint，把lintOnSave设为true即可
  lintOnSave: true,

  devServer: {
    open: false, // 是否自动打开浏览器页面
    host: '0.0.0.0', // 指定使用一个 host，默认是 localhost
    port: 8080, // 端口地址
    https: false, // 使用https提供服务
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    proxy: {
      '/': {
        target: 'https://api.tapai.tv',
        changeOrigin: true,
        ws: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
    },
  },

  chainWebpack: (config) => {
    const conf = config.toConfig()
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
    // 移除 prefetch 插件，减少首屏加载
    config.plugins.delete('prefetch')
    
    config
      .plugin('post-compile')
      .use(PostCompilePlugin, [{
        config: {
          module: {
            rules: [...conf.module.rules]
          }
        }
      }])
      .end()
      .plugin('transform-modules')
      .use(TransformModulesPlugin)
  },

  css: {
    loaderOptions: {
        // 全局使用的一些scss样式
        sass: {
          prependData: `
            @import "~@/style/mixin.scss";
            `
        },
        stylus: {
          'resolve url': true
          // 自定义主题场景
          // import: [path.resolve(__dirname, './src/theme')]
        }
    }
},
}
