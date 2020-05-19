<template>
  <div class="main">
    <cube-page
      type="scroll-view"
      class="album_models"
      title="特效相册"
      titleBgColor="ffffff"
      titleColor="#212121"
    >
      <template slot="content">
        <div class="content_scroll_wrapper">
          <div class="content_scroll_list_wrap" ref="scrollWrapper">
            <cube-scroll
              ref="contentScroll"
              :data="modelList"
              :options="options"
              @pulling-down="onPullingDown"
              @pulling-up="onPullingUp"
            >
              <div class="product_btn">
                <img src="../assets/img/icon_add_circle@2x.png" alt="" />
                <p>制作相册</p>
              </div>
              <h2 class="list_title">相册模板</h2>
              <album-models :list="modelList" @selectModel="handleClickModel" />

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
        <!-- S - 预览模板 -->
        <preview-model
          v-if="isShowPreview"
          :previewInfo="selectedModel"
          @closePreview="handleClosePreview"
        />
        <!-- E - 预览模板 -->
      </template>
    </cube-page>
  </div>
</template>

<script>
import CubePage from '../components/base/CubePage'
import AlbumModels from '../components/AlbumModels'
import PreviewModel from '../components/PreviewModel'

import { getAlbumList } from '../api/album'
export default {
  name: 'AlbumList',
  components: {
    CubePage,
    AlbumModels,
    PreviewModel,
  },
  data() {
    return {
      modelList: [],
      card: null,
      isWxad: 0,
      wxad: null,
      totalPage: 0,
      options: {
        pullUpLoad: true,
        pullDownRefresh: {
          threshold: 60,
          // stop: 44,
          stopTime: 1000,
          txt: '更新成功',
        },
      },
      pageIndex: 1,
      selectedModel: null, // 选中的模板信息
      isShowPreview: false,
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleClosePreview() {
      this.isShowPreview = false
      this.selectedModel = null
    },
    handleClickModel(item) {
      console.log(item)
      this.selectedModel = item
      this.isShowPreview = true
    },
    async getList() {
      const result = await getAlbumList(this.pageIndex)
      console.log(result)
      this.modelList = this.modelList.concat(result.list.data)
      this.totalPage = result.list.total
      this.card = result.card
      this.isWxad = result.is_wxad
      this.wxad = result.wxad
    },
    onPullingUp() {
      if (this.pageIndex > this.totalPage) {
        return
      }
      this.pageIndex++
      this.getList()
    },
    onPullingDown() {
      this.pageIndex = 1
      this.modelList = []
      console.log('下拉刷新')
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 98px;
}

.content_scroll_wrapper {
  position: absolute;
  width: 100%;
  height: 100%;

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

.product_btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 340px;
  margin: 0 30px;
  background-color: #f4f6f8;
  border-radius: 12px;
  margin-bottom: 42px;
  margin-top: 18px;

  img {
    width: 100px;
    height: 100px;
  }

  p {
    font-size: 40px;
    color: #f85959;
    margin-top: 24px;
    font-weight: 500;
  }
}

.list_title {
  color: #333333;
  font-size: 32px;
  margin: 24px 0 24px 30px;
  font-weight: 500;
}
</style>
