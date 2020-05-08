import axios, { AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios';
import env from '../config/env';
import { getOS, getCache } from '../common/utils';
import md5 from 'crypto-js/md5';

/**
 * 自定义axios实例
 */
const AJAX = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 30000,
  withCredentials: env.credential,
});

/**
 * 添加请求拦截器
 */
AJAX.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
}, (error: any) => {
  return Promise.reject(error);
});

/**
 * 请求响应拦截器
 */
AJAX.interceptors.response.use((response: AxiosResponse) => {
  // 对响应数据做点什么
  return response.data
}, (error: any) => {
  // 对响应错误做点什么，比如400、401、402等等
  if (error && error.response) {
    console.log(error.response);
  }
  return Promise.reject(error);
});

function timestamp() {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset();
  const offset = 8;
  const donba = utc + (3600000 * offset);
  return donba;
}

// 获取header中的x-access-sign
const signTapaikey = 'Gg=z?p!6bqu^#xk$:4L1sA~Vd7)Za_iw/PeYM}]T';

function getSign(url: string, timestr: number) {
  const sing = url + '#' + timestr + '#' + signTapaikey;
  return md5(sing).toString();
}

function getHeader(url: string, headers = {}) {
  const header = {
    'x-os': getOS(),
    'x-access-time': timestamp(),
    'x-access-sign': getSign(url, timestamp()),
    'x-device-id': getCache('openid') ? getCache('openid') : 'A65069FB-C9EE-46CF-A7ED-69FE74125651',
    'x-access-token': getCache('token'),
  };
  return Object.assign(header, headers);
}

export default {
  get(url: string, params: object = {}, headers: object = {}) {
    return AJAX.get(
      url,
      {
        params,
        headers: {
          ...getHeader(url, headers),
        },
      },
    );
  },
  post(url: string, params: object = {}, headers: object = {}): AxiosPromise {
    return AJAX.post(url, params, { headers: { ...getHeader(url, headers) } });
  },
  put(url: string, params: object = {}, headers = {}) {
    return AJAX.put(url, params, {
      headers,
    });
  },
  file(url: string, params: object = {}, headers = {}) {
    return AJAX.post(url, params, {
      headers: Object.assign({
        'Content-Type': 'multipart/form-data',
      }, headers),
    });
  },
  delete(url: string, params: object = {}, headers = {}) {
    return AJAX.delete(url, {
      params,
      headers: Object.assign({
        'Content-Type': 'multipart/form-data',
      }, headers),
    });
  },
};

