<template>
  <div class="all_comment_wrapper" @click="handleClose">
    <div class="comment_list">
      <h2 class="title">评论</h2>
      <div class="comment_list_wrapper">
        <cube-scroll
          class="scroll_comment"
          ref="commentScroll"
          :data="allComments"
          :options="options"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp"
        >
          <ul>
            <li v-for="item in allComments" :key="item.commentId">
              <img class="item_l" :src="item.avatar" alt="" />
              <div class="item_r">
                <div class="item_name">{{ item.name }}</div>
                <p>{{ item.commentContent }}</p>
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
              <div class="after-trigger" v-else>
                <div v-show="props.isPullingDown" class="loading">
                  <cube-loading></cube-loading>
                </div>
              </div>
            </div>
          </template>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllComments',
  props: {
    allComments: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: '更新成功',
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '上滑加载更多',
            noMore: '没有更多了'
          },
          visible: true
        },
      },
      secondStop: 26,
      scroll: null,
    }
  },
  methods: {
    handleClose() {
      this.$emit('closeAllComment')
    },
    onPullingDown() {
      this.$emit('refreshAllComment')
    },
    onPullingUp() {
      this.$emit('loadMoreComment', this.scroll)
    },
  },
  mounted() {
    this.scroll = this.$refs.commentScroll
  }
}
</script>

<style lang="scss">
.all_comment_wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba($color: #000, $alpha: 0.5);
  top: 0;
  bottom: 0;
  z-index: 5;

  .comment_list {
    background-color: #ffffff;
    width: 100%;
    border-radius: 16px 16px 0 0;
    position: absolute;
    bottom: 0;
    height: calc(100% - 254px);

    .comment_list_wrapper {
      width: 100%;
      height: 100%;
      transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
      position: absolute;
      top: 88px;
      bottom: 0;
      overflow: hidden;
    }

    .title {
      height: 88px;
      line-height: 88px;
      color: #666666;
      font-size: 32px;
      text-align: center;
    }

    .scroll_comment {
      height: 100%;
    }

    li {
      display: flex;
      flex-direction: row;
      padding: 16px 30px 0;
      box-sizing: border-box;

      .item_l {
        display: block;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-right: 12px;
      }

      .item_r {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #ededed;
        padding-bottom: 34px;

        .item_name {
          color: #212121;
          font-size: 26px;
          height: 64px;
          line-height: 64px;
          margin-bottom: 16px;
        }

        .item_content {
          color: #212121;
          font-size: 32px;
          line-height: 42px;
        }
      }
    }
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
</style>
