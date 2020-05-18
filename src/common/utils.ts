/**
 * 存储localStorage
 * @param key
 * @param value
 */
export const setCache = (key: string, value: any) => {
  if (!key) {
    return
  }
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取存储
 * @param key
 */
export const getCache = (key: string) => {
  if (!key) {
    return
  }
  return window.localStorage.getItem(key)
}
/**
 * 浏览器判断
 * 用法示例——多套页面判断是否显示移动端：
 *   let ua = parseUA();
 *   if (!ua.mobile) {
 *       location.href = './pc.html';
 *   }
 */
export const parseUA = () => {
  const u = navigator.userAgent
  const ua = navigator.userAgent.toLowerCase()
  return {
    // 移动终端浏览器版本信息
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
    weixin: ua.indexOf('MicroMessenger') > 0,
    ali: u.indexOf('AliApp') > -1,
  }
}

export const getOS = () => {
  let os = ''
  const ua = navigator.userAgent.toLowerCase()
  const oslist = ['iphone', 'android']
  for (const item of oslist) {
    if (ua.indexOf(item) >= 0) {
      os = item
      break
    }
  }
  return os === 'iphone' ? 'ios' : 'android'
}

/**
 * 删除左右两端的空格
 * @param str
 * @returns {string | * | void}
 */
function trim(str: string) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 删除左边的空格
 * @param str
 * @returns {string|*|void}
 */
function ltrim(str: string) {
  return str.replace(/(^\s*)/g, '')
}

/**
 * * 删除右边的空格
 * @param str
 * @returns {string | * | void}
 */
function rtrim(str: string) {
  return str.replace(/(\s*$)/g, '')
}

/**
 * 对象数组转二维数组
 * @param objArr
 */
// function obj2Arr(objArr: object[]) {
//   if (objArr.length > 0) {
//     objArr.map((item) => {
//       return Object.values(item);
//     });
//   }
// }

/**
 * 判断当前网络环境
 */
export const isWifi = () => {
  try {
    let wifi = true
    const ua = window.navigator.userAgent
    // 如果是微信
    if (/MicroMessenger/.test(ua)) {
      if (ua.indexOf('WIFI') >= 0) {
        return true
      } else {
        wifi = false
      }
      // 如果支持navigator.connection
    } else if (window.navigator.connection) {
      const con = window.navigator.connection
      const network = con.type
      if (network !== 'wifi' && network !== '2' && network !== 'unknown') {
        wifi = false
      }
    }
    return wifi
  } catch (e) {
    return false
  }
}

/**
 * 首字母大写
 * @param str
 * @returns {string}
 */
export const fistLetterUpper = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 过滤非法字符串
 * @param str
 */
export const illegalFilter = (str: string) => {
  const regEn = /[`~!@#$%^&*()_+<>?:'{},.\/;'[\]]/im
  const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im

  if (regEn.test(str) || regCn.test(str)) {
    return false
  }
  return true
}


export const formateSeconds = (s: number) => {
  if (s > 0) {
    const hour = Math.floor(s / 3600)
    const min = Math.floor(s / 60) % 60
    const sec = s % 60
    const hourStr = hour >= 10 ? hour : '0' + hour
    const minStr = min >= 10 ? min : '0' + min
    const secStr = sec >= 10 ? sec : '0' + sec
    return hourStr > 0 ? hourStr + ":" + minStr + ":" + secStr : minStr + ":" + secStr
  } else {
    return '00:00'
  }
}