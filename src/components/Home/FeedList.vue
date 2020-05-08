<template>
  <div class="wrapper" ref="wrapper">
    <ul class="list">
      <li class="item" v-for="item in feedList" :key="item.post.post_id">
        {{ item.post.title }}
      </li>
    </ul>
    <div class="loading-wrapper"></div>
  </div>
</template>

<script lang="ts">
import { getFeedList } from '../../api/feedList'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      feedList: [],
    }
  },
  created() {
    this._getList()
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(document.querySelector('.wrapper'), {
    //     scrollY: true,
    //   })

    //   this.scroll.on('touchEnd', (pos) => {
    //     // 下拉动作
    //     if (pos.y > 50) {
    //       console.log('===')
          
    //     }
    //   })
    // })
  },
  methods: {
    _getList () {
      getFeedList().then(data => {
        console.log(data)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.list {
  .item {
    display: flex;
    flex-direction: column;
    height: 400px;
  }
}

.wrapper {
  height: 100%;
  overflow: hidden;
}
</style>
