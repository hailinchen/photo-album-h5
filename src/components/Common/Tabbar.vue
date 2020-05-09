<template>
  <div class="tab_bar">
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
    >
    </cube-tab-bar>
    <!-- <cube-tab-bar v-model="selectedLabel">
      <cube-tab
        v-for="item in tabs"
        :icon="item.icon"
        :label="item.label"
        :key="item.label"
      >
      </cube-tab>
    </cube-tab-bar> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLabelDefault: '首页',
      tabs: [
        {
          label: '首页',
          value: '首页',
          icon: 'iconfont icon-home'
        },
        {
          label: '特效相册',
          value: '特效相册',
          icon: 'iconfont icon-add'
        },
        {
          label: '我的',
          icon: 'iconfont icon-me'
        }
      ]
    }
  },
  methods: {}
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
      color: #F85959;
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
