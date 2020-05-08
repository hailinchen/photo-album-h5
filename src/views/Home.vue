<template>
  <div class="home">
    <Header/>
    <div class="main">
      <FeedList />
    </div>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import FeedList from '../components/Home/FeedList'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'

export default {
  name: 'Home',
  components: {
    FeedList,
    Header,
    Footer,
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
  padding-top: 88px;
}
</style>
