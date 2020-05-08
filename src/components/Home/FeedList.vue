<template>
  <ul class="list">
    <li
      class="item"
      v-for="item in feedList"
      :key="item.post.post_id"
    >
      {{ item.post.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      feedList: 'feedList',
    }),
  },
  methods: {
    ...mapActions(['getFeedList']),
  },
  created() {
    this.$store.dispatch('getFeedList')
  },
}
</script>

<style lang="scss" scoped>
.list {
  .item {
    display: flex;
    flex-direction: column;
  }
}
</style>
