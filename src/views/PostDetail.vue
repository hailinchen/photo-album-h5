<template>
  <cube-page
    v-if="postDetail"
    :title="postDetail.name"
    type="scroll-view"
    class="detail"
    titleBgColor="#000000"
    :isBack="true"
    backColor="#ffffff"
  >
    <template slot="content">
      <!-- S - 视频容器 -->
      <div class="video-container">
        <template v-if="postDetail">
          <video class="myvideo">
            <source :src="postDetail.playUrl" type="video/mp4" />
          </video>
        </template>
      </div>
      <!-- E - 视频容器 -->

      <!-- S - 底部浮层 -->
      <!-- <div class="footer_nav">
        <div class="nav_item">
          <i class="iconfont icon-arrow-top"></i>
          <span>更多</span>
        </div>
        <div class="nav_item">
          <i class="iconfont icon-like"></i>
          <span>点赞</span>
        </div>
        <div class="nav_item">
          <i class="iconfont icon-comment"></i>
          <span>评论</span>
        </div>

        <button class="share">
          <img src="../assets/img/icon_home_share@2x.png" alt="" />
        </button>
      </div> -->
      <!-- E - 底部浮层 -->

      <!-- S - 帖子信息 -->
      <div class="post_info">
        <h1 class="post_title">{{ postDetail.title }}</h1>
        <p v-if="postDetail.content" class="post_content">
          {{ postDetail.content }}
        </p>
        <div class="post_count">
          <div class="post_count_item post_count_play">
            {{ postDetail.playCount }}次播放
          </div>
          <!-- 点赞 -->
          <div class="post_count_item post_count_like" @click="handleLike">
            <i
              class="iconfont icon-like"
              :style="{color: postDetail.isClickedLike ? '#F85959' : '#666666'}"
            ></i>
            <span>{{ postDetail.likeCount }}</span>
          </div>
          <!-- 评论 -->
          <div class="post_count_item post_count_comment">
            <i class="iconfont icon-comment"></i>
            <span>{{ postDetail.commentCount }}</span>
          </div>
          <!-- 转发 -->
          <div class="post_count_item post_count_share">
            <i class="iconfont icon-share"></i>
            <span>{{ postDetail.shareCount }}</span>
          </div>
          <button class="more"><i class="iconfont icon-more"></i></button>
        </div>
      </div>
      <!-- E - 帖子信息 -->

      <!-- S - 热门评论 -->
      <HotComments
        :hotComment="hotComment"
        :commentCount="commentCount"
        @showAllComment="handleShowAllComment"
      />
      <!-- E - 热门评论 -->

      <!-- S - 全部评论 -->
      <AllComments
        ref="allComment"
        v-show="isShowAllComment"
        :allComments="allComments"
        @refreshAllComment="handleRereshAllComment"
        @loadMoreComment="handleLoadMoreComment"
        @closeAllComment="handleCloseAllComment"
        @addCommit="handleAddCommit"
        @atComment="handleAnswerCommit"
      />
      <!-- E - 全部评论 -->

      <!-- S - 输入评论 -->
      <InputComment
        v-show="isShowInput"
        @publishComment="handlePublishComment"
        @cancelComment="handleCancelComment"
      />
      <!-- E - 输入评论 -->
    </template>
  </cube-page>
</template>

<script>
import { getDetail, PostInfo } from '../api/detail'
import { getComment, Comment, createComment } from '../api/comment'
import { postLike, postCancelLike } from '../api/like'
import CubePage from '../components/base/CubePage'
import HotComments from '../components/detail/HotComments'
import AllComments from '../components/detail/AllComments'
import InputComment from '../components/detail/InputComment'

export default {
  name: 'PostDetail',
  components: {
    CubePage,
    HotComments,
    AllComments,
    InputComment,
  },
  data() {
    return {
      postDetail: null,
      hotComment: [],
      allComments: [],
      isShowAllComment: false,
      lastCommentId: 0,
      commentLoaded: false,
      isShowInput: false,
      isAnswer: false,
      parentCommentId: '',
      commentCount: 0,
    }
  },
  created() {
    this.postId = Number(this.$route.params.id)
    // this.postId = 14701095
    this.getDetailData(this.postId)
  },
  methods: {
    async handleLike() {
      if (this.postDetail.isClickedLike) {
        await postCancelLike(this.postId)
      } else {
        await postLike(this.postId)
        const toast = this.$createToast({
          txt: '点赞成功',
          type: 'txt',
        })
        toast.show()
      }
      this.postDetail.isClickedLike = !this.postDetail.isClickedLike
    },
    handleAnswerCommit(parentCommentId) {
      this.isAnswer = true
      this.parentCommentId = parentCommentId
    },
    async handlePublishComment(value) {
      const res = await createComment(
        this.postId,
        value,
        `${this.parentCommentId}`
      )
      this.isShowInput = false
      if (res.Code === 0) {
        const toast = this.$createToast({
          txt: '评论成功',
          type: 'txt',
          onTimeout: () => {
            this.commentCount = this.commentCount + 1
            this.getCommentData()
          },
        })
        toast.show()
      } else {
        toast = this.$createToast({
          txt: res.Msg,
          type: 'txt',
        })
        toast.show()
      }
      console.log(res)
    },
    handleCancelComment() {
      this.isShowInput = false
    },
    handleAddCommit() {
      this.isShowInput = true
    },
    handleCloseAllComment() {
      this.isShowAllComment = false
    },
    handleRereshAllComment() {
      this.getCommentData()
    },
    async handleLoadMoreComment(scroll) {
      if (this.commentLoaded) {
        scroll.forceUpdate()
        return
      }
      const result = await getComment(this.postId, this.lastCommentId)
      if (result.Code === 0 && result.Data.length) {
        this.allComments = this.allComments.concat(
          this._formatComment(result.Data)
        )
        this.lastCommentId = this.allComments[
          this.allComments.length - 1
        ].commentId
      } else {
        this.commentLoaded = true
        // 如果没有新数据
        scroll.forceUpdate()
      }
    },
    handleShowAllComment() {
      this.isShowAllComment = true
    },
    async getDetailData(postId) {
      const result = await getDetail(postId)
      if (result.Code === 0) {
        this.postDetail = new PostInfo(result.Data)
        console.log(this.postDetail)
        this.commentCount = this.postDetail.commentCount
        this.getCommentData()
      }
    },
    async getCommentData() {
      this.lastCommentId = 0
      const result = await getComment(this.postId, this.lastCommentId)
      if (result.Code === 0) {
        this.hotComment = this._formatComment(result.Data.slice(0, 3))
        this.allComments = this._formatComment(result.Data)
        this.lastCommentId = this.allComments[
          this.allComments.length - 1
        ].commentId
      }
    },
    _formatComment(data) {
      return data.map((item) => {
        if (item.respondent.user !== null) {
          item.isRes = true
        } else {
          item.isRes = false
        }
        return new Comment(item)
      })
    },
  },
}
</script>

<style lang="scss" scope>
.detail {
  > .wrapper {
    height: calc(100% - 88px);

    .content {
      height: 100%;
      position: relative;
    }
  }
  .video-container {
    width: 100%;
    height: calc(100% - 98px);
    background-color: sandybrown;

    .myvideo {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .footer_nav {
    width: 100%;
    height: 98px;
    background-color: #000000;
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;

    .nav_item {
      line-height: 98px;
      color: #fff;
      font-size: 32px;
      display: flex;
      align-items: center;
      margin-right: 60px;

      .iconfont {
        font-size: 40px;
        margin-right: 12px;
        font-weight: 600;
      }
    }

    .share {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 162px;
      height: 64px;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  .post_info {
    padding: 32px 30px;

    .post_title {
      font-size: 40px;
      color: #212121;
      text-align: left;
      font-weight: 500;
      line-height: 54px;
    }

    .post_content {
      font-size: 28px;
      color: #666666;
      line-height: 40px;
      margin-bottom: 32px;
    }
    .post_count {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      height: 108px;

      .post_count_item {
        flex: 1;
        font-size: 26px;
        color: #666666;
        display: flex;
        align-items: center;

        .iconfont {
          font-size: 44px;
          margin-right: 10px;
        }

        span {
          font-size: 26px;
        }
      }

      .more {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        line-height: 44px;
        text-align: center;

        .iconfont {
          font-size: 44px;
          color: #666666;
          font-weight: 600;
        }
      }
    }
  }

  .hot_comment {
    margin: 0 30px;
    box-sizing: border-box;
    padding: 22px;
    background-color: #fafafa;
    border-radius: 16px;
    margin-bottom: 32px;

    .hot_comment_item {
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;

      span {
        font-size: 28px;
        line-height: 32px;

        &.name {
          color: #212121;
          font-weight: 500;
        }
        &.content {
          margin-left: 10px;
          color: #666666;
        }
      }
    }

    .all_comment_count {
      margin-top: 16px;
      color: #2a90d7;
      font-size: 24px;
    }
  }
}
</style>
