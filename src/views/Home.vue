<template>
  <div class="home">
    <!-- <Header /> -->
    <div class="main">
      <FeedList />
    </div>
    <Tabbar />
  </div>
</template>

<script>
import FeedList from '../components/home/FeedList'
import Header from '../components/common/Header'
import Tabbar from '../components/common/Tabbar'

export default {
  name: 'Home',
  components: {
    FeedList,
    Header,
    Tabbar
  }
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
