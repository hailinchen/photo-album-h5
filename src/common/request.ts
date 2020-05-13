import Vue from 'vue'
import axios from 'axios'
import env from '../config/env'
import { getOS, getCache } from '../common/utils'
import md5 from 'crypto-js/md5'
import qs from 'qs'

function timestamp() {
  const d = new Date()
  const utc = d.getTime() + d.getTimezoneOffset()
  const offset = 8
  const donba = utc + 3600000 * offset
  return donba
}

// 获取header中的x-access-sign
const signTapaikey = 'Gg=z?p!6bqu^#xk$:4L1sA~Vd7)Za_iw/PeYM}]T'

function getSign(url: string, timestr: number) {
  const sing = url + '#' + timestr + '#' + signTapaikey
  return md5(sing).toString()
}

function getHeader(url: string, headers = {}) {
  const header = {
    'uid': getCache('uid') || 3691953,
    'x-os': getOS(),
    'x-platform-type': 'meilian',
    'x-access-time': timestamp(),
    'x-access-sign': getSign(url, timestamp()),
    'x-device-id': getCache('openid') || 'oxnbN4p9J_kuZJc08MexTO2dZIPc',
    'x-access-token':
      getCache('token') ||
      'ADYENFA9VzBXZ1ZkUDNQbVUxVGMDYAprV2IFbgcoBHdRbAUzBGoFcVYkAW9db1B3B2sHdwA4XzMGOlYlBmEANgA+BDBQPVc0V2NWc1A9UCZVOFRuAzsKc1cjBTUHPQRgUQkFYwQ/BTdWNAEkXTBQJgdqBzUAMl8+BiJWNwY1AFAAdgRAUFFXdVc5VmBQd1B3VTlUJAM7CmBXYQVuB3EEYVEuBXAEOQUhVjQBdV1UUDwHPgcmADlfbQY6VjUGZwA5ADUEMVA0VzFXa1Ys',
  }
  return Object.assign(header, headers)
}

/**
 * 自定义axios实例
 */
const AJAX = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 30000,
  withCredentials: env.credential,
})

/**
 * 添加请求拦截器
 */
AJAX.interceptors.request.use(
  (config) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

/**
 * 请求响应拦截器
 */
AJAX.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.status === 200) {
      return response.data
    }
    return response.status
  },
  (error: any) => {
    // 对响应错误做点什么，比如400、401、402等等
    if (error && error.response) {
      console.log(error.response)
    }
    return Promise.reject(error)
  }
)

export default {
  get(url: string, params: object = {}, headers: object = {}) {
    return AJAX.get(url, {
      params,
      headers: {
        ...getHeader(url, headers),
      },
    })
  },
  post(url: string, params: object = {}, headers: object = {}) {
    return AJAX.post(url, params, { headers: { ...getHeader(url, headers) } })
  },
  postForm(url: string, params: object = {}, headers: object = {}) {
    return AJAX.post(url, qs.stringify(params), {
      headers: {
        ...getHeader(
          url,
          Object.assign({
            'Content-Type': 'application/x-www-form-urlencoded',
            headers,
          })
        ),
      },
    })
  },
  put(url: string, params: object = {}, headers = {}) {
    return AJAX.put(url, params, {
      headers,
    })
  },
  file(url: string, params: object = {}, headers = {}) {
    return AJAX.post(url, params, {
      headers: Object.assign(
        {
          'Content-Type': 'multipart/form-data',
        },
        headers
      ),
    })
  },
  // delete(url: string, params: object = {}, headers = {}) {
  //   return AJAX.delete(url, {
  //     params,
  //     headers: Object.assign(
  //       {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       headers
  //     ),
  //   })
  // },
  delete(url: string, params: object = {}, headers = {}) {
    return AJAX.delete(url, {
      data: qs.stringify(params),
      headers: Object.assign({
        'Content-Type': 'application/x-www-form-urlencoded',
        ...getHeader(url, headers)
      }),
    })
  },
}
