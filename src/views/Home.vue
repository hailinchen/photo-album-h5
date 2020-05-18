<template>
  <div class="home">
    <!-- <Header /> -->
    <div class="main">
      <FeedList
        v-if="feedList.length"
        :feedList="feedList"
        :navTxts="navTxts"
        @onPullingUp="onPullingUp"
        @onPullingDown="onPullingDown"
      />
    </div>
    <Tabbar />
  </div>
</template>

<script>
import FeedList from '../components/home/FeedList'
import Header from '../components/common/Header'
import Tabbar from '../components/common/Tabbar'
import { getFeedList } from '../api/feedList.ts'

const txts = ['推荐', '搞笑', '情感', '广场舞']

export default {
  name: 'Home',
  components: {
    FeedList,
    Header,
    Tabbar,
  },
  data() {
    return {
      navTxts: txts,
      feedList: [],
    }
  },
  methods: {
    onPullingDown() {
      this._getList()
    },
    async onPullingUp() {
      const result = await getFeedList()
      if (result) {
        if (result.Code === 0) {
          this.feedList = this.feedList.concat(this._formatData(result.Data))
        }
      }
    },
    async _getList() {
      const result = await getFeedList()
      if (result) {
        if (result.Code === 0) {
          this.feedList = this._formatData(result.Data)
          
          // if (result.Data.length === 0) {
          //   this.$refs.contentScroll.forceUpdate()
          // }
        }
      }
    },
    _formatData(data) {
      const newList = data
        .filter((item) => item.value !== null)
        .map((item) =>
          Object.assign({}, { card_type: item.card_type }, { ...item.value })
        )
      return newList
    },
  },
  created() {
    this._getList()
  },
  activated() {
    const beforeRouterName = this.beforeRouter.name
    // console.log('===', beforeRouterName)
    if (beforeRouterName && beforeRouterName !== 'PostDetail') {
      // 手动刷新页面
      this.$refs.table.reload()
    }
  },
}
</script>

<style lang="scss" scope>
[w-188-246] {
  width: 188px;
}
[w-188-246] {
  aspect-ratio: '188:246';
}
.main {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 98px;
}
</style>
