<template>
  <ul class="footer_nav">
    <li :class="{ active: navIndex === 0 }" @click="toggleNav(0)">
      <img :src="homeICONPath" alt="首页" />
      <p>首页</p>
    </li>
    <li :class="{ active: navIndex === 1 }" @click="toggleNav(1)">
      <img src="../../assets/icon_add@2x.png" alt="相册" />
      <p>特效相册</p>
    </li>
    <li :class="{ active: navIndex === 2 }" @click="toggleNav(2)">
      <img :src="meICONPath" alt="我的" />
      <p>我的</p>
    </li>
  </ul>
</template>

<script>
import meICON from '../../assets/icon_me@2x.png'
import meActiveICON from '../../assets/icon_me_color@2x.png'
import homeActiveICON from '../../assets/icon_home_color@2x.png'
import homeICON from '../../assets/icon_home@2x.png'

export default {
  name: 'Footer',
  data() {
    return {
      navIndex: 0,
    }
  },
  computed: {
    meICONPath() {
      return this.navIndex === 2 ? meActiveICON : meICON
    },
    homeICONPath () {
      return this.navIndex === 0 ? homeActiveICON : homeICON
    }
  },
  methods: {
    toggleNav(index) {
      this.navIndex = index
    },
  },
}
</script>

<style lang="scss" scope>
.footer_nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 98px;
  display: flex;
  flex-direction: row;
  background-color: #fdfdfd;
  border-top: 1px solid transparent;
  border-image: svg(1px-border param(--color #0000000a)) 2 2 stretch;

  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.active {
      p {
        color: #f85959;
      }
    }

    img {
      width: 54px;
      height: 54px;
    }

    p {
      color: #b5b5b5;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
