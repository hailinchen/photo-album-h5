import Request from '../common/request'

/**
 * 帖子点赞
 * @param postId 帖子id
 */
export function postLike(postId: number) {
  return Request.postForm(`/Like`, { vod_id: postId })
}

/**
 * 取消帖子点赞
 * @param postId 帖子id
 */
export function postCancelLike(postId: number) {
  return Request.delete(`/Like`, { vod_id: postId })
}
