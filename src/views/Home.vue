<template>
  <div class="home">
    <ul v-for="(item, index) in feedList" :key="item.value && item.value.post !== null ? item.value.post.post_id : index">
      <template v-if="item.value && item.value.post !== null">
        <li>{{item.value.post.title}}</li>
      </template>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      feedList: 'feedList',
    }),
  },
  methods: {
    ...mapActions(['getFeedList']),
  },
  created() {
    this.$store.dispatch('getFeedList');
  },
};
</script>
