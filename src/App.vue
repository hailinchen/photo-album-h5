<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Tabbar v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Tabbar from './components/common/Tabbar'
export default {
  components: {
    Tabbar,
  },
  mounted() {
    console.log('===', this.$route)
  }
}
</script>

<style lang="scss">
@import './style/reset.scss';
@import './style/normalize.scss';
@import './style/common.scss';
</style>
