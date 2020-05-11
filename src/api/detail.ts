import Request from '../common/request'
import { baseURL } from './config'

export function getDetail(postId: number) {
  return Request.get(baseURL + '/square/post/detail/' + postId)
}
