<template>
  <cube-page
    :title="title"
    type="scroll-view"
    class="detail"
    titleBgColor="#000000"
    :isBack="true"
    backColor="#ffffff"
  >
    <template slot="content">
      <div class="container">
        <template v-if="postDetail">
          <video class="myvideo" autoplay>
            <source :src="postDetail.play_url" type="video/mp4">
          </video>
        </template>
      </div>
      <div class="footer_nav"></div>
    </template>
  </cube-page>
</template>

<script>
import { getDetail } from '../api/detail'
import CubePage from '../components/base/CubePage'

export default {
  name: 'PostDetail',
  components: {
    CubePage,
  },
  data() {
    return {
      postId: null,
      postDetail: null,
      userInfo: null,
      title: '',
    }
  },
  created() {
    this.postId = this.$route.params.id
  },
  methods: {
    async getDetailData(postId) {
      const result = await getDetail(postId)
      console.log('===', result)
      if (result.Code === 0) {
        this.postDetail = result.Data.post
        this.userInfo = result.Data.user
        this.title = result.Data.user.name
      }
    },
  },
  mounted() {
    this.getDetailData(this.postId)
  },
}
</script>

<style lang="scss" scope>
.detail {
  .wrapper {
    height: calc(100% - 88px);
  }
  .container {
    width: 100%;
    height: calc(100% - 88px - 96px);
    background-color: sandybrown;

    .myvideo {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .footer_nav {
    height: 98px;
    background-color: #000000;
  }
}
</style>
