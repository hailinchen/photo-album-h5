module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // 基准 - 视窗宽度
      viewportWidth: 750,
      // 转换后单位所带的小数点位数
      unitPrecision: 5,
      // 转换后单位
      viewportUnit: 'vw',
      // 转换后字体的单位
      fontViewportUnit: 'vmin', // ???暂时无效
      // 忽略的样式名
      selectorBlackList: ['.ignore', '.hairlines'],
      // 最小px
      minPixelValue: 1,
      // 是否转换媒体查询的px单位
      mediaQuery: false,
    },
    'postcss-write-svg': {
      uft8: false
    },
    'postcss-aspect-ratio-mini': {},
  },
}
