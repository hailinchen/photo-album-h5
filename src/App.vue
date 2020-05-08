<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './style/reset.scss';
@import './style/normalize.scss';
@import './style/common.scss';
</style>
