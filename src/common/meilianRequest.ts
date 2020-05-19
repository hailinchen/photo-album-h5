import axios from 'axios'
import md5 from 'crypto-js/md5'
import qs from 'qs'
import env from '../config/env'
import { getOS, getCache } from '../common/utils'

const signKey = 'nsdjkfnskjJBfhbs'

// 对象类型转字符串
function objToString(data: object) {
  return Object.values(data).join()
}

// 参数 按key 升序排序
function argsKeySort(args: any) {
  const initNewkeys = Object.keys(args).sort()
  let newObj: any = {}
  let newObj1: any = {}
  let newObj2: any = {}
  const newObj3: any = {}
  // 对初始key遍历 生成新对对象
  initNewkeys.map((item) => {
    if (typeof args[item] === 'object') {
      newObj2 = {}
    } else {
      newObj = {
        [item]: args[item]
      }
    }
  })
  if (newObj3) {
    newObj1 = Object.assign(newObj2, newObj3)
  }

  const newkeys = Object.keys(newObj1).sort()

  for (let i = 0; i < newkeys.length; i++) {
    newObj = {
      [newkeys[i]]: newObj1[newkeys[i]]
    }
  }
  return newObj
}

function getHeaders(url: string, args: object = {}) {
  const time: number = parseInt((new Date().getTime() / 1000).toString(), 10)
  const data = { ...argsKeySort(args), s: url, signTime: time }
  const objStr = objToString(argsKeySort(data))
  const sign = md5(objStr + signKey).toString()

  return {
    'Content-Type': 'application/json',
    'x-access-sign': sign,
    'x-access-time': data.signTime,
    'x-os': getOS(),
    'uid': getCache('uid') || 204371
  }
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
      headers: getHeaders(url, params)
    })
  },
  post(url: string, params: object = {}, headers: object = {}) {
    return AJAX.post(url, params, {
      headers: getHeaders(url, params)
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
}
