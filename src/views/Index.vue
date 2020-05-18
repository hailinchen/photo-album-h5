<template>
  <div>
    <Tabbar />
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Tabbar from '../components/common/Tabbar'
export default {
  components: {
    Tabbar,
  }
}
</script>

<style>

</style>