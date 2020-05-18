<template>
  <cube-scroll
    class="scroll_comment"
    ref="commentScroll"
    :data="allComments"
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp"
  >
    <ul>
      <li
        v-for="item in allComments"
        :key="item.commentId"
        @click.stop="answerCommit(item.commentId)"
      >
        <img class="item_l" :src="item.avatar" alt />
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
            noMore: '已显示全部评论',
          },
          visible: true,
        },
      },
      secondStop: 26,
      scroll: null,
    }
  },
  methods: {
    answerCommit(parentId) {
      this.$emit('atComment', parentId)
    },
    onPullingDown() {
      console.log('下拉刷新')
      this.$emit('refreshAllComment')
    },
    onPullingUp() {
      this.$emit('loadMoreComment', this.scroll)
    },
  },
  mounted() {
    this.scroll = this.$refs.commentScroll
  },
}
</script>

<style lang="scss" scoped>
.scroll_comment {
  height: 100%;

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

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
}
</style>
