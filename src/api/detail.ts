import Request from '../common/request'
import { baseURL } from './config'

export function getDetail(postId: number) {
  return Request.get(baseURL + '/square/post/detail/' + postId)
}

interface PostDetail {
  post: {
    post_id: number,
    title: string,
    content: string,
    conver_url: string,
    play_url: string,
    is_clicked_like: number,
    is_release: number,
    like_count: number,
    play_count: number,
    share_count: number,
    comment_count: number,
    play_duration: number,
  },
  user: {
    name: string,
    uid: number,
    user_icon: string
  },
  popularize: number,
  request_id: string
}

export class PostInfo {
  public postId: number
  public title: string
  public content: string
  public converUrl: string
  public playUrl: string
  public isClickedLike: boolean
  public isRelease: number
  public likeCount: number
  public playCount: number
  public shareCount: number
  public commentCount: number
  public name: string
  public avatar: string
  public uid: number
  public popularize: number
  public requestId: string
  public playDuration: number

  constructor(postDetail: PostDetail) {
    this.postId = postDetail.post.post_id
    this.title = postDetail.post.title
    this.content = postDetail.post.content
    this.converUrl = postDetail.post.conver_url
    this.playUrl = postDetail.post.play_url
    this.playDuration = postDetail.post.play_duration
    this.isClickedLike = postDetail.post.is_clicked_like === 0 ? false : true
    this.isRelease = postDetail.post.is_release
    this.likeCount = postDetail.post.like_count
    this.playCount = postDetail.post.play_count
    this.shareCount = postDetail.post.share_count
    this.commentCount = postDetail.post.comment_count
    this.name = postDetail.user.name
    this.uid = postDetail.user.uid
    this.avatar = postDetail.user.user_icon
    this.popularize = postDetail.popularize
    this.requestId = postDetail.request_id
  }
}
