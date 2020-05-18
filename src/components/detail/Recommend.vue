<template>
  <div class="recommend_scroll_wrapper">
    <div class="recommend_scroll_list_wrap" ref="scrollWrapper">
      <h2>更多精彩视频</h2>
      <cube-scroll
        ref="scroll"
        :data="recommendList"
        :options="options"
        @pulling-up="onPullingUp"
      >
        <div class="recommend_list">
          <div
            class="recommend_item"
            v-for="item in recommendList"
            :key="item.postId"
          >
            <div class="item_inner">
              <div class="item_header">{{ item.title }}</div>
              <div
                class="cover_img"
                :style="{
                  background: `url(${item.converUrl}) no-repeat`,
                  backgroundSize: 'cover',
                }"
              ></div>
              <img
                class="icon_play"
                src="../../assets/img/icon_play@2x.png"
                alt=""
              />
              <div class="item_footer">
                <span class="play_count">{{ item.playCount }}次播放</span>
                <span class="play_duration">{{
                  item.playDuration | formateDuration
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import { formateSeconds } from '@/common/utils'
export default {
  name: 'Recommend',
  props: {
    recommendList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      options: {
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '上滑加载更多',
            noMore: '已显示全部',
          },
          visible: true,
        },
      },
    }
  },
  filters: {
    formateDuration(value) {
      return formateSeconds(value)
    },
  },
  methods: {
    onPullingUp() {
      this.$emit('pullUpRecommend')
    },
  },
}
</script>

<style lang="scss" scoped>
.recommend_scroll_wrapper {
  background-color: #f4f6f8;
  padding: 0 20px;
  flex: 1;
  width: 100%;
  min-height: 600px;
  position: relative;

  h2 {
    color: #212121;
    font-size: 32px;
    text-align: center;
    font-weight: 500;
    padding: 24px 0;
  }
  .recommend_list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .recommend_item {
      flex-shrink: 0;
      width: 50%;
      height: 466px;
      padding: 10px;
      box-sizing: border-box;

      .item_inner {
        position: relative;
        width: 335px;
        height: 446px;
        background: #afafaf;
        border-radius: 4px;
        margin-right: 20px;
        overflow: hidden;

        .item_header {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0) 100%
          );
          border-radius: 4px 4px 0 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 92px;
          box-sizing: border-box;
          padding: 12px;
          font-size: 36px;
          color: #ffffff;
          line-height: 46px;
          z-index: 1;
        }
        .item_footer {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 52px;
          padding: 0 12px;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.35) 100%
          );
          border-radius: 4px 4px 0 0;
          z-index: 1;

          .play_count {
            font-size: 24px;
            color: #ffffff;
          }
          .play_duration {
            padding: 8px 12px;
            background-color: rgba($color: #000000, $alpha: 0.5);
            color: #ffffff;
            font-size: 20px;
            border-radius: 18px;
          }
        }
        .cover_img {
          width: 100%;
          height: 100%;
        }

        .icon_play {
          width: 88px;
          height: 88px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }
      }
    }
  }

  .recommend_scroll_list_wrap {
    height: 100%;
    transform: rotate(0deg); // fix 子元素超出边框圆角部分不隐藏的问题
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }
}
</style>
