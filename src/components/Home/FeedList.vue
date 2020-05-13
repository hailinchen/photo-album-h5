<template>
  <cube-page type="scroll-view" class="home" title="美脸">
    <template slot="content">
      <!-- S - 顶部导航 -->
      <div class="nav_scroll_list_wrap">
        <cube-scroll ref="navScroll" direction="horizontal">
          <ul class="nav-wrapper">
            <li v-for="(item, index) in navTxts" :key="index" class="nav-item">
              {{ item }}
            </li>
          </ul>
        </cube-scroll>
        <!-- <div class="more-wrapper">
          <span class="more"></span>
        </div> -->
      </div>
      <!-- E - 顶部导航 -->

      <!-- S - 列表 -->
      <div class="content_scroll_wrapper">
        <div class="content_scroll_list_wrap" ref="scrollWrapper">
          <cube-scroll
            ref="contentScroll"
            :data="feedList"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
            <ul class="list_wrapper">
              <li
                class="item"
                v-for="item in feedList"
                :key="item.post.post_id"
                @click="goDetail(item.post.post_id)"
              >
                <div
                  class="item_top"
                  :style="{
                    background: `url(${item.post.conver_url}) no-repeat`,
                    backgroundSize: 'cover',
                  }"
                >
                  <div class="item_top_shadow"></div>
                  <div class="item_bottom_shadow"></div>
                  <h2>{{ item.post.title }}</h2>
                  <!-- <img :style="{height: `${(750 * item.post.conver_image_height / item.post.conver_image_width)}px`}" class="cover_img" :src="item.post.conver_url" alt="" /> -->
                  <span class="play_count">{{ item.post.play_count }}次</span>
                  <span class="play_duration">{{
                    item.post.play_duration
                  }}</span>
                  <img
                    src="../../assets/img/icon_play@2x.png"
                    alt=""
                    class="icon_play"
                  />
                </div>
                <div class="item_bottom">
                  <img class="avatar" :src="item.user.user_icon" alt="" />
                  <span class="name">{{ item.user.name }}</span>
                  <div class="like_count">
                    <i class="iconfont icon-like"></i
                    ><span class="count">{{ item.post.like_count }}</span>
                  </div>
                  <div class="comment_count">
                    <i class="iconfont icon-comment"></i
                    ><span class="count">{{ item.post.comment_count }}</span>
                  </div>
                  <button class="share">
                    <img src="../../assets/img/icon_home_share@2x.png" alt="" />
                  </button>
                </div>
              </li>
            </ul>

            <template slot="pulldown" slot-scope="props">
              <div
                v-if="props.pullDownRefresh"
                class="cube-pulldown-wrapper"
                :style="props.pullDownStyle"
              >
                <div
                  v-if="props.beforePullDown"
                  class="before-trigger"
                  :style="{ paddingTop: props.bubbleY + 'px' }"
                >
                  <span :class="{ rotate: props.bubbleY > 0 }">↓</span>
                </div>
              </div>
            </template>
          </cube-scroll>
        </div>
      </div>
      <!-- E - 列表 -->
    </template>
  </cube-page>
</template>

<script type="text/ecmascript-6">
import CubePage from '../base/CubePage';

export default {
  components: {
    CubePage
  },
  props: {
    feedList: {
      type: Array,
      default: []
    },
    navTxts: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: true
      },
    }
  },
  methods: {
    goDetail(postId) {
      this.$router.push('/postDetail/' + postId)
    },
    onPullingDown() {
      this.$emit('onPullingDown')
    },
    onPullingUp() {
      this.$emit('onPullingUp')
    }
  },
  mounted() {
    const contentScroll = this.$refs.contentScroll
    contentScroll.beforePullDown && contentScroll.refresh()
  }
}
</script>

<style lang="scss" scoped>
.home {
  > .wrapper {
    height: calc(100% - 88px);

    .content {
      height: 100%;
      position: relative;
    }
  }
  .nav_scroll_list_wrap {
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    position: fixed;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    height: 88px;
    line-height: 88px;
    z-index: 1;
    .cube-scroll-content {
      display: inline-block;
      .nav-wrapper {
        display: inline-block;
        white-space: nowrap;
        line-height: 36px;
        padding: 0 5px;
      }
      .nav-item {
        display: inline-block;
        padding: 0 24px;
        &:nth-child(1) {
          color: #fa7b7a;
        }
      }
    }
    .more-wrapper {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
      background-color: #fff;
      opacity: 0.95;
      .more {
        display: inline-block;
        height: 1px;
        width: 20px;
        padding: 5px 0;
        border: 1px solid #000;
        border-right: transparent;
        border-left: transparent;
        background-color: #000;
        background-clip: content-box;
        margin: 11px;
      }
    }
  }
  .content_scroll_wrapper {
    position: absolute;
    width: 100%;
    height: calc(100% - 88px);
    top: 88px;
    .content_scroll_list_wrap {
      width: 100%;
      height: 100%;
      transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
      position: absolute;
      top: 0;
      bottom: 0;
      overflow: hidden;
    }
  }
  .cube-pulldown-wrapper {
    text-align: center;
    .before-trigger {
      height: auto;
      font-size: 30px;
      align-self: flex-end;
      span {
        display: inline-block;
        line-height: 1;
        transition: all 0.3s;
        color: #666;
        padding: 15px 0;
        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
  }
  .after-trigger {
    flex: 1;
    margin: 0;
    .text-wrapper {
      margin: 0 auto;
      margin-top: 14px;
      padding: 5px 0;
      color: #498ec2;
      background-color: #d6eaf8;
    }
    .cube-loading-spinners {
      margin: auto;
    }
  }
  .success-enter-active,
  .success-leave-active {
    transition: width 0.5s;
  }
  .success-enter,
  .success-leave-to {
    width: 70%;
  }
  .success-enter-to,
  .success-leave {
    width: 100%;
  }
}
/* list 
---------------- */
.list_wrapper {
  .item {
    display: flex;
    flex-direction: column;

    .item_top {
      height: 420px;
      position: relative;

      .item_top_shadow {
        position: absolute;
        top: 0;
        width: 100%;
        height: 136px;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0) 100%
        );
        z-index: 1;
      }

      .item_bottom_shadow {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 68px;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
        z-index: 1;
      }

      .icon_play {
        position: absolute;
        width: 88px;
        height: 88px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
      }

      h2 {
        font-size: 40px;
        color: #ffffff;
        margin: 16px 0 0 30px;
        font-weight: 500;
        z-index: 2;
      }

      .play_duration {
        height: 36px;
        line-height: 36px;
        text-align: center;
        position: absolute;
        right: 20px;
        bottom: 16px;
        border-radius: 18px;
        background-color: rgba($color: #000000, $alpha: 0.5);
        padding: 0 12px;
        z-index: 2;
      }

      .play_count {
        position: absolute;
        left: 30px;
        bottom: 22px;
        color: #fff;
        font-size: 24px;
        z-index: 2;
      }
    }
    .item_bottom {
      height: 96px;
      background-color: #ffffff;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;

      .avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-left: 30px;
        margin-right: 12px;
      }
      .name {
        font-size: 26px;
        color: #212121;
        font-weight: 500;
        margin-right: 54px;
      }

      .like_count,
      .comment_count {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 26px;
        color: #666666;
        margin-right: 26px;

        .iconfont {
          font-size: 40px;
          margin-right: 10px;
        }
      }

      .share {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);

        img {
          width: 132px;
          height: 56px;
        }
      }
    }
  }
}
</style>
