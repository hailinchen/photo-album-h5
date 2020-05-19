<template>
  <div class="tab_bar">
    <cube-tab-bar
      v-model="selectedLabel"
      @click="clickHandler"
    >
      <cube-tab
        v-for="item in tabs"
        :key="item.path"
        :icon="item.icon"
        :value="item.path"
        :label="item.label"
      ></cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLabel: '/',
      tabs: [
        {
          label: '首页',
          icon: 'iconfont icon-home',
          path: '/',
        },
        {
          label: '制作特效相册',
          icon: 'iconfont icon-add',
          path: '/album',
        },
        {
          label: '我的',
          icon: 'iconfont icon-me',
          path: '/my',
        },
      ],
    }
  },
  mounted() {
    const path = this.$route.path
    // console.log(this.$route)
    this.selectedLabel = path
  },
  methods: {
    clickHandler(path) {
      // console.log(path)
      if (path === this.selectedLabel) {
        return
      }
      this.selectedLabel = path
      this.$router.push(path)
    },
  },
}
</script>

<style lang="scss">
.tab_bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 98px;
  background-color: #fdfdfd;
  border-top: 1px solid transparent;
  border-image: svg(1px-border param(--color #0000000a)) 2 2 stretch;

  .cube-tab {
    color: #b5b5b5;

    &.cube-tab_active {
      color: #f85959;
    }

    .iconfont {
      font-size: 50px;
    }

    > div {
      font-size: 20px;
    }
  }
}
</style>
