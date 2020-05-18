// /mini2/post/recommend/list/2
import Request from '../common/request'
import { baseURL } from './config'

export function getRecommendList(pageIndex: number, squareId: number, styleId: number) {
  const params = {
    square_id: squareId,
    style_id: styleId,
    is_recommend: 0
  }
  return Request.postForm(`${baseURL}/post/recommend/list/${pageIndex}`, params)
}
