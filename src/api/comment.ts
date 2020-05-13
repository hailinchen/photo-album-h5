import Request from '../common/request'
import { baseURL } from './config'

export function createComment(
  postId: number,
  commentContent: string,
  parentCommentId: string
) {
  const data = {
    post_id: postId,
    comment_content: commentContent,
    parent_comment_id: parentCommentId
  }
  return Request.postForm(`${baseURL}/v21/comment/text/create`, data)
}

export function getComment(postId: string, lastCommentId: number) {
  return Request.get(`${baseURL}/post/comment/list/${postId}/${lastCommentId}`)
}

interface IComment {
  isRes: boolean
  commentator: {
    comment: CommentInfo
    user: CommentUser
  }
  respondent: {
    comment: CommentInfo
    user: CommentUser
  }
}

interface CommentUser {
  name: string
  uid: number
  user_icon: string
}
interface CommentInfo {
  comment_id: number
  comment_content: string
  create_time: number
}

export class Comment {
  protected commentId: number
  protected commentContent: string
  protected name: string
  protected avatar: string
  protected uid: number
  protected createTime: number
  protected isRes: boolean
  protected resContent?: string
  protected resName?: string
  protected resUid?: number
  constructor(comment: IComment) {
    this.isRes = comment.isRes
    if (comment.respondent.comment && comment.commentator.comment) {
      this.commentId = comment.commentator.comment.comment_id
    } else if (comment.commentator.comment) {
      this.commentId = comment.commentator.comment.comment_id
    } else {
      this.commentId = comment.respondent.comment.comment_id
    }
    this.commentContent = comment.commentator.comment.comment_content
    this.name = comment.commentator.user.name
    this.createTime = comment.commentator.comment.create_time
    this.uid = comment.commentator.user.uid
    this.avatar = comment.commentator.user.user_icon
    if (comment.respondent.comment && comment.respondent.user) {
      this.resUid = comment.respondent.user && comment.respondent.user.uid
      this.resName = comment.respondent.user.name
      this.resContent = comment.respondent.comment.comment_content
    }
  }
}
